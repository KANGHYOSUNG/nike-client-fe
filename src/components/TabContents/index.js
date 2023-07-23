import { useState, useEffect,useRef } from "react";
import "swiper/swiper-bundle.css";
import styles from './style.module.scss'
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

function TabContents({ changePenType,lineWidth,setLineWidth,color,setColor }) {
    const { getHexToFilterCss } = useHexColorGenerator();

    const [penType, setPenType] = useState("pen");
    const [isColorPicker, setIsColorPicker] = useState(false);

    const lineRef = useRef();
    const circleRef = useRef();
    const lineSprayRef = useRef();
    const lineMarkerRef = useRef();
    
    useEffect(()=>{
        if(lineRef && lineRef.current && circleRef && circleRef.current){
            circleRef.current.style = `${getHexToFilterCss(color)}`;
        }
    },[color, getHexToFilterCss, penType])

    return (
        <div className={styles.TabWrap}>
            <div className={styles.TabArea}>
                <div className={styles.PenBox}>
                    <div>
                        <img src={PenImgTh} alt="A type pen" onClick={()=>{setPenType("pen");changePenType("pen");setLineWidth(1);}} className={penType==="pen" ? styles.PenActive : null}/>
                        <img src={PenImgNr} alt="B type pen" onClick={()=>{setPenType("spray");changePenType("spray");setLineWidth(1);}} className={penType==="spray" ? styles.PenActive : null}/>
                        {/* <img src={PenImgBd} alt="C type pen" onClick={()=>{setPenType("");changePenType("");setLineWidth(1);}} className={penType==="" ? styles.PenActive : null}/> */}
                    </div>
                </div>

                <div className={styles.DrawLineBox}>
                    <div className={styles.LineBox}>
                        <i></i><i></i><i></i><i></i>
                        { penType === "pen" && <img ref={lineRef} src={DrawLine} alt="" /> }
                        { penType === "spray" && <img ref={lineSprayRef} src={DrawLine1} alt="" /> }
                        { penType === "" && <img ref={lineMarkerRef} src={DrawLine2} alt="" /> }
                    </div>
                    {/* <div className={styles.DrawBox}>
                        <img src={LineBorderBtn} alt="" />
                    </div> */}
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
                </div>

                <div className={styles.ColorPickerBox}>
                    <img src={ColorBtn} alt="" onClick={()=>{setIsColorPicker(true); modalOpen()}}/>
                    <div ref={circleRef} onClick={()=>{setIsColorPicker(true); modalOpen()}}></div>
                </div>

                { isColorPicker && <ColorPicker setIsModal={setIsColorPicker} color={color} setColor={setColor} /> }
            </div>
        </div>
    );
}

export default TabContents;