import { Injectable } from '@angular/core';
import videojs from 'video.js';
import { Flgs } from '../../models/flgs.model';
import { VideoOffset } from '../../models/video-offset.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor() {}

  public renderer = { canvas: {} as Canvas, ctx: {} as Ctx } as Renderer;

  public flgs: Flgs = {
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

  public videoOffset: VideoOffset = {
    zoomRatio: 1,
    prevOffsetX: 0,
    prevOffsetY: 0,
    newOffsetX: 0,
    newOffsetY: 0
  };

  public states = {
    isPreventWheel: false,
    isPreventWholeTrans: false,
    isLoaded: false,
    isInitialized: false,
    isPipAvailable: false,
    isFullscreenAvailable: false
  };

  public mouseOffset = {
    x: -Infinity,
    y: -Infinity,
    rawX: -Infinity,
    rawY: -Infinity,
    prevX: -Infinity,
    prevY: -Infinity
  };

  public volume = 1;

  public reservedBy = {
    name: '',
    type: '',
    flgs: ['']
  };

  public readonly constant = {
    ZOOM_SPEED: 0.2 // Zoom speed of canvas
  };
}

export interface Renderer {
  zvpWrapper: HTMLDivElement;
  volume: HTMLDivElement;
  video: HTMLVideoElement;
  player: videojs.Player;
  canvas: Canvas;
  ctx: Ctx;
}

export interface Canvas {
  main: HTMLCanvasElement;
  videoBuffer: HTMLCanvasElement;
  uiBuffer: HTMLCanvasElement;
}

export interface Ctx {
  main: CanvasRenderingContext2D;
  videoBuffer: CanvasRenderingContext2D;
  uiBuffer: CanvasRenderingContext2D;
}
