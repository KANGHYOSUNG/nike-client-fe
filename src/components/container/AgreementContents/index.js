import React, { useEffect, useState } from "react";
import { useNavigate,useParams, useLocation } from 'react-router-dom';
import styles from './style.module.scss'

import API from 'api';
// component
import { SelectButton } from 'components';


 function AgreementContents() {

    const [next,setNext] = useState(false);
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const location = useLocation();
    const { type } = useParams();
    const navigate = useNavigate();

    const nextClick = async () => {

      let state = JSON.parse(JSON.stringify(location.state));
      state.name = name;
      state.phone = phone.replace(/[^0-9]/g, '');
      state.option_id = 3;
      state.assets = { asset_list : state.assets };
      let category = state.category === "laser_pre" ? "laser" : state.category;
      category = category === "qr" ? "QR" : category;
      
      await API.postOrder(
        name, 
        phone, 
        true, 
        state.options && state.options[0] ? state.options[0].id : null, 
        category, 
        state.assets,
        state.img,
        state.img_back,
        state.work_img,
        state.work_img_back
      ); 
      state.assets = location.state.assets;
      return navigate(`/${type}/finish`,{state : state});
    }

    const generatePhoneNumber = (e) => {
      let value = e.nativeEvent.target.value;
      
      setPhone(value.replace(/[^0-9]/g,"").slice(0,11).replace(/^(\d{3,4})(\d{4,5})(\d{4})$/, `$1-$2-$3`));
    }

    useEffect(()=>{
        setNext(phone.length===13);
    },[name,phone]);

  return (
    <div className={styles.PrivacyContainer}>
        <div className={styles.PrivacyTitle}>
            <p>주문자 정보를 입력해주세요</p>
        </div>
        <div className={styles.PriceWrapper}>
            <i className={styles.BorderBox}></i>
            <i className={styles.BorderBox}></i>
            <i className={styles.BorderBox}></i>
            <i className={styles.BorderBox}></i>
            
            <div className={styles.AgreementWrap}>
                {/*<div className={styles.AgreementRow}>
                    <p>NAME</p>
                    <input type="text" value={name} onChange={e=>setName(e.nativeEvent.target.value)}/>
                </div>*/}
                <div className={styles.AgreementRow}>
                    <p>PHONE</p>
                    <input type="text"  value={phone} onChange={generatePhoneNumber}/>
                </div>
            </div>
        </div>
        <SelectButton title="OK" link={nextClick} next={next}/>
    </div>
  );
}

export default AgreementContents;
