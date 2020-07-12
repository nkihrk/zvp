import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Flgs } from '../../models/flgs.model';
import { VideoService } from './video.service';
import { PointerData } from '../../models/pointer-data.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private db: DbService, private video: VideoService) {}

  onMouseDown(): void {
    this.video.registerOnMouseDown();
  }

  onNoMouseDown($event: PointerData): void {
    const flgs: Flgs = this.db.flgs;

    this.video.registerOnMouseDown();

    if (flgs.wheelFlg) {
      this.video.registerOnNoMouseDown($event);
    }
  }

  onMouseUp(): void {
    const flgs: Flgs = this.db.flgs;

    if (flgs.leftUpFlg) {
    } else if (flgs.rightUpFlg) {
    } else if (flgs.middleUpFlg) {
    }
  }

  onMouseMove($newOffsetX: number, $newOffsetY: number, $event: PointerData): void {
    const reserved = this.db.reservedByFunc;
    const flgs: Flgs = this.db.flgs;

    if (flgs.leftDownMoveFlg) {
      if (reserved.name === '') {
      }
    } else if (flgs.middleDownMoveFlg) {
      this.video.registerOnMouseMiddleMove($newOffsetX, $newOffsetY, $event);
    }
  }
}
