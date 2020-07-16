import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZvpComponent } from './zvp.component';
import { EventDirective } from './directives/event.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ZvpComponent, EventDirective],
  imports: [CommonModule, FontAwesomeModule],
  exports: [ZvpComponent]
})
export class ZvpModule {}
