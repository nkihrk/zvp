import { Injectable } from '@angular/core';
import { DbService } from '../core/db.service';
import { PointerData } from '../../models/pointer-data.model';

@Injectable({
  providedIn: 'root'
})
export class CoordService {
  constructor(private db: DbService) {}

  updateOffsetsNoRistrict($newOffsetX, $newOffsetY, $offsets: any, $event: PointerData): void {
    const offsets = $offsets;
    let offsetX: number = offsets.prevOffsetX;
    let offsetY: number = offsets.prevOffsetY;

    if (!this.db.flgs.wheelFlg) {
      if ($event.btn === 0 || $event.btn === 1) {
        offsetX += $newOffsetX;
        offsetY += $newOffsetY;
      }
    } else {
      offsetX -= this.db.mouseOffset.x;
      offsetY -= this.db.mouseOffset.y;

      if ($event.delta > 0) {
        const ratio: number = 1 - this.db.constant.ZOOM_SPEED;
        offsetX = offsetX * ratio + this.db.mouseOffset.x;
        offsetY = offsetY * ratio + this.db.mouseOffset.y;
      } else {
        const ratio: number = 1 + this.db.constant.ZOOM_SPEED;
        offsetX = offsetX * ratio + this.db.mouseOffset.x;
        offsetY = offsetY * ratio + this.db.mouseOffset.y;
      }
    }

    offsets.newOffsetX = offsetX;
    offsets.newOffsetY = offsetY;
  }

  updateOffsets($newOffsetX, $newOffsetY, $offsets: any, $event: PointerData): void {
    const offsets = $offsets;
    let offsetX: number = offsets.prevOffsetX;
    let offsetY: number = offsets.prevOffsetY;

    if (!this.db.flgs.wheelFlg) {
      if (
        ($event.btn === 0 && !this.db.states.isPreventSelect) ||
        ($event.btn === 1 && !this.db.states.isPreventWholeTrans)
      ) {
        offsetX += $newOffsetX;
        offsetY += $newOffsetY;
      }
    } else {
      if (!this.db.states.isPreventWheel) {
        offsetX -= this.db.mouseOffset.x;
        offsetY -= this.db.mouseOffset.y;

        if ($event.delta > 0) {
          const ratio: number = 1 - this.db.constant.ZOOM_SPEED;
          offsetX = offsetX * ratio + this.db.mouseOffset.x;
          offsetY = offsetY * ratio + this.db.mouseOffset.y;
        } else {
          const ratio: number = 1 + this.db.constant.ZOOM_SPEED;
          offsetX = offsetX * ratio + this.db.mouseOffset.x;
          offsetY = offsetY * ratio + this.db.mouseOffset.y;
        }
      }
    }

    offsets.newOffsetX = offsetX;
    offsets.newOffsetY = offsetY;
  }

  updateSizeByPointer($size: any, $newOffsetX, $newOffsetY): void {
    const size = $size;
    size.width += $newOffsetX;
    size.height += $newOffsetY;
  }

  updateSizeByWheel($size: any, $event: PointerData): void {
    const size = $size;
    let width: number = size.width;
    let height: number = size.height;

    if (this.db.flgs.wheelFlg && !this.db.states.isPreventWheel) {
      let ratio = 1;
      if ($event.delta > 0) {
        // Negative zoom
        ratio -= this.db.constant.ZOOM_SPEED;
      } else {
        // Positive zoom
        ratio += this.db.constant.ZOOM_SPEED;
      }

      width *= ratio;
      height *= ratio;

      size.width = width;
      size.height = height;
    }
  }

  updateZoomRatioByWheel($zoomRatio: number, $event: PointerData): number {
    let zoomRatio: number = $zoomRatio;

    if (this.db.flgs.wheelFlg && !this.db.states.isPreventWheel) {
      let ratio = 1;
      if ($event.delta > 0) {
        // Negative zoom
        ratio -= this.db.constant.ZOOM_SPEED;
      } else {
        // Positive zoom
        ratio += this.db.constant.ZOOM_SPEED;
      }

      zoomRatio *= ratio;
    }

    return zoomRatio;
  }
}
