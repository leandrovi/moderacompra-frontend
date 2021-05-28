import React from "react";
import { createContext, ReactNode, useContext, useState } from "react";

import api from "../services/api";

import { List } from "../interfaces";

interface ListsProviderProps {
  children: ReactNode;
}

interface ListsContextData {
  newList: List;
  currentList: List;
  isFirstList: boolean;
  initializeNewList: () => void;
  setListsHistory: (offset?: number) => Promise<void>;
  createList: () => Promise<List>;
  finalizeList: () => Promise<void>;
}

const ListsContext = createContext<ListsContextData>({} as ListsContextData);

export function ListsProvider({ children }: ListsProviderProps) {
  const [newList, setNewList] = useState<List>({} as List);
  const [currentList, setCurrentList] = useState<List>({} as List);
  const [isFirstList, setIsFirstList] = useState(false);
  const [lists, setLists] = useState<List[]>([]);

  // Used to create empty lists before we post to the backend
  const initializeNewList = () => {
    setNewList({
      status: {
        description: "pendente",
      },
    });
  };

  const setListsHistory = async (offset: number = 0) => {
    const params = `offset=${offset}&order=created_at,desc`;
    const response = await api.get(`/lists?${params}`);

    const { rows } = response.data;
    const count = rows.length;

    setLists(rows);

    if (count > 0) {
      const mostRecentList: List = rows[0];

      if (mostRecentList.status.description !== "finalizada") {
        setCurrentList(mostRecentList);
      } else {
        setCurrentList({} as List);
      }

      setIsFirstList(false);
    } else {
      setIsFirstList(true);
    }
  };

  // Creates the list in the backend
  const createList = async (): Promise<List> => {
    try {
      const response = await api.post("/lists", {
        isFirstList,
      });

      const list = response.data;

      setCurrentList(list);
      setNewList({} as List);

      return list;
    } catch (err) {
      console.log(err);
      throw Error("Erro ao criar lista");
    }
  };

  const finalizeList = async (): Promise<void> => {
    await api.put(`/lists/${currentList.id}`, {
      is_status: 3,
    });

    setCurrentList({} as List);
  };

  return (
    <ListsContext.Provider
      value={{
        newList,
        currentList,
        isFirstList,
        initializeNewList,
        setListsHistory,
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
