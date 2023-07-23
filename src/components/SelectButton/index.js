import React from "react";
import styles from './style.module.scss';

function SelectButton({title,link,next,disabled}) {

  return (
      <button
          disabled={disabled}
        onClick={next ? link : ()=>{}}
        className={next ? styles.ActiveSelectButton : styles.SelectButton}
      >
        {title}
      </button>
  );
}

export default SelectButton;
