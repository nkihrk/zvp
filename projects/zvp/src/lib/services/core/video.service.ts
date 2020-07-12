import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { CoordService } from '../util/coord.service';
import { PointerData } from '../../models/pointer-data.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private db: DbService, private coord: CoordService) {}

  registerOnMouseDown(): void {
    this.db.videoOffset.prevOffsetX = this.db.videoOffset.newOffsetX;
    this.db.videoOffset.prevOffsetY = this.db.videoOffset.newOffsetY;
  }

  registerOnNoMouseDown($event: PointerData): void {
    this.updateOffsets(0, 0, $event);
  }

  registerOnMouseMiddleMove($newOffsetX: number, $newOffsetY: number, $event: PointerData): void {
    this.updateOffsets($newOffsetX, $newOffsetY, $event);
  }

  updateOffsets($newOffsetX: number, $newOffsetY: number, $event: PointerData): void {
    this.coord.updateOffsets($newOffsetX, $newOffsetY, this.db.videoOffset, $event);
    this.db.videoOffset.zoomRatio = this.coord.updateZoomRatioByWheel(this.db.videoOffset.zoomRatio, $event);

    this._restrictArea();
  }

  _restrictArea(): void {
    const video: HTMLVideoElement = this.db.renderer.video;
    const w: number = video.videoWidth;
    const h: number = video.videoHeight;

    const fixedW: number = w * this.db.videoOffset.zoomRatio;
    const fixedH: number = h * this.db.videoOffset.zoomRatio;

    const fixedX: number = this.db.videoOffset.newOffsetX;
    const fixedY: number = this.db.videoOffset.newOffsetY;

    if (w < fixedW) {
      if (0 > -fixedX + fixedW / 2) this.db.videoOffset.newOffsetX = fixedW / 2;
      if (w > fixedX + fixedW / 2) this.db.videoOffset.newOffsetX = w - fixedW / 2;
    } else {
      if (fixedX - fixedW / 2 < 0) this.db.videoOffset.newOffsetX = fixedW / 2;
      if (w < fixedX + fixedW / 2) this.db.videoOffset.newOffsetX = w - fixedW / 2;
    }

    if (h < fixedH) {
      if (0 > -fixedY + fixedH / 2) this.db.videoOffset.newOffsetY = fixedH / 2;
      if (h > fixedY + fixedH / 2) this.db.videoOffset.newOffsetY = h - fixedH / 2;
    } else {
      if (fixedY - fixedH / 2 < 0) this.db.videoOffset.newOffsetY = fixedH / 2;
      if (h < fixedY + fixedH / 2) this.db.videoOffset.newOffsetY = h - fixedH / 2;
    }
  }

  render(): void {
    const video: HTMLVideoElement = this.db.renderer.video;
    const w: number = video.videoWidth;
    const h: number = video.videoHeight;
    this.db.renderer.canvas.main.width = w;
    this.db.renderer.canvas.main.height = h;

    const fixedW: number = w * this.db.videoOffset.zoomRatio;
    const fixedH: number = h * this.db.videoOffset.zoomRatio;
    const fixedX: number = this.db.videoOffset.newOffsetX;
    const fixedY: number = this.db.videoOffset.newOffsetY;

    const ctx: CanvasRenderingContext2D = this.db.renderer.ctx.main;
    ctx.save();
    ctx.translate(fixedX, fixedY);
    //ctx.scale(-1, 1);
    ctx.drawImage(video, -fixedW / 2, -fixedH / 2, fixedW, fixedH);
    ctx.restore();
  }
}
