import {fabric} from 'fabric';
import 'fabric-brush';

const uesBrush = () => {

    function initBrush() {
        return fabric.util.createClass(fabric.BaseBrush, {
            width: 10,
            shadow: {
                color: "black",
                blur: 6,
                offsetX: 1,
                offsetY: 1
            },
            maxPivot: 6,
            density: 20,
            dotWidth: 1,
            dotWidthVariance: 1,
            randomOpacity: false,
            optimizeOverlapping: true,
            initialize: function (canvas) {
                this.canvas = canvas;
                this.sprayChunks = [];
            },
            onMouseDown: function () {
                this.sprayChunks.length = 0;
                this.canvas.clearContext(this.canvas.contextTop);
                // this._setShadow();
            },

            /**
             * Invoked on mouse move
             * @param {Object} pointer
             */
            onMouseMove: function (pointer) {
                this.addSprayChunk(pointer);
                this.render(this.sprayChunkPoints);
            },

            /**
             * Invoked on mouse up
             */
            onMouseUp: function () {
                const originalRenderOnAddRemove = this.canvas.renderOnAddRemove;
                this.canvas.renderOnAddRemove = false;

                let rects = [];

                let firstPart = this.sprayChunks.length * .6 >= this.maxPivot ? this.maxPivot : this.sprayChunks.length * .6;
                let firstSize = 0;
                let curSize = 0;
                let firstCount = 0;

                for (let i = 0, ilen = this.sprayChunks.length; i < ilen; i++) {
                    firstCount += this.sprayChunks[i].filter((v) => v.type !== "spray").length;
                    if (firstPart < i) {
                        break;
                    }
                }

                firstSize = (firstPart / firstCount);


                for (let i = 0, ilen = this.sprayChunks.length; i < ilen; i++) {
                    const sprayChunk = this.sprayChunks[i];

                    for (let j = 0, jlen = sprayChunk.length; j < jlen; j++) {

                        let width = sprayChunk[j].type === "spray" ? 1 : sprayChunk[j].width;
                        let radius = width;

                        if (sprayChunk[j].type !== "spray") {
                            radius = curSize = Math.min(curSize + firstSize, width);
                        }


                        const rect = new fabric.Circle({
                            radius: radius,
                            left: sprayChunk[j].x + 1,
                            top: sprayChunk[j].y + 1,
                            originX: 'center',
                            originY: 'center',
                            fill: this.color,
                            opacity: sprayChunk[j].opacity
                        });

                        rects.push(rect);
                    }
                }


                if (this.optimizeOverlapping) {
                    rects = this._getOptimizedRects(rects);
                }

                var group = new fabric.Group(rects);
                // this.shadow && group.set('shadow', new fabric.Shadow(this.shadow));
                // this.canvas.fire('before:path:created', { path: group });
                this.canvas.add(group);
                // this.canvas.fire('path:created', { path: group });

                this.canvas.clearContext(this.canvas.contextTop);
                // this._resetShadow();
                this.canvas.renderOnAddRemove = originalRenderOnAddRemove;
                this.canvas.requestRenderAll();
            },

            /**
             * @private
             * @param {Array} rects
             */
            _getOptimizedRects: function (rects) {

                // avoid creating duplicate rects at the same coordinates
                var uniqueRects = {}, key, i, len;

                for (i = 0, len = rects.length; i < len; i++) {
                    key = rects[i].left + '' + rects[i].top;
                    if (!uniqueRects[key]) {
                        uniqueRects[key] = rects[i];
                    }
                }
                var uniqueRectsArray = [];
                for (key in uniqueRects) {
                    uniqueRectsArray.push(uniqueRects[key]);
                }

                return uniqueRectsArray;
            },

            /**
             * Render new chunk of spray brush
             */
            render: function (sprayChunk, isShalf) {
                var ctx = this.canvas.contextTop, i, len;
                ctx.fillStyle = this.color;

                this._saveAndTransform(ctx);

                for (i = 0, len = sprayChunk.length; i < len; i++) {
                    var point = sprayChunk[i];
                    ctx.fillRect(point.x, point.y, point.width + (isShalf ? -point.width / 2 : 0), point.width + (isShalf ? -point.width / 2 : 0));
                }
                ctx.restore();
            },

            /**
             * Render all spray chunks
             */
            _render: function () {
                var ctx = this.canvas.contextTop, i, ilen;
                ctx.fillStyle = this.color;

                this._saveAndTransform(ctx);

                for (i = 0, ilen = this.sprayChunks.length; i < ilen; i++) {
                    this.render(this.sprayChunks[i]);
                }
                ctx.restore();
            },

            getBetweenPoints: function (point) {

                let points = [point];
                let sprayChunks = this.sprayChunks;
                if (!sprayChunks[sprayChunks.length - 1]) return points;
                let lastPos = sprayChunks[sprayChunks.length - 1][0];
                if (!lastPos) return points;

                let xType = lastPos.x < point.x;
                let yType = lastPos.y < point.y;

                let currentX = lastPos.x;
                let currentY = lastPos.y;

                let absX = Math.abs(lastPos.x - point.x);
                let absY = Math.abs(lastPos.y - point.y);


                let rateCount = 14;

                let maxRate = absX / rateCount;
                let minRate = absY / rateCount;

                // return points;
                while (true) {

                    if (xType && point.x > currentX) {
                        currentX = currentX + maxRate;
                    }
                    if (!xType && point.x < currentX) {
                        currentX = currentX - maxRate;
                    }
                    if (!yType && point.y < currentY) {
                        currentY = currentY - minRate;
                    }
                    if (yType && point.y > currentY) {
                        currentY = currentY + minRate;
                    }


                    let cx = fabric.util.getRandomInt(currentX - 2, currentX + 2);
                    let cy = fabric.util.getRandomInt(currentY - 2, currentY + 2);

                    let p = new fabric.Point(cx, cy);
                    p.width = this.width;
                    p.type = "normal";
                    p.opacity = 1;


                    // for(var i =0;i<2;i++){
                    let width = 1;

                    let radius = fabric.util.getRandomInt(10, 20);
                    if (this.sprayChunks.length < this.maxPivot) {
                        radius = fabric.util.getRandomInt(1, 10);
                    }

                    let x = fabric.util.getRandomInt(currentX - radius, currentX + radius);
                    let y = fabric.util.getRandomInt(currentY - radius, currentY + radius);

                    var sprayPoint = new fabric.Point(x, y);
                    sprayPoint.width = width;
                    sprayPoint.opacity = 0.1;
                    sprayPoint.type = "spray";
                    points.push(sprayPoint);
                    // }

                    points.push(p);

                    if (((xType && point.x <= currentX) || (!xType && point.x >= currentX))
                        && ((!yType && point.y >= currentY) || (yType && point.y <= currentY))) {
                        return points;
                    }

                }

            },
            /**
             * @param {Object} pointer
             */
            addSprayChunk: function (pointer) {
                this.sprayChunkPoints = [];
                let width = this.dotWidth;


                if (this.dotWidthVariance) {
                    width = fabric.util.getRandomInt(
                        Math.max(1, this.dotWidth - this.dotWidthVariance),
                        this.dotWidth + this.dotWidthVariance);
                }
                const point = new fabric.Point(pointer.x, pointer.y);
                point.width = width;

                point.opacity = fabric.util.getRandomInt(0, 100) / 100;

                this.sprayChunkPoints = this.sprayChunkPoints.concat(this.getBetweenPoints(point));
                this.sprayChunks.push(this.sprayChunkPoints);

            }
        });
    }


    function initSpray() {
        return fabric.util.createClass(fabric.BaseBrush, {

            width: 10,
            maxPivot: 1,
            density: 20,
            dotWidth: 1,
            dotWidthVariance: 1,
            randomOpacity: false,
            optimizeOverlapping: true,
            initialize: function (canvas) {
                this.canvas = canvas;
                this.sprayChunks = [];
            },

            /**
             * Invoked on mouse down
             * @param {Object} pointer
             */
            onMouseDown: function (pointer) {
                this.sprayChunks.length = 0;
                this.canvas.clearContext(this.canvas.contextTop);
                // this._setShadow();

                // this.addSprayChunk(pointer);
                // this.render(this.sprayChunkPoints,true);
            },

            /**
             * Invoked on mouse move
             * @param {Object} pointer
             */
            onMouseMove: function (pointer) {
                // if (this.limitedToCanvasSize === true && this._isOutSideCanvas(pointer)) {
                //   return;
                // }
                this.addSprayChunk(pointer);
                this.render(this.sprayChunkPoints);
            },

            /**
             * Invoked on mouse up
             */
            onMouseUp: function () {
                const originalRenderOnAddRemove = this.canvas.renderOnAddRemove;
                this.canvas.renderOnAddRemove = false;

                let rects = [];

                let firstPart = this.sprayChunks.length * .4 >= this.maxPivot ? this.maxPivot : this.sprayChunks.length * .4;
                let firstSize = 0;
                let curSize = 1;
                let firstCount = 0;

                for (let i = 0; i < this.sprayChunks.length; i++) {
                    firstCount += this.sprayChunks[i].length;
                    if (firstPart < i) {
                        break;
                    }
                }

                firstSize = (firstPart / firstCount);


                for (let i = 0; i < this.sprayChunks.length; i++) {
                    var sprayChunk = this.sprayChunks[i];

                    for (let j = 0; j < sprayChunk.length; j++) {

                        let width = sprayChunk[j].width;

                        if (curSize <= width)
                            curSize = Math.min(curSize + firstSize + .004, width);

                        let radius = curSize;


                        const rect = new fabric.Rect({
                            width: radius,
                            height: radius,
                            left: sprayChunk[j].x + (radius / 2),
                            top: sprayChunk[j].y + (radius / 2),
                            originX: 'center',
                            originY: 'center',
                            fill: this.color,
                            opacity: 1// i <= firstPart ? .5 : .8
                        });

                        rects.push(rect);
                    }
                }


                if (this.optimizeOverlapping) {
                    rects = this._getOptimizedRects(rects);
                }

                const group = new fabric.Group(rects);
                // this.shadow && group.set('shadow', new fabric.Shadow(this.shadow));
                // this.canvas.fire('before:path:created', { path: group });
                this.canvas.add(group);
                // this.canvas.fire('path:created', { path: group });

                this.canvas.clearContext(this.canvas.contextTop);
                // this._resetShadow();
                this.canvas.renderOnAddRemove = originalRenderOnAddRemove;
                this.canvas.requestRenderAll();
            },

            /**
             * @private
             * @param {Array} rects
             */
            _getOptimizedRects: function (rects) {

                // avoid creating duplicate rects at the same coordinates
                let uniqueRects = {}, key;

                for (let i = 0; i < rects.length; i++) {
                    key = rects[i].left + '' + rects[i].top;
                    if (!uniqueRects[key]) {
                        uniqueRects[key] = rects[i];
                    }
                }
                const uniqueRectsArray = [];
                for (key in uniqueRects) {
                    uniqueRectsArray.push(uniqueRects[key]);
                }

                return uniqueRectsArray;
            },

            /**
             * Render new chunk of spray brush
             */
            render: function (sprayChunk, isShalf) {
                const ctx = this.canvas.contextTop;
                ctx.fillStyle = this.color;

                this._saveAndTransform(ctx);

                for (let i = 0; i < sprayChunk.length; i++) {
                    const point = sprayChunk[i];
                    if (typeof point.opacity !== 'undefined') {
                        // ctx.globalAlpha = point.opacity;
                    }
                    ctx.fillRect(point.x, point.y, point.width + (isShalf ? -point.width / 2 : 0), point.width + (isShalf ? -point.width / 2 : 0));
                }
                ctx.restore();
            },

            /**
             * Render all spray chunks
             */
            _render: function () {
                const ctx = this.canvas.contextTop;
                ctx.fillStyle = this.color;

                this._saveAndTransform(ctx);

                for (let i = 0; i < this.sprayChunks.length; i++) {
                    this.render(this.sprayChunks[i]);
                }
                ctx.restore();
            },

            getBetweenPoints: function (point) {

                const points = [point];
                const sprayChunks = this.sprayChunks;

                if (!sprayChunks[sprayChunks.length - 1])
                    return points;
                let lastPos = sprayChunks[sprayChunks.length - 1][0];
                if (!lastPos)
                    return points;

                let xType = lastPos.x < point.x;
                let yType = lastPos.y < point.y;

                let currentX = lastPos.x;
                let currentY = lastPos.y;

                let absX = Math.abs(lastPos.x - point.x);
                let absY = Math.abs(lastPos.y - point.y);


                let rateCount = 20;

                let maxRate = absX / rateCount;
                let minRate = absY / rateCount;

                // return points;
                while (true) {

                    if (xType && point.x > currentX) {
                        currentX = currentX + maxRate;
                    }
                    if (!xType && point.x < currentX) {
                        currentX = currentX - maxRate;
                    }
                    if (!yType && point.y < currentY) {
                        currentY = currentY - minRate;
                    }
                    if (yType && point.y > currentY) {
                        currentY = currentY + minRate;
                    }


                    let radius = 0;
                    let width = 1;

                    if (this.sprayChunks.length < this.maxPivot)
                        radius = this.width / 10;
                    else
                        radius = this.width / 4;

                    let x = fabric.util.getRandomInt(currentX - radius, currentX + radius);
                    let y = fabric.util.getRandomInt(currentY - radius, currentY + radius);


                    if (this.sprayChunks.length < this.maxPivot)
                        width = fabric.util.getRandomInt(1, this.width / 2);
                    else
                        width = fabric.util.getRandomInt(1, this.width);


                    const sprayPoint = new fabric.Point(x, y);
                    sprayPoint.width = width / 2;
                    sprayPoint.type = "dot";
                    points.push(sprayPoint);


                    if (((xType && point.x <= currentX) || (!xType && point.x >= currentX))
                        && ((!yType && point.y >= currentY) || (yType && point.y <= currentY))) {
                        return points;
                    }

                }

            },
            /**
             * @param {Object} pointer
             */
            addSprayChunk: function (pointer) {
                this.sprayChunkPoints = [];
                let width = this.dotWidth;


                if (this.dotWidthVariance) {
                    width = fabric.util.getRandomInt(
                        Math.max(1, this.dotWidth - this.dotWidthVariance),
                        this.dotWidth + this.dotWidthVariance);
                }
                const point = new fabric.Point(pointer.x, pointer.y);
                point.width = width;

                point.opacity = fabric.util.getRandomInt(0, 100) / 100;


                this.sprayChunkPoints = this.sprayChunkPoints.concat(this.getBetweenPoints(point));

                this.sprayChunks.push(this.sprayChunkPoints);

                // this.sprayChunks.push(this.sprayChunkPoints);

            }
        });
    }


    return {initBrush, initSpray};
};

export default uesBrush;