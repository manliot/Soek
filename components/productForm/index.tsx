import { useState } from "react";
import { InputTextNumber } from "@/components/inputTxtNumber";
import { ProductForm, ProductFormProps, ProductToAdd } from "../../types/Product.interface";
import styles from './productForm.module.css'
import { InputImg } from "../inputImg";
import { useProductContext } from '@/context/products/productContext';
import { useAisleContext } from '@/context/aisles/aislesContext';
import { toastMessage } from "@/services/toast/toast";


export function ProductForm({ disabledInputs, action, onSubmitAction }: ProductFormProps) {
  const { dataProducts } = useProductContext();
  const { dataAisles } = useAisleContext();

  const emptyProduct: ProductToAdd = {
    name: '',
    brand: '',
    price: '',
    aisle: '',
    url_img: '',
  }
  const initialState = emptyProduct;
  const [formValues, setFormValues] = useState<ProductToAdd>(initialState);

  const handleInputChange = (fieldName: keyof ProductForm, value: string | number | File) => {
    setFormValues({
      ...formValues,
      [fieldName]: value
    });
  };

  const selectProduct = (id: string | number) => {
    const selectedProduct = dataProducts.find(product => product.id === id)

    if (selectProduct.length === 0) {
      toastMessage('error', 'No se encontró el producto, recuerde seleccionar solo un producto de la lista')
    } else {
      const product: ProductToAdd = {
        id: selectedProduct?.id || '',
        name: selectedProduct?.name || '',
        brand: selectedProduct?.brand || '',
        price: selectedProduct?.price || '',
        aisle: selectedProduct?.aisle || '',
        url_img: selectedProduct?.url_img || '',
      }
      setFormValues(product)
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((action === 'update' || action === 'delete') && !formValues.id) {
      toastMessage('error', 'No se ha seleccionado un producto')
    } else if (action === 'add' && formValues.file_img?.lastModified) {
      toastMessage('error', 'No se ha seleccionado una imagen')
    } else if (action !== 'add' && !formValues.url_img) {
      toastMessage('error', 'No se ha seleccionado una imagen')
    } else if (!formValues.name || !formValues.brand || !formValues.price || !formValues.aisle) {
      toastMessage('error', 'Debe seleccionar todos los campos')
    } else {
      onSubmitAction(formValues);
    }
  };

  return (
    <div className={styles.container}>
      {(action === 'update' || action === 'delete')
        && <InputTextNumber
          type='text'
          name="namefind"
          placeholder="Selecciona un producto"
          value={formValues.id || ''}
          options={
            dataProducts.map(product => {
              const option: { name: string, id: string } = { name: product.name, id: product.id }
              return option
            })
          }
          disabled={false}
          onChange={(value: string | number) => selectProduct(value)}
        />
      }

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <div
          className={`${styles.left} ${styles.column}`}
        >
          <InputTextNumber
            type='text'
            name="name"
            placeholder="Nombre del producto"
            value={formValues.name}
            disabled={disabledInputs?.includes('name') || false}
            onChange={(value: string | number) => handleInputChange('name', value)}
          />
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
            options={dataAisles.map(aisle => {
              const option: { name: string, id: string } = { name: aisle.name, id: aisle.id }
              return option
            })}
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
          <button
            type="submit"
            className={`${styles.button} ${action === 'delete' ? styles.deleteBtn : ''}`}
          >{HASH_BTN_TXT[action]}</button>
        </div>
      </form>
    </div>
  )
}

const HASH_BTN_TXT: { [key: string]: string } = {
  'update': 'Actualizar',
  'delete': 'Borrar',
  'add': 'Agregar',
}
