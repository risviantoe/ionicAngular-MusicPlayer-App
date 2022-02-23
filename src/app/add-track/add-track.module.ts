import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTrackPageRoutingModule } from './add-track-routing.module';

import { AddTrackPage } from './add-track.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTrackPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [AddTrackPage]
})
export class AddTrackPageModule {}
