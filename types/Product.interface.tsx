export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number | string;
  aisle: string;
  url_img: string;
  aisleName: string;
}

export interface BagProduct {
  product: Product;
  quantity: number;
}

export interface ProductToAdd {
  name: string;
  brand: string;
  price: number | string;
  aisle: string;
  url_img: string;
  file_img: File;
}

export interface ProductForm extends Omit<ProductToAdd, 'id'> { }

export interface ProductFormProps {
  product?: ProductToAdd;
  disabledInputs?: string[];
  action: 'add' | 'update' | 'delete';
  onSubmitAction: (data: ProductToAdd) => void;
}