import { Component, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';
import { NavigationExtras, Router } from '@angular/router';
import { PlaylistItemPage } from '../playlist-item/playlist-item.page';
import { ModalController, NavController, LoadingController, } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Playlist } from '../models/playlist';
import { CreatePlaylistPage } from '../create-playlist/create-playlist.page';
import { EditPlaylistPage } from '../edit-playlist/edit-playlist.page';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {

  user: User;
  public playlist = [];
  public id = {};

  constructor(public toastController: ToastController,
    private popoverController: PopoverController,
    private navCtrl: NavController,
    private modalController: ModalController,
    private ms: MusicService,
    private authService: AuthService,
    private route: Router,
    private loadingController: LoadingController) { }


  ngOnInit(): void {
    this.authService.user().subscribe(
      user => {
        this.user = user;
        this.ms.getPlaylist(this.user.id).subscribe(result => {
          this.playlist = result['data'];
          console.log(this.playlist);
          console.log(this.user);
        });
      }
    );

  }

  async loading(){
    const loading = await this.loadingController.create({});
  }


  async toast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


  handleButtonClick(index) {
    this.playlist[index].open = !this.playlist[index].open;
  }

  delete(track: any): void {
    console.log(track);
    this.id = track.id;
    console.log(this.id);

    this.ms.delPlaylist(this.id).subscribe(result => {
      this.toast('Playlist berhasil dihapus');
      console.log(result);
      location.reload();
    }, error => {
      this.toast('Playlist gagal dihapus');
      console.log(error);
    });

  }

  backToDaftarMusik() {
    this.route.navigate(['/home']);
  }

  inputPlaylist() {
    this.navCtrl.navigateRoot('/create-playlist');
  }

  openEditModal(track: Playlist) {
    let playlist : NavigationExtras = {
      queryParams: {
        special: JSON.stringify(track)
      }
    }
    console.log(playlist);
    this.route.navigate(['/edit-playlist'], playlist);
  }

  async openCreateModal(){
    const modal = await this.modalController.create({
      component: CreatePlaylistPage,
    })

    await modal.present();
  }

  playlistItem(track: Playlist) {
    let playlist: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(track)
      }
    }
    this.route.navigate(['/playlist-item'], playlist);
  }

}
