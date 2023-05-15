import { useState } from "react";
import { FloatButton } from "@/components/floatButton";
import { CommentsIcon } from "@/assets/svg/CommentsIcon";
import { CardModal } from '../cardModal';
import styles from './styles.module.css';
import { auth } from '@/services/firebase/client';
import { createComment } from "@/services/firebase/comments";
import { Comment } from "@/types/Comments.interface";
import { toastMessage } from "@/services/toast/toast";



export default function Comments() {
  const [show, setShow] = useState(false)
  const [comment, setComment] = useState<Comment>({
    createdAt: new Date().toJSON(),
    comment: ''
  })

  const onHandleClick = () => {
    setComment({
      uid: undefined,
      createdAt: new Date().toJSON(),
      userName: undefined,
      comment: '',
      photoUrl: undefined
    })
    setShow(true)
  }

  const onSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.comment) {
      toastMessage('error', 'No puedes enviar un comentario vacío')
      return
    }

    let commentToAdd: Comment = comment
    if (auth.currentUser) {
      commentToAdd = {
        uid: auth.currentUser?.uid || undefined,
        createdAt: new Date().toJSON(),
        userName: auth.currentUser?.displayName || undefined,
        comment: comment.comment,
        photoUrl: auth.currentUser?.photoURL || undefined
      }
    } else {
      commentToAdd = {
        createdAt: new Date().toJSON(),
        comment: comment.comment,
      }
    }
    setComment(commentToAdd)
    await createComment(commentToAdd)
    setShow(false)
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
        <form
          className={styles.container}
          onSubmit={onSubmitComment}
        >
          <h2 className={styles.title}>Buzón de sugerencias</h2>
          <textarea
            className={styles.textarea}
            placeholder="Escribe aquí tu sugerencia"
            value={comment.comment}
            onChange={(e) => setComment({ ...comment, comment: e.target.value })}
          />
          <button
            type='submit'
            className={styles.btn}
          >Enviar</button>
        </form>
      </CardModal>
    </>
  )
}
