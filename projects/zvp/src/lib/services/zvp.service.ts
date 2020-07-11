import { Injectable, ElementRef } from '@angular/core';
import videojs from 'video.js';
import { RendererService } from './renderer.service';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class ZvpService {
  constructor(private renderer: RendererService, private db: DbService) {}

  init($options: {
    autoplay: boolean;
    controls: boolean;
    sources: { src: string; type: string }[];
  }): void {
    // Initialize DB
    this.db.init();

    this.db.renderer.player = videojs(
      this.db.renderer.video,
      $options,
      function onPlayerReady() {
        console.log('onPlayerReady', this);
      }
    );
  }

  destroy(): void {
    if (this.db.renderer.player) {
      this.db.renderer.player.dispose();
    }
  }

  _initRenderer($target: ElementRef<HTMLCanvasElement>): void {
    this.db.renderer.canvas.main = $target.nativeElement;
    this.db.renderer.ctx.main = this.db.renderer.canvas.main.getContext('2d');
  }

  _render(): void {
    this.renderer.render();
  }
}
