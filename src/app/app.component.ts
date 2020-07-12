import { Component, OnInit } from '@angular/core';
import { ZvpService } from 'zvp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private zvp: ZvpService) {}

  ngOnInit() {
    const options = {
      autoplay: true,
      controls: false,
      loop: true,
      sources: [{ src: 'assets/pv3.mp4', type: 'video/mp4' }]
    };
    this.zvp.init(options);
  }
}
