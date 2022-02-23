import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistPageRoutingModule } from './playlist-routing.module';

import { PlaylistPage } from './playlist.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PlaylistItemPage } from '../playlist-item/playlist-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [PlaylistPage, PlaylistItemPage]
})
export class PlaylistPageModule {}
