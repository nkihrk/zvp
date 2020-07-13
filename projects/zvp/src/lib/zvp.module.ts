import { NgModule } from '@angular/core';
import { ZvpComponent } from './zvp.component';
import { EventDirective } from './directives/event.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ZvpComponent, EventDirective],
  imports: [FontAwesomeModule],
  exports: [ZvpComponent]
})
export class ZvpModule {}
