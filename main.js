(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./dist/zvp/fesm2015/zvp.js":
/*!**********************************!*\
  !*** ./dist/zvp/fesm2015/zvp.js ***!
  \**********************************/
/*! exports provided: ZvpComponent, ZvpModule, ZvpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZvpComponent", function() { return ZvpComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZvpModule", function() { return ZvpModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZvpService", function() { return ZvpService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! video.js */ "./node_modules/video.js/dist/video.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "./node_modules/@fortawesome/free-regular-svg-icons/index.es.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/__ivy_ngcc__/fesm2015/angular-fontawesome.js");







class DbService {
    constructor() {
        this.renderer = { canvas: {}, ctx: {} };
        this.flgs = {
            dblClickFlg: false,
            downFlg: false,
            // - Similarly to mousedown events
            leftDownFlg: false,
            middleDownFlg: false,
            rightDownFlg: false,
            // - Similarly to mouseup events
            leftUpFlg: false,
            middleUpFlg: false,
            rightUpFlg: false,
            // - Similarly to mousedown + mousemove events
            leftDownMoveFlg: false,
            middleDownMoveFlg: false,
            rightDownMoveFlg: false,
            // - Similarly to wheel event
            wheelFlg: false
        };
        this.videoOffset = {
            zoomRatio: 1,
            prevOffsetX: 0,
            prevOffsetY: 0,
            newOffsetX: 0,
            newOffsetY: 0
        };
        this.states = {
            isPreventWheel: false,
            isPreventWholeTrans: false,
            isLoaded: false,
            isInitialized: false,
            isOverlayActive: false,
            isPipAvailable: false,
            isFullscreenAvailable: false
        };
        this.mouseOffset = {
            x: -Infinity,
            y: -Infinity,
            rawX: -Infinity,
            rawY: -Infinity,
            prevX: -Infinity,
            prevY: -Infinity
        };
        this.playWidth = 0;
        this.volumeWidth = 1;
        this.reservedBy = {
            name: '',
            type: '',
            flgs: ['']
        };
        this.constant = {
            ZOOM_SPEED: 0.2 // Zoom speed of canvas
        };
    }
}
DbService.ɵfac = function DbService_Factory(t) { return new (t || DbService)(); };
DbService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ token: DbService, factory: DbService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(DbService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

class CoordService {
    constructor(db) {
        this.db = db;
    }
    updateOffsetsNoRistrict($newOffsetX, $newOffsetY, $offsets, $event) {
        const offsets = $offsets;
        let offsetX = offsets.prevOffsetX;
        let offsetY = offsets.prevOffsetY;
        if (!this.db.flgs.wheelFlg) {
            if ($event.btn === 0 || $event.btn === 1) {
                offsetX += $newOffsetX;
                offsetY += $newOffsetY;
            }
        }
        else {
            offsetX -= this.db.mouseOffset.x;
            offsetY -= this.db.mouseOffset.y;
            if ($event.delta > 0) {
                const ratio = 1 - this.db.constant.ZOOM_SPEED;
                offsetX = offsetX * ratio + this.db.mouseOffset.x;
                offsetY = offsetY * ratio + this.db.mouseOffset.y;
            }
            else {
                const ratio = 1 + this.db.constant.ZOOM_SPEED;
                offsetX = offsetX * ratio + this.db.mouseOffset.x;
                offsetY = offsetY * ratio + this.db.mouseOffset.y;
            }
        }
        offsets.newOffsetX = offsetX;
        offsets.newOffsetY = offsetY;
    }
    updateOffsets($newOffsetX, $newOffsetY, $offsets, $event) {
        const offsets = $offsets;
        let offsetX = offsets.prevOffsetX;
        let offsetY = offsets.prevOffsetY;
        if (!this.db.flgs.wheelFlg) {
            if ($event.btn === 1 && !this.db.states.isPreventWholeTrans) {
                offsetX += $newOffsetX;
                offsetY += $newOffsetY;
            }
        }
        else {
            if (!this.db.states.isPreventWheel) {
                offsetX -= this.db.mouseOffset.x;
                offsetY -= this.db.mouseOffset.y;
                if ($event.delta > 0) {
                    const ratio = 1 - this.db.constant.ZOOM_SPEED;
                    offsetX = offsetX * ratio + this.db.mouseOffset.x;
                    offsetY = offsetY * ratio + this.db.mouseOffset.y;
                }
                else {
                    const ratio = 1 + this.db.constant.ZOOM_SPEED;
                    offsetX = offsetX * ratio + this.db.mouseOffset.x;
                    offsetY = offsetY * ratio + this.db.mouseOffset.y;
                }
            }
        }
        offsets.newOffsetX = offsetX;
        offsets.newOffsetY = offsetY;
    }
    updateSizeByPointer($size, $newOffsetX, $newOffsetY) {
        const size = $size;
        size.width += $newOffsetX;
        size.height += $newOffsetY;
    }
    updateSizeByWheel($size, $event) {
        const size = $size;
        let width = size.width;
        let height = size.height;
        if (this.db.flgs.wheelFlg && !this.db.states.isPreventWheel) {
            let ratio = 1;
            if ($event.delta > 0) {
                // Negative zoom
                ratio -= this.db.constant.ZOOM_SPEED;
            }
            else {
                // Positive zoom
                ratio += this.db.constant.ZOOM_SPEED;
            }
            width *= ratio;
            height *= ratio;
            size.width = width;
            size.height = height;
        }
    }
    updateZoomRatioByWheel($zoomRatio, $event) {
        let zoomRatio = $zoomRatio;
        if (this.db.flgs.wheelFlg && !this.db.states.isPreventWheel) {
            let ratio = 1;
            if ($event.delta > 0) {
                // Negative zoom
                ratio -= this.db.constant.ZOOM_SPEED;
            }
            else {
                // Positive zoom
                ratio += this.db.constant.ZOOM_SPEED;
            }
            zoomRatio *= ratio;
        }
        return zoomRatio;
    }
}
CoordService.ɵfac = function CoordService_Factory(t) { return new (t || CoordService)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(DbService)); };
CoordService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ token: CoordService, factory: CoordService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(CoordService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: DbService }]; }, null); })();

class VideoService {
    constructor(db, coord) {
        this.db = db;
        this.coord = coord;
    }
    registerOnMouseDown() {
        this.db.videoOffset.prevOffsetX = this.db.videoOffset.newOffsetX;
        this.db.videoOffset.prevOffsetY = this.db.videoOffset.newOffsetY;
    }
    registerOnNoMouseDown($event) {
        this.updateOffsets(0, 0, $event);
    }
    registerOnMouseMiddleMove($newOffsetX, $newOffsetY, $event) {
        this.updateOffsets($newOffsetX, $newOffsetY, $event);
    }
    updateOffsets($newOffsetX, $newOffsetY, $event) {
        this.coord.updateOffsets($newOffsetX, $newOffsetY, this.db.videoOffset, $event);
        this.db.videoOffset.zoomRatio = this.coord.updateZoomRatioByWheel(this.db.videoOffset.zoomRatio, $event);
        this._restrictArea();
    }
    _restrictArea() {
        const video = this.db.renderer.video;
        const ratio = video.videoHeight / video.videoWidth;
        const w = this.db.renderer.zvpWrapper.getBoundingClientRect().width;
        const h = w * ratio;
        const fixedW = w * this.db.videoOffset.zoomRatio;
        const fixedH = h * this.db.videoOffset.zoomRatio;
        const fixedX = this.db.videoOffset.newOffsetX;
        const fixedY = this.db.videoOffset.newOffsetY;
        if (w < fixedW) {
            if (0 > -fixedX + fixedW / 2)
                this.db.videoOffset.newOffsetX = fixedW / 2;
            if (w > fixedX + fixedW / 2)
                this.db.videoOffset.newOffsetX = w - fixedW / 2;
        }
        else {
            if (fixedX - fixedW / 2 < 0)
                this.db.videoOffset.newOffsetX = fixedW / 2;
            if (w < fixedX + fixedW / 2)
                this.db.videoOffset.newOffsetX = w - fixedW / 2;
        }
        if (h < fixedH) {
            if (0 > -fixedY + fixedH / 2)
                this.db.videoOffset.newOffsetY = fixedH / 2;
            if (h > fixedY + fixedH / 2)
                this.db.videoOffset.newOffsetY = h - fixedH / 2;
        }
        else {
            if (fixedY - fixedH / 2 < 0)
                this.db.videoOffset.newOffsetY = fixedH / 2;
            if (h < fixedY + fixedH / 2)
                this.db.videoOffset.newOffsetY = h - fixedH / 2;
        }
    }
    render() {
        const video = this.db.renderer.video;
        const ratio = this.db.renderer.video.videoHeight / this.db.renderer.video.videoWidth;
        const w = this.db.renderer.zvpWrapper.getBoundingClientRect().width;
        const h = w * ratio;
        const c = this.db.renderer.canvas.videoBuffer;
        c.width = w;
        c.height = h;
        const fixedW = w * this.db.videoOffset.zoomRatio;
        const fixedH = h * this.db.videoOffset.zoomRatio;
        const fixedX = this.db.videoOffset.newOffsetX;
        const fixedY = this.db.videoOffset.newOffsetY;
        const ctx = this.db.renderer.ctx.videoBuffer;
        ctx.save();
        ctx.translate(fixedX, fixedY);
        //ctx.scale(-1, 1);
        ctx.drawImage(video, -fixedW / 2, -fixedH / 2, fixedW, fixedH);
        ctx.restore();
    }
}
VideoService.ɵfac = function VideoService_Factory(t) { return new (t || VideoService)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(DbService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(CoordService)); };
VideoService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ token: VideoService, factory: VideoService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(VideoService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: DbService }, { type: CoordService }]; }, null); })();

class UiService {
    constructor(db) {
        this.db = db;
    }
    render() {
        const video = this.db.renderer.video;
        const ratio = video.videoHeight / video.videoWidth;
        const w = this.db.renderer.zvpWrapper.getBoundingClientRect().width;
        const h = w * ratio;
        const c = this.db.renderer.canvas.uiBuffer;
        c.width = w;
        c.height = h;
        if (this.db.flgs.middleDownMoveFlg) {
            const ctx = this.db.renderer.ctx.uiBuffer;
            ctx.save();
            ctx.translate(this.db.mouseOffset.x, this.db.mouseOffset.y);
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.arc(0, 0, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    }
}
UiService.ɵfac = function UiService_Factory(t) { return new (t || UiService)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(DbService)); };
UiService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ token: UiService, factory: UiService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(UiService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: DbService }]; }, null); })();

class RendererService {
    constructor(db, video, ui) {
        this.db = db;
        this.video = video;
        this.ui = ui;
    }
    render() {
        this.video.render();
        this.ui.render();
        const video = this.db.renderer.video;
        const ratio = video.videoHeight / video.videoWidth;
        const w = this.db.renderer.zvpWrapper.getBoundingClientRect().width;
        const h = w * ratio;
        const c = this.db.renderer.canvas.main;
        c.width = w;
        c.height = h;
        const ctx = this.db.renderer.ctx.main;
        if (this.db.states.isLoaded) {
            ctx.drawImage(this.db.renderer.canvas.videoBuffer, 0, 0, w, h);
            ctx.drawImage(this.db.renderer.canvas.uiBuffer, 0, 0);
        }
    }
}
RendererService.ɵfac = function RendererService_Factory(t) { return new (t || RendererService)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(DbService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(VideoService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(UiService)); };
RendererService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ token: RendererService, factory: RendererService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(RendererService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: DbService }, { type: VideoService }, { type: UiService }]; }, null); })();

class ZvpService {
    constructor(renderer, db) {
        this.renderer = renderer;
        this.db = db;
    }
    //////////////////////////////////////////////////////////
    //
    // Public
    //
    //////////////////////////////////////////////////////////
    init($options) {
        this.db.renderer.video = document.createElement('video');
        this.db.renderer.video.onloadedmetadata = () => {
            const ratio = this.db.renderer.video.videoHeight / this.db.renderer.video.videoWidth;
            const w = this.db.renderer.zvpWrapper.getBoundingClientRect().width;
            const h = w * ratio;
            this.db.videoOffset.newOffsetX = w / 2;
            this.db.videoOffset.newOffsetY = h / 2;
            this.db.states.isLoaded = true;
        };
        this.db.renderer.player = Object(video_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.db.renderer.video, $options, function onPlayerReady() {
            //console.log('onPlayerReady', this);
        });
        this.db.renderer.canvas.videoBuffer = document.createElement('canvas');
        this.db.renderer.canvas.uiBuffer = document.createElement('canvas');
        this.db.renderer.ctx.videoBuffer = this.db.renderer.canvas.videoBuffer.getContext('2d');
        this.db.renderer.ctx.uiBuffer = this.db.renderer.canvas.uiBuffer.getContext('2d');
        // Set states
        this.db.states.isInitialized = true;
        this.db.states.isPipAvailable = 'pictureInPictureEnabled' in document;
        this.db.states.isFullscreenAvailable = document.fullscreenEnabled;
        //setInterval(() => {
        //console.log(this.db.videoOffset.zoomRatio);
        //}, 1000);
    }
    get player() {
        return this.db.renderer.player;
    }
    //////////////////////////////////////////////////////////
    //
    // Private
    //
    //////////////////////////////////////////////////////////
    _render() {
        this.renderer.render();
    }
}
ZvpService.ɵfac = function ZvpService_Factory(t) { return new (t || ZvpService)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(RendererService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(DbService)); };
ZvpService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ token: ZvpService, factory: ZvpService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(ZvpService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: RendererService }, { type: DbService }]; }, null); })();

class FlgEventService {
    constructor(db) {
        this.db = db;
    }
    updateFlgs($event) {
        const flgs = {
            dblClickFlg: $event.dblClickFlg,
            downFlg: $event.downFlg,
            // - Similarly to mousedown events
            leftDownFlg: $event.downFlg && !$event.moveFlg && $event.btn === 0,
            middleDownFlg: $event.downFlg && !$event.moveFlg && $event.btn === 1,
            rightDownFlg: $event.downFlg && !$event.moveFlg && $event.btn === 2,
            // - Similarly to mouseup events
            leftUpFlg: !$event.downFlg && !$event.moveFlg && $event.btn === 0,
            middleUpFlg: !$event.downFlg && !$event.moveFlg && $event.btn === 1,
            rightUpFlg: !$event.downFlg && !$event.moveFlg && $event.btn === 2,
            // - Similarly to mousedown + mousemove events
            leftDownMoveFlg: $event.downFlg && $event.moveFlg && $event.btn === 0,
            middleDownMoveFlg: $event.downFlg && $event.moveFlg && $event.btn === 1,
            rightDownMoveFlg: $event.downFlg && $event.moveFlg && $event.btn === 2,
            // Similarly to wheel event
            wheelFlg: $event.wheelFlg
        };
        this.db.flgs = flgs;
    }
}
FlgEventService.ɵfac = function FlgEventService_Factory(t) { return new (t || FlgEventService)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(DbService)); };
FlgEventService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ token: FlgEventService, factory: FlgEventService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(FlgEventService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: DbService }]; }, null); })();

class FuncService {
    constructor(db) {
        this.db = db;
    }
    play() {
        this.db.renderer.player.play();
    }
    pause() {
        this.db.renderer.player.pause();
    }
    mute() {
        const player = this.db.renderer.player;
        const isVolumeMuted = player.muted();
        player.muted(!isVolumeMuted);
    }
    reset() {
        const ratio = this.db.renderer.video.videoHeight / this.db.renderer.video.videoWidth;
        const w = this.db.renderer.zvpWrapper.getBoundingClientRect().width;
        const h = w * ratio;
        this.db.videoOffset = {
            zoomRatio: 1,
            prevOffsetX: 0,
            prevOffsetY: 0,
            newOffsetX: w / 2,
            newOffsetY: h / 2
        };
    }
    setPlayTime() {
        const player = this.db.renderer.player;
        const playWidth = this.db.playWidth;
        player.currentTime(playWidth);
    }
    setVolume() {
        const player = this.db.renderer.player;
        const volumeWidth = this.db.volumeWidth;
        player.volume(volumeWidth);
    }
}
FuncService.ɵfac = function FuncService_Factory(t) { return new (t || FuncService)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(DbService)); };
FuncService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ token: FuncService, factory: FuncService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(FuncService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: DbService }]; }, null); })();

class PlaybackService {
    constructor(db, func) {
        this.db = db;
        this.func = func;
        this.isAlreadyPaused = false;
    }
    registerOnLeftMove() {
        const minX = this.db.renderer.playBar.getBoundingClientRect().left;
        const w = this.db.renderer.playBar.getBoundingClientRect().width;
        this.db.playWidth = ((this.db.mouseOffset.rawX - minX) / w) * this.db.renderer.player.duration();
        this._restrictRange();
        // Set ovelay UI visible
        this.db.states.isOverlayActive = true;
        if (this.db.renderer.player.paused()) {
            this.isAlreadyPaused = true;
        }
        else {
            this._stopPlay();
        }
        this.func.setPlayTime();
    }
    registerOnMouseUp() {
        if (!this.isAlreadyPaused)
            this._resumePlay();
        // Set ovelay UI invisible
        this.db.states.isOverlayActive = false;
    }
    _restrictRange() {
        if (this.db.playWidth < 0)
            this.db.playWidth = 0;
        if (this.db.playWidth > this.db.renderer.player.duration())
            this.db.playWidth = this.db.renderer.player.duration();
    }
    _stopPlay() {
        this.func.pause();
    }
    _resumePlay() {
        this.func.play();
    }
}
PlaybackService.ɵfac = function PlaybackService_Factory(t) { return new (t || PlaybackService)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(DbService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(FuncService)); };
PlaybackService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ token: PlaybackService, factory: PlaybackService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(PlaybackService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: DbService }, { type: FuncService }]; }, null); })();

class VolumeService {
    constructor(db, func) {
        this.db = db;
        this.func = func;
    }
    registerOnLeftMove() {
        if (!this._isMuted()) {
            const minX = this.db.renderer.volumeBar.getBoundingClientRect().left;
            const w = this.db.renderer.volumeBar.getBoundingClientRect().width;
            this.db.volumeWidth = (this.db.mouseOffset.rawX - minX) / w;
            this._restrictRange();
            // Set ovelay UI visible
            this.db.states.isOverlayActive = true;
            this.func.setVolume();
        }
    }
    registerOnMouseUp() {
        // Set ovelay UI invisible
        this.db.states.isOverlayActive = false;
    }
    _isMuted() {
        const player = this.db.renderer.player;
        const isVolumeMuted = player.muted();
        return isVolumeMuted;
    }
    _restrictRange() {
        if (this.db.volumeWidth < 0)
            this.db.volumeWidth = 0;
        if (this.db.volumeWidth > 1)
            this.db.volumeWidth = 1;
    }
}
VolumeService.ɵfac = function VolumeService_Factory(t) { return new (t || VolumeService)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(DbService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(FuncService)); };
VolumeService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ token: VolumeService, factory: VolumeService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(VolumeService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: DbService }, { type: FuncService }]; }, null); })();

class RegisterService {
    constructor(db, video, playback, volume) {
        this.db = db;
        this.video = video;
        this.playback = playback;
        this.volume = volume;
    }
    onMouseDown() {
        const reserved = this.db.reservedBy;
        if (reserved.name === 'canvas') {
            this.video.registerOnMouseDown();
        }
        else if (reserved.name === 'play') {
            this.playback.registerOnLeftMove();
        }
        else if (reserved.name === 'volume') {
            this.volume.registerOnLeftMove();
        }
    }
    onNoMouseDown($event) {
        const reserved = this.db.reservedBy;
        const flgs = this.db.flgs;
        if (reserved.name === 'canvas') {
            this.video.registerOnMouseDown();
            if (flgs.wheelFlg) {
                this.video.registerOnNoMouseDown($event);
            }
        }
    }
    onMouseUp() {
        const reserved = this.db.reservedBy;
        const flgs = this.db.flgs;
        if (flgs.leftUpFlg) {
            if (reserved.name === 'play') {
                this.playback.registerOnMouseUp();
            }
            else if (reserved.name === 'volume') {
                this.volume.registerOnMouseUp();
            }
        }
        else if (flgs.rightUpFlg) {
        }
        else if (flgs.middleUpFlg) {
        }
        // Release
        this.db.reservedBy = {
            name: '',
            type: '',
            flgs: ['']
        };
    }
    onMouseMove($newOffsetX, $newOffsetY, $event) {
        const reserved = this.db.reservedBy;
        const flgs = this.db.flgs;
        if (flgs.leftDownMoveFlg) {
            if (reserved.name === 'play') {
                this.playback.registerOnLeftMove();
            }
            else if (reserved.name === 'volume') {
                this.volume.registerOnLeftMove();
            }
        }
        else if (flgs.middleDownMoveFlg) {
            if (reserved.name === 'canvas') {
                this.video.registerOnMouseMiddleMove($newOffsetX, $newOffsetY, $event);
            }
        }
    }
}
RegisterService.ɵfac = function RegisterService_Factory(t) { return new (t || RegisterService)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(DbService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(VideoService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(PlaybackService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(VolumeService)); };
RegisterService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ token: RegisterService, factory: RegisterService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(RegisterService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: DbService }, { type: VideoService }, { type: PlaybackService }, { type: VolumeService }]; }, null); })();

class ProcService {
    constructor(db, register) {
        this.db = db;
        this.register = register;
    }
    update($event) {
        // Update mouseOffset
        this.db.mouseOffset.x = $event.x - this.db.renderer.zvpWrapper.getBoundingClientRect().left;
        this.db.mouseOffset.y = $event.y - this.db.renderer.zvpWrapper.getBoundingClientRect().top;
        this.db.mouseOffset.rawX = $event.x;
        this.db.mouseOffset.rawY = $event.y;
        // When mouse button is down
        if (this.db.flgs.leftDownFlg || this.db.flgs.middleDownFlg || this.db.flgs.rightDownFlg) {
            this._onMouseDown();
        }
        // When mouse button is up
        if (this.db.flgs.leftUpFlg || this.db.flgs.middleUpFlg || this.db.flgs.rightUpFlg) {
            this._onMouseUp();
        }
        // Update anytime when the event is not mousedown
        if (!this.db.flgs.downFlg) {
            this._onNoMouseDown($event);
        }
        // When double clicked
        if (this.db.flgs.dblClickFlg) {
        }
        // Only allow left and middle buttons
        if (this.db.flgs.leftDownMoveFlg || this.db.flgs.middleDownMoveFlg) {
            this._onMouseMove($event);
        }
    }
    //////////////////////////////////////////////////////////
    //
    // Mousedown event
    //
    //////////////////////////////////////////////////////////
    _onMouseDown() {
        // Mousedown event with no mousemove
        this.db.mouseOffset.prevX = this.db.mouseOffset.x;
        this.db.mouseOffset.prevY = this.db.mouseOffset.y;
        this.register.onMouseDown();
    }
    //////////////////////////////////////////////////////////
    //
    // Mouseup event
    //
    //////////////////////////////////////////////////////////
    _onMouseUp() {
        this.register.onMouseUp();
    }
    //////////////////////////////////////////////////////////
    //
    // All events but mousedown
    //
    //////////////////////////////////////////////////////////
    _onNoMouseDown($event) {
        this.register.onNoMouseDown($event);
    }
    //////////////////////////////////////////////////////////
    //
    // Mousemove event
    //
    //////////////////////////////////////////////////////////
    _onMouseMove($event) {
        // Mousemove event with mousedown (Wheel event is excluded)
        if (!this.db.flgs.wheelFlg) {
            const newOffsetX = this.db.mouseOffset.x - this.db.mouseOffset.prevX;
            const newOffsetY = this.db.mouseOffset.y - this.db.mouseOffset.prevY;
            this.register.onMouseMove(newOffsetX, newOffsetY, $event);
        }
    }
}
ProcService.ɵfac = function ProcService_Factory(t) { return new (t || ProcService)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(DbService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(RegisterService)); };
ProcService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ token: ProcService, factory: ProcService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(ProcService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: DbService }, { type: RegisterService }]; }, null); })();

class InfoService {
    constructor(db) {
        this.db = db;
    }
    get getVideoName() {
        return this.db.renderer.player.currentSrc();
    }
    get getBufferedPercent() {
        return this.db.renderer.player.bufferedPercent() * 100 + '%';
    }
    get getHoverPercent() {
        const total = this.db.renderer.zvpWrapper.getBoundingClientRect().width;
        const main = total * 0.98;
        const piece = total * 0.02;
        const current = this.db.mouseOffset.x - piece / 2;
        return (current / main) * 100 + '%';
    }
    get getCurrentPlaybackTimePercent() {
        const t = this.db.renderer.player.currentTime();
        const tTotal = this.db.renderer.player.duration();
        return (t / tTotal) * 100 + '%';
    }
    get getCurrentVolume() {
        const v = this.db.renderer.player.volume();
        return v * 100 + '%';
    }
    get getCurrentPlaybackTime() {
        const t = this.db.renderer.player.currentTime();
        const minutes = Math.floor(t / 60);
        const seconds = Math.floor(t - minutes * 60);
        const x = minutes < 10 ? '0' + minutes : minutes.toString();
        const y = seconds < 10 ? '0' + seconds : seconds.toString();
        return x + ':' + y;
    }
    get getTotalPlaybackTime() {
        const t = this.db.renderer.player.duration();
        const minutes = Math.floor(t / 60);
        const seconds = Math.floor(t - minutes * 60);
        const x = minutes < 10 ? '0' + minutes : minutes.toString();
        const y = seconds < 10 ? '0' + seconds : seconds.toString();
        return x + ':' + y;
    }
}
InfoService.ɵfac = function InfoService_Factory(t) { return new (t || InfoService)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(DbService)); };
InfoService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ token: InfoService, factory: InfoService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(InfoService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: DbService }]; }, null); })();

class EventDirective {
    constructor() {
        this.pointerData = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // Wheel delta
        this.delta = 0;
        // Mouse button number
        this.btn = 0;
        // Flgs
        this.wheelFlg = false;
        this.downFlg = false;
        this.moveFlg = false;
        this.dblClickFlg = false;
    }
    _emitData($clientX, $clientY) {
        this.pointerData.emit({
            x: $clientX,
            y: $clientY,
            delta: this.delta,
            btn: this.btn,
            wheelFlg: this.wheelFlg,
            downFlg: this.downFlg,
            moveFlg: this.moveFlg,
            dblClickFlg: this.dblClickFlg
        });
    }
    _resetAllFlgs() {
        this.downFlg = false;
        this.moveFlg = false;
        this.dblClickFlg = false;
    }
    // Pointerdown listener
    onPointerDown($e) {
        this._onDown($e);
    }
    // Pointerup listener
    onPointerUp($e) {
        this._onUp($e);
    }
    // Pointermove listener
    onPointerMove($e) {
        this._onMove($e);
    }
    // Touchstart listener
    onTouchStart($e) {
        this._onDown($e);
    }
    // Touchend listener
    onTouchEnd($e) {
        this._onUp($e);
    }
    // Touchmove listener
    onTouchMove($e) {
        this._onMove($e);
    }
    // Mousedown listener
    onMouseDown($e) {
        this._onDown($e);
    }
    // Mouseup listener
    onMouseUp($e) {
        this._onUp($e);
    }
    // Mouseleave listener
    onMouseLeave($e) { }
    // Mousemove listener
    onMouseMove($e) {
        this._onMove($e);
    }
    // Dblclick listener
    onDoubleClick($e) {
        const clientX = $e.clientX;
        const clientY = $e.clientY;
        // Initialize flags
        this._resetAllFlgs();
        this.dblClickFlg = true;
        this._emitData(clientX, clientY);
        // To prevent permanent zooming
        this.dblClickFlg = false;
    }
    // Wheel listener
    onMouseWheel($e) {
        $e.preventDefault();
        const clientX = $e.clientX;
        const clientY = $e.clientY;
        this.wheelFlg = true;
        this.delta = $e.deltaY;
        this._emitData(clientX, clientY);
        // To prevent permanent zooming
        this.wheelFlg = false;
    }
    // Down event
    _onDown($e) {
        let clientX;
        let clientY;
        if ($e.type === 'touchstart') {
            clientX = $e.touches[0].clientX;
            clientY = $e.touches[0].clientY;
            this.btn = 0;
        }
        else {
            clientX = $e.clientX;
            clientY = $e.clientY;
            this.btn = $e.button;
        }
        // Initialize flags
        this._resetAllFlgs();
        this.downFlg = true;
        this._emitData(clientX, clientY);
    }
    // Up event
    _onUp($e) {
        let clientX;
        let clientY;
        if ($e.type === 'touchend') {
            clientX = $e.changedTouches[0].clientX;
            clientY = $e.changedTouches[0].clientY;
        }
        else {
            clientX = $e.clientX;
            clientY = $e.clientY;
        }
        // Initialize flags
        this._resetAllFlgs();
        this._emitData(clientX, clientY);
    }
    // Move event
    _onMove($e) {
        let clientX;
        let clientY;
        if ($e.type === 'touchmove') {
            clientX = $e.touches[0].clientX;
            clientY = $e.touches[0].clientY;
        }
        else {
            clientX = $e.clientX;
            clientY = $e.clientY;
        }
        this.moveFlg = true;
        this._emitData(clientX, clientY);
    }
}
EventDirective.ɵfac = function EventDirective_Factory(t) { return new (t || EventDirective)(); };
EventDirective.ɵdir = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"])({ type: EventDirective, selectors: [["", "zvpEvent", ""]], hostBindings: function EventDirective_HostBindings(rf, ctx) { if (rf & 1) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"])("pointerdown", function EventDirective_pointerdown_HostBindingHandler($event) { return ctx.onPointerDown($event); })("pointerup", function EventDirective_pointerup_HostBindingHandler($event) { return ctx.onPointerUp($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"])("pointermove", function EventDirective_pointermove_HostBindingHandler($event) { return ctx.onPointerMove($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"])("touchstart", function EventDirective_touchstart_HostBindingHandler($event) { return ctx.onTouchStart($event); })("touchend", function EventDirective_touchend_HostBindingHandler($event) { return ctx.onTouchEnd($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"])("touchmove", function EventDirective_touchmove_HostBindingHandler($event) { return ctx.onTouchMove($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"])("mousedown", function EventDirective_mousedown_HostBindingHandler($event) { return ctx.onMouseDown($event); })("mouseup", function EventDirective_mouseup_HostBindingHandler($event) { return ctx.onMouseUp($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"])("mouseleave", function EventDirective_mouseleave_HostBindingHandler($event) { return ctx.onMouseLeave($event); })("mousemove", function EventDirective_mousemove_HostBindingHandler($event) { return ctx.onMouseMove($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"])("dblclick", function EventDirective_dblclick_HostBindingHandler($event) { return ctx.onDoubleClick($event); })("wheel", function EventDirective_wheel_HostBindingHandler($event) { return ctx.onMouseWheel($event); });
    } }, outputs: { pointerData: "pointerData" } });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(EventDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[zvpEvent]'
            }]
    }], function () { return []; }, { pointerData: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], onPointerDown: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['pointerdown', ['$event']]
        }], onPointerUp: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['document:pointerup', ['$event']]
        }], onPointerMove: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['document:pointermove', ['$event']]
        }], onTouchStart: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['touchstart', ['$event']]
        }], onTouchEnd: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['document:touchend', ['$event']]
        }], onTouchMove: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['document:touchmove', ['$event']]
        }], onMouseDown: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['mousedown', ['$event']]
        }], onMouseUp: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['document:mouseup', ['$event']]
        }], onMouseLeave: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['mouseleave', ['$event']]
        }], onMouseMove: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['document:mousemove', ['$event']]
        }], onDoubleClick: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['dblclick', ['$event']]
        }], onMouseWheel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['wheel', ['$event']]
        }] }); })();

const _c0 = ["zvpWrapper"];
const _c1 = ["renderer"];
const _c2 = ["playBar"];
const _c3 = ["volumeBar"];
function ZvpComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(0, "div", 37);
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(1, "div", 38);
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(2, "div", 38);
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
} }
function ZvpComponent_fa_icon_22_Template(rf, ctx) { if (rf & 1) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(0, "fa-icon", 39);
} if (rf & 2) {
    const ctx_r4 = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"])();
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("icon", ctx_r4.faPlay);
} }
function ZvpComponent_fa_icon_25_Template(rf, ctx) { if (rf & 1) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(0, "fa-icon", 34);
} if (rf & 2) {
    const ctx_r5 = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"])();
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("icon", ctx_r5.faVolumeUp)("fixedWidth", true);
} }
function ZvpComponent_fa_icon_26_Template(rf, ctx) { if (rf & 1) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(0, "fa-icon", 34);
} if (rf & 2) {
    const ctx_r6 = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"])();
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("icon", ctx_r6.faVolumeDown)("fixedWidth", true);
} }
function ZvpComponent_fa_icon_27_Template(rf, ctx) { if (rf & 1) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(0, "fa-icon", 34);
} if (rf & 2) {
    const ctx_r7 = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"])();
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("icon", ctx_r7.faVolumeMute)("fixedWidth", true);
} }
function ZvpComponent_div_32_Template(rf, ctx) { if (rf & 1) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(0, "div", 40);
} if (rf & 2) {
    const ctx_r9 = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"])();
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"])("width", ctx_r9.currentVolume);
} }
function ZvpComponent_div_33_Template(rf, ctx) { if (rf & 1) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(0, "div", 41);
} }
function ZvpComponent_div_39_Template(rf, ctx) { if (rf & 1) {
    const _r14 = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"])();
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(0, "div", 42);
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"])("click", function ZvpComponent_div_39_Template_div_click_0_listener() { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"])(_r14); const ctx_r13 = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"])(); return ctx_r13._togglePip(); });
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(1, "fa-icon", 34);
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
} if (rf & 2) {
    const ctx_r11 = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"])();
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("icon", ctx_r11.faWindowRestore)("fixedWidth", true);
} }
function ZvpComponent_div_40_fa_icon_1_Template(rf, ctx) { if (rf & 1) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(0, "fa-icon", 34);
} if (rf & 2) {
    const ctx_r15 = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"])(2);
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("icon", ctx_r15.faExpand)("fixedWidth", true);
} }
function ZvpComponent_div_40_fa_icon_2_Template(rf, ctx) { if (rf & 1) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(0, "fa-icon", 34);
} if (rf & 2) {
    const ctx_r16 = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"])(2);
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("icon", ctx_r16.faCompress)("fixedWidth", true);
} }
function ZvpComponent_div_40_Template(rf, ctx) { if (rf & 1) {
    const _r18 = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"])();
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(0, "div", 43);
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"])("click", function ZvpComponent_div_40_Template_div_click_0_listener() { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"])(_r18); const ctx_r17 = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"])(); return ctx_r17._toggleFullscreen(); });
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"])(1, ZvpComponent_div_40_fa_icon_1_Template, 1, 2, "fa-icon", 24);
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"])(2, ZvpComponent_div_40_fa_icon_2_Template, 1, 2, "fa-icon", 24);
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
} if (rf & 2) {
    const ctx_r12 = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"])();
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("ngIf", ctx_r12.toggleFullscreenFlg);
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("ngIf", !ctx_r12.toggleFullscreenFlg);
} }
class ZvpComponent {
    constructor(db, zvp, flgEvent, proc, info, func) {
        this.db = db;
        this.zvp = zvp;
        this.flgEvent = flgEvent;
        this.proc = proc;
        this.info = info;
        this.func = func;
        this.options = {};
        this.faPlay = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faPlay"];
        this.faVolumeUp = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faVolumeUp"];
        this.faVolumeDown = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faVolumeDown"];
        this.faVolumeMute = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faVolumeMute"];
        this.faExpand = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faExpand"];
        this.faWindowRestore = _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faWindowRestore"];
        this.faRedo = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faRedo"];
        this.faCompress = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faCompress"];
        this.isOverlayActive = false;
        this.isPipAvailable = false;
        this.isFullscreenAvailable = false;
        this.videoName = '';
        this.bufferedPercent = '0%';
        this.hoverPercent = '0%';
        this.currentPlaybackTimePercent = '0%';
        this.currentVolume = '0%';
        this.currentPlaybackTime = '--:--';
        this.totalPlaybackTime = '--:--';
        this.togglePlayFlg = false;
        this.toggleVolumeFlg = true;
        this.toggleVolumeSizeFlg = true;
        this.togglePipFlg = false;
        this.toggleFullscreenFlg = false;
        this.volumeBarDownFlg = false;
    }
    ngOnInit() {
        this.zvp.init(this.options);
        this._init();
        this._render();
    }
    _init() {
        this.db.renderer.zvpWrapper = this.zvpWrapper.nativeElement;
        this.db.renderer.canvas.main = this.renderer.nativeElement;
        this.db.renderer.ctx.main = this.db.renderer.canvas.main.getContext('2d');
        const w = this.db.renderer.zvpWrapper.getBoundingClientRect().width;
        const h = this.db.renderer.zvpWrapper.getBoundingClientRect().height;
        this.db.renderer.player.setAttribute('width', `${w}px`);
        this.db.renderer.player.setAttribute('height', `${h}px`);
        this.db.renderer.playBar = this.playBar.nativeElement;
        this.db.renderer.volumeBar = this.volumeBar.nativeElement;
    }
    _onPointerEvents($e, $name) {
        const permit = !this.db.reservedBy.name || this.db.reservedBy.name === $name || $e.wheelFlg;
        if (this.db.states.isInitialized && permit) {
            if ($e.downFlg)
                this.db.reservedBy.name = $name;
            if ($e.wheelFlg)
                this.db.reservedBy.name = 'canvas'; // For zooming
            this.flgEvent.updateFlgs($e);
            this.proc.update($e);
        }
    }
    _render() {
        const r = () => {
            if (this.db.states.isInitialized) {
                this.zvp._render();
                this._detectVideoStates();
                this._detectBrowserStates();
                this._setInfo();
            }
            requestAnimationFrame(r);
        };
        requestAnimationFrame(r);
    }
    //////////////////////////////////////////////////////////
    //
    // Setting info
    //
    //////////////////////////////////////////////////////////
    _setInfo() {
        this.videoName = this.info.getVideoName;
        this.bufferedPercent = this.info.getBufferedPercent;
        this.hoverPercent = this.info.getHoverPercent;
        this.currentPlaybackTimePercent = this.info.getCurrentPlaybackTimePercent;
        this.currentVolume = this.info.getCurrentVolume;
        this.currentPlaybackTime = this.info.getCurrentPlaybackTime;
        this.totalPlaybackTime = this.info.getTotalPlaybackTime;
    }
    //////////////////////////////////////////////////////////
    //
    // Detect video states
    //
    //////////////////////////////////////////////////////////
    _detectVideoStates() {
        this.togglePlayFlg = !this.db.renderer.player.paused();
        this.toggleVolumeFlg = !this.db.renderer.player.muted();
        this.toggleVolumeSizeFlg = this.db.renderer.player.volume() > 0.4;
        this.toggleFullscreenFlg = !document.fullscreenElement;
    }
    //////////////////////////////////////////////////////////
    //
    // Detect browser states
    //
    //////////////////////////////////////////////////////////
    _detectBrowserStates() {
        this.isOverlayActive = this.db.states.isOverlayActive;
        this.isPipAvailable = this.db.states.isPipAvailable;
        this.isFullscreenAvailable = this.db.states.isFullscreenAvailable;
    }
    //////////////////////////////////////////////////////////
    //
    // Functions - toggle
    //
    //////////////////////////////////////////////////////////
    _togglePlay() {
        if (!this.togglePlayFlg) {
            this.func.play();
        }
        else {
            this.func.pause();
        }
    }
    _toggleVolume() {
        this.func.mute();
    }
    _reset() {
        this.func.reset();
    }
    _togglePip() {
        const d = document;
        if (d.pictureInPictureElement) {
            d.exitPictureInPicture().catch(($e) => {
                // Error handling
            });
        }
        else {
            const video = this.db.renderer.video;
            video.requestPictureInPicture();
        }
    }
    _toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.db.renderer.zvpWrapper.requestFullscreen();
        }
        else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        this.db.renderer.zvpWrapper.onfullscreenchange = () => {
            this.func.reset();
        };
    }
}
ZvpComponent.ɵfac = function ZvpComponent_Factory(t) { return new (t || ZvpComponent)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"])(DbService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"])(ZvpService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"])(FlgEventService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"])(ProcService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"])(InfoService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"])(FuncService)); };
ZvpComponent.ɵcmp = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"])({ type: ZvpComponent, selectors: [["zvp-component"]], viewQuery: function ZvpComponent_Query(rf, ctx) { if (rf & 1) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"])(_c0, true);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"])(_c1, true);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"])(_c2, true);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"])(_c3, true);
    } if (rf & 2) {
        var _t;
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"])(_t = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"])()) && (ctx.zvpWrapper = _t.first);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"])(_t = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"])()) && (ctx.renderer = _t.first);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"])(_t = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"])()) && (ctx.playBar = _t.first);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"])(_t = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"])()) && (ctx.volumeBar = _t.first);
    } }, inputs: { options: "options" }, decls: 41, vars: 22, consts: [["id", "zvp-wrapper"], ["zvpWrapper", ""], ["id", "renderer", 3, "click"], ["renderer", ""], ["id", "overlay"], ["id", "top"], ["id", "video-title", 1, "no-select"], [2, "color", "white"], ["id", "middle", "zvpEvent", "", 3, "click", "dblclick", "pointerData"], ["id", "bottom"], [1, "flex-row-prefix"], ["id", "play-bar", "zvpEvent", "", 3, "pointerData"], ["playBar", ""], ["id", "play-bar-total", 1, "bar-prefix"], ["id", "play-bar-cached", 1, "bar-prefix"], ["id", "play-bar-hover", 1, "bar-prefix"], ["id", "play-bar-current", 1, "bar-prefix"], ["id", "zvp-tools"], ["id", "left", 1, "flex-row-prefix"], ["id", "play", 3, "click"], ["id", "resume", "class", "icon-prefix", 4, "ngIf"], ["size", "sm", "class", "icon-prefix", 3, "icon", 4, "ngIf"], ["id", "sound", 1, "flex-row-prefix"], [3, "click"], ["size", "sm", "class", "icon-prefix", 3, "icon", "fixedWidth", 4, "ngIf"], ["id", "volume-bar"], ["volumeBar", ""], ["id", "volume-pad", "zvpEvent", "", 3, "pointerData"], ["id", "volume-bar-total", 1, "bar-prefix"], ["id", "volume-bar-current", "class", "bar-prefix", 3, "width", 4, "ngIf"], ["id", "volume-bar-current-muted", "class", "bar-prefix", 4, "ngIf"], ["id", "playback-time", 1, "no-select"], ["id", "right", 1, "flex-row-prefix"], ["id", "reset", 3, "click"], ["size", "sm", 1, "icon-prefix", 3, "icon", "fixedWidth"], ["id", "pip", 3, "click", 4, "ngIf"], ["id", "fullscreen", 3, "click", 4, "ngIf"], ["id", "resume", 1, "icon-prefix"], [1, "resume-prefix"], ["size", "sm", 1, "icon-prefix", 3, "icon"], ["id", "volume-bar-current", 1, "bar-prefix"], ["id", "volume-bar-current-muted", 1, "bar-prefix"], ["id", "pip", 3, "click"], ["id", "fullscreen", 3, "click"]], template: function ZvpComponent_Template(rf, ctx) { if (rf & 1) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(0, "div", 0, 1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(2, "canvas", 2, 3);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"])("click", function ZvpComponent_Template_canvas_click_2_listener() { return ctx._togglePlay(); });
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(4, "div", 4);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(5, "div", 5);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(6, "div", 6);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(7, "h2", 7);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"])(8);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(9, "div", 8);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"])("click", function ZvpComponent_Template_div_click_9_listener() { return ctx._togglePlay(); })("dblclick", function ZvpComponent_Template_div_dblclick_9_listener() { return ctx._toggleFullscreen(); })("pointerData", function ZvpComponent_Template_div_pointerData_9_listener($event) { return ctx._onPointerEvents($event, "canvas"); });
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(10, "div", 9);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(11, "div", 10);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(12, "div", 11, 12);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"])("pointerData", function ZvpComponent_Template_div_pointerData_12_listener($event) { return ctx._onPointerEvents($event, "play"); });
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(14, "div", 13);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(15, "div", 14);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(16, "div", 15);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(17, "div", 16);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(18, "div", 17);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(19, "div", 18);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(20, "div", 19);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"])("click", function ZvpComponent_Template_div_click_20_listener() { return ctx._togglePlay(); });
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"])(21, ZvpComponent_div_21_Template, 3, 0, "div", 20);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"])(22, ZvpComponent_fa_icon_22_Template, 1, 1, "fa-icon", 21);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(23, "div", 22);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(24, "div", 23);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"])("click", function ZvpComponent_Template_div_click_24_listener() { return ctx._toggleVolume(); });
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"])(25, ZvpComponent_fa_icon_25_Template, 1, 2, "fa-icon", 24);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"])(26, ZvpComponent_fa_icon_26_Template, 1, 2, "fa-icon", 24);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"])(27, ZvpComponent_fa_icon_27_Template, 1, 2, "fa-icon", 24);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(28, "div", 25, 26);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(30, "div", 27);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"])("pointerData", function ZvpComponent_Template_div_pointerData_30_listener($event) { return ctx._onPointerEvents($event, "volume"); });
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(31, "div", 28);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"])(32, ZvpComponent_div_32_Template, 1, 2, "div", 29);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"])(33, ZvpComponent_div_33_Template, 1, 0, "div", 30);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(34, "div", 31);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"])(35);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(36, "div", 32);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(37, "div", 33);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"])("click", function ZvpComponent_Template_div_click_37_listener() { return ctx._reset(); });
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(38, "fa-icon", 34);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"])(39, ZvpComponent_div_39_Template, 2, 2, "div", 35);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"])(40, ZvpComponent_div_40_Template, 3, 2, "div", 36);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
    } if (rf & 2) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(4);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"])("active", ctx.isOverlayActive);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(4);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"])(ctx.videoName);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(7);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"])("width", ctx.bufferedPercent);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"])("width", ctx.hoverPercent);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"])("width", ctx.currentPlaybackTimePercent);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(4);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("ngIf", ctx.togglePlayFlg);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("ngIf", !ctx.togglePlayFlg);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(3);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("ngIf", ctx.toggleVolumeFlg && ctx.toggleVolumeSizeFlg);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("ngIf", ctx.toggleVolumeFlg && !ctx.toggleVolumeSizeFlg);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("ngIf", !ctx.toggleVolumeFlg);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(5);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("ngIf", ctx.toggleVolumeFlg);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("ngIf", !ctx.toggleVolumeFlg);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(2);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"])("", ctx.currentPlaybackTime, " / ", ctx.totalPlaybackTime, "");
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(3);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("icon", ctx.faRedo)("fixedWidth", true);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("ngIf", ctx.isPipAvailable);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("ngIf", ctx.isFullscreenAvailable);
    } }, directives: [EventDirective, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FaIconComponent"]], styles: ["/*!\n * Forked from Bootstrap Reboot v4.3.1 (https://getbootstrap.com/), licensed MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */*,:after,:before{box-sizing:border-box;margin:0;padding:0}html{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-text-size-adjust:100%}article,aside,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}body{font-family:-apple-system,BlinkMacSystemFont,Helvetica Neue,Yu Gothic,YuGothic,Verdana,Meiryo,\"M+ 1p\",sans-serif;font-size:1rem;line-height:1.5;margin:0;text-align:left}canvas{-ms-interpolation-mode:nearest-neighbor;-webkit-font-smoothing:none;image-rendering:optimizeSpeed;image-rendering:-moz-crisp-edges;image-rendering:-webkit-optimize-contrast;image-rendering:optimize-contrast;image-rendering:pixelated;image-rendering:crisp-edges}[tabindex=\"-1\"]:focus{outline:0!important}hr{box-sizing:initial;height:0;overflow:visible}h1,h2,h3,h4,h5,h6{margin:0;padding:0}p{margin-bottom:1rem;margin-top:0}abbr[data-original-title],abbr[title]{-webkit-text-decoration:underline dotted;-webkit-text-decoration-skip-ink:none;border-bottom:0;cursor:help;text-decoration:underline;text-decoration:underline dotted;text-decoration-skip-ink:none}address{font-style:normal;line-height:inherit;margin-bottom:1rem}ul{list-style:none}dl,ol,ul{margin:0;padding:0}ol ol,ol ul,ul ol,ul ul{margin-bottom:0}dt{font-weight:700}dd{margin-bottom:.5rem;margin-left:0}blockquote{margin:0 0 1rem}b,strong{font-weight:bolder}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:initial}sub{bottom:-.25em}sup{top:-.5em}a{background-color:initial}a,a:hover{text-decoration:none}a:not([href]):not([tabindex]),a:not([href]):not([tabindex]):focus,a:not([href]):not([tabindex]):hover{color:inherit;text-decoration:none}a:not([href]):not([tabindex]):focus{outline:0}code,kbd,pre,samp{font-family:SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}pre{margin-bottom:1rem;margin-top:0;overflow:auto}figure{margin:0 0 1rem}img{border-style:none}img,svg{vertical-align:middle}svg{overflow:hidden}canvas{vertical-align:bottom}table{border-collapse:collapse}caption{caption-side:bottom;padding-bottom:.75rem;padding-top:.75rem;text-align:left}th{text-align:inherit}label{display:inline-block;margin-bottom:.5rem}button{border-radius:0}button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}button,input,optgroup,select,textarea{font-family:inherit;font-size:inherit;line-height:inherit;margin:0}button,input{overflow:visible}button,select{text-transform:none}select{word-wrap:normal}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]:not(:disabled),[type=reset]:not(:disabled),[type=submit]:not(:disabled),button:not(:disabled){cursor:pointer}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=date],input[type=datetime-local],input[type=month],input[type=time]{-webkit-appearance:listbox}textarea{overflow:auto;resize:vertical}fieldset{border:0;margin:0;min-width:0;padding:0}legend{color:inherit;display:block;font-size:1.5rem;line-height:inherit;margin-bottom:.5rem;max-width:100%;padding:0;white-space:normal;width:100%}progress{vertical-align:initial}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:none;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}output{display:inline-block}summary{cursor:pointer;display:list-item}template{display:none}[hidden]{display:none!important}", "#zvp-wrapper{background-color:#000;position:relative;width:100%}#zvp-wrapper #overlay{color:#fff;display:flex;flex-direction:column;font-size:14px;height:100%;justify-content:space-between;left:0;margin:0 1%;opacity:0;position:absolute;top:0;transition:opacity .1s ease-in-out;width:98%;z-index:100}#zvp-wrapper #overlay.active,#zvp-wrapper #overlay:hover{opacity:1}#zvp-wrapper #overlay #top{width:100%}#zvp-wrapper #overlay #top #video-title{padding:10px 0}#zvp-wrapper #overlay #middle{height:100%;width:100%}#zvp-wrapper #overlay #bottom{width:100%}#zvp-wrapper #overlay #bottom #play-bar{height:2px;position:relative;transform:translateY(50%);transition:all .1s ease-in-out;width:100%}#zvp-wrapper #overlay #bottom #play-bar:hover{height:4px}#zvp-wrapper #overlay #bottom #play-bar:hover #play-bar-hover{background-color:hsla(0,0%,100%,.3);width:0}#zvp-wrapper #overlay #bottom #play-bar:hover:after{content:\"\";height:24px;left:0;position:absolute;top:-12px;width:100%;z-index:0}#zvp-wrapper #overlay #bottom #play-bar:after{content:\"\";height:12px;left:0;position:absolute;top:-12px;width:100%;z-index:0}#zvp-wrapper #overlay #bottom #play-bar #play-bar-total{background-color:hsla(0,0%,100%,.5);width:100%}#zvp-wrapper #overlay #bottom #play-bar #play-bar-cached{background-color:hsla(0,0%,100%,.3);width:0}#zvp-wrapper #overlay #bottom #play-bar #play-bar-current{background-color:red;width:0}#zvp-wrapper #overlay #bottom #zvp-tools{display:flex;flex-direction:row;font-size:16.8px;justify-content:space-between;padding:6px 0}#zvp-wrapper #overlay #bottom #zvp-tools #left{display:flex;flex-direction:row}#zvp-wrapper #overlay #bottom #zvp-tools #left #play #resume{align-items:stretch;display:flex;flex-direction:row;height:14.69px;justify-content:space-between;width:32.85px}#zvp-wrapper #overlay #bottom #zvp-tools #left #play #resume .resume-prefix{background-color:#fff;border-radius:1px;height:100%;width:4px}#zvp-wrapper #overlay #bottom #zvp-tools #left #sound #volume-bar{height:2px;position:relative;width:50px}#zvp-wrapper #overlay #bottom #zvp-tools #left #sound #volume-bar #volume-pad{content:\"\";height:18px;left:0;position:absolute;top:-9px;width:100%;z-index:1}#zvp-wrapper #overlay #bottom #zvp-tools #left #sound #volume-bar #volume-bar-total{background-color:hsla(0,0%,100%,.5);height:100%;width:100%}#zvp-wrapper #overlay #bottom #zvp-tools #left #sound #volume-bar #volume-bar-current{background-color:#fff;width:0}#zvp-wrapper #overlay #bottom #zvp-tools #left #sound #volume-bar #volume-bar-current:after{background-color:#fff;border-radius:50%;content:\"\";height:8px;left:100%;position:absolute;top:50%;transform:translateX(-50%) translateY(-50%);width:8px}#zvp-wrapper #overlay #bottom #zvp-tools #left #sound #volume-bar #volume-bar-current-muted:after{background-color:#fff;border-radius:50%;content:\"\";height:8px;left:0;position:absolute;top:50%;transform:translateX(-50%) translateY(-50%);width:8px}#zvp-wrapper #overlay #bottom #zvp-tools #left #playback-time{font-size:11.2px;line-height:20px;padding:0 10px;vertical-align:middle}.no-select{-moz-user-select:none;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.flex-row-prefix{align-items:center;display:flex;flex-direction:row}.icon-prefix{color:#fff;cursor:pointer;opacity:.8;padding:0 10px;transition:opacity .1s ease-in-out}.icon-prefix:hover{opacity:1}.bar-prefix{height:100%;left:0;position:absolute;top:0}"], encapsulation: 2 });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(ZvpComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'zvp-component',
                templateUrl: './zvp.component.html',
                styleUrls: ['./_reset.scss', './zvp.component.scss'],
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
            }]
    }], function () { return [{ type: DbService }, { type: ZvpService }, { type: FlgEventService }, { type: ProcService }, { type: InfoService }, { type: FuncService }]; }, { zvpWrapper: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['zvpWrapper', { static: true }]
        }], renderer: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['renderer', { static: true }]
        }], playBar: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['playBar', { static: true }]
        }], volumeBar: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['volumeBar', { static: true }]
        }], options: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();

class ZvpModule {
}
ZvpModule.ɵmod = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"])({ type: ZvpModule });
ZvpModule.ɵinj = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"])({ factory: function ZvpModule_Factory(t) { return new (t || ZvpModule)(); }, imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"])(ZvpModule, { declarations: [ZvpComponent, EventDirective], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeModule"]], exports: [ZvpComponent] }); })();
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(ZvpModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [ZvpComponent, EventDirective],
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeModule"]],
                exports: [ZvpComponent]
            }]
    }], null, null); })();

/*
 * Public API Surface of zvp
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=zvp.js.map


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var zvp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zvp */ "./dist/zvp/fesm2015/zvp.js");



const _c0 = function () { return { src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", type: "video/mp4" }; };
const _c1 = function (a0) { return [a0]; };
const _c2 = function (a3) { return { autoplay: false, controls: false, loop: false, sources: a3 }; };
class AppComponent {
    constructor() { }
    ngOnInit() { }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 5, vars: 6, consts: [[2, "width", "1000px", "height", "100%", "margin", "0 auto"], ["href", "https://github.com/nkihrk/zvp", "target", "_blank"], [2, "padding", "10px 0 20px 0"], [3, "options"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "ZVP");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "zvp-component", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c0))));
    } }, directives: [zvp__WEBPACK_IMPORTED_MODULE_1__["ZvpComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var zvp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zvp */ "./dist/zvp/fesm2015/zvp.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");





class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], zvp__WEBPACK_IMPORTED_MODULE_2__["ZvpModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], zvp__WEBPACK_IMPORTED_MODULE_2__["ZvpModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
                imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], zvp__WEBPACK_IMPORTED_MODULE_2__["ZvpModule"]],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/chiru/Workspace/dev/angular/zoomable-video-player/src/main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!******************************!*\
  !*** min-document (ignored) ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map