import { Component, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';
import { ToastController } from '@ionic/angular';
import { LoadingController, NavController } from '@ionic/angular';
import { PlaylistPage } from '../playlist/playlist.page';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Playlist } from '../models/playlist';
import { FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.page.html',
  styleUrls: ['./edit-playlist.page.scss'],
})
export class EditPlaylistPage implements OnInit {
  playlist$: Observable<Playlist[]>;

  user: User;
  playlist : Playlist;
  public id = {};
  form: FormGroup;

  public in_playlist;
  public in_id_user;

  constructor(
    private navCtrl: NavController,
    private ms: MusicService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public toastController: ToastController,
    private loadingController: LoadingController) {
      this.route.queryParams.subscribe(params => {
        if (params && params.special) {
          this.playlist = JSON.parse(params.special);
          console.log(this.playlist);
        }
      })
     }

  ngOnInit(){
    this.form = new FormGroup({
      nama_playlist: new FormControl(null, [Validators.required]),
      id: new FormControl(null, [Validators.required])
    })
    this.setFormValues();
  }


  setFormValues(){
    this.form.setValue({
      nama_playlist: this.playlist['nama_playlist'],
      id: this.playlist['id']
    });

    this.form.updateValueAndValidity();
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Playlist berhasil diupdate.',
      duration: 2000
    });
    toast.present();
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Playlist gagal diupdate.',
      duration: 2000
    });
    toast.present();
  }

  async save() {
    const loading = await this.loadingController.create({});
    loading.present();

    this.ms.updatePlaylist(this.form.value).subscribe(result => {
      loading.dismiss();
      this.toastSuccess();
      console.log(result);
      this.clear();
      this.navCtrl.navigateRoot('/playlist');
    }, error => {
      loading.dismiss();
      this.toastError();
      console.log(error);
    });
  }

  clear() {
    this.form.reset();
  }

  back() {
    this.navCtrl.navigateRoot('/playlist');
  }



}
