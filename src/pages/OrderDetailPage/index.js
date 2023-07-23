import React from "react";
import { Header, OrderDetailContents } from "components";
import styles from './style.module.scss';

function OrderDetailPage() {
  return (
    <div className={styles.Container}>
      <Header back={true} price={false}/>
      <div className={styles.ContentInner}>
        <OrderDetailContents />
      </div>
    </div>
  );
}

export default OrderDetailPage;
