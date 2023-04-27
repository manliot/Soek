import { ChangeEvent } from 'react'
import styles from './inputTxt.module.css'

interface InputTextProps {
  name: string;
  placeholder: string;
  value: string;
  options?: string[];
  onChange: (value: string) => void;
}

export function InputText({ name, value, placeholder, options, onChange }: InputTextProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(event.target.value);
  };
  return (
    <div>
      {options
        ? (
          <select
            className={styles.formItem}
            name={name}
            value={value}
            onChange={handleChange}
          >
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
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
          />
        )}
    </div>
  )
}
