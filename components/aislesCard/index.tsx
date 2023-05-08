import Image from "next/image"
import { AisleDB } from "@/types/Aisle.interface"
import styles from './aislesCard.module.css'
import { useAisleContext } from "@/context/aisles/aislesContext"
import { useNavigation } from "@/hooks/useNavigation"

export function AislesCard(
  { aisle,
    type = 'all'
  }: { aisle: AisleDB & { filtered: boolean }, type: 'minimal' | 'all' }) {

  const { updateFilteredAisles } = useAisleContext()
  const { navigateTo } = useNavigation()
  const handleClick = async () => {
    if (type === 'all')
      await navigateTo('/home')
    updateFilteredAisles(aisle)
  }

  return (
    <div
      className={
        `${type === 'minimal' ? styles.containerMinimal : styles.container}
        ${aisle.filtered ? styles.filtered : ''}`
      }
      onClick={handleClick}
    >
      {type === 'all' && (
        <div className={styles.aisleNumberContainer}>
          <p>Pasillo</p>
          <p>#{aisle.aisleNumber}</p>
        </div>
      )}
      <div
        className={type === 'minimal' ? styles.aisleNameMinimal : styles.aisleName}
      >
        {aisle.name.split(":")[1]}
      </div>
      <Image
        src={aisle.urlPhoto}
        width={type === 'minimal' ? 40 : 50}
        height={type === 'minimal' ? 40 : 50}
        alt={`Aisle photo ${aisle.name.split(":")[1]}`}
      />
    </div>
  )
}
