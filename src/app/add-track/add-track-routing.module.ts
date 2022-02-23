import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTrackPage } from './add-track.page';

const routes: Routes = [
  {
    path: '',
    component: AddTrackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTrackPageRoutingModule {}
