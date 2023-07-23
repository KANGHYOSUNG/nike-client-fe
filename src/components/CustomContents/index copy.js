import {useState, useEffect, useMemo} from "react";
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import "swiper/swiper-bundle.css";
import styles from './style.module.scss'
import FabricEditor from 'components/FabricEditor'

import API from 'api';

// hooks 
import useAssets from 'hooks/useAssets';

// component
import {SelectLayout, SelectButton, TabCustomType, TabDesignType, TabDoubleType} from 'components';

// img
import IconReset from 'resources/icon/icon_reset.svg'
import IconDelete from 'resources/icon/icon_delete.svg'
import useFabric from "hooks/useFabric";

const CustomContents = () => {

    const {type} = useParams();
    const [ list, setList, updateActiveItem ] = useAssets(type);
    const location = useLocation();
    const state = location.state;
    const [color, setColor] = useState("#000000");
    const [tabType, setTabType] = useState('');
    const [lineWidth, setLineWidth] = useState(10);
    const fabricStates = useFabric(state,list);
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
        setIsBackLoad
    } = fabricStates;

    useEffect(() => {
        updatePenState(color, lineWidth);
    }, [color, lineWidth, updatePenState]);

    useEffect(()=>{
        setTabType(type);
        setTimeout(()=>{
            fabricRef.current.loadFromJSON({});
            if(type === "print" || type === "embroidery")
                fabricRef.current.isDrawingMode = false;
        },750);
    },[fabricRef])

    useEffect(()=>{

        updateBackground(true);

    },[backgroundRef])


    let isLoad = false;
    useEffect(()=>{
        if(isFrontLoad && isLoad === false){
            isLoad = true;
            loadFront();
        }
    },[isFrontLoad]);

    useEffect(()=>{
        if(isBackLoad && isLoad === false){
            isLoad = true;
            loadBack();
        }
    },[isBackLoad])
    
    const navigate = useNavigate();

    const loadFront = async () => {
        let frontImage = "";
        let frontResult = "";

        frontImage = await getResultImage("front");
        frontResult = await saveImage(frontImage,"front");

        localStorage.setItem("fontImg",frontResult.img);

        let object = JSON.parse(JSON.stringify(state));
        object = object ? object : {};
        object.img = frontResult.img;
        object.assets = {};

        let frontAssets = await getUsedAssetsList("front");
        let frontCustomImage = await getUsedCustomAssets("front");

        if(frontCustomImage){
            let frontCustomResult = await saveImage(frontCustomImage,"front");
            frontAssets = frontAssets.concat([{
                img:frontCustomResult.img, 
                price:5000,
                category:type,
                id:0,
            }]);
        }

        object.assets = frontAssets;

        setIsBackLoad(true);
    }

    const loadBack = async () => {

        let backImage = "";
        let backResult = "";

        backImage = await getResultImage("back");
        backResult = await saveImage(backImage,"back");

        if(isFront){
            backImage = await getResultImage("back");
            backResult = await saveImage(backImage,"back");
        }

        localStorage.setItem("backImg",backResult.img);

        let object = JSON.parse(JSON.stringify(state));
        object = object ? object : {};
        object.img_back = backResult.img;
        object.assets = {};

        fabricRef.current.isDrawingMode = false;

        let backAssets = await getUsedAssetsList("back");     
        let backCustomImage = await getUsedCustomAssets("back");

        if(backCustomImage){
            let backCustomResult = await saveImage(backCustomImage,"back");
            backAssets = backAssets.concat([{
                img:backCustomResult.img,  
                price:5000,
                category:type,
                id:0,
            }]);
        }

        object.backAssets = backAssets;
    }

    const onProccessSave = async () => {
        let frontImage = "";
        let frontResult = "";
        let backImage = "";
        let backResult = "";

        if(isFront){
            frontImage = await getResultImage("front");
            frontResult = await saveImage(frontImage,"front");
        }else{
            backImage = await getResultImage("back");
            backResult = await saveImage(backImage,"back");
        }

        if(isFront){
            backImage = await getResultImage("back");
            backResult = await saveImage(backImage,"back");
        }else{
            frontImage = await getResultImage("front");
            frontResult = await saveImage(frontImage,"front");
        }


        localStorage.setItem("fontImg",frontResult.img);
        localStorage.setItem("backImg",backResult.img);

        let object = JSON.parse(JSON.stringify(state));
        object = object ? object : {};
        object.img = frontResult.img;
        object.img_back = backResult.img;
        object.assets = {};

        fabricRef.current.isDrawingMode = false;

        let frontAssets = await getUsedAssetsList("front");
        let frontCustomImage = await getUsedCustomAssets("front");

        if(frontCustomImage){
            let frontCustomResult = await saveImage(frontCustomImage,"front");
            frontAssets = frontAssets.concat([{
                img:frontCustomResult.img, 
                price:5000,
                category:type,
                id:0,
            }]);
        }

        let backAssets = await getUsedAssetsList("back");     
        let backCustomImage = await getUsedCustomAssets("back");

        if(backCustomImage){
            let backCustomResult = await saveImage(backCustomImage,"back");
            backAssets = backAssets.concat([{
                img:backCustomResult.img,  
                price:5000,
                category:type,
                id:0,
            }]);
        }

        object.assets = frontAssets;
        object.backAssets = backAssets;

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

        await API.uploadImage(file)

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
                    <canvas ref={backgroundRef} />
                    <div className={styles.Canvas}>
                        <FabricEditor marker={state} fabricRef={fabricRef} />
                    </div>
                    <div className={styles.ColorBox}>
                        <div></div>
                        <div></div>
                    </div>
                    <img src={IconDelete} alt="" className={styles.DeleteBtn} onClick={selectDeleteEvent}/>
                    <img src={IconReset} alt="" className={styles.ResetBtn} onClick={clearEvent}/>
                </SelectLayout>
            </div>

            {
                tabType === 'QR' &&
                <TabCustomType
                    isheader={true}
                    changePenType={changePenType}
                    lineWidth={lineWidth}
                    setLineWidth={setLineWidth}
                    color={color}
                    setColor={setColor}
                    changeDrawMode={changeDrawMode}
                />
            }
            {
                tabType === 'print' &&
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
                tabType === 'embroidery' &&
                <TabDesignType
                    addImage={addImage}
                    list={list}
                />
            }
            <SelectButton title="OK" link={onNext} next={true}/>
        </div>
    );
}

export default CustomContents;