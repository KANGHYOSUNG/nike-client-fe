import React from 'react';
import styles from './style.module.scss'

// component
import {SelectLayout, SelectButton} from 'components';

// img


function SelectColorContents({onNext, onChangeColor, productImage, list}) {

    return (
        <div className={styles.Container}>
            <SelectLayout titleA={"SELECT"} titleC={"COLOR"} text={"원하는 컬러를 선택하세요."} border={true} isSelect={true}>
                <img src={productImage} alt="이미지" onError={()=>{ alert("상품에 옵션에 이미지가 없습니다."); }}/>
                <div className={styles.ColorBox}>
                    {
                        list && list.map((value)=>{
                            if(value[0].color === " ")
                                return null;

                            return (
                                <div style={{backgroundColor:value[0].color}} onClick={() => {onChangeColor && onChangeColor(value)}}></div>
                            )
                        })
                    }
                </div>
            </SelectLayout>
            <SelectButton title="OK" link={onNext} next={true}/>
        </div>
    );
}

export default SelectColorContents;