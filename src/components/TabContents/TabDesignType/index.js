import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar } from "swiper/core";
import "swiper/swiper-bundle.css";
import "swiper/components/scrollbar/scrollbar.min.css";

import styles from '../style.module.scss'
import usePreListState from 'hooks/usePreListState';

SwiperCore.use([Scrollbar]);


function TabDesignType({ list,addImage,type }) {

    return (
        <div className={styles.TabWrap}>
            <div className={styles.TabBtnBox}>
                <div className={styles.TabBtn}>
                    <p>NBY PRE-SET DESIGN</p>
                    {/* <p>NBY 프리 디자인</p> */}
                </div>
            </div>

            <div className={styles.TabArea}>
                <div className={styles.PreBox} style={{paddingLeft:"24px"}}>
                    {
                        list && list.length > 0 &&
                        <Swiper
                            className={styles.SwiperWrap}
                            spaceBetween={10}
                            slidesPerView={6.8}
                            direction={'vertical'}
                            scrollbar={{ draggable: true, dragSize: 40 }}
                        >
                        {
                            list && list.map((value, index) => {
                                return (
                                    <SwiperSlide key={index + 'NBY 프리 디자인'}>
                                        <div className={styles.SlideImgBox} >
                                            <img onClick={(e)=>{ addImage(e.target,value,true,type === "laser_pre" ? true : false);}} src={value.img} alt="NBY 프리 디자인 이미지" />
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                        </Swiper>
                    }
                </div>
            </div>
        </div>
    );
}

export default TabDesignType;