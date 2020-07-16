import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[zvpPip]'
})
export class PipDirective {
  constructor() {}

  @HostListener('click', ['$event']) onPointerUp($e) {}
}
