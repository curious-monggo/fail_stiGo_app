import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgramDetailPage } from './program-detail';

@NgModule({
  declarations: [
    ProgramDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgramDetailPage),
  ],
  exports: [
    ProgramDetailPage
  ]
})
export class ProgramDetailPageModule {}
