import { ProductForm } from "../productForm";
import { addProduct } from "../../services/firebase/products";
import { ProductToAdd } from "../../types/Product.interface";


export function AddProduct() {
  const handleSubmit = (data: ProductToAdd) => {
    data.price = Number(data.price)
    addProduct(data)
  }
  return (
    <ProductForm
      action="add"
      onSubmitAction={handleSubmit}
    />
  )
}
