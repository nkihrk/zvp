import { Injectable } from '@angular/core';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class RendererService {
  constructor(private db: DbService) {}

  render(): void {
    const video: HTMLVideoElement = this.db.renderer.video;
    const w: number = video.videoWidth;
    const h: number = video.videoHeight;
    this.db.renderer.canvas.main.width = w;
    this.db.renderer.canvas.main.height = h;

    const ctx: CanvasRenderingContext2D = this.db.renderer.ctx.main;
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.scale(-1, 1);
    ctx.drawImage(video, -w / 2, -h / 2, w, h);
    ctx.restore();
  }
}
