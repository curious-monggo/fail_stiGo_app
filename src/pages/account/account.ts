import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//providers
import { AuthProvider } from './../../providers/auth/auth';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }
  goToRegistrationCodePage(){
    this.navCtrl.push('RegistrationCodePage');
  }
  signOut(){
    this.authProvider.signOut();
    this.navCtrl.setRoot('TabsPage');
  }

}
