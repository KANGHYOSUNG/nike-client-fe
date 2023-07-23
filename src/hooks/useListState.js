import { useState, useEffect } from "react";

const useListState = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const init = () => {
      setList([
        {
          path: "/QR",
          title:"PHOTO SCANPRINTING",
          text:"포토 스캔 프린팅",
          size:"large", 
          color:"blue",
          fullWidth:true
        },
        {
          path: "/print/item",
          title:"NBY DIGITALPRINTING",
          text:"나이키 바이 유 디지털 프린팅",
          size:"small", 
          color:"pink",
          fullWidth:true
        },
        {
          path: "/embroidery/item",
          title:"EMBROIDERY",
          text:"자수 서비스",
          size:"small", 
          color:"blue",
          fullWidth:true
        },
        {
          path: "/laser/menu",
          title:"LASER GUN PRINT",
          text:"레이저건 프린팅",
          size:"medium", 
          color:"grey",
          fullWidth:true
        }
      ]);
    };
    
    if(list.length === 0)
      init();

  },[]);

  return list;
};

export default useListState;