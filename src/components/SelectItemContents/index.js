import React from 'react';
import styles from './style.module.scss'

// component
import {SelectSlideLayout, SelectButton} from 'components';

function SelectItemContents({type, products, onSelectItem, onNext, selectedProduct}) {
    
    return (
        <div className={styles.Container}>
            <SelectSlideLayout
                titleA={"SELECT"}
                titleC={"ITEM"}
                text={"원하시는 상품을 선택해주세요"}
                border={true}
                slide={true}
                products={products}
                updateActiveItem={onSelectItem}
                type={type}
            />
            <SelectButton title="OK" link={onNext} next={true} />
        </div>
    );
}

export default SelectItemContents;
