import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MusicService } from './music.service';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token : any ;
  tokenStr : any;

  constructor(
    private http: HttpClient,
    private ms: MusicService,
  ) { }



  login(email: String, password: String) {
    const asyncLocalStorage = {
      setItem: function (key, value) {
        return Promise.resolve().then(function () {
          localStorage.setItem(key, value);
        });
      },
      getItem: function (key) {
        return Promise.resolve().then(function () {
          return localStorage.getItem(key);
        });
      }
    };
    return this.http.post(this.ms.url + 'auth/login', { email: email, password: password }).pipe(
      tap(token => {
        asyncLocalStorage.setItem('token', JSON.stringify(token))
          .then(
            () => {
              console.log('Token Stored');
            },
            error => console.error('Error storeing item', error)
          );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }

  register(username: String, email: String, password: String) {
    return this.http.post(this.ms.url + 'auth/register', { username: username, email: email, password: password })
  }

  logout() {

    this.token = JSON.parse(localStorage.getItem('token'));
    console.log(this.token);
    const headers = new HttpHeaders({
      'Authorization': this.token['token_type'] + " " + this.token['access_token']
    });
    return this.http.get<User>(this.ms.url + 'auth/logout', { headers: headers })
      .pipe(
        tap(data => {
          localStorage.removeItem('token');
          // localStorage.setitem('token', '');
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      )
  }

  user() {
    this.token = JSON.parse(localStorage.getItem('token'));
    console.log(this.token);
    const headers = new HttpHeaders({
      'Authorization': this.token['token_type'] + " " + this.token['access_token']
      // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYmY3YjBlNzRjYjhhODgyMDJmMzNkODJmNjE2OTM1YmUwYzZjMmI0YmI4ZjY2OTlkOTA5MzJhNDRiNmY2ZmMyYmFkY2QyODk1MzQ3YmNhYTEiLCJpYXQiOjE2MjU1MDAyNjMuMDUyODAyLCJuYmYiOjE2MjU1MDAyNjMuMDUyODA3LCJleHAiOjE2NTcwMzYyNjIuOTAwOTIyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.CwZ5-7BK55wPoNdU3sZvIoUWQ-QPuhWAZKpiU9-7zj-3s6vMM2sIGcwEfb6UGTIjo3SG7Dlk8RNX7asdBCbBnYccsXF9C5PjNDp6oVgjz79hC4KD8ycKF80nk-hLU2QJsUuJ0fK6BTOxLDGyLHW0UxzqaqpdVKFQbnPG-ul78Hc00JbOpNvLjcyQn89Ab4aauKxKl93afe8PWrXVD_JCZwSPa9kMxAqlMhFJDezlNehV8S0WaTqCSMbxJwBdBZJV5cCyocBBQ5Dd8K78KpSg8DHB_k4GC_XniyXvHTWEe8PK51gidnPwU8Y3NBKZHLt3A3WF21Kpei_KGiFokDFYxo9ps09u5iCc6wd4iJhoFTNNwQ1kgmWR5XRwRgYPQFrGuVHXqVxUAa8_l2UelInaWmFcwBw5JTXjQX4JSBcjzfJ0sg4EHuBMngtJmYm6VsoL5xbmjKuyNZ8aGQks4A7wVis9dc98ag6gyb_gQvF7tyhcn1Kmh71_33X92QqDZTkccNL1tpL29MGMI9secPJz_Tn68HDH5HYdNYC2Mt9cbGjeKemcL8ynRG7MoECmKE0oYAfJnBEiGldwZDA_BxyK6sKONrXmIbzcC-78YpoYcI4WiYTQF9TUdOh9ovo3zgIW4EXxWM0Aff5HcJf_aykN12PmeKGU5w2UyGGKshACa8c'
    });

    console.log(headers)

    return this.http.get<User>(this.ms.url + 'auth/user', { headers: headers })
      .pipe(
        tap(user => {
          return user;
        })
      )
  }

  getToken() {
    const asyncLocalStorage = {
      setItem: function (key, value) {
        return Promise.resolve().then(function () {
          localStorage.setItem(key, value);
        });
      },
      getItem: function (key) {
        return Promise.resolve().then(function () {
          return localStorage.getItem(key);
        });
      }
    };

    return asyncLocalStorage.getItem('token').then(
      data => {
        this.token = data;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }
}
