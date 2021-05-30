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

    console.log("All lists fetched:", response.data);

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
      });

      const list = response.data;
      const updatedLists = [...lists];

      updatedLists.unshift(list);
      setCurrentList(list);
      setLists(updatedLists);

      if (isFirstList) setIsFirstList(false);

      return list;
    } catch (err) {
      console.log(err);
      throw Error("Erro ao criar lista");
    }
  };

  const finalizeList = async (): Promise<void> => {
    const response = await api.put(`/lists/${currentList?.id}`, {
      is_status: 2,
    });

    console.log("Updated list:", response);

    setCurrentList(response.data);
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
