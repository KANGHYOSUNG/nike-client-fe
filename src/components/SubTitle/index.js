//react
import React from "react";
import styles from './style.module.scss';

//css

export default function SubTitle({titleA,titleB,titleC,text,custom}) {

  return (
    <div className={custom ? styles.SubTitleCustomContainer : styles.SubTitleContainer}>
      <div>
          <h2>
            {titleA?<p className={styles.SubTitleA}>{titleA}</p>:null}
            {titleB?<p className={styles.SubTitleB}>{titleB}</p>:null}
            {titleC?<p className={styles.SubTitleC}>{titleC}</p>:null}
          </h2>
          <p className={styles.SubText}>{text}</p>
      </div>
  </div>
  );
}
