import { createContext, useState, useContext, ReactNode } from "react";
import { AisleDB } from "@/types/Aisle.interface";

export const AisleContext = createContext({} as AisleContextProps)

export const AisleProvider = ({ children }: { children: ReactNode }) => {
  const [aisles, setAisles] = useState<AisleDB[]>([]);
  const [filteredAisles, setfilteredAisles] = useState<AisleDB[]>([]);

  const updateFilteredAisles = (aisle: AisleDB) => {
    const aisleFinded = filteredAisles.find((aisleFiltered: AisleDB) => aisleFiltered.id === aisle.id)

    aisleFinded
      ? setfilteredAisles(filteredAisles.filter((aisleFiltered: AisleDB) => aisleFiltered.id !== aisle.id))
      : setfilteredAisles([aisle, ...filteredAisles])
  }

  const resetFilteredAisles = () => {
    setfilteredAisles([])
  }

  const getAislesList = (): (AisleDB & { filtered: boolean })[] => {
    const filteredAislesIds: string[] = []

    //first insert filter aisles
    const aislesList: (AisleDB & { filtered: boolean })[] = filteredAisles.map((aisle: AisleDB) => {
      filteredAislesIds.push(aisle.id)
      return { ...aisle, filtered: true }
    });

    //then insert the rest of aisles but first we need to order by aisleNumber
    aisles.sort((a: AisleDB, b: AisleDB) => a.aisleNumber - b.aisleNumber)
    aisles.forEach((aisle: AisleDB) => {
      if (!filteredAislesIds.includes(aisle.id)) {
        aislesList.push({ ...aisle, filtered: false })
      }
    })

    return aislesList
  }

  return (
    <AisleContext.Provider value={{
      dataAisles: aisles,
      updateAislesStatus: (newStatus: AisleDB[]) => {
        setAisles(newStatus);
      },
      datafilteredAisles: filteredAisles,
      updateFilteredAisles: (aisle: AisleDB) => updateFilteredAisles(aisle),
      getAislesList: () => getAislesList(),
      resetFilteredAisles: () => resetFilteredAisles(),
    }}>
      {children}
    </AisleContext.Provider>
  );
}

export function useAisleContext() {
  return useContext(AisleContext);
}

interface AisleContextProps {
  dataAisles: AisleDB[];
  updateAislesStatus: (newStatus: AisleDB[]) => void;
  datafilteredAisles: AisleDB[];
  updateFilteredAisles: (aisle: AisleDB) => void;
  getAislesList: () => (AisleDB & { filtered: boolean })[];
  resetFilteredAisles: () => void;
}