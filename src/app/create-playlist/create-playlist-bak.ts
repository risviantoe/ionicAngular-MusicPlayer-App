import { Component, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ModalController, NavController } from '@ionic/angular';
import { PlaylistPage } from '../playlist/playlist.page';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.page.html',
  styleUrls: ['./create-playlist.page.scss'],
})
export class CreatePlaylistPage implements OnInit {

  user: User;

  constructor(
    private navCtrl: NavController,
    private ms: MusicService,
    private authService: AuthService,
    private route: Router,
    public toastController: ToastController) { }

  ngOnInit() {
  }

  public in_playlist;
  public in_id_user;

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Playlist berhasil disimpan.',
      duration: 2000
    });
    toast.present();
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Playlist gagal disimpan.',
      duration: 2000
    });
    toast.present();
  }

  async save(user: any) {
    let postData = {
      "nama_playlist": this.in_playlist,
      "id_user": user['id']
    }

    this.ms.postPlaylist(postData).subscribe(result => {
      this.toastSuccess();
      console.log(result);
      this.clear();
    }, error => {
      this.toastError();
      console.log(error);
    });
  }

  clear() {
    this.in_playlist = "";
  }

  modalDismiss() {
    this.navCtrl.navigateRoot('/playlist');
  }

  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
        console.log(this.user);
      }
    );
  }

}
