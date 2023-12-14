import { useState, useEffect,useRef } from "react";
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar } from "swiper/core";
import { modalOpen } from 'utils/ModalFunctions';
import "swiper/swiper-bundle.css";
import "swiper/components/scrollbar/scrollbar.min.css";

import styles from '../style.module.scss'
import usePreListState from 'hooks/usePreListState';
import useHexColorGenerator from 'hooks/useHexColorGenerator';
import ColorPicker from 'components/ColorPicker'


// img
import PenImgTh from 'resources/icon/pen_type1.svg'
import PenImgNr from 'resources/icon/pen_type2.svg'
import PenImgBd from 'resources/icon/pen_type3.svg'
import ColorBtn from 'resources/icon/icon_colorBtn.svg'
import DrawLine from 'resources/icon/draw_line.svg'
import DrawLine1 from 'resources/icon/draw_line02.svg'
import DrawLine2 from 'resources/icon/draw_line03.svg'
import ColorLine from 'resources/icon/icon_color_line.svg'
import ColorUnActiveLine from 'resources/icon/icon_color_unactive_line.svg'


SwiperCore.use([Scrollbar]);


function TabDoubleType({ changePenType,lineWidth,setLineWidth,color,setColor,addImage,changeDrawMode,list }) {
    const { getHexToFilterCss } = useHexColorGenerator();
    
    const [penType, setPenType] = useState("pen");
    const [isColorPicker, setIsColorPicker] = useState(false);
    const [isTab, setIsTab] = useState(0);

    const lineRef = useRef();
    const circleRef = useRef();
    const lineSprayRef = useRef();
    const lineMarkerRef = useRef();
    // const list = usePreListState();

    const location = useLocation();
    const pageType = location.pathname.indexOf('QR') !== -1 ? "QR" : "PRINT";

    // console.log("page : ", pageType);
    const tabClick = (i) =>{
        setIsTab(i);
        changeDrawMode(i === 1);
    }

    useEffect(()=>{
        {
            pageType == "PRINT" &&
            tabClick(1)

            // pageType === "QR" &&
            // document.getElementById("uploadedImage").click()

            if(circleRef && circleRef.current){
                circleRef.current.style = `${getHexToFilterCss(color)}`;
            }
        }
    },[color, getHexToFilterCss, penType])

    return (
        <div className={styles.TabWrap} style={{display: pageType == 'PRINT' ? 'block' : 'block' }}>
            <div className={styles.TabBtnBox} style={{display: 'none' }}>
                <div className={isTab === 1 ? styles.TabBtn : null} onClick={()=>{tabClick(1)}}>
                    <p>CUSTOM DRAWING</p>
                    {/* <p>커스텀 드로잉</p> */}
                </div>
                <div className={isTab === 0 ? styles.TabBtn : null} onClick={()=>{tabClick(0)}}>
                    <p>NBY PRE-SET DESIGN</p>
                    {/* <p>NBY 프리 디자인</p> */}
                </div>
            </div>

            <div className={styles.TabArea}>
                {
                    isTab === 0 &&
                    <div className={styles.PreBox}>
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
                                                    {/*{index === 0 &&  <img id="uploadedImage" onClick={(e)=>{ addImage(e.target,value);}} src={value.img} alt="NBY 프리 디자인 이미지" />}*/}
                                                    {/*{index !== 0 &&  <img onClick={(e)=>{ addImage(e.target,value);}} src={value.img} alt="NBY 프리 디자인 이미지" />}*/}
                                                    {index == 0 &&
                                                        < img onClick={(e)=>{addImage(e.target,value);}} src={value.img} alt="NBY 프리 디자인 이미지" />
                                                    }
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>

                        }
                    
                    </div>
                }
                {
                    isTab === 1 &&
                    <>
                        <div className={styles.DrawLineBox}>
                            <input 
                                className={styles.DrawBox} 
                                type={"range"} 
                                width={"100%"} 
                                max={20} 
                                min={1} 
                                defaultValue={1}
                                value={lineWidth}
                                onChange={e => { setLineWidth(Number(e.target.value));}}
                            />
                            <div className={styles.LineBox}>
                                <i></i><i></i><i></i><i></i>
                                { penType === "pen" && <img ref={lineRef} src={DrawLine}alt="" /> }
                                { penType === "spray" && <img ref={lineSprayRef} src={DrawLine1}alt="" /> }
                                { penType === "" && <img ref={lineMarkerRef} src={DrawLine2}alt="" /> }
                            </div>
                            {/* <div className={styles.DrawBox}>
                                <img src={LineBorderBtn} alt="" />
                            </div> */}
                        </div>

                        {/* <div className={styles.ColorPickerBox}>
                            <img src={ColorBtn} alt="" onClick={()=>{setIsColorPicker(true); modalOpen()}}/>
                            <div ref={circleRef} onClick={()=>{setIsColorPicker(true); modalOpen()}}></div>
                        </div> */}

                        <div className={styles.ColorListWrap}>
                            <div className={styles.ColorListBox} onClick={()=>{setColor('#FF0000')}}>
                                <div style={{backgroundColor:'#FF0000'}}></div>
                                <img src={color === "#FF0000" ? ColorLine : ColorUnActiveLine} alt="" />
                            </div>
                            <div className={styles.ColorListBox} onClick={()=>{setColor('#FF7300')}}>
                                <div style={{backgroundColor:'#FF7300'}}></div>
                                <img src={color === "#FF7300" ? ColorLine : ColorUnActiveLine} alt="" />
                            </div>
                            <div className={styles.ColorListBox} onClick={()=>{setColor('#FFFF00')}}>
                                <div style={{backgroundColor:'#FFFF00'}}></div>
                                <img src={color === "#FFFF00" ? ColorLine : ColorUnActiveLine} alt="" />
                            </div>
                            <div className={styles.ColorListBox} onClick={()=>{setColor('#5EFF00')}}>
                                <div style={{backgroundColor:'#5EFF00'}}></div>
                                <img src={color === "#5EFF00" ? ColorLine : ColorUnActiveLine} alt="" />
                            </div>
                            <div className={styles.ColorListBox} onClick={()=>{setColor('#0000FF')}}>
                                <div style={{backgroundColor:'#0000FF'}}></div>
                                <img src={color === "#0000FF" ? ColorLine : ColorUnActiveLine} alt="" />
                            </div>
                            <div className={styles.ColorListBox} onClick={()=>{setColor('#001166')}}>
                                <div style={{backgroundColor:'#001166'}}></div>
                                <img src={color === "#001166" ? ColorLine : ColorUnActiveLine} alt="" />
                            </div>
                            <div className={styles.ColorListBox} onClick={()=>{setColor('#ffffff')}}>
                                <div style={{backgroundColor:'#ffffff'}}></div>
                                <img src={color === "#ffffff" ? ColorLine : ColorUnActiveLine} alt="" />
                            </div>
                            <div className={styles.ColorListBox} onClick={()=>{setColor('#8E8E8E')}}>
                                <div style={{backgroundColor:'#8E8E8E'}}></div>
                                <img src={color === "#8E8E8E" ? ColorLine : ColorUnActiveLine} alt="" />
                            </div>
                            <div className={styles.ColorListBox} onClick={()=>{setColor('#000000')}}>
                                <div style={{backgroundColor:'#000000'}}></div>
                                <img src={color === "#000000" ? ColorLine : ColorUnActiveLine} alt="" />
                            </div>
                        </div>

                        <div className={styles.PenBox}>
                            <div>
                                <img src={PenImgTh} alt="A type pen" onClick={()=>{setPenType("pen");changePenType("pen",lineWidth);}} className={penType==="pen" ? styles.PenActive : null}/>
                                <img src={PenImgNr} alt="B type pen" onClick={()=>{setPenType("spray");changePenType("spray",lineWidth);}} className={penType==="spray" ? styles.PenActive : null}/>
                                {/* <img src={PenImgBd} alt="C type pen" onClick={()=>{setPenType("");changePenType("");}} className={penType==="" ? styles.PenActive : null}/> */}
                            </div>
                        </div>

                        {/* { isColorPicker && <ColorPicker setIsModal={setIsColorPicker} color={color} setColor={setColor} /> } */}
                    </>
                }
            </div>
        </div>
    );
}

export default TabDoubleType;