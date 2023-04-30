import { useNavigation } from "../../customHooks/navigation";
import styles from "./CardModal.module.css";
import { Card } from "./CardModal.interface";

export function CardModal({ children, orientation = 'vertical', btnIcon = 'close', show = true, changeShow }: Card) {
  const { navigateBack } = useNavigation();
  const handleBtnClick = () => {
    btnIcon === 'back' ? navigateBack() : changeShow(false)
  }

  return (
    <div className={`${styles.overlay} ${!show ? styles.hide : ''}`}>
      <div className={`${styles.cardContainer} ${orientation === 'horizontal' ? styles.horizontalContainer : styles.verticalContainer}`}>
        <div className={styles.btnContainer}>
          <button onClick={handleBtnClick}>
            <span>
              {btnIcon === 'back' ? '<' : 'x'}
            </span>
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}
