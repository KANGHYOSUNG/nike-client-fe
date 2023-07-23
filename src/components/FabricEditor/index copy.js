import React, { useEffect, useState, useRef } from 'react';
import {fabric} from 'fabric';  


export default function FabricEditor({initRef,type}) {
  const fabricRef = useRef();

  const useFabric = (canvas) => {
    const fabricRef = React.useCallback((element) => {
  
      if (!element) return canvas.current?.dispose();
  
      canvas.current = new fabric.Canvas(
          element, 
          {
              backgroundColor: '#eee',
              isDrawingMode : false
          },
      );
    }, []);
    return fabricRef;
  };
  
  function MyFabric(props) {
    const {canvas,initRef} = props;
    const fabricRef = useFabric(canvas);
    initRef(canvas);
    return <canvas ref={fabricRef} width={640} height={360} />;
  }

  return (
    <div >
      {/* <MyToolKit canvas={fabricRef} />
      <MyDrawKit canvas={fabricRef} /> */}
      <MyFabric canvas={fabricRef} initRef={initRef}/>
    </div>
  );
}