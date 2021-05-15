import { createContext, ReactNode, useContext, useState } from "react";

import { List } from "../interfaces";

interface ListsProviderProps {
  children: ReactNode;
}

interface ListsContextData {
  currentList: List;
}

const ListsContext = createContext<ListsContextData>({} as ListsContextData);

export function ListsProvider({ children }: ListsProviderProps) {
  const [currentList, setCurrentList] = useState<List>({} as List);

  return (
    <ListsContext.Provider value={{ currentList }}>
      {children}
    </ListsContext.Provider>
  );
}

export function useLists() {
  const context = useContext(ListsContext);

  return context;
}
