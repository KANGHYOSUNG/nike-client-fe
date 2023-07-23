import { useState, useEffect } from "react";

import PreImg1 from "resources/image/design_img1.svg";
import PreImg2 from "resources/image/design_img2.svg";
import PreImg3 from "resources/image/design_img3.svg";
import PreImg4 from "resources/image/design_img4.svg";
import PreImg5 from "resources/image/design_img5.svg";

const usePreDsListState = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const init = () => {
      setList([
        {  id:1, price:1200,category:"laser",src: PreImg1 },
        {  id:1, price:1200,category:"laser",src: PreImg2 },
        {  id:1, price:1200,category:"laser",src: PreImg3 },
        {  id:1, price:1200,category:"laser",src: PreImg4 },
        {  id:1, price:1200,category:"laser",src: PreImg5 },
        {  id:1, price:1200,category:"laser",src: PreImg1 },
        {  id:1, price:1200,category:"laser",src: PreImg2 },
        {  id:1, price:1200,category:"laser",src: PreImg3 },
        {  id:1, price:1200,category:"laser",src: PreImg4 },
        {  id:1, price:1200,category:"laser",src: PreImg5 },
        {  id:1, price:1200,category:"laser",src: PreImg1 },
        {  id:1, price:1200,category:"laser",src: PreImg2 },
        {  id:1, price:1200,category:"laser",src: PreImg3 },
        {  id:1, price:1200,category:"laser",src: PreImg4 },
        {  id:1, price:1200,category:"laser",src: PreImg5 },
        {  id:1, price:1200,category:"laser",src: PreImg1 },
        {  id:1, price:1200,category:"laser",src: PreImg2 },
        {  id:1, price:1200,category:"laser",src: PreImg3 },
        {  id:1, price:1200,category:"laser",src: PreImg4 },
        {  id:1, price:1200,category:"laser",src: PreImg5 },
        {  id:1, price:1200,category:"laser",src: PreImg1 },
        {  id:1, price:1200,category:"laser",src: PreImg2 },
        {  id:1, price:1200,category:"laser",src: PreImg3 },
        {  id:1, price:1200,category:"laser",src: PreImg4 },
        {  id:1, price:1200,category:"laser",src: PreImg5 },
      ]);
    };
    
    if(list.length === 0)
      init();

  },[list.length]);

  return list;
};

export default usePreDsListState;