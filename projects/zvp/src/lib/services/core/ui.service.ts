import { Injectable } from '@angular/core';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  constructor(private db: DbService) {}

  render(): void {
    const video: HTMLVideoElement = this.db.renderer.video;
    const w: number = video.videoWidth;
    const h: number = video.videoHeight;
    const c: HTMLCanvasElement = this.db.renderer.canvas.uiBuffer;
    c.width = w;
    c.height = h;

    if (this.db.flgs.middleDownMoveFlg) {
      const ctx: CanvasRenderingContext2D = this.db.renderer.ctx.uiBuffer;
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
