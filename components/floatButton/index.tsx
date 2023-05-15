import styles from './styles.module.css'

export function FloatButton({ onHandleClick, Icon, bottom = 0, left = 0, backgroundColor = '#FC7300' }: FloatButtonProps) {
  return (
    <div
      className={styles.container}
      style={{ left: `${left}px`, bottom: `${bottom}px`, backgroundColor: `${backgroundColor}` }}
    >
      <button
        onClick={onHandleClick}
      >
        {Icon}
      </button>
    </div>
  )
}

interface FloatButtonProps {
  onHandleClick: () => void,
  Icon: JSX.Element,
  bottom?: number,
  left?: number,
  backgroundColor?: string
}
