import { Product } from "../Product.interface";
import { AisleDB } from "../Aisle.interface";
import { Comment } from "../Comments.interface";
import { UserDB } from "../User.interface";
export interface HomeProps {
  products: Product[],
  aisles: AisleDB[]
  comments?: Comment[]
  users?: UserDB[]
}