import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { DbService } from './services/core/db.service';
import { ZvpService } from './services/core/zvp.service';
import { PointerData } from './models/pointer-data.model';
import { FlgEventService } from './services/core/flg-event.service';
import { ProcService } from './services/core/proc.service';
import { InfoService } from './services/core/info.service';
import { FuncService } from './services/core/func.service';
// Fontawesome
// - far
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { faCompress } from '@fortawesome/free-solid-svg-icons';
// - fas
import { faWindowRestore } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'zvp-component',
  templateUrl: './zvp.component.html',
  styleUrls: ['./_reset.scss', './zvp.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ZvpComponent implements OnInit {
  @ViewChild('zvpWrapper', { static: true }) zvpWrapper: ElementRef<HTMLDivElement>;
  @ViewChild('renderer', { static: true }) renderer: ElementRef<HTMLCanvasElement>;

  faPlay = faPlay;
  faVolumeUp = faVolumeUp;
  faVolumeMute = faVolumeMute;
  faExpand = faExpand;
  faWindowRestore = faWindowRestore;
  faRedo = faRedo;
  faCompress = faCompress;

  videoName = '';
  bufferedPercent = '0%';
  hoverPercent = '0%';
  currentPlaybackTimePercent = '0%';
  currentVolume = '%';
  currentPlaybackTime = '--:--';
  totalPlaybackTime = '--:--';

  togglePlayFlg = true;
  toggleVolumeFlg = true;
  toggleFullscreenFlg = true;

  constructor(
    private db: DbService,
    private zvp: ZvpService,
    private flgEvent: FlgEventService,
    private proc: ProcService,
    private info: InfoService,
    private func: FuncService
  ) {}

  ngOnInit(): void {
    this.zvp._init(this.zvpWrapper, this.renderer);

    this._render();
  }

  _onPointerEvents($e: PointerData): void {
    if (this.db.states.isInitialized) {
      this.flgEvent.updateFlgs($e);
      this.proc.update($e);
    }
  }

  _render(): void {
    const r: FrameRequestCallback = () => {
      if (this.db.states.isInitialized) {
        this.zvp._render();
        this._setInfo();
      }

      requestAnimationFrame(r);
    };
    requestAnimationFrame(r);
  }

  //////////////////////////////////////////////////////////
  //
  // Setting info
  //
  //////////////////////////////////////////////////////////

  _setInfo(): void {
    this.videoName = this.info.getVideoName;
    this.bufferedPercent = this.info.getBufferedPercent;
    this.hoverPercent = this.info.getHoverPercent;
    this.currentPlaybackTimePercent = this.info.getCurrentPlaybackTimePercent;
    this.currentVolume = this.info.getCurrentVolume;
    this.currentPlaybackTime = this.info.getCurrentPlaybackTime;
    this.totalPlaybackTime = this.info.getTotalPlaybackTime;
  }

  //////////////////////////////////////////////////////////
  //
  // Functions
  //
  //////////////////////////////////////////////////////////

  _togglePlay(): void {
    this.togglePlayFlg = !this.togglePlayFlg;

    if (this.togglePlayFlg) {
      this.func.play();
    } else {
      this.func.pause();
    }
  }

  _toggleVolume(): void {
    this.toggleVolumeFlg = !this.toggleVolumeFlg;
    this.func.mute();
  }

  _reset(): void {
    this.func.reset();
  }

  _toggleFullscreen(): void {
    this.toggleFullscreenFlg = !this.toggleFullscreenFlg;

    if (this.toggleFullscreenFlg) {
    } else {
    }
  }
}
