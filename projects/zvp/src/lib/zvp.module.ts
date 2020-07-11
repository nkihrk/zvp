import { NgModule } from '@angular/core';
import { ZvpComponent } from './zvp.component';
import { EventDirective } from './directives/event.directive';

@NgModule({
  declarations: [ZvpComponent, EventDirective],
  imports: [],
  exports: [ZvpComponent],
})
export class ZvpModule {}
