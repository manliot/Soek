import { ProductForm } from "../productForm";

export function DeleteProduct() {
  const handleSubmit = (data) => {
    console.log('delete', data);
  }
  return (
    <ProductForm
      action="delete"
      onSubmitAction={handleSubmit}
      disabledInputs={['brand', 'price', 'aisle', 'url_img']}
    />
  )
}
