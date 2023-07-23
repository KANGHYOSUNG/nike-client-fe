import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import {Header, SelectSizeContents} from "components";
import styles from './style.module.scss';


function SelectSizePage() {
    const {type} = useParams();
    const [totalList, setTotalList] = useState([])
    const [status, setStatus] = useState()

    useEffect(() => {
        if (type === "QR") {
            setTotalList([1, 2, 3, 4, 5, 6]);
            setStatus(4)
        }
        else if (type === "print") {
            setTotalList([1, 2, 3, 4, 5]);
            setStatus(3)
        }
        else{
            setTotalList([1, 2, 3, 4,5]);
            setStatus(3)
        }

    }, [type])

    return (
        <div className={styles.Container}>
            <Header back={true} price={true} step={true} total={totalList} status={status}/>

            <div className={styles.ContentInner}>
                <SelectSizeContents/>
            </div>
        </div>
    );
}

export default SelectSizePage;
