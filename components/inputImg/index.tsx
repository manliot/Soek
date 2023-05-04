import { ChangeEvent, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from './inputImg.module.css'
import { ImportIcon } from '../../assets/svg/ImportIcon'

interface InputImgProps {
  value: string;
  disabled?: boolean;
  onChange: (value: File) => void;
}

export function InputImg({ value, disabled = false, onChange }: InputImgProps) {
  const [imgUrl, setImgUrl] = useState<string>(value)
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setImgUrl(value)
  }, [value])

  const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];
    const reader = new FileReader();
    if (reader && file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgUrl(reader.result as string);
        onChange(file);
      };
    }
  };
  return (
    <>
      <div
        className={styles.container}>
        <Image
          src={imgUrl ? imgUrl : require('../../assets/png/emptyImg.png')}
          className={styles.img}
          width={175}
          height={114}
          alt='product image'
          style={{ objectFit: 'contain' }}
        />
        <button
          type='button'
          className={`${styles.importBtn} ${disabled ? styles.disabledBtn : ''}`}
          onClick={() => { inputRef.current?.click() }}
          disabled={disabled}
        >
          <ImportIcon fill={'white'} />
          <p>Importar</p>
        </button>

        <input
          type="file"
          id="input-file"
          style={{ display: 'none' }}
          onChange={handleImgChange}
          ref={inputRef}
          accept="image/*"
        />
      </div>
    </>
  )
}
