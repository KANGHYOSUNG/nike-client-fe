import React, {useState, useEffect, useMemo} from "react";
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {Header, SelectColorContents} from "components";
import styles from './style.module.scss';


function SelectColorPage() {
    const {type} = useParams();
    const [totalList, setTotalList] = useState([])
    const [status, setStatus] = useState()

    const location = useLocation()
    const navigate = useNavigate();

    const [options, setOptions] = useState([]);

    const productsByColor = useMemo(() => (
        // Color 값을 key로 갖는 object 생성
         ((location.state && location.state && location.state.options) || []).reduce((colorObject, option) => {
            if(!colorObject[option.color])
                colorObject[option.color] = []
            colorObject[option.color].push(option)
            return colorObject;
        }, {})

    ), [location])

    const getColorList = () => { 
        let array = [];
        for(let key in productsByColor){
            array.push(productsByColor[key]);
        }
        return array;
    }

    const onNext = () => {
        let stateData = JSON.parse(JSON.stringify(location.state));
        stateData.options = typeof options === "object" ? [options] : options;
        return navigate(`/${type}/size`, {state: stateData});
    }

    useEffect(() => {
        // @TODO : `new Array` 사용해서 배열 숫자 정의
        if (type.toLowerCase() === "qr") {
            setTotalList([1, 2, 3, 4, 5, 6]);
            setStatus(3)
        } else if (type.toLowerCase() === "print" || type.toLowerCase() === "embroidery") {
            setTotalList([1, 2, 3, 4, 5]);
            setStatus(2)
        }else{
            setTotalList([1, 2, 3]);
            setStatus(2)
        }
        setOptions(getColorList()[0]);
    }, [type])

    return (
        <div className={styles.Container}>
            <Header back={true} price={true} step={true} total={totalList} status={status}/>
            <div className={styles.ContentInner}>
                <SelectColorContents
                    type={type}
                    onNext={onNext}
                    productImage={((options && options[0]) && options[0].img) ? options[0].img : location.state.img}
                    onChangeColor={option => setOptions(option)}
                    list={getColorList()}
                />
            </div>

        </div>
    );
}

export default SelectColorPage;
