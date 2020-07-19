import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { FuncService } from './func.service';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {
  constructor(private db: DbService, private func: FuncService) {}

  registerOnLeftMove(): void {
    const minX: number = this.db.renderer.playBar.getBoundingClientRect().left;
    const w: number = this.db.renderer.playBar.getBoundingClientRect().width;

    this.db.playWidth = ((this.db.mouseOffset.x - minX) / w) * this.db.renderer.player.duration();
    this._restrictRange();

    this._stopPlay();
    this.func.setPlayTime();
  }

  registerOnMouseUp(): void {
    this._resumePlay();
  }

  _restrictRange(): void {
    if (this.db.playWidth < 0) this.db.playWidth = 0;
    if (this.db.playWidth > this.db.renderer.player.duration()) this.db.playWidth = this.db.renderer.player.duration();
  }

  _stopPlay(): void {
    this.func.pause();
  }

  _resumePlay(): void {
    this.func.play();
  }
}
