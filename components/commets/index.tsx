import { useState } from "react";
import { FloatButton } from "@/components/floatButton";
import { CommentsIcon } from "@/assets/svg/CommentsIcon";
import { CardModal } from '../cardModal';
import styles from './styles.module.css';

export default function Comments() {
  const [show, setShow] = useState(false)
  const [comment, setComment] = useState('')

  const onHandleClick = () => {
    setShow(true)
  }

  return (
    <>
      <FloatButton
        Icon={CommentsIcon()}
        bottom={30}
        onHandleClick={onHandleClick}
      />
      <CardModal
        orientation='vertical'
        changeShow={setShow}
        show={show}
      >
        <div className={styles.container}>
          <h2 className={styles.title}>Buzón de sugerencias</h2>
          <textarea
            className={styles.textarea}
            placeholder="Escribe aquí tu sugerencia"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className={styles.btn}>Enviar</button>
        </div>
      </CardModal>
    </>
  )
}
