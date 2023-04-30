import { useState } from "react";
import { InputTextNumber } from "@/components/inputTxtNumber";
import { ProductForm, ProductFormProps, Product, ProductToAdd } from "../../types/Product.interface";
import styles from './productForm.module.css'
import { InputImg } from "../inputImg";



export function ProductForm({ product, disabledInputs, action, onSubmitAction }: ProductFormProps) {
  const emptyProduct: ProductToAdd = {
    name: '',
    brand: '',
    price: '',
    aisle: '',
    url_img: '',
    file_img: {} as File,
  }
  const initialState = product
    ? product
    : emptyProduct;
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = (fieldName: keyof ProductForm, value: string | number | File) => {
    setFormValues({
      ...formValues,
      [fieldName]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitAction(formValues);
  };

  const options = ['Frutas', 'Verduras', 'Lácteos', 'Carnes'];

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <div
        className={`${styles.left} ${styles.column}`}
      >
        {action === 'update' || action === 'delete'
          ? <InputTextNumber
            type='text'
            name="name"
            placeholder="Nombre del producto"
            value={formValues.name}
            options={options}
            disabled={disabledInputs?.includes('name') || false}
            onChange={(value: string | number) => handleInputChange('name', value)}
          />
          : <InputTextNumber
            type='text'
            name="name"
            placeholder="Nombre del producto"
            value={formValues.name}
            disabled={disabledInputs?.includes('name') || false}
            onChange={(value: string | number) => handleInputChange('name', value)}
          />}
        <InputTextNumber
          type='text'
          name="brand"
          placeholder="Nombre de la marca"
          disabled={disabledInputs?.includes('brand') || false}
          value={formValues.brand}
          onChange={(value: string | number) => handleInputChange('brand', value)}
        />
        <InputTextNumber
          type='number'
          name="price"
          disabled={disabledInputs?.includes('price') || false}
          placeholder="Precio del producto"
          value={formValues.price}
          onChange={(value: string | number) => handleInputChange('price', value)}
        />
        <InputTextNumber
          type='text'
          name="aisle"
          disabled={disabledInputs?.includes('aisle') || false}
          placeholder="Nombre del pasillo"
          value={formValues.aisle}
          options={options}
          onChange={(value: string | number) => handleInputChange('aisle', value)}
        />
      </div>
      <div
        className={`${styles.right} ${styles.column}`}
      >
        <InputImg
          disabled={disabledInputs?.includes('url_img') || false}
          value={formValues.url_img}
          onChange={(value: File) => handleInputChange('file_img', value)}
        />
      </div>
      <div
        className={styles.btn}
      >
        <button type="submit">Guardar</button>
      </div>
    </form>
  )
}
