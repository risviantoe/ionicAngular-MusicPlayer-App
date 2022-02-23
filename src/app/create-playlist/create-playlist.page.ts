import { Component, Input, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';
import { ToastController } from '@ionic/angular';
import { ModalController, LoadingController, NavController } from '@ionic/angular';
import { PlaylistPage } from '../playlist/playlist.page';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Playlist } from '../models/playlist';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.page.html',
  styleUrls: ['./create-playlist.page.scss'],
})
export class CreatePlaylistPage implements OnInit {
  @Input() playlist : Playlist;

  user: User;
  form: FormGroup;
  editMode = false;
  index = [];

  constructor(
    private ms: MusicService,
    private navCtrl: NavController,
    private authService: AuthService,
    public toastController: ToastController,
    public modalController: ModalController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.initAddProductForm();

    if (this.playlist) {
      this.editMode = true;
      this.setFormValues();
    }
  }


  initAddProductForm(){
    this.form = new FormGroup({
      nama_playlist: new FormControl(null, [Validators.required]),
    });
  }

  setFormValues(){
    this.form.setValue({
      nama_playlist: this.playlist.nama_playlist,
    })
    console.log(this.playlist);
    this.form.updateValueAndValidity();
  }

  public in_playlist;
  public in_id_user;

  async toast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  // async save(user: any) {
  //   let postData = {
  //     "nama_playlist": this.in_playlist,
  //     "id_user": user['id']
  //   }

  //   this.ms.postPlaylist(postData).subscribe(result => {
  //     this.toast('Playlist berhasil disimpan.');
  //     console.log(result);
  //     this.clear();
  //   }, error => {
  //     this.toast('Playlist gagal disimpan.');
  //     console.log(error);
  //   });
  // }

  async submit(user: any, playlist: any){
    const loading = await this.loadingController.create({ });
    loading.present();

    let postData = {
      "nama_playlist": this.in_playlist,
      "id_user": user['id'],
    }

    if (this.editMode){
      this.ms.updatePlaylist(postData).subscribe(result => {
        loading.dismiss();
        this.toast('Playlist berhasil diupdate.');
        this.form.reset();
      }, error => {
        loading.dismiss();
        this.toast('Playlist gagal diupdate.');
      });
    } else{
      this.ms.postPlaylist(postData).subscribe(result => {
        location.reload();
        loading.dismiss();
        this.toast('Playlist berhasil disimpan.');
        this.form.reset();
      }, error => {
        loading.dismiss();
        this.toast('Playlist gagal disimpan.');
      });
    }
  }

  clear() {
    this.form.setValue({
      nama_playlist: ""
    });
  }

  modalDismiss(){
    this.modalController.dismiss();
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
