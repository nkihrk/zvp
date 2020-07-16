import { Injectable } from '@angular/core';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class FuncService {
  constructor(private db: DbService) {}

  play(): void {
    this.db.renderer.player.play();
  }

  pause(): void {
    this.db.renderer.player.pause();
  }

  mute(): void {
    const player = this.db.renderer.player;
    const isVolumeMuted: boolean = player.muted();
    player.muted(!isVolumeMuted);
  }

  reset(): void {
    const ratio: number = this.db.renderer.video.videoHeight / this.db.renderer.video.videoWidth;
    const w: number = this.db.renderer.zvpWrapper.getBoundingClientRect().width;
    const h: number = w * ratio;
    this.db.videoOffset = {
      zoomRatio: 1,
      prevOffsetX: 0,
      prevOffsetY: 0,
      newOffsetX: w / 2,
      newOffsetY: h / 2
    };
  }

  setVolume(): void {
    const player = this.db.renderer.player;
    const volume = this.db.volume;
    player.volume(volume);
  }
}
