import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Flgs } from '../../models/flgs.model';
import { VideoService } from './video.service';
import { PointerData } from '../../models/pointer-data.model';
import { VolumeService } from './volume.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private db: DbService, private video: VideoService, private volume: VolumeService) {}

  onMouseDown(): void {
    const reserved = this.db.reservedBy;

    if (reserved.name === 'canvas') {
      this.video.registerOnMouseDown();
    } else if (reserved.name === 'volume') {
      this.volume.registerOnLeftMove();
    }
  }

  onNoMouseDown($event: PointerData): void {
    const reserved = this.db.reservedBy;
    const flgs: Flgs = this.db.flgs;

    if (reserved.name === 'canvas') {
      this.video.registerOnMouseDown();
      if (flgs.wheelFlg) {
        this.video.registerOnNoMouseDown($event);
      }
    }
  }

  onMouseUp(): void {
    const flgs: Flgs = this.db.flgs;

    if (flgs.leftUpFlg) {
    } else if (flgs.rightUpFlg) {
    } else if (flgs.middleUpFlg) {
    }

    // Release
    this.db.reservedBy = {
      name: '',
      type: '',
      flgs: ['']
    };
  }

  onMouseMove($newOffsetX: number, $newOffsetY: number, $event: PointerData): void {
    const reserved = this.db.reservedBy;
    const flgs: Flgs = this.db.flgs;

    if (flgs.leftDownMoveFlg) {
      if (reserved.name === 'volume') {
        this.volume.registerOnLeftMove();
      }
    } else if (flgs.middleDownMoveFlg) {
      if (reserved.name === 'canvas') {
        this.video.registerOnMouseMiddleMove($newOffsetX, $newOffsetY, $event);
      }
    }
  }
}
