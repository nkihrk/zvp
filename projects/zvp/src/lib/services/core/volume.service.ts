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
      const minX: number = this.db.renderer.volume.getBoundingClientRect().left;
      const w: number = this.db.renderer.volume.getBoundingClientRect().width;
      this.db.volume = (this.db.mouseOffset.x - minX) / w;

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
    if (this.db.volume < 0) this.db.volume = 0;
    if (this.db.volume > 1) this.db.volume = 1;
  }
}
