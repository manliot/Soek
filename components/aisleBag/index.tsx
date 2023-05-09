import { AisleDB } from '@/types/Aisle.interface'
import styles from './styles.module.css'

export function AisleBag({ aisle }: { aisle: AisleDB }) {
  return (
    <div className={styles.container}>
      <div className={styles.aisleNumber}>
        <p>Pasillo</p>
        <p>#{aisle.aisleNumber}</p>
      </div>
      <div className={styles.aisleName}>
        <p>{aisle.name.split(':')[1]}</p>
      </div>
    </div>
  )
}
