import React, {useState, useEffect, useMemo} from "react";
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import {Header, SelectItemContents} from "components";
import styles from './style.module.scss';
import useProducts from "../../hooks/useProducts";
import { LoadingModal, TextModal } from "components/Modals";

function SelectItemPage() {
    const {type} = useParams();
    const [totalList, setTotalList] = useState([1,2,3,4,5])
    const [status, setStatus] = useState(1);
    const [products, , onSelectItem] = useProducts(type === "laser_pre" ? "laser" : type);
    const [modalOption, setModalOption] = useState({show: true, description:"종이에 테스트 후 상품에 인쇄 해주세요"});
    
    const location = useLocation();
    const navigate = useNavigate();

    const selectedItem = useMemo(()=>{
        return products.filter((product) => product.isActive)[0]
    },[products])

    const onNext = () => {

        let item = selectedItem ? selectedItem : (products ? products[0] : null);
        if(item === null || item.img === null){
            alert("선택된 상품이 없습니다.");
            return;
        }

        let path = `/${type}/color`

        if (type === "embroidery") {
            path = `/${type}/color`
            // path = `/${type}/custom`
        } else if (type === "laser_pre") {
            // path = `/${type}/design`
            path = `/${type}/custom`
        } else if (type === "laser") {
            path = `/${type}/drawing`
        }

        if(location.state && location.state.asset)
            item.asset = location.state.asset;
        navigate(path, {state: item})
    }

    useEffect(() => {
        let totalStepLength = 3
        let currentStep = 1
        if (type.toLowerCase() === "qr") {
            totalStepLength = 6
            currentStep = 2
            setTotalList([1, 2, 3, 4, 5, 6]);
        } else if (type.toLowerCase() === "print"|| type.toLowerCase() === "embroidery") {
            totalStepLength = 5;
            setTotalList([1, 2, 3, 4, 5]);
        }else   
            setTotalList([1,2,3])

        setStatus(currentStep)
    }, [type])

    return (
        <div className={styles.SlideContainer}>
            <Header
                back={true}
                price={true}
                step={true}
                total={totalList}
                status={status}
            />
            <SelectItemContents
                type={type}
                products={products}
                selectedProduct={selectedItem}
                onSelectItem={onSelectItem}
                onNext={onNext}
            />
            {/* {
                type === "laser" ?
                <TextModal modalOption={modalOption} setModalOption={setModalOption}/>
                :
                null
            } */}
        </div>
    );
}

export default SelectItemPage;