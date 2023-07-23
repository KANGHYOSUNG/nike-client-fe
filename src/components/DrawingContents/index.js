import {useState, useEffect} from "react";
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import "swiper/swiper-bundle.css";
import styles from './style.module.scss'
import FabricEditor from 'components/FabricEditor'
import API from 'api';

// component
import {SelectLayout, SelectButton, TabCustomType, LoadingModal} from 'components';

// hooks 
import useAssets from 'hooks/useAssets';

// img
import GideImg from 'resources/image/gide_img.png';
import IconReset from 'resources/icon/icon_reset.svg';
import IconDelete from 'resources/icon/icon_delete.svg'
import useFabric from "hooks/useFabric";
import IconPlus from 'resources/icon/icon_plus.svg'
import IconMinus from 'resources/icon/icon_minus.svg'

function DrawingContents() {

    const {type} = useParams();
    const [color, setColor] = useState("#0a0001");
    const [lineWidth, setLineWidth] = useState(5);
    const location = useLocation();
    const state = location.state;
    const fabricStates = useFabric(state, [], type);
    const [loadStep, setLoadStep] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
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
    }, [fabricRef, color, lineWidth, updatePenState]);


    useEffect(() => {
        updateBackground(true);
    }, [backgroundRef]);

    let isLoad = false;
    useEffect(() => {
        if (isFrontLoad && isLoad === false) {
            isLoad = true;
            onProccessSave();
        }
    }, [isFrontLoad]);

    const setLoader = (count) => {
        setIsLoader(true);
        let numberArray = [];
        for (var i = 0; i < count; i++) {
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

        setLoader(1);
        if (type === "laser" || type === "laser_pre") {
            fabricStates.fabricRef.current.setBackgroundColor('white');
            fabricRef.current.setZoom(1)

            fabricRef.current.setDimensions({
                width: Number(fabricRef.current.canvas.width/4.8),
                height: Number(fabricRef.current.canvas.height/4.8)
            })
        }
        fabricStates.fabricRef.current.renderAll();

        frontImage = await getResultImage("front");
        if (type === "laser" || type === "laser_pre") {
            fabricStates.fabricRef.current.setBackgroundColor('white');
            fabricRef.current.setZoom(1)

            fabricRef.current.setDimensions({
                width: Number(fabricRef.current.canvas.width*0.7),
                height: Number(fabricRef.current.canvas.height*0.7)
            })
        }
        frontAssetAllImg = await saveImage(fabricRef.current, "front");
        setLoader(4);
        frontResult = await saveImage(frontImage, "front");
        setLoader(7);
        localStorage.setItem("fontImg", frontResult.img);

        let object = JSON.parse(JSON.stringify(state));
        object = object ? object : {};
        object.img = frontResult.img;
        object.img_back = backResult.img;
        object.assets = {};
        if (type === "laser" || type === "laser_pre")
            fabricRef.current.setBackgroundColor('white');
        fabricRef.current.renderAll();
        fabricRef.current.isDrawingMode = false;

        let frontAssets = await getUsedAssetsList("front");
        setLoader(10);
        let frontCustomImage = await getUsedCustomAssets("front");
        setLoader(15);

        if (frontCustomImage) {
            let frontCustomResult = await saveImage(frontCustomImage, "front");
            let response = await API.postAssets(type, 1200, frontCustomResult.img, "customName", "null");
            frontAssets = frontAssets.concat([response]);
        }
        setLoader(19);

        if (frontAssets && frontAssets.length > 0 && frontAssetAllImg) {
            object.work_img = frontAssetAllImg.img;
        }
        object.assets = frontAssets;
        return navigate(`/${type}/laserfinish`, {state: object});
    }

    const onNext = async () => {
        fabricRef.current.isDrawingMode = false;
        await saveCanvas();
        // return navigate(`/${type}/drawfinish`);
    }

    async function saveImage(data, type) {
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
                <SelectLayout titleA={"CUSTOM"} titleC={"YOURSELF"} text={"자신만의 디자인을 만들어 보세요."} border={false}
                              custom={true}>


                    <div ref={transformRef} className={styles.Canvas}  >
                        <canvas ref={backgroundRef} style={{display:"none"}}/>
                        <div style={{position:"absolute",top:0}}>
                            <FabricEditor marker={(type === 'laser') ? {...state, masking_x: 0, masking_y: '35%'} : state} fabricRef={fabricRef} />
                        </div>
                    </div>

{/*                     
                    <canvas ref={backgroundRef} style={{display: "none"}}/>
                    <div className={styles.Canvas}>
                        <FabricEditor marker={(type === 'laser') ? {...state, masking_x: 0, masking_y: '35%'} : state}
                                      fabricRef={fabricRef}/>
                    </div> */}
                    <div className={styles.ColorBox}>
                        <div></div>
                        <div></div>
                    </div>
                    <img src={IconDelete} alt="" className={styles.DeleteBtn} onClick={selectDeleteEvent}/>
                    <img src={IconReset} alt="" className={styles.ResetBtn} onClick={onUndoDraw}/>

                    {/* 확대/축소 버튼 */}
                    <div className={styles.RatioBox}>
                        <img src={IconPlus} alt="확대" onClick={onZoomIn}/>
                        <img src={IconMinus} alt="축소"  onClick={onZoomOut}/>
                    </div>
                </SelectLayout>
                <TabCustomType
                    isheader={false}
                    changePenType={changePenType}
                    lineWidth={lineWidth}
                    setLineWidth={setLineWidth}
                    color={color}
                    setColor={setColor}
                    addImage={addImage}
                    changeDrawMode={changeDrawMode}
                    type={type}
                />
            </div>


            <SelectButton title="OK" link={onNext} next={true}/>
            <div className={styles.NoteInner}>
                <p>종이에 먼저 테스트 해주세요. / 출력은 최대 3개 까지 가능합니다.</p>
            </div>
            {
                isLoader ?
                    <LoadingModal loadStep={loadStep}/>
                    :
                    null
            }
        </div>
    );
}

export default DrawingContents;
