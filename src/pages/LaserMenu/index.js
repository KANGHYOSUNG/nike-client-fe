import React from "react";
import { Header, LaserMenuContents } from "components";
import styles from './style.module.scss';

function LaserMenuPage() {
  return (
    <div className={styles.Container}>
      <Header back={true} price={true}/>
      
      <div className={styles.ContentInner}>
        <LaserMenuContents />
      </div>

    </div>
  );
}

export default LaserMenuPage;
