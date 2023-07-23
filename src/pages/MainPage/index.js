import React from "react";
import { useNavigate } from 'react-router-dom';
import { BorderLayoutBox } from "components";
import styles from './style.module.scss';

// img
import MainLogo from 'resources/icon/main_logo.svg'
import MainImage from 'resources/icon/main_start_bg.svg'
import ColorBar from 'resources/icon/icon_color_bar.svg'

function MainPage() {

  const navigate = useNavigate()
  const LinkClick = () => {
    return navigate('/privacy'); 
  }

  return (
    <div className={styles.MainContainer}>
        <div className={styles.MainWrap}>
            <div className={styles.MainSection}>
                <img src={ColorBar} alt="ColorBar" className={styles.ColorBar}/>
                <img src={MainLogo} alt="logo" className={styles.Logo}/>
                <div className={styles.StartTextBox}>
                    <p>나이키 스타일 홍대의<br/>커스텀 서비스를 경험해보세요</p>
                </div>
            
                <div className={styles.StartSection}>
                    <img src={MainImage} alt="" />
                    <p onClick={LinkClick}>START</p>
                </div>

            </div>
        </div>  
    </div>
  );
}

export default MainPage;
