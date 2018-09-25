import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationCodePage } from './registration-code';

@NgModule({
  declarations: [
    RegistrationCodePage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrationCodePage),
  ],
  exports: [
    RegistrationCodePage
  ]
})
export class RegistrationCodePageModule {}
