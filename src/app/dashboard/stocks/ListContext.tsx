/**Author: Olexiy Prokhvatylo B00847680 */
'use client'

import { createContext, useState } from "react";

type ListContextType = {
  state: number,
  setState: React.Dispatch<React.SetStateAction<number>>
}

const iListContextState = {
  state: 0,
  setState: () => undefined
}

export const ListContext = createContext<ListContextType>(iListContextState)

export default function ListContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<number>(0);

  return (
    <ListContext.Provider value={{ state, setState }}>
      {children}
    </ListContext.Provider>
  );
}
