import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { FuncService } from './func.service';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {
  private isAlreadyPaused = false;

  constructor(private db: DbService, private func: FuncService) {}

  registerOnLeftMove(): void {
    const minX: number = this.db.renderer.playBar.getBoundingClientRect().left;
    const w: number = this.db.renderer.playBar.getBoundingClientRect().width;

    this.db.playWidth = ((this.db.mouseOffset.rawX - minX) / w) * this.db.renderer.player.duration();
    this._restrictRange();

    // Set ovelay UI visible
    this.db.states.isOverlayActive = true;

    if (this.db.renderer.player.paused()) {
      this.isAlreadyPaused = true;
    } else {
      this._stopPlay();
    }
    this.func.setPlayTime();
  }

  registerOnMouseUp(): void {
    if (!this.isAlreadyPaused) this._resumePlay();

    // Set ovelay UI invisible
    this.db.states.isOverlayActive = false;
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
