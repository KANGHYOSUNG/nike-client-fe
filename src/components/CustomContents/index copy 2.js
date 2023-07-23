import {useState, useEffect, useMemo} from "react";
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

const CustomContents = () => {

    const {type} = useParams();
    const [ list, setList, updateActiveItem ] = useAssets(type == "laser_pre" ? "laser" : type);
    const location = useLocation();
    const state = location.state;
    const [color, setColor] = useState("#000000");
    const [tabType, setTabType] = useState('');
    const [lineWidth, setLineWidth] = useState(10);
    const fabricStates = useFabric(state,list,type);
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
        onUndoDraw
    } = fabricStates;

    useEffect(() => {
        updatePenState(color, lineWidth);
    }, [color, lineWidth, updatePenState]);

    useEffect(()=>{
        setTabType(type);
        setTimeout(()=>{
            // fabricRef.current.loadFromJSON({});
            if(type === "print" || type === "embroidery" || type === "laser_pre")
                changeDrawMode(false); 
        },30);
        setTimeout(()=>{
            // fabricRef.current.loadFromJSON({});
            if(type === "print" || type === "embroidery" || type === "laser_pre")
                changeDrawMode(false);
            
        },500);
        
    },[fabricRef,list])

    useEffect(()=>{
        updateBackground(true);
        // setTimeout(()=>{
        //     if(fabricRef.current && state.asset){
        //         addImage({ src : "http://fig.asuscomm.com:5001/" + state.asset.img},state.asset,false);
        //     }
        // },1000);
        
    },[backgroundRef]);

    let isLoad = false;
    useEffect(()=>{
        if(isFrontLoad && isLoad === false){
            isLoad = true;
            // clearEvent(false,true);
            onProccessFrontSave();
        }
    },[isFrontLoad]);

    useEffect(()=>{
        if(isBackLoad && !isFront){
            onProccessBackSave();
        }
    },[isBackLoad]);

    const setLoader = (count) => {
        setIsLoader(true);
        let numberArray = [];
        for(var i = 0;i<count;i++){
            numberArray.push(i + 1);
        }
        setLoadStep(numberArray);
    }
    const navigate = useNavigate();


    const onProccessFrontSave = async () => {
        let frontImage = "";
        let frontResult = "";

        setLoader(1);
        frontImage = await getResultImage("front");
        setLoader(3);
        frontResult = await saveImage(frontImage,"front");

    
        setLoader(14);
        localStorage.setItem("fontImg",frontResult.img);

        let object = JSON.parse(JSON.stringify(state));
        object = object ? object : {};
        object.img = frontResult.img;
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

        object.assets = frontAssets;
        clearEvent(false,true);
        setTimeout(()=>{ setIsBackLoad(true); },1000);
    }

    const onProccessBackSave = async () => {
        let backImage = "";
        let backResult = "";

        backImage = await getResultImage("back");
        setLoader(12);
        backResult = await saveImage(backImage,"back");

        setLoader(14);
        localStorage.setItem("backImg",backResult.img);

        let object = JSON.parse(JSON.stringify(state));
        object = object ? object : {};
        object.img_back = backResult.img;
        object.assets = {};

        fabricRef.current.isDrawingMode = false;

        setLoader(18);
        let backAssets = await getUsedAssetsList("back");     
        let backCustomImage = await getUsedCustomAssets("back");

        if(backCustomImage){
            let backCustomResult = await saveImage(backCustomImage,"back");
            let response = await API.postAssets(type,1200,backCustomResult.img,"customName","null");
            backAssets = backAssets.concat([response]);
        }
        setLoader(19);

        object.backAssets = backAssets;

        console.log(object);
        return;
        if(type === "laser_pre"){
            navigate(`/${type}/laserfinish`,{ state : object});
        }else
            navigate(`/${type}/drawfinish`,{ state : object});
    }

    const onProccessSave = async () => {
        let frontImage = "";
        let frontResult = "";
        let backImage = "";
        let backResult = "";

        setLoader(1);
        if(isFront){
            frontImage = await getResultImage("front");
            setLoader(3);
            frontResult = await saveImage(frontImage,"front");
        }else{
            setLoader(5);
            backImage = await getResultImage("back");
            setLoader(10);
            backResult = await saveImage(backImage,"back");
        }

        if(isFront){
            backImage = await getResultImage("back");
            setLoader(12);
            backResult = await saveImage(backImage,"back");
        }else{
            frontImage = await getResultImage("front");
            setLoader(12);
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

        setLoader(18);
        let backAssets = await getUsedAssetsList("back");     
        let backCustomImage = await getUsedCustomAssets("back");

        if(backCustomImage){
            let backCustomResult = await saveImage(backCustomImage,"back");
            let response = await API.postAssets(type,1200,backCustomResult.img,"customName","null");
            backAssets = backAssets.concat([response]);
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
            quality: 1,
            multiplier: 20
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
        await API.uploadImage(file);

        return {img: "https://storage.googleapis.com/nike-by-hongdae-front/"+file.name}

    }


    const onNext = async () => {
        fabricRef.current.isDrawingMode = false;
        await saveCanvas();
    }

    return (
        <div className={styles.CustomWrap}>
            <div className={styles.CustomInner} >
                <SelectLayout titleA={"CUSTOM"} titleC={"YOURSELF"} text={"자신만의 디자인을 만들어 보세요."} border={false}
                              custom={true}>
                    {
                        type === "print" ? 
                         <div className={styles.FrontBtn}>
                            <a className={isFront === true && styles.Active} onClick={()=>{clearEvent(false, true)}}>F</a>
                            <a className={isFront === false && styles.Active} onClick={()=>{clearEvent(false, true)}}>B</a>
                         </div>
                         :
                         null
                    }
                    <canvas ref={backgroundRef} />
                    <div className={styles.Canvas}>
                        <FabricEditor marker={state} fabricRef={fabricRef} />
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
                </SelectLayout>
            </div>

            {
                type === 'QR' &&
                <TabDoubleType
                    changePenType={changePenType}
                    lineWidth={lineWidth}
                    setLineWidth={setLineWidth}
                    color={color}
                    setColor={setColor}
                    addImage={addImage}
                    changeDrawMode={changeDrawMode}
                    list={[state.asset]}
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
                    list={list}
                />
            }
            {
                type === 'embroidery' || type === "laser_pre" ?
                <TabDesignType
                    addImage={addImage}
                    list={list}
                />
                :
                null
            }
            <SelectButton title="OK" link={onNext} next={true}/>
            {/* {
                isLoader ?
                <LoadingModal loadStep={loadStep} />
                :
                null
            } */}
        </div>
    );
}

export default CustomContents;