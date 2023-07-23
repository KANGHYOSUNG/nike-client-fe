// import { useState, useRef} from "react";
// import {fabric} from 'fabric';  
// import uesBrush from './uesBrush';
// import 'fabric-brush';

// const useSaveImage = () => {

//   function getImage(src){
//     var image = new Image();
//     image.src = src;
//     image.crossOrigin = 'Anonymous';
//     image.onload = function() {
//       ctx.drawImage(
//         image,
//         -((fabricRef.current.width - backgroundRef.current.width) / 2),
//         0,
//         fabricRef.current.width,
//         fabricRef.current.height,
//       )
//     };
//   }

//   function selectDeleteEvent(){

//     // for(let i = fabricRef.current._objects.length - 1;i > -1 ;i--){
//     //   let object = fabricRef.current._objects[i];
//     //   if(object && object.cacheKey){
//     //     fabricRef.current.remove(object);
//     //   }else{ }
//     // }

//     fabricRef.current.setBackgroundColor(null);
//     fabricRef.current.renderAll();

//     let canvas = document.createElement("canvas");
//     let fabricContext = fabricRef.current.getContext('2d');
//     let backgroundContext = backgroundRef.current.getContext('2d');
//     let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
//     let canvasHeight = vw *(1100/1620);
//     canvas.height = canvasHeight;
//     canvas.width = 450;
//     let ctx = canvas.getContext("2d");
//     backgroundRef.current.height= canvasHeight;

//     var image = new Image();
//     image.src = "http://fig.asuscomm.com:5001/static/img/test1.png";
//     image.crossOrigin = 'Anonymous';
//     image.onload = function() {
//       let ratio = image.height / image.width;
//       let height = ratio * backgroundRef.current.width;
//       backgroundContext.drawImage(
//         image,
//         0,
//         (backgroundRef.current.height - height) / 2,
//         backgroundRef.current.width,
//         height,
//       )

//       ctx.drawImage(
//         image,
//         0,
//         (backgroundRef.current.height - height) / 2,
//         backgroundRef.current.width,
//         height,
//       )
      
//       var dataURL = fabricRef.current.toDataURL("image/jpg");
      
//       getImage(dataURL)
//     };


//     setTimeout(()=>{
//       const clearBackgroundImage = canvas.toDataURL({
//         format: 'png',
//         quality: 1
//       });
//       let atag = document.createElement("a");
//       atag.href = clearBackgroundImage;
//       atag.setAttribute("download","true")
//       // atag.click();
//     },1000);

//     return;
//     fabricRef.current.add(group);


//     // console.log(fabricRef.current._objects);

//     return;
//     fabricRef.current.remove(fabricRef.current.getActiveObject());
//     fabricRef.current.renderAll(); 
//   }

//   return { 
//     updatePenState,penType,setPenType,fabricRef,backgroundRef,addImage,changePenType,clearEvent,selectDeleteEvent,changeDrawMode,saveCanvas};
// };

// export default useFabric;