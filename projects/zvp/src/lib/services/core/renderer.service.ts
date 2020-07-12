import { Injectable } from '@angular/core';
import { VideoService } from './video.service';

@Injectable({
  providedIn: 'root'
})
export class RendererService {
  constructor(private video: VideoService) {}

  render(): void {
    this.video.render();
  }
}
