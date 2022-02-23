import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayingPage } from './playing.page';

const routes: Routes = [
  {
    path: '',
    component: PlayingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayingPageRoutingModule {}
