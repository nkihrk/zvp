import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ZvpService } from './zvp.service';

@Component({
  selector: 'zvp-component',
  template: `
    <p>
      zvp works!
    </p>

    <div #zvpWrapper id="zvp-wrapper" style="position: relative;">
      <canvas #renderer id="renderer"></canvas>
      <div #bar id="bar">
        <div id="total"></div>
        <div id="cached"></div>
        <div id="hover"></div>
        <div id="current"></div>
      </div>
      <div id="zvp-tools">
        <div #play id="play"></div>
        <div id="sound">
          <div #mute id="mute"></div>
          <div #volume id="volume"></div>
        </div>
        <div #time id="time"></div>
        <div #reset id="reset"></div>
        <div #pip id="pip"></div>
        <div #fullscreen id="fullscreen"></div>
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

  private c: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(private zvp: ZvpService) {}

  ngOnInit(): void {
    this.c = this.renderer.nativeElement;
    this.c.width = 1280;
    this.c.height = 720;
    this.ctx = this.c.getContext('2d');

    this.render();
  }

  render(): void {
    const r: FrameRequestCallback = () => {
      this._render();

      requestAnimationFrame(r);
    };
    requestAnimationFrame(r);
  }

  _render(): void {
    this.ctx.drawImage(this.zvp.getTarget(), 0, 0);
  }
}
