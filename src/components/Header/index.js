//react
import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';

// img
import IconBack from 'resources/icon/icon_back.svg'
import IconHome from 'resources/icon/icon_home.svg'

import IconPrice from 'resources/icon/icon_purchase.svg'
import IconBill from 'resources/icon/icon_price.svg'

export default function Header({back,price,step,total,status,disabled}) {
  const navigate = useNavigate();
  const linkClick = (path) => {
    return navigate(path);
  }

  const activeStyle = {
      backgroundColor :"#000000",
  }


  return (
      <div className={styles.HeaderContainer}>
        <div className={styles.HomeBtnBox}>
          {back && <img src={IconBack} alt="뒤로가기" className={styles.Back} onClick={()=>{!disabled && linkClick(-1)}}/>}
          <img src={IconHome} alt="홈" className={styles.Home} onClick={()=>{!disabled && linkClick('/')}}/>
        </div>
        <div >
        {step && 
          <div className={styles.StepBox}>
            {
              total.map((i, index)=>{
                return (
                  <div key={index + " step status"} style={status >= i ? activeStyle : null}></div>
                )
              })
            }
            
          </div>
        }
        </div>
        {/* <img src={IconBack} alt="header image" /> */}
        {price && <img src={true ? IconPrice : IconBill} alt="가격표" className={styles.Price} onClick={()=>{ !disabled && linkClick('/price')}}/>}
        
      </div>
  );
}
