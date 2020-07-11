import { Injectable } from '@angular/core';
import videojs from 'video.js';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor() {}

  public renderer = { canvas: {} as Canvas, ctx: {} as Ctx } as Renderer;
}

export interface Renderer {
  video: HTMLVideoElement;
  player: videojs.Player;
  canvas: Canvas;
  ctx: Ctx;
}

export interface Canvas {
  main: HTMLCanvasElement;
  ui: HTMLCanvasElement;
}

export interface Ctx {
  main: CanvasRenderingContext2D;
  ui: CanvasRenderingContext2D;
}
