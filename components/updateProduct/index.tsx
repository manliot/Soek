import { ProductForm } from "../productForm";
import { ProductToAdd } from "../../types/Product.interface";
import { updateProduct } from "../../services/firebase/products";

export function UpdateProduct() {
  const handleSubmit = (data: ProductToAdd) => {
    data.price = Number(data.price)
    updateProduct(data)
  }
  return (
    <ProductForm
      action="update"
      onSubmitAction={handleSubmit}
    />
  )
}
