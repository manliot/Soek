import { Product } from "../../types/Product.interface";
import { AisleDB } from "../../types/Aisle.interface";
export interface HomeProps {
  products: Product[],
  aisles: AisleDB[]
}