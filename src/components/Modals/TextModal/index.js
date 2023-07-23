//react
import React from "react";
import styles from "./style.module.scss";

export default function FinishModal({modalOption,setModalOption}) {
    return (
        modalOption.show &&
        <div className={styles.ModalContainer}>
            <div className={styles.ModalTop}></div>

            <div className={styles.ModalContent}>
                <div className={styles.ModalInner}>
                    <p className={styles.FinishModalTitle}>{modalOption.description}</p>
                </div>
                <div className={styles.ModalFinishBtnBox} onClick={()=>{ setModalOption({show:false}); }}>
                    <p>확인</p>
                </div>
            </div>
        </div>
    );
}
