import { Component, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { NavController, PopoverController, ToastController } from '@ionic/angular';
import { Playlist } from '../models/playlist';
import { Howl } from "howler";
import { HapusComponent } from '../component/hapus/hapus.component';
import { AuthService } from "../services/auth.service";


export interface Track {
  name: string;
  path: string;
  singer: string;
  image: string;
  duration: string;
}

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.page.html',
  styleUrls: ['./playlist-item.page.scss'],
})
export class PlaylistItemPage implements OnInit {

  public item = [];
  playlist: Playlist;
  public playlistItem: any;
  public playlistTrack: any;
  activeTrack: Track = null;
  player: Howl = null;
  playing = false;
  public id = {};
  public path = '';

  constructor(
    private navCtrl: NavController,
    private ms: MusicService,
    private router: Router,
    private route: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private toastController: ToastController,
    private authService: AuthService
    ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.playlist = JSON.parse(params.special);
        console.log(this.playlist);
      }
    });
   }


  ngOnInit(): void {
    this.ms.playlistItem(this.playlist.id).subscribe(result => {
      this.playlistItem = result;
      console.log(this.playlistItem);
    });
  }

  ionViewWillEnter() {
    this.authService.getToken().then(() => {
      if (!this.authService.isLoggedIn) {
        this.navCtrl.navigateRoot('/login');
      }
    });
  }

  start(track: any) {
    this.id = track.id_track;
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
        let index = this.playlistItem.indexOf(this.activeTrack);
        if (index != this.playlistItem.length - 1) {
          this.start(this.playlistItem[index + 1]);
        } else {
          this.start(this.playlistItem[0]);
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
      if (!this.activeTrack){
        this.start(this.playlistItem[0]);
        this.player.play();
      } else {
        this.player.play();
      }

    }
  }

  play() {
    this.start(this.playlistItem[0]);
  }

  prev() {
    let index = this.playlistItem.indexOf(this.activeTrack);
    if (index > 0) {
      this.start(this.playlistItem[index - 1]);
    } else {
      this.start(this.playlistItem[this.playlistItem.length - 1]);
    }
  }

  next() {
    let index = this.playlistItem.indexOf(this.activeTrack);
    if (index != this.playlistItem.length - 1) {
      this.start(this.playlistItem[index + 1]);
    } else {
      this.start(this.playlistItem[0]);
    }
  }

  back() {
    this.navCtrl.navigateRoot('/playlist');
  }

  addTrack(playlist: any){
    let track: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(playlist)
      }
    }
    this.router.navigate(['/add-track'], track);
  }

  // async handleButtonClick(track: any){
  //   const popover = await this.popoverCtrl.create({
  //     event,
  //     component: HapusComponent,
  //     translucent: true,
  //     cssClass: 'popover-custom'
  //   });
  //   await popover.present()
  // }

  handleButtonClick(index) {
    this.playlistItem[index].open = !this.playlistItem[index].open;
  }

  async toast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  hapus(track: any): void {
    console.log(track);
    this.id = track.id;
    console.log(this.id);

    this.ms.dellPlaylistTrack(this.id).subscribe(result => {
      this.toast('Track berhasil dihapus');
      console.log(result);
      location.reload();
    }, error => {
      this.toast('Track gagal dihapus');
      console.log(error);
    });
  }


}
