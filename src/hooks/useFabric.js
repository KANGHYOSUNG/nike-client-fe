import {useState, useRef, useEffect} from "react";
import {fabric} from 'fabric';
import uesBrush from './uesBrush';
import 'fabric-brush';

const useFabric = (state, assets, pageType) => {

    const [isFront, setIsFront] = useState(true);
    const [isDraw, setIsDraw] = useState(pageType);
    const [frontCanvas, setFrontCanvas] = useState("{}");
    const [backCanvas, setBackCanvas] = useState("{}");
    const [isFrontLoad, setIsFrontLoad] = useState(null);
    const [isBackLoad, setIsBackLoad] = useState(null);
    const [penType, setPenType] = useState(1);
    const [color, setColor] = useState("black");
    const [width, setWidth] = useState(5);
    const [backgroundPosition, setBackgroundPosition] = useState(0);
    const [group, setGroup] = useState(new fabric.Group([]));
    const [currentScale,setCurrentScale] = useState(0.6);
    const transformRef = useRef();
    const fabricRef = useRef();
    const backgroundRef = useRef();
    const brush = uesBrush();

    useEffect(() => {
        fabricRef.current.freeDrawingBrush.width = width;
    }, [width])

    useEffect(() => {
        setTimeout(function(){ fabricRef.current.isDrawingMode = isDraw; },200);
    }, [isDraw])

    function getNormalBrush() {
        return new fabric.PencilBrush(fabricRef.current);
    }

    function getCrayonBrush() {
        return new fabric.CustomSprayBrush(fabricRef.current);
    }

    function getCustomBrush() {
        return new fabric.CustomBrush(fabricRef.current);
    }

    function changePenType(type, _width) {

        if (type === "pen")
            fabricRef.current.freeDrawingBrush = getNormalBrush();
        else if (type === "spray") {
            fabricRef.current.freeDrawingBrush = getCrayonBrush();
        } else {
            fabricRef.current.freeDrawingBrush = getCustomBrush();
        }

        fabricRef.current.freeDrawingBrush.width = _width;
        fabricRef.current.freeDrawingBrush.color = color;
    }

    function updatePenState(color, lineWidth) {
        if (fabricRef && fabricRef.current) {
            fabricRef.current.isDrawingMode = true;
            fabricRef.current.freeDrawingBrush.width = lineWidth ? parseInt(lineWidth) : 5;
            fabricRef.current.freeDrawingBrush.color = color;
            setColor(color);
            setWidth(lineWidth ? parseInt(lineWidth) : 5);
        }
    }

    function addImage(imageParam, value, isClear, isHold) {
        fabricRef.current.isDrawingMode = false;

        var image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = function () {

            var hRatio = fabricRef.current.width / image.width;
            var vRatio = fabricRef.current.height / image.height;
            var ratio = Math.min(hRatio, vRatio);

            var imgInstance = new fabric.Image(image, {
                angle: 0,
                id: value.id,
                category: value.category,
                price: value.price,
                custom_id: 0,
                scaleX: pageType === "embroidery" ? .4 : 1,
                scaleY: pageType === "embroidery" ? .4 : 1,
            });
            if (pageType === 'embroidery')
                imgInstance.scaleToWidth(Math.min(state.masking_width, imgInstance.width, fabricRef.current.canvas.width) * 0.35);
            // imgInstance.scaleToHeight(Math.min(state.masking_height, imgInstance.height, fabricRef.current.height));
            else if (pageType === 'QR' || pageType === 'print') {
                imgInstance.scaleToWidth(Math.min(state.masking_width, imgInstance.width, fabricRef.current.canvas.width) / 2);
            } else if (pageType === "laser_pre")
                imgInstance.scaleToWidth(Math.min(state.masking_width, imgInstance.width, fabricRef.current.canvas.width) * 2);

            imgInstance.id = value.id;
            imgInstance.category = value.category;
            imgInstance.price = value.price;
            imgInstance.custom_id = value.custom_id ? value.custom_id : 0;

            if (isClear) {
                fabricRef.current.loadFromJSON({});
                fabricRef.current.selection = false;
            }

            fabricRef.current.add(imgInstance);

            if (isClear) {
                fabricRef.current.forEachObject(function (o) {
                    o.selectable = isHold ? false : true;
                    o.lockScalingX = true;
                    o.lockScalingY = true;
                });
            }
            fabricRef.current.forEachObject(function (o) {
                o.setControlsVisibility({
                    mt: false, // middle top
                    mb: false, // midle bottom
                    ml: false, // middle left
                    mr: false, // middle right
                    tl: true, //top left
                    tr: true, //top right
                    bl: true, //bottom left
                    br: true //bottom right
                });
            });


        };
        image.src = imageParam.src;
    }

    async function saveCanvas() {
        setFrontCanvas(isFront ? JSON.stringify(fabricRef.current) : frontCanvas);
        setBackCanvas(isFront ? backCanvas : JSON.stringify(fabricRef.current));
        setIsFrontLoad(true);
    }

    function loadCanvas() {
        let saveJSON = localStorage.getItem(`fabricSaveData${isFront}`);
        fabricRef.current.loadFromJSON(saveJSON);
    }

    function ungroup() {
        group.forEachObject((i) => {
            group.removeWithUpdate(i);
            fabricRef.current.add(i);
        });
    }

    async function getImage(src) {
        let resultImage = null;

        await new Promise(resolve => {

            try {
                const image = new Image();
                image.onload = function () {
                    resultImage = image;
                    resolve();
                };
                image.onerror = function () {
                    alert("이미지 로드에 실패하였습니다. 관리자에게 문의해주세요");
                    window.location.reload();
                }
                image.crossOrigin = 'anonymous';
                image.src = src;
            } catch (e) {

            }

        });
        return resultImage;
    }

    async function getResultImage(type) {

        fabricRef.current.loadFromJSON(JSON.parse(type === "front" ? frontCanvas : backCanvas));

        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 1400);
        });

        let canvas = document.createElement("canvas");

        await new Promise(resolve => {
            setTimeout(async function () {

                let resultImage = await getImage(state.options && state.options[0] && state.options[0][type === "front" ? "img" : "img_back"] ? state.options[0][type === "front" ? "img" : "img_back"] : state.thumbnail);
                let ratio = resultImage.height / resultImage.width;
                let height = ratio * 900;
                let ctx = canvas.getContext("2d");

                canvas.height = height;
                canvas.width = 900;

                ctx.drawImage(
                    resultImage,
                    0,
                    0,
                    900,
                    height,
                );
                var dataURL = fabricRef.current.toDataURL({format: 'png'});

                if (pageType === "laser") {
                    fabricRef.current.setZoom(0.7)
                    dataURL = fabricRef.current.toDataURL({format: 'png', multiplier: 20})
                }
                let fabricImage = await getImage(dataURL);
                let pos = state.masking_x || state.masking_width ? state : {
                    masking_width: 900,
                    masking_height: 900 * (2000 / 1620),
                    masking_x: 0,
                    masking_y: 0
                };
                ctx.drawImage(
                    fabricImage,
                    pos.masking_x * 2,
                    (((pos.masking_y * 2 ? pos.masking_y * 2 : 0)) - (((900 * (2000 / 1620)) - height) / 2)),
                    fabricRef.current.width,
                    fabricRef.current.height,
                );

                resolve();
            }, 1000);
        });

        return canvas;
    }

    function onUndoDraw() {
        for (let i = fabricRef.current._objects.length - 1; i > -1; i--) {
            let object = fabricRef.current._objects[i];
            fabricRef.current.remove(object);
            return;
        }
    }

    function onZoomIn(){
        setCurrentScale(e => {
            if(e < 1.5)
                e += .13;
            transformRef.current.style.webkitTransform = `scale(${e}) `;
            fabricRef.current.isDrawingMode = isDraw;
            setTimeout(() => {
                fabricRef.current.isDrawingMode = isDraw;
            }, 250);
            setTimeout(() => {
                fabricRef.current.isDrawingMode = isDraw;
            }, 500);
            return e;
        })
    }

    function onZoomOut(){
        setCurrentScale(e => {
            if(e > 0.7)
                e -= .13;
            transformRef.current.style.webkitTransform = `scale(${e}) `;
            fabricRef.current.isDrawingMode = isDraw;
            setTimeout(() => {
                fabricRef.current.isDrawingMode = isDraw;
            }, 250);
            setTimeout(() => {
                fabricRef.current.isDrawingMode = isDraw;
            }, 500);
            return e;
        })
    }

    async function getUsedAssetsList(type) {

        fabricRef.current.loadFromJSON(JSON.parse(type === "front" ? frontCanvas : backCanvas));
        if (type === "laser" || type === "laser_pre") fabricRef.current.setBackgroundColor('white');
        fabricRef.current.renderAll();
        let resultList = [];

        await new Promise(resolve => {

            setTimeout(async function () {
                for (let i = fabricRef.current._objects.length - 1; i > -1; i--) {
                    let object = fabricRef.current._objects[i];

                    if (object && object.cacheKey) {

                        let detail = object.id ? object : assets.filter((v) => {
                            return encodeURI(v.img) === object.src;
                        })[0];
                        if (state.asset) {
                            detail = object.id ? object : state.asset;
                        }
                        resultList.push({
                            id: detail.id,
                            price: detail.price,
                            category: detail.category,
                            img: detail.img,
                        })

                    } else {
                    }
                }
                resolve();
            }, 1000);


        });
        return resultList;
    }


    async function getUsedCustomAssets(type) {
        fabricRef.current.loadFromJSON(JSON.parse(type === "front" ? frontCanvas : backCanvas));
        if (type === "laser" || type === "laser_pre") {
            fabricRef.current.setBackgroundColor('white')
        }
        ;
        fabricRef.current.renderAll();

        await new Promise(resolve => {
            setTimeout(function () {
                for (let i = fabricRef.current._objects.length - 1; i > -1; i--) {
                    let object = fabricRef.current._objects[i];
                    if (object && object.cacheKey) {
                        fabricRef.current.remove(object);
                    } else {
                    }
                }
                resolve();
            }, 1000);
        });

        if (fabricRef.current._objects.length == 0)
            return null;
        return fabricRef.current;
    }

    async function selectDeleteEvent() {

        for (let i = fabricRef.current._objects.length - 1; i > -1; i--) {
            let object = fabricRef.current._objects[i];
            fabricRef.current.remove(object);
        }

    }

    function updateBackground(front) {

        let backgroundContext = backgroundRef.current.getContext("2d");
        let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        let canvasHeight = 900 * (2000 / 1620);
        backgroundRef.current.height = canvasHeight;
        backgroundRef.current.width = 900;

        var image = new Image();
        //임시
        image.crossOrigin = 'anonymous';
        image.onload = function () {
            let ratio = image.height / image.width;
            let height = ratio * 900;
            backgroundContext.drawImage(
                image,
                0,
                (backgroundRef.current.height - height) / 2,
                backgroundRef.current.width,
                height,
            );
            setBackgroundPosition({width: 900, height: height});
            transformRef.current.style.webkitTransform = `scale(${currentScale}) `
        };

        image.src = state.options && state.options[0] && state.options[0][front ? "img" : "img_back"] ? state.options[0][front ? "img" : "img_back"] : state.thumbnail;
    }


    function clearEvent(changeType, isSkip) {

        if(isFront == changeType)
            return;
            

        if (!isSkip) {
            if (changeType)
                setBackCanvas(JSON.stringify(fabricRef.current));
            else
                setFrontCanvas(JSON.stringify(fabricRef.current));
        }

        fabricRef.current.loadFromJSON(JSON.parse(changeType ? frontCanvas : backCanvas));

        fabricRef.current.isDrawingMode = isDraw;
        setTimeout(() => {
            fabricRef.current.isDrawingMode = isDraw;
        }, 250);
        setTimeout(() => {
            fabricRef.current.isDrawingMode = isDraw;
        }, 500);
        updateBackground(changeType);
        setIsFront(changeType);
    }

    function changeDrawMode(_isDraw) {
        setIsDraw(_isDraw);
        console.log(_isDraw)
        fabricRef.current.isDrawingMode = _isDraw;
        if(!_isDraw && fabricRef.current.setControlsVisibility){
            fabricRef.current.setControlsVisibility({
                mt: false, // middle top
                mb: false, // midle bottom
                ml: false, // middle left
                mr: false, // middle right
                tl: true, //top left
                tr: true, //top right
                bl: true, //bottom left
                br: true //bottom right
            });
        }
    }

    function initBrush() {

        fabric.BaseBrush.prototype.convertToImg = function () {
            var pixelRatio = fabricRef.current.getRetinaScaling(),
                c = fabric.util.copyCanvasElement(fabricRef.current.upperCanvasEl),
                xy = fabric.util.trimCanvas(c),
                img = new fabric.Image(c);
            fabricRef.current.add(img);
            img.set({
                left: xy.x / pixelRatio,
                top: xy.y / pixelRatio,
                'scaleX': 1 / pixelRatio,
                'scaleY': 1 / pixelRatio
            }).setCoords();
            fabricRef.current.clearContext(fabricRef.current.contextTop);
        }

        fabric.util.colorValues = function (color) {
            if (!color) {
                return;
            }
            if (color.toLowerCase() === 'transparent') {
                return [0, 0, 0, 0];
            }
            if (color[0] === '#') {
                if (color.length < 7) {
                    // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
                    color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
                }
                return [parseInt(color.substr(1, 2), 16),
                    parseInt(color.substr(3, 2), 16),
                    parseInt(color.substr(5, 2), 16),
                    color.length > 7 ? parseInt(color.substr(7, 2), 16) / 255 : 1];
            }
            if (color.indexOf('rgb') === -1) {
                // convert named colors
                var tempElem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
                var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
                tempElem.style.color = flag;
                if (tempElem.style.color !== flag) {
                    return; // color set failed - some monstrous css rule is probably taking over the color of our object
                }
                tempElem.style.color = color;
                if (tempElem.style.color === flag || tempElem.style.color === '') {
                    return; // color parse failed
                }
                color = getComputedStyle(tempElem).color;
                document.body.removeChild(tempElem);
            }
            if (color.indexOf('rgb') === 0) {
                if (color.indexOf('rgba') === -1) {
                    color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
                }
                return color.match(/[.\d]+/g).map(function (a) {
                    return +a
                });
            }
        }
        fabric.CustomSprayBrush = brush.initSpray();
        fabric.CustomBrush = brush.initBrush();
    }

    useEffect(() => {
        if (pageType === "laser" && fabricRef.current) {
            fabricRef.current.setDimensions({
                width: Number(fabricRef.current.canvas.style.width.split('px')[0]) * 1.8,
                height: Number(fabricRef.current.canvas.style.height.split('px')[0]) * 1.8
            })
            fabricRef.current.setZoom(1.8)
        }
    }, [fabricRef.current, pageType])

    // useEffect(()=> {
    //     if(fabricRef.current.canvas){
    //         fabricRef.current.canvas.style.width = Number(fabricRef.current.canvas.style.width.split('px')[0]) * 1.4 + 'px'
    //         fabricRef.current.canvas.style.height = Number(fabricRef.current.canvas.style.height.split('px')[0]) * 1.4 + 'px'
    //     }}, [fabricRef.current?.canvas])

    initBrush();
    return {
        updateBackground,
        getUsedCustomAssets,
        frontCanvas,
        backCanvas,
        getResultImage,
        getUsedAssetsList,
        updatePenState,
        penType,
        setPenType,
        fabricRef,
        backgroundRef,
        addImage,
        changePenType,
        clearEvent,
        selectDeleteEvent,
        changeDrawMode,
        saveCanvas,
        isFrontLoad,
        isBackLoad,
        setIsBackLoad,
        onUndoDraw,
        getImage,
        isFront,
        transformRef,
        onZoomIn,
        onZoomOut,
    };
};

export default useFabric;
