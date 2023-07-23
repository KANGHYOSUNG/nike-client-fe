import React from "react";
import {useNavigate} from 'react-router-dom';
import styles from './style.module.scss'

// component
import {BorderLayoutBox} from 'components';


// img
import MainLogo from 'resources/icon/main_logo.svg'
import MainImage from 'resources/image/main_image.png'

function MainContents() {
    const navigate = useNavigate()
    const LinkClick = () => {
        return navigate('/menu');
    }

    return (
        <div className={styles.MainContainerWrap}>
            <div className={styles.MenuWrapper}>
                <img src={MainLogo} alt="logo" className={styles.Logo}/>
                <div className={styles.StartTextBox}>
                    <p>나이키 바이 홍대<br/>커스텀 서비스를 경험해보세요.</p>
                </div>
                <div className={styles.StartSection} >
                    <img src={MainImage} alt=""/>
                    <p onClick={LinkClick}>START</p>
                </div>
            </div>
        </div>
    );
}

export default MainContents;
