import { useState, useEffect,useRef } from "react";
import "swiper/swiper-bundle.css";
import styles from '../style.module.scss'
import { modalOpen } from 'utils/ModalFunctions';
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


function TabCustomType({ type,changePenType,lineWidth,setLineWidth,color,setColor,isheader }) {
    const { getHexToFilterCss } = useHexColorGenerator();

    const [penType, setPenType] = useState("pen");
    const [isColorPicker, setIsColorPicker] = useState(false);
    const lineRef = useRef();
    const circleRef = useRef();
    const lineSprayRef = useRef();
    const lineMarkerRef = useRef();
    

    useEffect(()=>{
        if(circleRef && circleRef.current){
            circleRef.current.style = `${getHexToFilterCss(color)}`;
        }
    },[color, getHexToFilterCss, penType])

    return (
        <div className={styles.TabWrap}>
            {
                isheader ?
                <div className={styles.TabBtnBox}>
                    <div className={styles.TabBtn}>
                        <p>CUSTOM DRAWING</p>
                        <p>커스텀 드로잉</p>
                    </div>
                </div>
                :
                null
            }

            <div className={styles.TabArea}>
                <div className={styles.DrawLineBox}>
                    <input 
                        className={styles.DrawBox} 
                        type={"range"} 
                        width={"100%"} 
                        max={20} 
                        min={1} 
                        defaultValue={1}
                        value={lineWidth}
                        // onMouseLeave={()=>{ updatePenState(null,lineWidth);}}
                        // onDragLeave={()=>{ updatePenState(null,lineWidth);}}
                        onChange={e => {setLineWidth(e.target.value);}}
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

                <div className={styles.ColorListWrap}>
                    <div className={styles.ColorListBox} onClick={()=>{setColor('#000000')}}>
                        <div style={{backgroundColor:'#000000'}}></div>
                        <img src={ColorLine} alt="" />
                    </div>
                </div>


                <div className={styles.PenBox}>
                    <div>
                        <img src={PenImgTh} alt="A type pen" onClick={()=>{setPenType("pen");changePenType("pen",lineWidth);}} className={penType==="pen" ? styles.PenActive : null}/>
                        {
                            type === "laser" ?
                            null
                            :
                            <img src={PenImgNr} alt="B type pen" onClick={()=>{setPenType("spray");changePenType("spray",lineWidth);}} className={penType==="spray" ? styles.PenActive : null}/>
                        }
                        {/* <img src={PenImgBd} alt="C type pen" onClick={()=>{setPenType("");changePenType("");}} className={penType==="" ? styles.PenActive : null}/> */}
                    </div>
                </div>
                {/* { isColorPicker && <ColorPicker setIsModal={setIsColorPicker} color={color} setColor={setColor} /> } */}
            </div>
        </div>
    );
}

export default TabCustomType;