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
