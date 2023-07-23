import React from "react";
import { Header, QrContents } from "components";
import styles from './style.module.scss';


function QrPage() {
  return (
    <div className={styles.Container}>
      <Header back={true} price={true} step={true} total={[1,2,3,4,5,6]} status={1} />

      <div className={styles.ContentFull}>
        <QrContents />
      </div>

    </div>
  );
}

export default QrPage;
