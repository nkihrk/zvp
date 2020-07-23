import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { PointerData } from '../models/pointer-data.model';

@Directive({
  selector: '[zvpEvent]'
})
export class EventDirective {
  @Output() pointerData = new EventEmitter<PointerData>();

  // Wheel delta
  private delta = 0;
  // Mouse button number
  private btn = 0;

  // Flgs
  private wheelFlg = false;
  private downFlg = false;
  private moveFlg = false;
  private dblClickFlg = false;

  constructor() {}

  _emitData($clientX: number, $clientY: number) {
    this.pointerData.emit({
      x: $clientX,
      y: $clientY,
      delta: this.delta,
      btn: this.btn,
      wheelFlg: this.wheelFlg,
      downFlg: this.downFlg,
      moveFlg: this.moveFlg,
      dblClickFlg: this.dblClickFlg
    });
  }

  _resetAllFlgs() {
    this.downFlg = false;
    this.moveFlg = false;
    this.dblClickFlg = false;
  }

  // Pointerdown listener
  @HostListener('pointerdown', ['$event']) onPointerDown($e) {
    this._onDown($e);
  }

  // Pointerup listener
  @HostListener('document:pointerup', ['$event']) onPointerUp($e) {
    this._onUp($e);
  }

  // Pointermove listener
  @HostListener('document:pointermove', ['$event']) onPointerMove($e) {
    this._onMove($e);
  }

  // Touchstart listener
  @HostListener('touchstart', ['$event']) onTouchStart($e) {
    this._onDown($e);
  }

  // Touchend listener
  @HostListener('document:touchend', ['$event']) onTouchEnd($e) {
    this._onUp($e);
  }

  // Touchmove listener
  @HostListener('document:touchmove', ['$event']) onTouchMove($e) {
    this._onMove($e);
  }

  // Mousedown listener
  @HostListener('mousedown', ['$event']) onMouseDown($e) {
    this._onDown($e);
  }

  // Mouseup listener
  @HostListener('document:mouseup', ['$event']) onMouseUp($e) {
    this._onUp($e);
  }

  // Mouseleave listener
  @HostListener('mouseleave', ['$event']) onMouseLeave($e) {}

  // Mousemove listener
  @HostListener('document:mousemove', ['$event']) onMouseMove($e) {
    this._onMove($e);
  }

  // Dblclick listener
  @HostListener('dblclick', ['$event']) onDoubleClick($e) {
    const clientX = $e.clientX;
    const clientY = $e.clientY;

    // Initialize flags
    this._resetAllFlgs();
    this.dblClickFlg = true;
    this._emitData(clientX, clientY);

    // To prevent permanent zooming
    this.dblClickFlg = false;
  }

  // Wheel listener
  @HostListener('wheel', ['$event']) onMouseWheel($e) {
    //$e.stopPropagation();

    const clientX = $e.clientX;
    const clientY = $e.clientY;

    this.wheelFlg = true;
    this.delta = $e.deltaY;
    this._emitData(clientX, clientY);
    // To prevent permanent zooming
    this.wheelFlg = false;
  }

  // Down event
  _onDown($e: any) {
    let clientX: number;
    let clientY: number;

    if ($e.type === 'touchstart') {
      clientX = $e.touches[0].clientX;
      clientY = $e.touches[0].clientY;
      this.btn = 0;
    } else {
      clientX = $e.clientX;
      clientY = $e.clientY;
      this.btn = $e.button;
    }

    // Initialize flags
    this._resetAllFlgs();
    this.downFlg = true;
    this._emitData(clientX, clientY);
  }

  // Up event
  _onUp($e: any) {
    let clientX: number;
    let clientY: number;

    if ($e.type === 'touchend') {
      clientX = $e.changedTouches[0].clientX;
      clientY = $e.changedTouches[0].clientY;
    } else {
      clientX = $e.clientX;
      clientY = $e.clientY;
    }

    // Initialize flags
    this._resetAllFlgs();
    this._emitData(clientX, clientY);
  }

  // Move event
  _onMove($e: any) {
    let clientX: number;
    let clientY: number;

    if ($e.type === 'touchmove') {
      clientX = $e.touches[0].clientX;
      clientY = $e.touches[0].clientY;
    } else {
      clientX = $e.clientX;
      clientY = $e.clientY;
    }

    this.moveFlg = true;
    this._emitData(clientX, clientY);
  }
}
