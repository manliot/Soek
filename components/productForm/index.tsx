import { useState } from "react";
import { InputText } from "@/components/inputTxt";
import { ProductForm, ProductFormProps, Product } from "../../types/Product.interface";
import styles from './productForm.module.css'



export function ProductForm({ product, disabledInputs, action, onSubmitAction }: ProductFormProps) {
  const emptyProduct: Product = {
    id: '',
    name: '',
    brand: '',
    price: 0,
    aisle: '',
    url_img: '',
  }
  const initialState = product
    ? product
    : emptyProduct;
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = (fieldName: keyof ProductForm, value: string | number) => {
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
          ? <InputText
            name="name"
            placeholder="Nombre del producto"
            value={formValues.name}
            options={options}
            disabled={disabledInputs?.includes('name') || false}
            onChange={(value: string | number) => handleInputChange('name', value)}
          />
          : <InputText
            name="name"
            placeholder="Nombre del producto"
            value={formValues.name}
            disabled={disabledInputs?.includes('name') || false}
            onChange={(value: string | number) => handleInputChange('name', value)}
          />}
        <InputText
          name="brand"
          placeholder="Nombre de la marca"
          disabled={disabledInputs?.includes('brand') || false}
          value={formValues.brand}
          onChange={(value: string | number) => handleInputChange('brand', value)}
        />
        <InputText
          name="price"
          disabled={disabledInputs?.includes('price') || false}
          placeholder="Precio del producto"
          value={formValues.price}
          onChange={(value: string | number) => handleInputChange('price', value)}
        />
        <InputText
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
        <InputText
          name="url_img"
          placeholder="url de la imagen"
          disabled={disabledInputs?.includes('url_img') || false}
          value={formValues.price}
          onChange={(value: string | number) => handleInputChange('url_img', value)}
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
