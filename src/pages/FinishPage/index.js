import React, {useState, useEffect} from "react";
import {useParams,useLocation} from 'react-router-dom';
import {Header, FinishModal, FinishContents} from "components";
import styles from './style.module.scss';

function FinishPage() {
    const [second,setSecond] = useState(4);
    const {type} = useParams();
    const [totalList, setTotalList] = useState([])
    const [status, setStatus] = useState();
    const location = useLocation();
    const [modalOption, setModalOption] = useState({show: true, name: location.state.name});

    useEffect(() => {
        if (type === "QR" || location.state.category === "QR") {
            setTotalList([1, 2, 3, 4, 5, 6]);
            setStatus(6)
        } else if (type === "print" || location.state.category === "print") {
            setTotalList([1, 2, 3, 4, 5]);
            setStatus(5)
        } else if (type === "embroidery" || location.state.category === "embroidery") {
            setTotalList([1, 2, 3]);
            setStatus(3)
        } else if (type === "laser_pre" || location.state.category === "laser") {
            setTotalList([1, 2, 3]);
            setStatus(3)
        } else if (type === "laser" || location.state.category === "laser") {
            setTotalList([1, 2, 3]);
            setStatus(3)
        }else{
            setTotalList([1, 2, 3]);
            setStatus(3)
        }

        localStorage.setItem("count",1);

    setTimeout(()=>{
      window.location.replace("/");
    },[5000]);
    
    //10초인 경우 Interval 처리 예정
    setTimeout(()=>{ setSecond(4); },[1000]);
    setTimeout(()=>{ setSecond(3); },[2000]);
    setTimeout(()=>{ setSecond(2); },[3000]);
    setTimeout(()=>{ setSecond(1); },[4000]);

  },[])


    return (
        <div className={styles.Container}>
            <Header back={true} price={true} step={true} total={totalList} status={status} disabled={true}/>

            <div className={styles.ContentFull}>
                <FinishContents disabled={true} title={"FINISH"} buttonTitle={"PAY"}/>
            </div>
            <FinishModal second={second} modalOption={modalOption} setModalOption={setModalOption}/>
        </div>
    );
}

export default FinishPage;
