import { ProductForm } from "../productForm";
import { ProductToAdd } from "../../types/Product.interface";

export function UpdateProduct() {
  const handleSubmit = (data: ProductToAdd) => {
    console.log('update', data);
  }
  return (
    <ProductForm
      action="update"
      onSubmitAction={handleSubmit}
    />
  )
}
