import { ChangeEvent } from 'react'
import styles from './inputTxt.module.css'

interface InputTextProps {
  name: string;
  placeholder: string;
  value: string | number;
  options?: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function InputText({ name, value, placeholder, options, disabled = false, onChange }: InputTextProps) {
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
            disabled={disabled}
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
            disabled={disabled}
          />
        )}
    </div>
  )
}
