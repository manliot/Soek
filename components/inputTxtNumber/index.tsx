import { ChangeEvent } from 'react'
import styles from './inputTxt.module.css'

interface InputTextProps {
  type: string;
  name: string;
  placeholder: string;
  value: string | number;
  options?: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function InputTextNumber({ type, name, value, placeholder, options, disabled = false, onChange }: InputTextProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(event.target.value);
  };
  return (
    <>
      {options
        ? (
          <select
            className={styles.formItem}
            name={name}
            value={value}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="" selected>{placeholder}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
        : (
          <input
            className={styles.formItem}
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
    </>
  )
}
