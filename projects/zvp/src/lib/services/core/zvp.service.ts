import { Injectable, ElementRef } from '@angular/core';
import videojs from 'video.js';
import { VideoJsPlayerOptions } from 'video.js';
import { RendererService } from './renderer.service';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ZvpService {
  constructor(private renderer: RendererService, private db: DbService) {}
  //////////////////////////////////////////////////////////
  //
  // Public
  //
  //////////////////////////////////////////////////////////

  init($options: VideoJsPlayerOptions): void {
    this.db.renderer.video = document.createElement('video');
    this.db.renderer.video.onloadedmetadata = () => {
      this.db.videoOffset.newOffsetX = this.db.renderer.video.videoWidth / 2;
      this.db.videoOffset.newOffsetY = this.db.renderer.video.videoHeight / 2;
      this.db.states.isLoaded = true;
    };
    this.db.renderer.player = videojs(this.db.renderer.video, $options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });

    this.db.renderer.canvas.videoBuffer = document.createElement('canvas');
    this.db.renderer.canvas.uiBuffer = document.createElement('canvas');

    this.db.renderer.ctx.videoBuffer = this.db.renderer.canvas.videoBuffer.getContext('2d');
    this.db.renderer.ctx.uiBuffer = this.db.renderer.canvas.uiBuffer.getContext('2d');

    //setInterval(() => {
    //console.log(this.db.videoOffset.zoomRatio);
    //}, 1000);
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
