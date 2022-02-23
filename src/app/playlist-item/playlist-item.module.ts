import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistItemPageRoutingModule } from './playlist-item-routing.module';

import { PlaylistItemPage } from './playlist-item.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistItemPageRoutingModule
  ],
  declarations: [PlaylistItemPage]
})
export class PlaylistItemPageModule {}
