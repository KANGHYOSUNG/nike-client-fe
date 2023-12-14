import React from 'react';
import styles from './style.module.scss'
import {SubTitle} from 'components';


function SelectLayout({titleA,titleB,titleC,text,children,border,custom,isQrPage}) {
    const borderStyle = {border :"none"}
    const marginStyle = isQrPage ? {margin : "0:0:0:auto"} : {margin : "0:0:0:auto"}
    // const marginStyle = isQrPage ? {marginRight : 70} : {margin : "0:0:0:auto"}
    // console.log("isQrPage", isQrPage)

    return (
        <div className={custom ? styles.CustomContainer : styles.Container}>
            {

                titleA &&
                <SubTitle titleA={titleA} titleB={titleB} titleC={titleC} text={text} custom={custom}/>
            }
            {/*<div className={custom ? styles.CustomSelectBox : styles.SelectBox} style={border ? null : borderStyle}>*/}
            <div className={custom ? styles.CustomSelectBox : styles.SelectBox} style={marginStyle}>

                {children}

                <i className={styles.BorderBox}></i>
                <i className={styles.BorderBox}></i>
                <i className={styles.BorderBox}></i>
                <i className={styles.BorderBox}></i>
            </div>
        </div>
    );
}

export default SelectLayout;