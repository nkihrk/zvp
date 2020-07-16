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

  isPipAvailable = false;

  videoName = '';
  bufferedPercent = '0%';
  hoverPercent = '0%';
  currentPlaybackTimePercent = '0%';
  currentVolume = '0%';
  currentPlaybackTime = '--:--';
  totalPlaybackTime = '--:--';

  togglePlayFlg = false;
  toggleVolumeFlg = true;
  togglePipFlg = false;
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

        this._detectVideoStates();
        this._detectBrowserStates();
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
  // Detect video states
  //
  //////////////////////////////////////////////////////////

  _detectVideoStates(): void {
    this.togglePlayFlg = !this.db.renderer.player.paused();
    this.toggleVolumeFlg = !this.db.renderer.player.muted();
    this.toggleFullscreenFlg = !this.db.renderer.player.isFullscreen();
  }

  //////////////////////////////////////////////////////////
  //
  // Detect browser states
  //
  //////////////////////////////////////////////////////////

  _detectBrowserStates(): void {
    this.isPipAvailable = this.db.states.isPipAvailable;
  }

  //////////////////////////////////////////////////////////
  //
  // Functions
  //
  //////////////////////////////////////////////////////////

  _togglePlay(): void {
    if (!this.togglePlayFlg) {
      this.func.play();
    } else {
      this.func.pause();
    }
  }

  _toggleVolume(): void {
    this.func.mute();
  }

  _reset(): void {
    this.func.reset();
  }

  async _togglePip(): Promise<any> {
    const d: any = document;

    if (d.pictureInPictureElement) {
      d.exitPictureInPicture().catch(($e) => {
        // Error handling
      });
    } else {
      const video: any = this.db.renderer.video;
      video.requestPictureInPicture();
    }
  }

  _toggleFullscreen(): void {
    if (this.toggleFullscreenFlg) {
      this.db.renderer.player.isFullscreen(true);
    } else {
      this.db.renderer.player.isFullscreen(false);
    }
  }
}
