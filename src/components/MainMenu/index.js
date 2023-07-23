import React from 'react';
import styles from './style.module.scss'


function MainMenu({children}) {

    return (
        <div className={styles.MenuBox}>
            <div className={styles.MenuTitleBox}></div>
            {children}
        </div>
    );
}

export default MainMenu;