import React from 'react';
import styles from './style.module.scss'
import {SubTitle} from 'components';


function SelectLayout({titleA,titleB,titleC,text,children,border,custom,isSelect}) {
    const borderStyle = {border :"none"}

    return (
        <div className={custom ? styles.CustomContainer : styles.Container}>
            {
                titleA &&
                <SubTitle titleA={titleA} titleB={titleB} titleC={titleC} text={text} custom={custom}/>
            }
            <div className={custom ? styles.CustomSelectBox : styles.SelectBox} style={border? null : borderStyle}>

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