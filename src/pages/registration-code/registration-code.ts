import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';

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
  userDocRef;
  userDoc;
  isStudent:boolean = false;
  //user_type;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private registrationCodeProvider: RegistrationCodeProvider,
    private afDb: AngularFirestore,
    private afAuth: AngularFireAuth
    ) {
      this.afAuth.authState.subscribe(user => {
        
          this.userDocRef = this.afDb.doc(`users/${user.uid}`);
          this.userDoc = this.userDocRef.valueChanges();
          
          
          this.userDoc.subscribe(user => {
            if(user.user_type == 'Student' || user.user_type == 'Sbg'){
              this.isStudent == true;
              console.log(user.user_type);
              this.navCtrl.pop();
            }
            else{
              this.isStudent == false;
            }
          });
        
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationCodePage');
  }
  checkIfRegistrationCodeExists(){
    console.log(this.userTypedCode);
    this.registrationCodeProvider.checkIfRegistrationCodeExists(this.userTypedCode);

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
