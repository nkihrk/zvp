import { Injectable } from '@angular/core';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  constructor(private db: DbService) {}

  get getVideoName(): string {
    return this.db.renderer.player.currentSrc();
  }

  get getBufferedPercent(): string {
    return this.db.renderer.player.bufferedPercent() * 100 + '%';
  }

  get getHoverPercent(): string {
    const total: number = this.db.renderer.zvpWrapper.getBoundingClientRect().width;
    const main: number = total * 0.98;
    const piece: number = total * 0.02;
    const current: number = this.db.mouseOffset.x - piece / 2;

    return (current / main) * 100 + '%';
  }

  get getCurrentPlaybackTimePercent(): string {
    const t: number = this.db.renderer.player.currentTime();
    const tTotal: number = this.db.renderer.player.duration();

    return (t / tTotal) * 100 + '%';
  }

  get getCurrentVolume(): string {
    const v: number = this.db.renderer.player.volume();

    return v * 100 + '%';
  }

  get getCurrentPlaybackTime(): string {
    const t: number = this.db.renderer.player.currentTime();
    const minutes: number = Math.floor(t / 60);
    const seconds: number = Math.floor(t - minutes * 60);

    const x: string = minutes < 10 ? '0' + minutes : minutes.toString();
    const y: string = seconds < 10 ? '0' + seconds : seconds.toString();

    return x + ':' + y;
  }

  get getTotalPlaybackTime(): string {
    const t: number = this.db.renderer.player.duration();
    const minutes: number = Math.floor(t / 60);
    const seconds: number = Math.floor(t - minutes * 60);

    const x: string = minutes < 10 ? '0' + minutes : minutes.toString();
    const y: string = seconds < 10 ? '0' + seconds : seconds.toString();

    return x + ':' + y;
  }
}
