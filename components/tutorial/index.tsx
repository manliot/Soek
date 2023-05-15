import { useState } from "react";
import { InfoIcon } from "@/assets/svg/InfoIcon";
import { CardModal } from '../cardModal';
import { FloatButton } from "../floatButton";
import styles from './styles.module.css';
import ReactPlayer from "react-player/youtube";

export default function Tutorial() {
  const [show, setShow] = useState(false)

  const onHandleClick = () => {
    setShow(true)
  }

  return (
    <>
      <FloatButton
        Icon={InfoIcon()}
        bottom={80}
        onHandleClick={onHandleClick}
        backgroundColor="#00CFFC" />

      <CardModal
        orientation='horizontal'
        changeShow={setShow}
        show={show}
      >
        <div className={styles.container}>
          <h2 className={styles.title}>Tutorial</h2>
          <ReactPlayer
            url={process.env.NEXT_PUBLIC_TUTORIAL_URL}
            width='100%'
            height='100%'
            controls={true}
          />
        </div>
      </CardModal>
    </>
  )
}
