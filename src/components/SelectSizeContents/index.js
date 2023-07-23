import React,{useState,useEffect} from 'react';
import { useNavigate,useParams,useLocation } from 'react-router-dom';
import styles from './style.module.scss'

// component
import { SelectLayout,SelectButton  } from 'components';

function SelectSizeContents() {

    const [size,setSize] = useState(0);
    const navigate = useNavigate();
    const [ detail, setDetail ] = useState(null);
    const { type } = useParams();
    const location = useLocation();
    const state = location.state;
    const options = state && state.options;

    const nextClick = () => {

        if(type === "laser"){
            return navigate(`/${type}/drawing`,{state : detail});
        }else if(type === "laser_pre"){
            return navigate(`/${type}/design`,{state : detail});
        }else{
            return navigate(`/${type}/custom`,{state : detail});
        }
    }

    const clickSizeItem = (item) => {
        let object = JSON.parse(JSON.stringify(state));
        object.options = [item];
        setDetail(object);
    }

    useEffect(()=>{
        let object = JSON.parse(JSON.stringify(state));
        object.options = options ? options[0] : {};
        setDetail(object);
    },[])
    
    function getProductcImage(){
        return detail ? (detail.options[0] && detail.options[0].img ? detail.options[0].img : detail.img) : state.img;
    }


    return (
        <div className={styles.Container}>
            <SelectLayout titleA={"SELECT"} titleC={"SIZE"} text={"원하는 사이즈를 선택하세요."} border={true}>
                <img src={getProductcImage()} alt="" onError={()=>{ alert("상품에 옵션에 이미지가 없습니다."); }}/>
                <div className={styles.SizeBox}>
                    {
                        options && options[0] && options[0].map((value,index)=>{
                            if(value.size === " ")
                                return null;
                            return  <button className={size === index && styles.Active} onClick={()=>{ setSize(index); clickSizeItem(value); }}>{value.size}</button> 
                        })
                    }
                </div>
            </SelectLayout>
            
            <SelectButton title="OK" link={nextClick} next={true}/>
        </div>
    );
}

export default SelectSizeContents;