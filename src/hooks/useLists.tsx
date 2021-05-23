import React from "react";
import { createContext, ReactNode, useContext, useState } from "react";

import api from "../services/api";

import { List } from "../interfaces";

interface ListsProviderProps {
  children: ReactNode;
}

interface ListsContextData {
  newList: List;
  currentList: List | null;
  initializeNewList: (list: List) => void;
  setListsHistory: (offset?: number) => Promise<void>;
}

const ListsContext = createContext<ListsContextData>({} as ListsContextData);

export function ListsProvider({ children }: ListsProviderProps) {
  const [newList, setNewList] = useState<List>({} as List);
  const [currentList, setCurrentList] = useState<List | null>(null);
  const [lists, setLists] = useState<List[]>([]);

  const initializeNewList = (list: List) => {
    setNewList(list);
  };

  const setListsHistory = async (offset: number = 0) => {
    const params = `offset=${offset}&order=created_at,desc`;
    const response = await api.get(`/lists?${params}`);

    const { rows } = response.data;
    const count = rows.length;

    setLists(rows);

    if (count >= 0) {
      const mostRecentList = rows[0];
      setCurrentList(mostRecentList);
    }
  };

  return (
    <ListsContext.Provider
      value={{ newList, currentList, initializeNewList, setListsHistory }}
    >
      {children}
    </ListsContext.Provider>
  );
}

export function useLists() {
  const context = useContext(ListsContext);

  return context;
}
