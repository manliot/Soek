import styles from './styles.module.css'
import Link from 'next/link'

export function Credits() {
  return (
    <div className={styles.container}>
      <span>Hecho con ❤️ por <Link href={'https://www.instagram.com/manliotgda/'}>Manlio Tejeda</Link></span>
    </div>
  )
}
