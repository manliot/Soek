import { useState } from 'react'
import styles from "./Login.module.css";
import CardModal from "@/components/cardModal";
import Image from "next/image";
import GoogleIcon from "../../assets/svg/GoogleIcon";
import { LoginWithGoogle } from "../../services/firebase/googleAuth";
import { toastMessage } from "../../services/toast/toast";
import { useNavigation } from '../../customHooks/navigation'

import { useUser } from "../../customHooks/useUser";

export default function Login() {
  const { navigateTo } = useNavigation()
  const [showFrom, setshowFrom] = useState(true)
  const user = useUser()

  const handleLoginClick = async (e) => {
    e.preventDefault()

    await LoginWithGoogle()
    navigateTo('/home')

    const toastOptions = {
      icon: '👋'
    }
    user
      ? toastMessage('success', `Bienvenid@ ${user.displayName} !`, toastOptions)
      : toastMessage('error', `No se pudo iniciar sesión`)
  }

  return (
    <>
      <main className={styles.mainContainer}>
        <CardModal orientation="vertical" btnIcon="back" show={showFrom} changeShow={(message) => { console.log(message) }}>
          <div className={styles.modalContent}>
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
        </CardModal>
      </main>
    </>
  )
}
