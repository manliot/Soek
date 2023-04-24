import styles from "./CardModal.module.css";
import { Card } from "./CardModal.interface";
export default function CardModal({ children, orientation = 'vertical', btnIcon = 'close' }: Card) {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.cardContainer} ${orientation === 'horizontal' ? styles.horizontalContainer : styles.verticalContainer}`}>
        <div className={styles.btnContainer}>
          <button>
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
