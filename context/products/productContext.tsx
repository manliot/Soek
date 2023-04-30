import { createContext, useState, useContext , ReactNode} from "react";
import { Product, BagProduct } from "@/types/Product.interface";

interface ProductContextProps {
  dataProducts: Product[];
  dataBagProducts: BagProduct[];
  updateProductStatus: (newStatus: Product[]) => void;
  updateBagProductStatus: (newStatus: BagProduct[]) => void;
}

export const ProductContext = createContext({} as ProductContextProps)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [bagProducts, setBagProducts] = useState<BagProduct[]>([]);

  return (
    <ProductContext.Provider value={{
      dataProducts: products,
      dataBagProducts: bagProducts,
      updateProductStatus: (newStatus: Product[]) => {
        setProducts(newStatus);
      },
      updateBagProductStatus: (newStatus: BagProduct[]) => {
        setBagProducts(newStatus);
      },
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}
