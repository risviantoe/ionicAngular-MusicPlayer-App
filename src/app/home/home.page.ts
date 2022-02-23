import { Howl } from "howler";
import { Component } from '@angular/core';
import { MusicService } from '../services/music.service';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { ModalController, NavController } from '@ionic/angular';
// import { LoginPage } from '../login/login.page';
import { ToastController } from '@ionic/angular';

export interface Track {
  name: string;
  path: string;
  singer: string;
  image: string;
  duration: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  activeTrack: Track = null;
  player: Howl = null;
  playing = false;
  public playlist = [];
  public id = {};
  public path = '';
  filterTerm: string;

  constructor(
    private ms: MusicService,
    private route: Router,
    public toastController: ToastController,
    private navCtrl: NavController,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.ms.getTrack().subscribe(result => {
      this.playlist = result['data'];
      console.log(this.playlist);
    });
  }

  ionViewWillEnter() {
    this.authService.getToken().then(() => {
      if (!this.authService.isLoggedIn) {
        this.navCtrl.navigateRoot('/login');
      }
    });
  }

  async toast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  logout() {
    this.authService.logout().subscribe(
      data => {
        this.toast('Berhasil Logout');
      },
      error => {
        this.toast('Gagal Logout');
        console.log(error);
      },
      () => {
        this.navCtrl.navigateRoot('/login');
      }
    );
  }


  // detail(track: any) {
  //   let detail: NavigationExtras = {
  //     queryParams: {
  //       special: JSON.stringify(track)
  //     }
  //   }
  //   this.route.navigate(['/playing'], detail);
  // }

  goToPlaylist() {
    this.route.navigate(['/playlist']);
  }


  start(track: any) {
    this.id = track.id;
    this.path = track.path;
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: (`http://127.0.0.1:8000/mp3/${this.id}/path/${this.path}`),
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
