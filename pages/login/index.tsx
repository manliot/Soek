import styles from "./Login.module.css";
import CardModal from "@/components/cardModal";
import Image from "next/image";
import GoogleIcon from "../../assets/svg/GoogleIcon";
import { LoginWithGoogle } from "../../services/firebase/googleAuth";
import { LoginUser } from "../../types/User.interface";
import { useNavigation } from '../../customHooks/navigation'

export default function Login() {
  const { navigateTo } = useNavigation()

  const handleLoginClick = async (e) => {
    e.preventDefault()
    const user: LoginUser = await LoginWithGoogle()
    navigateTo('/home')

    if (user)
      window.alert(`Bienvenido ${user.user.displayName} !`)
  }

  return (
    <>
      <main className={styles.mainContainer}>
        <CardModal orientation="vertical" btnIcon="close">
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
