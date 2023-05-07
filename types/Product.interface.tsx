export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number | string;
  aisle: string;
  url_img: string;
  aisleName: string;
}

export interface ProductToAdd {
  id?: string;
  name: string;
  brand: string;
  price: number | string;
  aisle: string;
  url_img: string;
  file_img?: File;
}

export interface ProductForm extends Omit<ProductToAdd, 'id'> { }

export interface ProductFormProps {
  disabledInputs?: string[];
  action: 'add' | 'update' | 'delete';
  onSubmitAction: (data: ProductToAdd) => void;
}