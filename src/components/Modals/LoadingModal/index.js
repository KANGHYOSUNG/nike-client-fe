import React from 'react';
import styles from './style.module.scss'
import {MainMenu} from 'components';

// img
import IconLoading from 'resources/icon/icon_loading.svg'


function LoadingModal({loadStep}) {

    return (
        <div className={styles.LoadingModalWrap}>
            <div className={styles.LoadingContent}>
                <MainMenu>
                    <div className={styles.LoadingBox}>
                        <h3>LOADING...</h3>
                        <div>
                            {/* 19개가 끝! */}
                            {
                                loadStep.map((i)=>{
                                    return(
                                        <img src={IconLoading} alt="loading" key={"loading bar" + i}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </MainMenu>
            </div>
        </div>
    );
}

export default LoadingModal;