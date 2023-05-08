import Image from "next/image"
import styles from './styles.module.css'
import { useNavigation } from "@/hooks/useNavigation"


export function ShowAllAisles() {
  const { navigateTo } = useNavigation()

  const handleClick = () => {
    navigateTo('/aisles')
  }

  return (
    <div
      className={styles.container}
      onClick={handleClick}
    >
      <div
        className={styles.txt}
      >
        Ver todos los Pasillos
      </div>
      <Image
        src={require('@/assets/png/showAllAisles.png')}
        width={40}
        height={40}
        alt={`Boton para ver todos los pasillos`}
      />
    </div>
  )
}
