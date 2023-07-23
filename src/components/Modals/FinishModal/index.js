//react
import React from "react";
import styles from "./style.module.scss";

export default function FinishModal({second,modalOption,setModalOption}) {
    return (
        modalOption.show &&
        <div className={styles.ModalContainer}>
            <div className={styles.ModalTop}></div>

            <div className={styles.ModalContent}>
                <div className={styles.ModalInner}>
                    <p className={styles.FinishModalTitle}>주문이 완료되었습니다</p>
                    <p className={styles.FinishModalTitle}>커스텀이 완료되면 <span>문자메시지로 알림</span>을 드립니다.</p>
                    <p className={styles.FinishModalTitle}><span>{second}</span>초 후 메인 페이지로 이동합니다.</p>
                </div>
                <div className={styles.ModalFinishBtnBox} onClick={()=>{ window.location.replace("/"); setModalOption({show:false}); }}>
                    <p>확인</p>
                </div>
            </div>
        </div>
    );
}
