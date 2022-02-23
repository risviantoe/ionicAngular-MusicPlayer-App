import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistItemPage } from './playlist-item.page';

const routes: Routes = [
  {
    path: '',
    component: PlaylistItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistItemPageRoutingModule {}
