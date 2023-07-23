import React from "react";
import { Header, PriceContents } from "components";
import styles from './style.module.scss';

function PricePage() {
  return (
    <div className={styles.Container}>
      <Header back={true} price={false}/>

      <div className={styles.ContentInner}>
        <PriceContents />
      </div>

    </div>
  );
}

export default PricePage;
