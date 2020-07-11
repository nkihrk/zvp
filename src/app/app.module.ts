import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ZvpModule } from 'zvp';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ZvpModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
