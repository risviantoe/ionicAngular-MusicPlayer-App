import { Component, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Playlist } from '../models/playlist';



@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.page.html',
  styleUrls: ['./add-track.page.scss'],
})
export class AddTrackPage implements OnInit {

  playlist: Playlist;
  public track: any;
  filterTerm: string;
  selectedArray: any = [];
  selectArray: any;


  constructor(
    private ms: MusicService,
    private route: Router,
    private router: ActivatedRoute,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {
    this.router.queryParams.subscribe(params => {
      if (params && params.special) {
        this.playlist = JSON.parse(params.special);
        console.log(this.playlist);
      }
    });
  }

  ngOnInit() {
    this.ms.getTrack().subscribe(result => {
      this.track = result['data'];
      console.log(this.track);
    });
  }

  async toast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  handleButtonClick(index) {
    this.track[index].open = !this.track[index].open;
  }

  add(track: any){
    let itemTrack = {
      "id_track": track.id,
      "nama_track": track.nama,
      "gambar": track.gambar,
      "path": track.path,
      "penyanyi": track.penyanyi,
      "durasi": track.durasi,
      "id_playlist": this.playlist.id
    }
    console.log(itemTrack);

    this.ms.addPlaylistTrack(itemTrack).subscribe(result => {
      this.toast('Track berhasil ditambahkan');
      console.log(result);
    }, error => {
      this.toast('Track sudah ada diplaylist');
      console.log(error);
    });
  }

  back(){
    this.navCtrl.back();
  }

}
