import React, { useEffect,useState } from "react";
import {useNavigate} from 'react-router-dom';
import styles from './style.module.scss'

// component
import { SubTitle , SelectButton } from 'components';

// img
import QrImg from 'resources/icon/qr_img.png'
import QRCode from "react-qr-code";
import API from "api";

function QrContents() {
    const navigate = useNavigate();
    const [qrUrl,setQrUrl] = useState(null);
    const [asset,setAsset ] = useState(null);
    const [resultAsset,setResultAsset ] = useState(null);

    const nextClick = () => {
        if(!resultAsset){
            alert("이미지 업로드 이후 진행 가능합니다.");
            return;
        }
        navigate(`/QR/item`, {state: {asset: resultAsset}});
        // return navigate(`/QR/item`, {state: {color: true}});
    }

    const createQrUrl = async () => {
        let assets = await API.postAssets("QR",0,"","QR","");

        setAsset(assets);
        setQrUrl(`https://nsh-2f-flask.event-pages.com/static/upload.html?custom_id=${assets.custom_id}`)
    }

    useEffect(() => {
        createQrUrl();
    }, []);

    useEffect(() => {
        if(asset){
            const timer = setInterval(async () => {
                // if(asset){
                    let response = await API.getAssets(asset.custom_id);
                    if(response.asset_list && response.asset_list){
                        let tempAsset = null;
                        response.asset_list.map((value)=>{
                            if(value.img){
                                tempAsset = value;
                            }
                        });

                        if(tempAsset){
                            setResultAsset(tempAsset);
                        }
                    }

            }, 2000);
            return () => clearInterval(timer);
        }
    }, [asset]);
    return (
        <div className={styles.Container}>
            <SubTitle titleA={"FINISH"} titleB={"the"} titleC={"QR"} text={"QR코드를 스캔하여 프린트를 원하는 사진을 불러오세요."}/>

            <div className={styles.PriceWrapper}>
                <i className={styles.BorderBox}></i>
                <i className={styles.BorderBox}></i>
                <i className={styles.BorderBox}></i>
                <i className={styles.BorderBox}></i>

                {
                    !resultAsset && qrUrl && <QRCode value={qrUrl}/>
                }
                {
                    resultAsset ?
                    <img src={ resultAsset.img} alt=""/>
                    :
                    null
                }

                {/* 업로드 이미지 영역 */}
                {/* <div className={styles.UploadImg}>
                <img src="" alt="" />
                <i className={styles.ImgBorderBox}></i>
                <i className={styles.ImgBorderBox}></i>
                <i className={styles.ImgBorderBox}></i>
                <i className={styles.ImgBorderBox}></i>
            </div> */}

            </div>
        <SelectButton title="OK" link={nextClick} next={true}/>
    </div>
  );
}

export default QrContents;
