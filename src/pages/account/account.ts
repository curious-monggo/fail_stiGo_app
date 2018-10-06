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
  userDocRef: any;
  userDoc: any;
  isRegistered: boolean =false;
  
  notice:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider
    ) {

  }

  ionViewDidLoad() {
    this.authProvider.user$.subscribe(user => {
      if(user.user_type == 'Student'){
        this.isRegistered = true;
        console.log(user.user_type);
        this.notice = 'You have already registered as a student.'
    
      }
      else if(user.user_type == 'SBG'){
        this.isRegistered = true;
        console.log(user.user_type);
        this.notice = 'You have already registered as a student, SBG officer.'
    
      }
      else if(user.user_type == 'Admin'){
        this.isRegistered = true;
        console.log(user.user_type);
        this.notice = 'Welcome, Admin.'
      }  
      else if(user.user_type == 'Registrar'){
        this.isRegistered = true;
        console.log(user.user_type);
        this.notice = 'Welcome, Registrar.'
      }  
      else if(user.user_type == 'Instructor'){
        this.isRegistered = true;
        console.log(user.user_type);
        this.notice = 'Welcome, Instructor.'
      }  
      else{
        this.isRegistered = false;
        this.notice ='Register account as student';
      }
    })
    console.log('ionViewDidLoad AccountPage');
  }
  goToRegistrationCodePage(){
    if(this.isRegistered == true){
    }
    else{
      this.navCtrl.push('RegistrationCodePage');
    }

  }
  signOut(){
    this.authProvider.signOut();
    this.navCtrl.setRoot('TabsPage');
  }

}
