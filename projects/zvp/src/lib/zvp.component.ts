import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ZvpService } from './services/zvp.service';
import { PointerData } from './models/pointer-data.model';

@Component({
  selector: 'zvp-component',
  template: `
    <div
      #zvpWrapper
      id="zvp-wrapper"
      style="position: relative;"
      zvpEvent
      (pointerData)="_onPointerEvents($event)"
    >
      <canvas #renderer id="renderer"></canvas>

      <div id="overlay" style="position: absolute;">
        <div #bar id="bar">
          <div id="total"></div>
          <div id="cached"></div>
          <div id="hover"></div>
          <div id="current"></div>
        </div>

        <div id="zvp-tools">
          <div id="left">
            <div #play id="play"></div>
            <div id="sound">
              <div #mute id="mute"></div>
              <div #volume id="volume"></div>
            </div>
            <div #time id="time"></div>
          </div>

          <div id="right">
            <div #reset id="reset"></div>
            <div #pip id="pip"></div>
            <div #fullscreen id="fullscreen"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./_reset.scss', './zvp.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ZvpComponent implements OnInit {
  @ViewChild('renderer', { static: true }) renderer: ElementRef<
    HTMLCanvasElement
  >;

  constructor(private zvp: ZvpService) {}

  ngOnInit(): void {
    this.zvp._initMainRenderer(this.renderer);

    this._render();
  }

  _render(): void {
    const r: FrameRequestCallback = () => {
      this.zvp._render();

      requestAnimationFrame(r);
    };
    requestAnimationFrame(r);
  }

  _onPointerEvents($e: PointerData): void {
    console.log($e);
  }
}
