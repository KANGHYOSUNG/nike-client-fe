import {useEffect, useState} from 'react';
import { useNavigate,useParams,useLocation } from 'react-router-dom';
import styles from './style.module.scss'

// component
import { SelectLayout , SelectButton, BorderLayoutBox } from 'components';

// img
import IconReset from 'resources/icon/icon_reset.svg'
import IconDelete from 'resources/icon/icon_delete.svg'

function FinishContents({disabled,title,buttonTitle}) {

    const location = useLocation();
    const state = location.state;
    const [count, setCount] = useState(state.count ? state.count : 1);
    const [isFront,setIsFront ] = useState(true);
    const navigate = useNavigate();
    const {type} = useParams();

    const detailClick = () => {

     if(disabled){
        return null;
     }

      state.count = count;
      state.totalPrice = getTotalPrice();
      state.productPrice = state.price;
      state.assetPrice = state.category === "laser" ? 0 : getAssetPrice();
      state.optionPrice = getOptionPrice();
      localStorage.setItem("count",count);

      return navigate(`/${type}/orderDetail`,{state : state});
    }

    const nextClick = () => {

    if(disabled){
        return null;
    }

      state.count = count;
      state.totalPrice = getTotalPrice();
      state.productPrice = state.price;
      state.assetPrice = state.category === "laser" ? 0 : getAssetPrice();
      state.optionPrice = getOptionPrice();
      localStorage.setItem("count",count);
      return navigate(`/agreement`,{state : state});
    }

    const updateCount = (num) => {
        setCount(n => n + num <= 0 ? 1 : n + num);
    }

    const getOptionPrice = () => {
        return (state.options[0] ? state.options[0].price : 0);
    }

    const getAssetPrice = () => {
        let frontAssetPrice = 0;
        let backAssetPrice = 0;

        state.assets && state.assets.map((value)=>{ frontAssetPrice += value.price; });
        state.backAssets && state.backAssets.map((value)=>{ backAssetPrice += value.price; });

        return frontAssetPrice + backAssetPrice;
    }

    const getTotalPrice = () => {

        const categoryPrice = { QR : 15000, print : 15000, embroidery : 3000,laser:3000,laser_pre : 3000};
        let frontAssetPrice = 0;
        let backAssetPrice = 0;
        let frontCount = state.assets ? state.assets.length : 0;
        let backCount = state.backAssets ? state.backAssets.length : 0;
        let resultPrice = 0;

        state.assets && state.assets.map((value)=>{ frontAssetPrice += value.price; });
        state.backAssets && state.backAssets.map((value)=>{ backAssetPrice += value.price; });

        if(state.category === "embroidery"){
            resultPrice = (state.price + (getOptionPrice()) + categoryPrice[state.category]);
        }
        else if(state.category === "laser" || state.category === "laser_pre"){
            resultPrice = state.price + categoryPrice[state.category];
        }
        else{
            resultPrice = (state.price + (getOptionPrice()) +
                ((frontCount > 0 ? 1 : 0) * categoryPrice[state.category]) +
                ((backCount > 0 ? 1 : 0) * categoryPrice[state.category])
            )
        }

        return resultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    }

    useEffect(()=>{
        setCount(Number(localStorage.getItem("count") ? localStorage.getItem("count") : 1));
        localStorage.setItem("count",1);
    },[location]);

    return (
        <div className={styles.CustomWrap}>
            <div className={styles.CustomInner}>
                <SelectLayout titleA={title} text={"주문 내역을 확인해주세요"} border={false} custom={false} >
                    <div className={styles.ResultWrapper}>
                        <img alt="사용자가 그린 이미지" className={styles.CustomImage} src={(location.state||{})[isFront ? "img" : "img_back"]}/>
                        {/* <img alt="사용자가 그린 이미지" className={styles.CustomImage} src={"http://fig.asuscomm.com:5001/"+(location.state||{}).img}/> */}
                        {/* <img alt="상품 이미지" className={styles.BackgroundImage} src={(location.state||{}).color || type === 'embroidery'? GuideImage: (type === 'laser' || type === 'laser_pre')? GuideImage:GuideImageBlk}/> */}
                    </div>

                    <div className={styles.ColorBox}>
                        <div></div>
                        <div></div>
                    </div>
                    {
                        type !== 'laser_pre' && type !== 'laser' && type !== "embroidery" &&
                          <div className={styles.FrontBtn}>
                            <a className={isFront === true && styles.Active} onClick={()=>{setIsFront(true)}}>F</a>
                            <a className={isFront === false && styles.Active} onClick={()=>{setIsFront(false)}}>B</a>
                         </div>
                        // <img src={IconReset} alt="" className={styles.ResetBtn} onClick={()=>{ setIsFront(e => !e); }}/>
                    }
                </SelectLayout>
            </div>

            <SelectButton disabled={disabled} title={buttonTitle} link={nextClick} next={true}/>
        </div>
    );
}

export default FinishContents;
