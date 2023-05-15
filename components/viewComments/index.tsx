import { useSidebarContext } from '@/context/sidebar/sideBarContext'
import React from 'react'
import styles from './styles.module.css'
import Image from 'next/image'

export function ViewComments() {
  const { comments } = useSidebarContext()
  return (

    <div className={styles.container}>
      <h2>Buzón de Sugerencias</h2>
      {comments.map(comment => {
        return (
          <div
            key={comment.createdAt}
            className={styles.card}
          >
            <div className={styles.header}>
              <Image
                src={comment.photoUrl ? comment.photoUrl : require('../../assets/png/emptyUser.png')}
                alt="Foto de perfil"
                width={50}
                height={50}
                style={{ borderRadius: '50%' }}
              />
              <div>
                <strong>{comment.userName ? comment.userName : 'Anónimo'}</strong>
                <p className={styles.date}> publicado {comment.createdAt ? comment.createdAt : 'Anónimo'}</p>
              </div>
            </div>
            <div
              className={styles.content}>
              {comment.comment}
            </div>
          </div>


        )
      })}
    </div>
  )
}
