import { ProductForm } from "../productForm";
import { ProductToAdd } from "../../types/Product.interface";

export function DeleteProduct() {
  const handleSubmit = (data: ProductToAdd) => {
    console.log('delete', data);
  }
  return (
    <ProductForm
      action="delete"
      onSubmitAction={handleSubmit}
      disabledInputs={['name', 'brand', 'price', 'aisle', 'url_img']}
    />
  )
}
