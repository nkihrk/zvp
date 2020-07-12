import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { VideoService } from './video.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class RendererService {
  constructor(private db: DbService, private video: VideoService, private ui: UiService) {}

  render(): void {
    this.video.render();
    this.ui.render();

    const video: HTMLVideoElement = this.db.renderer.video;
    const w: number = video.videoWidth;
    const h: number = video.videoHeight;
    const c: HTMLCanvasElement = this.db.renderer.canvas.main;
    c.width = w;
    c.height = h;

    const ctx: CanvasRenderingContext2D = this.db.renderer.ctx.main;
    if (this.db.states.isLoaded) {
      ctx.drawImage(this.db.renderer.canvas.videoBuffer, 0, 0);
      ctx.drawImage(this.db.renderer.canvas.uiBuffer, 0, 0);
    }
  }
}
