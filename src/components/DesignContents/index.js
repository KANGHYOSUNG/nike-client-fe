import {useState,useEffect} from "react";
import {useNavigate, useParams,useLocation} from 'react-router-dom';
import "swiper/swiper-bundle.css";
import styles from './style.module.scss'
import usePreDsListState from 'hooks/usePreDsListState';
import FabricEditor from 'components/FabricEditor';

// hooks 
import useAssets from 'hooks/useAssets';

// component
import {SelectLayout, SelectButton} from 'components';

// img
import API from "../../api";
import useFabric from "../../hooks/useFabric";

function DesignContents() {

    const [ list, setList, updateActiveItem ] = useAssets("laser");
    const [active, setActive] = useState(-1);
    const navigate = useNavigate();
    const {type} = useParams();
    // const list = usePreDsListState();
    const location = useLocation();
    const state = location.state;
    const fabricStates = useFabric(state,[],type);

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

    const onProccessSave = async () => {
        let frontImage = "";
        let frontResult = "";
        let frontAssetAllImg = null;
        let backImage = "";
        let backResult = "";

        frontImage = await getResultImage("front");
        if(type==="laser" || type==="laser_pre")
        {fabricStates.fabricRef.current.setBackgroundColor('white');

                fabricRef.current.setDimensions({
                    width: Number(fabricRef.current.canvas.width),
                    height: Number(fabricRef.current.canvas.height)
                })}
        frontAssetAllImg = await saveImage(fabricRef.current,"front");
        frontResult = await saveImage(frontImage,"front");

        localStorage.setItem("fontImg",frontResult.img);

        let object = JSON.parse(JSON.stringify(state));
        object = object ? object : {};
        object.img = frontResult.img;
        object.img_back = backResult.img;
        object.assets = {};

        fabricRef.current.isDrawingMode = false;

        let frontAssets = [];
        let frontCustomImage = fabricRef.current;

        if(frontCustomImage){
            let frontCustomResult = await saveImage(frontCustomImage,"front");
            let response = await API.postAssets(type,1200,frontCustomResult.img,"customName","null");
            frontAssets = frontAssets.concat([response]);
        }

        if(frontAssets && frontAssets.length > 0 && frontAssetAllImg){
            object.work_img = frontAssetAllImg.img;
        }
        object.assets = frontAssets;
        return navigate(`/${type}/laserfinish`,{state : object });

        // return navigate(`/${type}/laserfinish`,{ state : object});
    }

    const onNext = async () => {
        if(active === -1){
            alert("디자인을 선택해주세요");
            return;
        }
        await saveCanvas();
        // let response = await API.postAssets(type,1200, list[active].src,"icon_select","null");
        // state.assets = [response];
        // return navigate(`/${type}/drawfinish`);
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
        await API.uploadImage(file)
        return {img: "https://nsh-2f-flask.event-pages.com/static/img/"+file.name};
    }


    return (
        <div className={styles.CustomWrap}>
            <div className={styles.CustomInner}>
                <SelectLayout titleA={"NBY PRE-SET"} titleC={"DESIGN"} text={"자신만의 디자인을 직접 선택해보세요."} border={false}>
                    <canvas ref={backgroundRef} style={{display:"none"}}/>
                    <div className={styles.Canvas} style={{display:"none"}}>
                        <FabricEditor marker={state} fabricRef={fabricRef} />
                    </div>
                    <div className={styles.DesignListBox}>
                        {
                            list && list.map((value, index) => {

                                if(value.img)
                                    return (
                                        <div className={(active === - 1 || active === index) && styles.active} onClick={(e)=>{setActive(index); addImage(e.target,value);}}>
                                            <img src={value.img} alt="" />
                                        </div>
                                    )
                            })
                        }
                    </div>
                    <div className={styles.ColorBox}>
                        <div></div>
                        <div></div>
                    </div>
                </SelectLayout>
            </div>
            <SelectButton title="OK" link={onNext} next={true}/>
        </div>
    );
}

export default DesignContents;
