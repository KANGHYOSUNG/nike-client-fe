import React,{ useState, useRef } from 'react';
import styles from './style.module.scss';
import { modalClosed } from 'utils/ModalFunctions';

// img
import ClosedBtn from 'resources/icon/icon_closed.svg'

function ColorPicker({setIsModal ,color,setColor}) {
    const colorPanel = useRef();
    const [isPickTrigger,setIsPickTrigger] = useState(false);
    const getSpectrumWrapper = () => colorPanel.current;
    const spectrumRanges = [
    { from: [255, 0, 0], to: [255, 255, 0] },
    { from: [255, 255, 0], to: [0, 255, 0] },
    { from: [0, 255, 0], to: [0, 255, 255] },
    { from: [0, 255, 255], to: [0, 0, 255] },
    { from: [0, 0, 255], to: [255, 0, 255] },
    { from: [255, 0, 255], to: [255, 0, 0] }
    ];

    const findColorValue = (from, to, leftDistRatio) => {
        return Math.round(from + (to - from) * leftDistRatio);
    };

    const findRgbFromMousePosition = (event) => {
        const { left, width } = getSpectrumWrapper().getBoundingClientRect();
        const leftDistance = Math.min(Math.max(event.clientX - left, 0), width - 1);
        const rangeWidth = width / spectrumRanges.length;
        const includedRange = Math.floor(leftDistance / rangeWidth);
        const leftDistRatio = ((leftDistance % rangeWidth) / rangeWidth).toFixed(2);
        const { from, to } = spectrumRanges[includedRange];
        return {
            r: findColorValue(from[0], to[0], leftDistRatio),
            g: findColorValue(from[1], to[1], leftDistRatio),
            b: findColorValue(from[2], to[2], leftDistRatio)
        };
    };

    const darken = (color, ratio) => Math.round((1 - ratio) * color);
    const whiten = (color, ratio) => Math.round(color + (255 - color) * ratio);
    const adjustSaturation = ({ r, g, b }) => (ratio, adjustmentFn) => {
        return {
            r: adjustmentFn(r, ratio),
            g: adjustmentFn(g, ratio),
            b: adjustmentFn(b, ratio)
        };
    };

    const saturate = (rgb, e) => {
        const { top, height } = getSpectrumWrapper().getBoundingClientRect();
        const topDistance = Math.min(Math.max(e.clientY - top, 0), height);
        const topDistRatio = (topDistance / height).toFixed(2);
        if (topDistRatio > 0.5) {
            const darknessRatio = (topDistRatio - 0.5) / 0.5;
            return adjustSaturation(rgb)(darknessRatio, darken);
        }
        if (topDistRatio < 0.5) {
            const whitenessRatio = (0.5 - topDistRatio) / 0.5;
            return adjustSaturation(rgb)(whitenessRatio, whiten);
        }
        return rgb;
    };

    const rgbToHex = (r, g, b) => {
        const toHex = (rgb) => {
            let hex = Number(rgb).toString(16);
            if (hex.length < 2) {
            hex = `0${hex}`;
            }
            return hex;
        };
        const red = toHex(r);
        const green = toHex(g);
        const blue = toHex(b);
        return `#${red}${green}${blue}`;
    };

    const onMouseMoveEvent = (e) => {
        if(isPickTrigger){
            e = e.clientX ? e : e.touches[0];
            const rgb = findRgbFromMousePosition(e);
            const { r, g, b } = saturate(rgb, e);
            const hexValue = rgbToHex(r, g, b);
            setColor(hexValue);
        }
    }

    return (
        <>
            <div className={styles.Blank} onClick={()=>{setIsModal(false); modalClosed()}}></div>
            <div className={styles.Container}>
                <div 
                    className={styles.ColorBox} 
                    ref={colorPanel} 
                    onTouchStart={()=> setIsPickTrigger(true)}
                    onTouchEnd={()=> setIsPickTrigger(false)}
                    onTouchMove={onMouseMoveEvent}
                    onMouseDown={()=> setIsPickTrigger(true)}
                    onMouseUp={()=> setIsPickTrigger(false)}
                    onMouseMove={onMouseMoveEvent}
                >
                    <div className={styles.SpectrumLayer}></div>
                    <div className={styles.SaturationWhite}></div>
                    <div className={styles.SaturationBlack}></div>
                </div>
                
                {/* 선택한 색상영역 */}
                <div className={styles.SelectColorBox} style={{backgroundColor:color}}></div>
                <img src={ClosedBtn} alt="" onClick={()=>{setIsModal(false); modalClosed()}} className={styles.ClosedBtnImg}/>
            </div>
        </>
    );
}

export default ColorPicker;