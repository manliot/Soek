import { ProductForm } from "../productForm";


export function AddProduct() {
  const handleSubmit = (data) => {
    console.log('add', data);
  }
  return (
    <ProductForm
      action="add"
      onSubmitAction={handleSubmit}
    />
  )
}
