import React from "react";
import {SubTitle} from 'components';
import styles from './style.module.scss'


function PriceContents() {

  return (
    <div className={styles.Container}>
        <SubTitle titleA={"SERVICE"} titleC={"PRICE"} text={"서비스 가격표"}/>

        <div className={styles.PriceWrapper}>
            <i className={styles.BorderBox}></i>
            <i className={styles.BorderBox}></i>
            <i className={styles.BorderBox}></i>
            <i className={styles.BorderBox}></i>


            <div className={styles.PriceBox}>
                <div className={styles.PriceLineTitle}>
                    <p>PRODUCT</p>
                </div>

                <div className={styles.PriceRow}>
                    <div className={styles.PriceTitleBox}>
                        <p>ECO BAG</p>
                        <p>에코백</p>
                    </div>
                    <div className={styles.Price}><p><span></span>35,000 원</p></div>
                </div>

                <div className={styles.PriceRow} >
                    <div className={styles.PriceTitleBox}>
                        <p>LONG SLEEVE SHIRT</p>
                        <p>블랭크 긴팔</p>
                    </div>
                    <div className={styles.Price}><p><span></span>69,000 원</p></div>
                </div>

                <div className={styles.PriceRow} style={{borderBottom: '0'}}>
                    <div className={styles.PriceTitleBox}>
                        <p>T-SHIRTS</p>
                        <p>블랭크 반팔</p>
                    </div>
                    <div className={styles.Price}><p><span></span>29,000 원</p></div>
                </div>

                <div className={styles.PriceLineTitle}>
                    <p>CUSTOM SERVICE</p>
                </div>

                <div className={styles.PriceRow}>
                    <div className={styles.PriceTitleBox}>
                        <p>DIGITAL PRINT</p>
                        <p>디지털 프린트</p>
                    </div>
                    <div className={styles.Price}><p><span>(1면 기준) </span>15,000 원</p></div>
                </div>

                {/*<div className={styles.PriceRow}>*/}
                {/*    <div className={styles.PriceTitleBox}>*/}
                {/*        <p>HAND JET PRINT</p>*/}
                {/*        <p>핸드젯 프린트</p>*/}
                {/*    </div>*/}
                {/*    <div className={styles.Price}><p><span>(3회) </span>3,000 원</p></div>*/}
                {/*</div>*/}

                {/*<div className={styles.PriceRow}>*/}
                {/*    <div className={styles.PriceTitleBox}>*/}
                {/*        <p>EMBROIDERY</p>*/}
                {/*        <p>자수</p>*/}
                {/*    </div>*/}
                {/*    <div className={styles.Price}><p><span></span>3,000 원</p></div>*/}
                {/*</div>*/}


            </div>
        </div>
    </div>
  );
}

export default PriceContents;
