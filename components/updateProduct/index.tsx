import { ProductForm } from "../productForm";

export function UpdateProduct() {
  const handleSubmit = (data) => {
    console.log('update', data);
  }
  return (
    <ProductForm
      action="update"
      onSubmitAction={handleSubmit}
    />
  )
}
