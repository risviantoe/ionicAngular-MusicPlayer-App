import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayingPageRoutingModule } from './playing-routing.module';

import { PlayingPage } from './playing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayingPageRoutingModule
  ],
  declarations: [PlayingPage]
})
export class PlayingPageModule {}
