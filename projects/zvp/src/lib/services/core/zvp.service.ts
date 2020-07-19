import { Injectable } from '@angular/core';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
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
      const ratio: number = this.db.renderer.video.videoHeight / this.db.renderer.video.videoWidth;
      const w: number = this.db.renderer.zvpWrapper.getBoundingClientRect().width;
      const h: number = w * ratio;

      this.db.videoOffset.newOffsetX = w / 2;
      this.db.videoOffset.newOffsetY = h / 2;
      this.db.states.isLoaded = true;
    };
    this.db.renderer.player = videojs(this.db.renderer.video, $options, function onPlayerReady() {
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

  get player(): VideoJsPlayer {
    return this.db.renderer.player;
  }

  //////////////////////////////////////////////////////////
  //
  // Private
  //
  //////////////////////////////////////////////////////////

  _render(): void {
    this.renderer.render();
  }
}
