import { ChangeEvent, useState, useRef } from 'react'
import Image from 'next/image'
import styles from './inputImg.module.css'
import ImportIcon from '../../assets/svg/ImportIcon'

interface InputImgProps {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function InputImg({ value, disabled = false, onChange }: InputImgProps) {
  const [imgUrl, setImgUrl] = useState<string>(value)
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();
    if (reader) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgUrl(reader.result as string);
        onChange(reader.result as string);
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
          className={styles.importBtn}
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
