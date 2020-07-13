import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { RegisterService } from './register.service';
import { PointerData } from '../../models/pointer-data.model';

@Injectable({
  providedIn: 'root'
})
export class ProcService {
  constructor(private db: DbService, private register: RegisterService) {}

  update($event: PointerData): void {
    // Update mouseOffset
    this.db.mouseOffset.x = $event.x - this.db.renderer.zvpWrapper.getBoundingClientRect().left;
    this.db.mouseOffset.y = $event.y - this.db.renderer.zvpWrapper.getBoundingClientRect().top;
    this.db.mouseOffset.rawX = $event.x;
    this.db.mouseOffset.rawY = $event.y;

    // When mouse button is down
    if (this.db.flgs.leftDownFlg || this.db.flgs.middleDownFlg || this.db.flgs.rightDownFlg) {
      this._onMouseDown();
    }

    // When mouse button is up
    if (this.db.flgs.leftUpFlg || this.db.flgs.middleUpFlg || this.db.flgs.rightUpFlg) {
      this._onMouseUp();
    }

    // Update anytime when the event is not mousedown
    if (!this.db.flgs.downFlg) {
      this._onNoMouseDown($event);
    }

    // When double clicked
    if (this.db.flgs.dblClickFlg) {
    }

    // Only allow left and middle buttons
    if (this.db.flgs.leftDownMoveFlg || this.db.flgs.middleDownMoveFlg) {
      this._onMouseMove($event);
    }
  }

  //////////////////////////////////////////////////////////
  //
  // Mousedown event
  //
  //////////////////////////////////////////////////////////

  _onMouseDown(): void {
    // Mousedown event with no mousemove
    this.db.mouseOffset.prevX = this.db.mouseOffset.x;
    this.db.mouseOffset.prevY = this.db.mouseOffset.y;

    this.register.onMouseDown();
  }

  //////////////////////////////////////////////////////////
  //
  // Mouseup event
  //
  //////////////////////////////////////////////////////////

  _onMouseUp(): void {
    this.register.onMouseUp();
  }

  //////////////////////////////////////////////////////////
  //
  // All events but mousedown
  //
  //////////////////////////////////////////////////////////

  _onNoMouseDown($event: PointerData): void {
    this.register.onNoMouseDown($event);
  }

  //////////////////////////////////////////////////////////
  //
  // Mousemove event
  //
  //////////////////////////////////////////////////////////

  _onMouseMove($event: PointerData): void {
    // Mousemove event with mousedown (Wheel event is excluded)
    if (!this.db.flgs.wheelFlg) {
      const newOffsetX: number = this.db.mouseOffset.x - this.db.mouseOffset.prevX;
      const newOffsetY: number = this.db.mouseOffset.y - this.db.mouseOffset.prevY;

      this.register.onMouseMove(newOffsetX, newOffsetY, $event);
    }
  }
}
