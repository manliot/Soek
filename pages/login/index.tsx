import { useState } from 'react'
import styles from "./Login.module.css";
import { CardModal } from "@/components/cardModal";
import Image from "next/image";
import { GoogleIcon } from "../../assets/svg/GoogleIcon";
import { LoginWithGoogle, Logout } from "../../services/firebase/googleAuth";
import { useNavigation } from '../../customHooks/navigation'

import { useUser } from "../../customHooks/useUser";

export default function Login() {
  const { navigateTo, navigateBack } = useNavigation()
  const [showFrom, setshowFrom] = useState(true)
  const user = useUser()

  const handleLoginClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    LoginWithGoogle()
      .then(res => {
        navigateTo('/home')
      })
  }

  const handleLogoutClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    Logout()
      .then(res => {
        navigateTo('/home')
      })
  }

  const onCancel = () => {
    navigateBack()
  }

  return (
    <>
      <main className={styles.mainContainer}>
        <CardModal orientation="vertical" btnIcon="back" show={showFrom} changeShow={onCancel}>
          {!user?.uid
            //case user is not logged in (show login)
            ? <div className={styles.modalLogin}>
              <Image
                src={require('../../assets/png/Logo-circular-SOEK.png')}
                alt="Logo SOEK"
                width={123}
              />
              <p><strong>Realiza tus compras y selección de productos de manera facil y eficiente</strong></p>
              <button onClick={handleLoginClick}>
                <GoogleIcon width={25} height={25} />
                <p>   Continua con Google</p>
              </button>
            </div>

            //case user is logged in (show logout)
            : <div className={styles.modalLogout}>
              <p>{user.displayName}, </p>
              <p><strong>Esta seguro que desea cerrar sesion?</strong></p>
              <div className={styles.btnLogout}>
                <button
                  className={styles.btnCancel}
                  onClick={onCancel}
                >
                  <p><strong>Cancelar</strong></p>
                </button>
                <button
                  className={styles.btnAccept}
                  onClick={handleLogoutClick}
                >
                  <p><strong>Aceptar</strong></p>
                </button>
              </div>
            </div>
          }
        </CardModal>
      </main>
    </>
  )
}
