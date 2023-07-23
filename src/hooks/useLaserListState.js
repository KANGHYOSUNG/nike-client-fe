import { useState, useEffect } from "react";

const useLaserListState = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const init = () => {
      setList([
        {
          path: "/laser_pre/item",
          title:"NBY PRE-SET DESIGN",
          text:"NBY 프리디자인",
          fullWidth:true
        },
        {
          path: "/laser/item",
          title:"CUSTOM DRAWING",
          text:"커스텀 드로잉",
          fullWidth:true
        }
      ]);
    };
    
    if(list.length === 0)
      init();

  },[list.length]);

  return list;
};

export default useLaserListState;