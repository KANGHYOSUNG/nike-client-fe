import React from "react";
import { Header, DrawingContents } from "components";
import styles from './style.module.scss';

function DrawingPage() {
  return (
    <div className={styles.Container}>
    <Header back={true} price={true} step={true} total={[1,2,3]} status={2} />
      
      <div className={styles.ContentFull}>
        <DrawingContents />
      </div>
    </div>
  );
}

export default DrawingPage;
