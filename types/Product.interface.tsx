export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  aisle: string;
  url_img: string;
}

export interface ProductForm extends Omit<Product, 'id'> { }
export interface ProductFormProps {
  product?: Product;
  disabledInputs?: string[];
  action: 'add' | 'update' | 'delete';
  onSubmitAction: (data: Product) => void;
}