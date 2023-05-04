import { ProductForm } from "../productForm";
import { ProductToAdd } from "../../types/Product.interface";
import { deleteProduct } from "../../services/firebase/products";

export function DeleteProduct() {
  const handleSubmit = (data: ProductToAdd) => {
    deleteProduct(data)
  }
  return (
    <ProductForm
      action="delete"
      onSubmitAction={handleSubmit}
      disabledInputs={['name', 'brand', 'price', 'aisle', 'url_img']}
    />
  )
}
