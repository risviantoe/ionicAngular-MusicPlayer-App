import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'playlist-item',
    loadChildren: () => import('./playlist-item/playlist-item.module').then( m => m.PlaylistItemPageModule)
  },
  {
    path: 'playlist',
    loadChildren: () => import('./playlist/playlist.module').then(m => m.PlaylistPageModule)
  },
  {
    path: 'create-playlist',
    loadChildren: () => import('./create-playlist/create-playlist.module').then( m => m.CreatePlaylistPageModule)
  },
  {
    path: 'edit-playlist',
    loadChildren: () => import('./edit-playlist/edit-playlist.module').then( m => m.EditPlaylistPageModule)
  },
  {
    path: 'add-track',
    loadChildren: () => import('./add-track/add-track.module').then( m => m.AddTrackPageModule)
  },
  {
    path: 'playing',
    loadChildren: () => import('./playing/playing.module').then( m => m.PlayingPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
