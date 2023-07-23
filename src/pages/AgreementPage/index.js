import React  from "react";
import { Header, AgreementContents } from "components";
import styles from './style.module.scss';

function AgreementPage() {
  return (
    <div className={styles.Container}>
    <Header back={true} price={false}/>

      <div className={styles.ContentFull}>
        <AgreementContents />
      </div>
      
    </div>
  );
}

export default AgreementPage;
