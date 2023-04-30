import { createContext, useState, useContext, ReactNode } from "react";
import { AisleDB } from "@/types/Aisle.interface";

interface AisleContextProps {
  dataAisles: AisleDB[];
  updateAislesStatus: (newStatus: AisleDB[]) => void;
}

export const AisleContext = createContext({} as AisleContextProps)

export const AisleProvider = ({ children }: { children: ReactNode }) => {
  const [aisles, setAisles] = useState<AisleDB[]>([]);

  return (
    <AisleContext.Provider value={{
      dataAisles: aisles,
      updateAislesStatus: (newStatus: AisleDB[]) => {
        setAisles(newStatus);
      },
    }}>
      {children}
    </AisleContext.Provider>
  );
}

export function useAisleContext() {
  return useContext(AisleContext);
}
