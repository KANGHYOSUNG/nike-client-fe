import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import styles from './style.module.scss'

// component
import { SelectButton } from 'components';


function PrivacyContents() {
    const [next,setNext] = useState(false);
    const [isKorea,setIsKorea] = useState(true);
    const [chkBoxStateA, setChkBoxStateA] = useState(false);
    const [chkBoxStateB, setChkBoxStateB] = useState(false);
    const location = useLocation();

    const navigate = useNavigate();

    useEffect(()=>{
        setNext(chkBoxStateA && chkBoxStateB);
    },[chkBoxStateA,chkBoxStateB])
    
    const nextClick = () => {
      let state = location.state;
      state = state ? state : {};
      state.is_agreed = true;
      return navigate('/menu',{state : state});
    }

  return (
    <div className={styles.PrivacyContainer}>
        <div className={styles.PrivacyTitle}>
            <p>개인정보 사용에 관한 동의서</p>
        </div>
        <div className={styles.LangBtn}>
            <p style={isKorea ? {backgroundColor:'#04F404', color: '#fff'} : {}} onClick={()=>{setIsKorea(true)}}>KR</p>
            <p style={!isKorea ? {backgroundColor:'#04F404', color: '#fff'} : {}} onClick={()=>{setIsKorea(false)}}>EN</p>
        </div>
        {
            isKorea ? 
            <div className={styles.PrivacyWrapper}>
                <div className={styles.PrivacyTop}></div>
                <div className={styles.PrivacyBox}>
                    <p className={styles.BoxTitle}>· 개인정보 수집 및 이용에 관한 사항</p>
                    <p className={styles.BoxText}>유한회사 나이키 코리아는 (이하 "당사")는 다음과 같이 귀하의 개인정보를<br/>수집, 이용합니다.</p>
                    <p>- 수집항목 : 휴대폰 번호, 촬영 원본</p>
                    <p>- 이용목적 : 완성 촬영본 전달을 위한 연락처 확보</p>
                    <p className={styles.BoldText}>- 수집, 이용 기간 : 문자 전송 시점 이후 24시간, 이후 수집 자료 폐기</p>
                    <p>- 해당 수집에 관하여 거부할 권리가 있으며 이를 거부할 경우 완성본을<br/>받으실 수 없습니다.</p>
                    <div className={styles.ChkBox}>
                        <input type="checkbox" id="chk1" checked={chkBoxStateA}  onChange={()=>{ setChkBoxStateA(!chkBoxStateA)}}/>
                        <label htmlFor="chk1">
                            <div className={styles.chk}></div>
                            <p>개인정보 수집 및 이용에 관한 동의 (필수)</p>
                        </label>
                    </div>
                    <p className={styles.BoxTitle}>· 개인정보 취급 위탁에 관한 사항</p>
                    <p className={styles.BoxText}>유한회사 나이키 코리아는 원활한 진행을 위하여 아래의 전문업체에 업무를<br/>위탁 처리하고 있습니다.</p>
                    <p>- 수탁자 : 피이그(FIG)주식회사</p>
                    <p>- 위탁하는 업무의 내용 : 이미지 전달 업무, 구매 진행 관련 정보 전달 업무,<br/>수집항목에 대한 보안 업무</p>
                    <p className={styles.BoldText}>- 수집, 이용 기간 : 문자 전송 시점 이후 24시간, 이후 수집 자료 폐기</p>
                    <p>- 해당 수집에 관하여 거부할 권리가 있으며 이를 거부할 경우 완성본을<br/>받으실 수 없습니다.</p>
                    <div className={styles.ChkBox}>
                        <input type="checkbox" id="chk2" checked={chkBoxStateB} onChange={()=>{ setChkBoxStateB(!chkBoxStateB)}}/>
                        <label htmlFor="chk2">
                            <div className={styles.chk}></div>
                            <p>개인정보 수집 및 이용에 관한 동의 (필수)</p>
                        </label>
                    </div>
                </div>
            </div>
            :
            <div className={styles.PrivacyWrapper} style={{maxHeight:593, overflow:"auto"}}>
                <div className={styles.PrivacyTop}></div>
                <div className={styles.PrivacyBox}>
                    <p className={styles.BoxTitle}>· Personal information retention and use period</p>
                    <p className={styles.BoxText}>NIKE Korea.LLC collects your personal information as follows.</p>
                    <p>- Collected Personal Information: Mobile phone number, phone file.</p>
                    <p>- Purpose of Use: Collecting phone numbers for delivery of the<br/>finalized version of the picture.</p>
                    <p className={styles.BoldText}>- Retention and use period : Discard 24 hours after the time of<br/>text transmission.</p>
                    <p>- You have the right to refuse the collection, and if you refuse to do so, you will not be able to receive the finished copy.</p>
                    <div className={styles.ChkBox}>
                        <input type="checkbox" id="chk1" checked={chkBoxStateA}  onChange={()=>{ setChkBoxStateA(!chkBoxStateA)}}/>
                        <label htmlFor="chk1">
                            <div className={styles.chk}></div>
                            <p>Consent on personal information retention<br/>and use period (required)</p>
                        </label>
                    </div>
                    <p className={styles.BoxTitle}>· Contents of entrustment of personal information</p>
                    <p className={styles.BoxText}>NIKE Korea.LLC is entrusting its business to the following companies.</p>
                    <p>- Consignee : FIG CO., LTD.</p>
                    <p>- Consigned work : Photo delivery, delivery of information related<br/>to the purchase process, personal information security.</p>
                    <p className={styles.BoldText}>- Retention and use period : Discard 24 hours after the time of<br/>text transmission</p>
                    <p>- You have the right to refuse the collection, and if you refuse to do so,<br/>you will not be able to receive the finished copy.</p>
                    <div className={styles.ChkBox}>
                        <input type="checkbox" id="chk2" checked={chkBoxStateB} onChange={()=>{ setChkBoxStateB(!chkBoxStateB)}}/>
                        <label htmlFor="chk2">
                            <div className={styles.chk}></div>
                            <p>Consent to consignment of personal<br/>information processing (required)</p>
                        </label>
                    </div>
                </div>
            </div>
        }
        <SelectButton title="OK" link={nextClick} next={next}/>
    </div>
  );
}

export default PrivacyContents;
