import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZvpComponent } from './zvp.component';
import { EventDirective } from './directives/event.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipDirective } from './directives/pip.directive';

@NgModule({
  declarations: [ZvpComponent, EventDirective, PipDirective],
  imports: [CommonModule, FontAwesomeModule],
  exports: [ZvpComponent]
})
export class ZvpModule {}
