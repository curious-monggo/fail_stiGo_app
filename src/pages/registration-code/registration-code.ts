import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { RegistrationCodeProvider } from '../../providers/registration-code/registration-code';



/**
 * Generated class for the RegistrationCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration-code',
  templateUrl: 'registration-code.html',
})
export class RegistrationCodePage {
  userTypedCode:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private registrationCodeProvider: RegistrationCodeProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationCodePage');
  }
  checkIfRegistrationCodeExists(){
    console.log(this.userTypedCode);
    this.registrationCodeProvider.checkIfRegistrationCodeExists(this.userTypedCode);
    this.registrationCodeProvider.registrationCodeCollection.subscribe(code => {
      console.log(code);
      if(code.length == 1){
        console.log('Matched', code[0]);
        this.registrationCodeProvider.registerUserAsStudent();
      } else {
        console.log('No matches');
      }
    })
  }

  

  presentLoading(){
    let loading = this.loadingCtrl.create({
      content:'Please wait...'
    });
    loading.present();
    this.checkIfRegistrationCodeExists();
    loading.dismiss();
  //   setTimeout(() => {
  //     loading.dismiss();
  //   }, 3000);
  }

}
