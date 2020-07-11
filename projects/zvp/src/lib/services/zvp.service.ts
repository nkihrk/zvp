import { Injectable, ElementRef } from '@angular/core';
import videojs from 'video.js';
import { RendererService } from './renderer.service';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class ZvpService {
  constructor(private renderer: RendererService, private db: DbService) {}

  //////////////////////////////////////////////////////////
  //
  // Public
  //
  //////////////////////////////////////////////////////////

  init($options: {
    autoplay: boolean;
    controls: boolean;
    sources: { src: string; type: string }[];
  }): void {
    this.db.renderer.video = document.createElement('video');
    this.db.renderer.player = videojs(
      this.db.renderer.video,
      $options,
      function onPlayerReady() {
        console.log('onPlayerReady', this);
      }
    );
    this.db.renderer.canvas.ui = document.createElement('canvas');
    this.db.renderer.ctx.ui = this.db.renderer.canvas.ui.getContext('2d');
  }

  destroy(): void {
    if (this.db.renderer.player) {
      this.db.renderer.player.dispose();
    }
  }

  //////////////////////////////////////////////////////////
  //
  // Private
  //
  //////////////////////////////////////////////////////////

  _initMainRenderer($target: ElementRef<HTMLCanvasElement>): void {
    this.db.renderer.canvas.main = $target.nativeElement;
    this.db.renderer.ctx.main = this.db.renderer.canvas.main.getContext('2d');
  }

  _render(): void {
    this.renderer.render();
  }
}
