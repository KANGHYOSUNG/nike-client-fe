import React from 'react';
import {fabric} from 'fabric';  
import styles from './style.module.scss'

// img

const useFabric = (canvas) => {
  const fabricRef = React.useCallback((element) => {

    if (!element) return canvas.current?.dispose();

    canvas.current = new fabric.Canvas(
        element, 
        {
          isDrawingMode:false
          // backgroundColor:"blue"
        },
    );
    canvas.current.canvas = element
  }, [canvas]);
  return fabricRef;
};

function MyFabric(props) {
  const {canvas,marker} = props;
  const fabricRef = useFabric(canvas);
  let pos = marker ? marker : { masking_width : 450, masking_height : 450 * (2000/1620),masking_x:0, masking_y : 0};

 
  const style = {
    border: '2px dashed #04F404',
    height:"100%",
    marginLeft:pos.masking_x * 2,
    marginTop:(pos.masking_y * 2 ? pos.masking_y * 2 : pos.masking_y),
  }
  // const style = {
  //   border: '2px dashed #04F404',
  //   height:"100%",
  //   marginLeft:pos.masking_x ,
  //   marginTop:pos.masking_y,
  // }
  return (
      <canvas
        ref={fabricRef}
        width={pos.masking_width * 2}
        height={pos.masking_height * 2}
        style={style}/>

  );
}

function FabricEditor({fabricRef,marker}) {

  return (
    <MyFabric canvas={fabricRef} marker={marker} className={styles.FabricStyle}/>
  );
}

export default  React.memo(FabricEditor);
