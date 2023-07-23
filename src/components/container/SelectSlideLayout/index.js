import React from 'react';
import styles from './style.module.scss'
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/swiper-bundle.css";
import {SubTitle} from 'components';

// img
// import GuideImage from 'resources/image/gide_img.png'

function SelectSlideLayout({type, titleA, titleB, titleC, text, updateActiveItem, border, products}) {
    const borderStyle = {border: "none"}

    return (
        <div className={styles.Container}>
            {
                titleA &&
                <SubTitle titleA={titleA} titleB={titleB} titleC={titleC} text={text}/>
            }
            <div className={styles.SlideWrap}>
                <Swiper 
                    slide 
                    spaceBetween={90} 
                    centeredSlides={true} 
                    slidesPerView={1.5} 
                    onSlideChange={(e)=>{ 
                        updateActiveItem(products[e.activeIndex]);
                    }}>
                    {
                        products && products.map((productItem, index) => {

                            return (
                                <SwiperSlide
                                    key={index + 'product item list'}
                                    onClick={() => updateActiveItem(productItem)}
                                >
                                    <div className={styles.SelectBox} style={border ? null : borderStyle}>
                                        <img src={productItem.thumbnail} style={type === "laser" || type === "laser_pre" ? { width:250 } : null} alt=""/>
                                        <i className={styles.BorderBox}></i>
                                        <i className={styles.BorderBox}></i>
                                        <i className={styles.BorderBox}></i>
                                        <i className={styles.BorderBox}></i>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    );
}

export default SelectSlideLayout;