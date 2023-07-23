import React from "react";
import { Header, PrivacyContents } from "components";
import styles from './style.module.scss';

function PrivacyPage() {
  return (
    <div className={styles.Container}>
    <Header back={true} price={false}/>

      <div className={styles.ContentFull}>
        <PrivacyContents />
      </div>

    </div>
  );
}

export default PrivacyPage;
