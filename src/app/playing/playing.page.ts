import { Component, OnInit } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { Howl } from "howler";

export interface Track {
  name: string;
  path: string;
  singer: string;
  image: string;
  duration: string;
}

@Component({
  selector: 'app-playing',
  templateUrl: './playing.page.html',
  styleUrls: ['./playing.page.scss'],
})
export class PlayingPage implements OnInit {


  playlist = [];
  activeTrack: Track = null;
  player: Howl = null;
  playing = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.playlist = JSON.parse(params.special);
        console.log(this.playlist);
      }
    });
   }

  ngOnInit() {
  }

  start(track: any) {
    // this.id = track.id;
    // this.path = track.path;
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      // src: (`http://127.0.0.1:8000/mp3/${this.id}/path/${this.path}`),
      onplay: () => {
        console.log('onplay');
        this.playing = true;
        this.activeTrack = track;
      },
      onend: () => {
        console.log('onend');
        let index = this.playlist.indexOf(this.activeTrack);
        if (index != this.playlist.length - 1) {
          this.start(this.playlist[index + 1]);
        } else {
          this.start(this.playlist[0]);
        }

      }
    });
    this.player.play();
  }

  togglePlayer(pause) {
    this.playing = !pause;
    if (pause) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  prev() {
    let index = this.playlist.indexOf(this.activeTrack);
    if (index > 0) {
      this.start(this.playlist[index - 1]);
    } else {
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }

  next() {
    let index = this.playlist.indexOf(this.activeTrack);
    if (index != this.playlist.length - 1) {
      this.start(this.playlist[index + 1]);
    } else {
      this.start(this.playlist[0]);
    }
  }

  seek() {

  }

  updateProgress() {

  }

}
