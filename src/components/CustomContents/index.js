import {useState, useEffect, useMemo, useRef} from "react";
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import "swiper/swiper-bundle.css";
import styles from './style.module.scss'
import FabricEditor from 'components/FabricEditor'

import API from 'api';

// hooks 
import useAssets from 'hooks/useAssets';

// component
import {SelectLayout, LoadingModal ,SelectButton, TabCustomType, TabDesignType, TabDoubleType} from 'components';

// img
import IconReset from 'resources/icon/icon_reset.svg'
import IconDelete from 'resources/icon/icon_delete.svg'
import useFabric from "hooks/useFabric";
import IconPlus from 'resources/icon/icon_plus.svg'
import IconMinus from 'resources/icon/icon_minus.svg'

const CustomContents = () => {

    const {type} = useParams();
    const location = useLocation();
    const state = location.state;
    const options = state.options[0];
    const assets = options.assets ? options.assets : []; 
    const [color, setColor] = useState("#000000");
    const [tabType, setTabType] = useState('');
    const [lineWidth, setLineWidth] = useState(5);
    const fabricStates = useFabric(state,assets,type);
    const [loadStep ,setLoadStep ] = useState([]);
    const [isLoader,setIsLoader] = useState(false);
    const {
        frontCanvas,
        backCanvas,
        isFront,
        updatePenState,
        fabricRef,
        backgroundRef,
        addImage,
        changePenType,
        clearEvent,
        selectDeleteEvent,
        changeDrawMode,
        saveCanvas,
        updateBackground,
        getResultImage,
        getUsedCustomAssets,
        getUsedAssetsList,
        isFrontLoad,
        isBackLoad,
        setIsBackLoad,
        postAssets,
        onUndoDraw,
        onZoomIn,
        onZoomOut,
        transformRef
    } = fabricStates;

    useEffect(() => {
        updatePenState(color, lineWidth);
    }, [color, lineWidth, updatePenState]);

    useEffect(()=>{
        setTabType(type);
        setTimeout(()=>{
            // fabricRef.current.loadFromJSON({});
            if(type === "qr" || type === "QR" || type === "print" || type === "embroidery" || type === "laser_pre")
                changeDrawMode(false); 
        },500);
        setTimeout(()=>{
            // fabricRef.current.loadFromJSON({});
            if(type === "qr" || type === "QR" || type === "print" || type === "embroidery" || type === "laser_pre")
                changeDrawMode(false);
            
        },1000);
        
    },[fabricRef,assets])

    useEffect(()=>{
        updateBackground(true);
    },[backgroundRef]);

    let isLoad = false;
    useEffect(()=>{
        if(isFrontLoad && isLoad === false){
            isLoad = true;
            onProccessSave();
        }
    },[isFrontLoad]);

    const setLoader = (count) => {
        setIsLoader(true);
        let numberArray = [];
        for(var i = 0;i<count;i++){
            numberArray.push(i + 1);
        }
        setLoadStep(numberArray);
    }
    const navigate = useNavigate();

    const onProccessSave = async () => {
        let frontImage = "";
        let frontResult = "";
        let frontAssetAllImg = null;
        let backImage = "";
        let backResult = "";
        let backAssetAllImg = null;

        setLoader(1);
        if(isFront){
            frontImage = await getResultImage("front");
            setLoader(3);
            if(type==="laser" || type==="laser_pre") {
                fabricStates.fabricRef.current.setBackgroundColor('white');

                fabricRef.current.setDimensions({
                    width: Number(fabricRef.current.canvas.width),
                    height: Number(fabricRef.current.canvas.height)
                })
            }
            frontAssetAllImg = await saveImage(fabricRef.current,"front");
            frontResult = await saveImage(frontImage,"front");
        }else{
            setLoader(5);
            backImage = await getResultImage("back");
            setLoader(10);
            if(type==="laser" || type==="laser_pre")
                {fabricStates.fabricRef.current.setBackgroundColor('white');

                fabricRef.current.setDimensions({
                    width: Number(fabricRef.current.canvas.style.width.split('px')[0]),
                    height: Number(fabricRef.current.canvas.style.height.split('px')[0])
                })}
            backAssetAllImg = await saveImage(fabricRef.current,"back");
            backResult = await saveImage(backImage,"back");
        }

        if(isFront){
            backImage = await getResultImage("back");
            setLoader(12);
            if(type==="laser" || type==="laser_pre")
            {fabricStates.fabricRef.current.setBackgroundColor('white');

                fabricRef.current.setDimensions({
                    width: Number(fabricRef.current.canvas.style.width.split('px')[0]),
                    height: Number(fabricRef.current.canvas.style.height.split('px')[0])
                })}
            backAssetAllImg = await saveImage(fabricRef.current,"back");
            backResult = await saveImage(backImage,"back");
        }else{
            frontImage = await getResultImage("front");
            setLoader(12);
            if(type==="laser" || type==="laser_pre")
            fabricStates.fabricRef.current.setBackgroundColor('white');
            frontAssetAllImg = await saveImage(fabricRef.current,"front");
            frontResult = await saveImage(frontImage,"front");
        }

        setLoader(14);
        console.log(frontResult)
        localStorage.setItem("fontImg",frontResult.img);
        localStorage.setItem("backImg",backResult.img);

        let object = JSON.parse(JSON.stringify(state));
        object = object ? object : {};
        object.img = frontResult.img;
        object.img_back = backResult.img;
        object.assets = {};

        fabricRef.current.isDrawingMode = false;

        setLoader(15);
        let frontAssets = await getUsedAssetsList("front");
        setLoader(16);
        let frontCustomImage = await getUsedCustomAssets("front");
        setLoader(17);

        if(frontCustomImage){
            let frontCustomResult = await saveImage(frontCustomImage,"front");
            let response = await API.postAssets(type,1200,frontCustomResult.img,"customName","null");
            frontAssets = frontAssets.concat([response]);
        }
        
        if(frontAssets && frontAssets.length > 0 && frontAssetAllImg){
            object.work_img = frontAssetAllImg.img;
        }

        setLoader(18);
        let backAssets = await getUsedAssetsList("back");     
        let backCustomImage = await getUsedCustomAssets("back");

        if(backCustomImage){
            let backCustomResult = await saveImage(backCustomImage,"back");
            let response = await API.postAssets(type,1200,backCustomResult.img,"customName","null");
            backAssets = backAssets.concat([response]);
        }


        if(backAssets && backAssets.length > 0 && backAssetAllImg){
            object.work_img_back = backAssetAllImg.img;
        }
        setLoader(19);

        object.assets = frontAssets;
        object.backAssets = backAssets;

        if(type === "laser_pre"){
            navigate(`/${type}/laserfinish`,{ state : object});
        }else
            navigate(`/${type}/drawfinish`,{ state : object});
    }

    async function saveImage(data,type) {
        const imageData = data.toDataURL({
            format: 'png',
            quality: 0.7,
            multiplier: 10
        });

        const byteString = atob(imageData.split(",")[1]);

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ia], {
            type: "image/png"
        });
        const file = new File([blob], new Date().getTime() + type + ".png");
        const formData = new FormData();
        formData.append('images', file);
        await API.uploadImage(formData)
        return {img: "https://nsh-2f-flask.event-pages.com/static/img/"+file.name};

    }


    const onNext = async () => {
        fabricRef.current.isDrawingMode = false;
        await saveCanvas();
    }

    return (
        <div className={styles.CustomWrap} >
            <div 
                className={styles.CustomInner} 
                // onTouchStart={ontouchStart} 
                // onTouchMove={handleMove}
                // onTouchEnd={ontouchEnd}
            >
                <SelectLayout titleA={"CUSTOM"} titleC={"YOURSELF"} text={"자신만의 디자인을 만들어 보세요."} border={true} custom={true}>
                    {
                        (type.toLowerCase() === "print" || type.toLowerCase() === "qr") ?
                         <div className={styles.FrontBtn}>
                            <a className={isFront === true && styles.Active} onClick={()=>{clearEvent(true)}}>F</a>
                            <a className={isFront === false && styles.Active} onClick={()=>{clearEvent(false)}}>B</a>
                         </div>
                         :
                         null
                    }
                    <div ref={transformRef} className={styles.Canvas} >
                        <canvas ref={backgroundRef} />
                        <div style={{position:"absolute",top:0}}>
                            <FabricEditor marker={state} fabricRef={fabricRef} />
                        </div>
                    </div>
                    <div className={styles.ColorBox}>
                        <div></div>
                        <div></div>
                    </div>
                    {
                        type !== "laser_pre" ? 
                        <>
                            <img src={IconDelete} alt="" className={styles.DeleteBtn} onClick={selectDeleteEvent}/>
                        </>
                        :
                        null
                    }
                    <img src={IconReset} alt="" className={styles.ResetBtn} onClick={onUndoDraw}/>

                    {/* 확대/축소 버튼 */}
                    <div className={styles.RatioBox}>
                        <img src={IconPlus} alt="확대" onClick={onZoomIn}/>
                        <img src={IconMinus} alt="축소"  onClick={onZoomOut}/>
                    </div>
                </SelectLayout>
                
                {
                    (type === 'QR' || type === 'qr') &&
                    <TabDoubleType
                        changePenType={changePenType}
                        lineWidth={lineWidth}  
                        setLineWidth={setLineWidth}
                        color={color}
                        setColor={setColor}
                        addImage={addImage}
                        changeDrawMode={changeDrawMode}
                        list={assets && assets.length > 0 ? [state.asset, ...assets] : []}
                    />
                }
                {
                    type === 'print' &&
                    <TabDoubleType
                        changePenType={changePenType}
                        lineWidth={lineWidth}
                        setLineWidth={setLineWidth}
                        color={color}
                        setColor={setColor}
                        addImage={addImage}
                        changeDrawMode={changeDrawMode}
                        list={assets}
                    />
                }
                {
                    type === 'embroidery' || type === "laser_pre" ?
                    <TabDesignType
                        type={type}
                        addImage={addImage}
                        changeDrawMode={changeDrawMode}
                        list={assets}
                    />
                    :
                    null
                }
            </div>
            <SelectButton title="OK" link={onNext} next={true}/>
            {
                type === "laser_pre" ?
                <div className={styles.NoteInner}>
                    <p>종이에 먼저 테스트 해주세요. / 출력은 최대 3개 까지 가능합니다.</p>
                </div>
                :
                null
            }
            {
                isLoader ?
                <LoadingModal loadStep={loadStep} />
                :
                null
            }
        </div>
    );
}

export default CustomContents;
