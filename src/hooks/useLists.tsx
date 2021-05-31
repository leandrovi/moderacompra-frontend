import React from "react";
import { createContext, ReactNode, useContext, useState } from "react";

import api from "../services/api";

import { List } from "../interfaces";

interface FetchAllListsResponse {
  isTheFirstList: boolean;
  mostRecentList?: List;
}

interface ListsProviderProps {
  children: ReactNode;
}

interface ListsContextData {
  currentList: List | null;
  isFirstList: boolean;
  lists: List[];
  fetchAllLists: (offset?: number) => Promise<FetchAllListsResponse>;
  createList: () => Promise<List>;
  finalizeList: () => Promise<void>;
  confirmList: () => Promise<void>;
}

const ListsContext = createContext<ListsContextData>({} as ListsContextData);

export function ListsProvider({ children }: ListsProviderProps) {
  const [currentList, setCurrentList] = useState<List | null>(null);
  const [isFirstList, setIsFirstList] = useState(false);
  const [lists, setLists] = useState<List[]>([]);

  const fetchAllLists = async (
    offset: number = 0
  ): Promise<FetchAllListsResponse> => {
    const params = `offset=${offset}&order=created_at,desc`;
    const response = await api.get(`/lists?${params}`);

    const { rows } = response.data;
    const count = rows.length;
    let isTheFirstList = false;

    setLists(rows);

    // if most recent list exists
    if (count > 0) {
      const mostRecentList: List = rows[0];
      setIsFirstList(isTheFirstList);
      setCurrentList(mostRecentList);

      return {
        isTheFirstList,
        mostRecentList,
      };
    } else {
      isTheFirstList = true;
      setIsFirstList(isTheFirstList);
      setCurrentList(null);

      return {
        isTheFirstList,
      };
    }
  };

  const createList = async (): Promise<List> => {
    try {
      const response = await api.post("/lists", {
        isFirstList,
        id_status: isFirstList ? null : 0,
      });

      const list = response.data;

      const normalizedList: List = {
        ...list,
        status: {
          id: list.id_status,
          description: setStatus(list.id_status),
        },
      };

      const updatedLists = [...lists];

      updatedLists.unshift(normalizedList);
      setCurrentList(normalizedList);
      setLists(updatedLists);

      if (isFirstList) setIsFirstList(false);

      return list;
    } catch (err) {
      console.log(err);
      throw Error("Erro ao criar lista");
    }
  };

  const finalizeList = async (): Promise<void> => {
    try {
      const response = await api.put(`/lists/${currentList?.id}`, {
        id_status: 2,
      });

      const list: List = {
        ...response.data,
        status: {
          id: response.data.id_status,
          description: setStatus(response.data.id_status),
        },
      };

      const updatedLists = [...lists];
      const listExists = updatedLists.find((l) => l.id === list.id);

      if (listExists) {
        const index = updatedLists.indexOf(listExists);
        updatedLists[index] = list;
      }

      if (isFirstList) setIsFirstList(false);

      setCurrentList(list);
      setLists(updatedLists);
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const confirmList = async (): Promise<void> => {
    try {
      const response = await api.put(`/lists/${currentList?.id}`, {
        id_status: 1,
      });

      const list: List = {
        ...response.data,
        status: {
          id: response.data.id_status,
          description: setStatus(response.data.id_status),
        },
      };

      setCurrentList(list);
      if (isFirstList) setIsFirstList(false);
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return (
    <ListsContext.Provider
      value={{
        currentList,
        isFirstList,
        lists,
        fetchAllLists,
        createList,
        finalizeList,
        confirmList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}

export function useLists() {
  const context = useContext(ListsContext);

  return context;
}

function setStatus(id: number) {
  switch (id) {
    case 0:
      return "pendente";
    case 1:
      return "em aberto";
    case 2:
      return "finalizada";
    default:
      return "pendente";
  }
}
