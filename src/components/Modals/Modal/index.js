//react
import React from "react";
import styles from "./style.module.scss";

export default function Modal({title}) {
    return (
        <div className={styles.ModalContainer}>
            <div className={styles.ModalTop}></div>

            <div className={styles.ModalContent}>
                <p className={styles.ModalTitle}>{title}</p>
                <div className={styles.ModalBtnBox}>
                    <p>예</p>
                    <p>아니오</p>
                </div>
            </div>
        </div>
    );
}
