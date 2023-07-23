import React from "react";
import { Img } from "resources/image";
import styles from './style.module.scss';

function BackButton() {
  return (
    <div className={styles.BackButtonContainer}>
      <img src={Img.backArr} alt="뒤로 가기" />
    </div>
  );
}

export default BackButton;
