import { Injectable } from '@angular/core';
import { Flgs } from '../..//models/flgs.model';
import { DbService } from './db.service';
import { PointerData } from '../../models/pointer-data.model';

@Injectable({
  providedIn: 'root'
})
export class FlgEventService {
  constructor(private db: DbService) {}

  updateFlgs($event: PointerData): void {
    const flgs: Flgs = {
      dblClickFlg: $event.dblClickFlg,
      downFlg: $event.downFlg,
      // - Similarly to mousedown events
      leftDownFlg: $event.downFlg && !$event.moveFlg && $event.btn === 0,
      middleDownFlg: $event.downFlg && !$event.moveFlg && $event.btn === 1,
      rightDownFlg: $event.downFlg && !$event.moveFlg && $event.btn === 2,
      // - Similarly to mouseup events
      leftUpFlg: !$event.downFlg && !$event.moveFlg && $event.btn === 0,
      middleUpFlg: !$event.downFlg && !$event.moveFlg && $event.btn === 1,
      rightUpFlg: !$event.downFlg && !$event.moveFlg && $event.btn === 2,
      // - Similarly to mousedown + mousemove events
      leftDownMoveFlg: $event.downFlg && $event.moveFlg && $event.btn === 0,
      middleDownMoveFlg: $event.downFlg && $event.moveFlg && $event.btn === 1,
      rightDownMoveFlg: $event.downFlg && $event.moveFlg && $event.btn === 2,
      // Similarly to wheel event
      wheelFlg: $event.wheelFlg
    };

    this.db.flgs = flgs;
  }
}
