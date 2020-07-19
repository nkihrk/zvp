import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { FuncService } from './func.service';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {
  constructor(private db: DbService, private func: FuncService) {}

  registerOnLeftMove(): void {
    if (!this._isMuted()) {
      const minX: number = this.db.renderer.volumeBar.getBoundingClientRect().left;
      const w: number = this.db.renderer.volumeBar.getBoundingClientRect().width;
      this.db.volumeWidth = (this.db.mouseOffset.x - minX) / w;

      this._restrictRange();
      this.func.setVolume();
    }
  }

  _isMuted(): boolean {
    const player = this.db.renderer.player;
    const isVolumeMuted: boolean = player.muted();

    return isVolumeMuted;
  }

  _restrictRange(): void {
    if (this.db.volumeWidth < 0) this.db.volumeWidth = 0;
    if (this.db.volumeWidth > 1) this.db.volumeWidth = 1;
  }
}
