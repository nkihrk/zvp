import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { PointerData } from '../models/pointer-data.model';

@Directive({
  selector: '[zvpEvent]',
})
export class EventDirective {
  @Output() pointerData = new EventEmitter<PointerData>();

  // Wheel delta
  private delta = 0;

  // Flgs
  private wheelFlg = false;
  private downFlg = false;
  private moveFlg = false;

  constructor() {}

  _emitData($clientX: number, $clientY: number) {
    this.pointerData.emit({
      x: $clientX,
      y: $clientY,
      delta: this.delta,
      wheelFlg: this.wheelFlg,
      downFlg: this.downFlg,
      moveFlg: this.moveFlg,
    });
  }

  _resetAllFlgs() {
    this.downFlg = false;
    this.moveFlg = false;
  }

  // Pointerdown listener
  @HostListener('pointerdown', ['$event']) onPointerDown($e) {
    $e.preventDefault();
    $e.stopPropagation();
    this._onDown($e);
  }

  // Pointerup listener
  @HostListener('pointerup', ['$event']) onPointerUp($e) {
    $e.preventDefault();
    $e.stopPropagation();

    this._onUp($e);
  }

  // Pointermove listener
  @HostListener('pointermove', ['$event']) onPointerMove($e) {
    $e.preventDefault();
    $e.stopPropagation();

    this._onMove($e);
  }

  // Touchstart listener
  @HostListener('touchstart', ['$event']) onTouchStart($e) {
    // $e.preventDefault();
    $e.stopPropagation();
    this._onDown($e);
  }

  // Touchend listener
  @HostListener('touchend', ['$event']) onTouchEnd($e) {
    // $e.preventDefault();
    $e.stopPropagation();
    this._onUp($e);
  }

  // Touchmove listener
  @HostListener('touchmove', ['$event']) onTouchMove($e) {
    // $e.preventDefault();
    $e.stopPropagation();
    this._onMove($e);
  }

  // Mousedown listener
  @HostListener('mousedown', ['$event']) onMouseDown($e) {
    $e.preventDefault();
    $e.stopPropagation();
    this._onDown($e);
  }

  // Mouseup listener
  @HostListener('mouseup', ['$event']) onMouseUp($e) {
    $e.preventDefault();
    $e.stopPropagation();
    this._onUp($e);
  }

  // Mouseleave listener
  @HostListener('mouseleave', ['$event']) onMouseLeave($e) {}

  // Mousemove listener
  @HostListener('mousemove', ['$event']) onMouseMove($e) {
    $e.preventDefault();
    $e.stopPropagation();
    this._onMove($e);
  }

  // Wheel listener
  @HostListener('wheel', ['$event']) onMouseWheel($e) {
    $e.stopPropagation();

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
    } else {
      clientX = $e.clientX;
      clientY = $e.clientY;
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
