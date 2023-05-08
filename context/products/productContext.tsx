import { createContext, useState, useContext, ReactNode } from "react";
import { Product } from "@/types/Product.interface";
import { useAisleContext } from "../aisles/aislesContext";
const initialFilters = {
  nameFilter: '',
}

export const ProductContext = createContext({} as ProductContextProps)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setfilter] = useState<FilterInterface>(initialFilters);
  const { datafilteredAisles } = useAisleContext();

  const getFilteredProducts = (): Product[] => {
    let filterProducts: Product[] = products.slice()
    if (filter.nameFilter !== '') {
      filterProducts = filterProducts.filter((product: Product) => {
        return product.name.toLowerCase().includes(filter.nameFilter.toLowerCase()) || product.brand.toLowerCase().includes(filter.nameFilter.toLowerCase())
      })
    }
    if (datafilteredAisles.length > 0) {
      const aislesIds: string[] = datafilteredAisles.map((aisle) => aisle.id)
      filterProducts = filterProducts.filter((product: Product) => aislesIds.includes(product.aisle))
    }
    return filterProducts
  }

  return (
    <ProductContext.Provider value={{
      dataProducts: products,
      updateProductState: (newStatus: Product[]) => {
        setProducts(newStatus);
      },
      datafilter: filter,
      updateFilterState: (newStatus: FilterInterface) => {
        setfilter(newStatus);
      },
      getFilteredProducts: () => getFilteredProducts(),
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}

interface ProductContextProps {
  dataProducts: Product[];
  updateProductState: (newStatus: Product[]) => void;
  datafilter: FilterInterface;
  updateFilterState: (newStatus: FilterInterface) => void;
  getFilteredProducts: () => Product[];
}
interface FilterInterface {
  nameFilter: string;
}