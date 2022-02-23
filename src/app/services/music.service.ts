import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  url = 'http://127.0.0.1:8000/api/';
  id = 0;
  path = '';

  constructor(private http: HttpClient) {

  }

  getTrack() {
    return this.http.get(`${this.url}track`);
  }

  // getPlaylist() {
  //   return this.http.get(`${this.url}playlist`);
  // }

  getPlaylist(id) {
    return this.http.get(`${this.url}playlist/${id}`);
  }

  postPlaylist(data) {
    return this.http.post(`${this.url}playlist-store`, data);
  }

  delPlaylist(id) {
    return this.http.delete(`${this.url}playlist-delete/${id}`);
  }

  updatePlaylist(data) {
    return this.http.put(`${this.url}playlist-update`, data);
  }

  playlistItem(id) {
    return this.http.get(`${this.url}playlist-item/${id}`);
  }

  playlistTrack(id) {
    return this.http.get(`${this.url}playlist-track/${id}`);
  }

  addPlaylistTrack(data) {
    return this.http.post(`${this.url}add-track`, data);
  }

  dellPlaylistTrack(id) {
    return this.http.delete(`${this.url}del-track/${id}`);
  }

  getMusic() {
    return (`${this.url}/mp3/${this.id}/${this.path}`);
  }
}
