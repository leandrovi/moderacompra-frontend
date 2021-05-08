import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { List } from "../interfaces";

interface ListsProviderProps {
  children: ReactNode;
}

interface ListsContextDate {
  lists: List[];
}

const ListsContext = createContext<ListsContextDate>({} as ListsContextDate);

// export function ListsProvider({ children }: ListsProviderProps) {
//   const [lists, setLists] = useState<List[]>([]);

//   useEffect(() => {
//     async function fetchLists() {

//     }
//   }, []);

//   return (
//     <ListsContext.Provider value={{  }}>
//       {children}
//     </ListsContext.Provider>
//   );
// }

export function useLists() {
  const context = useContext(ListsContext);

  return context;
}
