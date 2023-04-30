import { Product } from "../Product.interface";
import { AisleDB } from "../Aisle.interface";
export interface HomeProps {
  products: Product[],
  aisles: AisleDB[]
}