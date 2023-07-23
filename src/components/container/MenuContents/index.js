import React from "react";
import {useNavigate} from 'react-router-dom';
import {MainMenu} from 'components';
import styles from './style.module.scss'
import {routeInfo} from 'constants';

// component
import {BorderLayoutBox} from 'components';

// img
import MainLogo from 'resources/icon/main_logo.svg'


function MenuContents() {
    const navigate = useNavigate()

    const LinkClick = (path) => {
        return navigate(path);
    }

    return (
        <div className={styles.MainContainerWrap}>
            <div className={styles.MenuWrapper}>
                <img src={MainLogo} alt="logo" className={styles.Logo}/>
                <div className={styles.StartTextBox}>
                    <BorderLayoutBox>
                        <p>원하시는 서비스를 선택해주세요.</p>
                    </BorderLayoutBox>
                </div>

                {
                    (routeInfo || []).map((value, index) => {
                        return (
                            <div className={styles.MenuTextWrap} onClick={() => {
                                LinkClick(value.path)
                            }}>
                                <MainMenu>
                                    <div className={styles.MenuTextBox}>
                                        <p className={styles.MenuTitle}>{value.title}</p>
                                        <p className={styles.MenuText}>{value.text}</p>
                                    </div>
                                </MainMenu>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default MenuContents;
