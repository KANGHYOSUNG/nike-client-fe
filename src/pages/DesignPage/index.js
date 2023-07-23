import React  from "react";
import { Header, DesignContents } from "components";
import styles from './style.module.scss';

function DesignPage() {
  return (
    <div className={styles.Container}>
    <Header back={true} price={true} step={true} total={[1,2,3]} status={2} />
      
      <div className={styles.ContentFull}>
        <DesignContents />
      </div>
    </div>
  );
}

export default DesignPage;
