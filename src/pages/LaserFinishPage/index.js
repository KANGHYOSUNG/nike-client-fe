import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import {Header, LaserFinishContents} from "components";
import styles from './style.module.scss';

function LaserFinishPage() {
    const {type} = useParams();
    const [totalList, setTotalList] = useState([])
    const [status, setStatus] = useState();

    useEffect(() => {
        if (type === "QR") {
            setTotalList([1, 2, 3, 4, 5, 6]);
            setStatus(6)
        } else if (type === "print") {
            setTotalList([1, 2, 3, 4, 5]);
            setStatus(5)
        } else if (type === "embroidery") {
            setTotalList([1, 2, 3]);
            setStatus(3)
        } else if (type === "laser_pre") {
            setTotalList([1, 2, 3]);
            setStatus(3)
        } else if (type === "laser") {
            setTotalList([1, 2, 3]);
            setStatus(3)
        }
    }, [type])

    return (
        <div className={styles.Container}>
            <Header back={true} price={true} step={true} total={totalList} status={status}/>

            <div className={styles.ContentFull}>
                <LaserFinishContents title={"ORDER"} buttonTitle={"PAY"}/>
            </div>

        </div>
    );
}

export default LaserFinishPage;
