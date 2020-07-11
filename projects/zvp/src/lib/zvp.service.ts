import { Injectable, ElementRef } from '@angular/core';
import videojs from 'video.js';

@Injectable({
  providedIn: 'root',
})
export class ZvpService {
  private player: videojs.Player;
  private target: HTMLVideoElement;

  constructor() {}

  init($options: {
    autoplay: boolean;
    controls: boolean;
    sources: { src: string; type: string }[];
  }): void {
    this.target = document.createElement('video');
    this.target.width = 1280;
    this.target.height = 720;

    this.player = videojs(this.target, $options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
  }

  destroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  getTarget(): HTMLVideoElement {
    return this.target;
  }
}
