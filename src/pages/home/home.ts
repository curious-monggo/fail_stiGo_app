import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

//Provider
import { NewsProvider } from './../../providers/news/news';
import { AuthProvider } from './../../providers/auth/auth';

//model
import { News } from './../../models/news/news';


import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  latestNewsCollection;
  displayName;
  photo_url;
  constructor(
    public navCtrl: NavController,
    private newsProvider: NewsProvider,
    private authProvider: AuthProvider,
    private afAuth: AngularFireAuth
    ) {
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.photo_url = user.photoURL;
      }
      else{

      }
    })
  }
  ionViewDidLoad(){
    this.getLatestNewsCollection();
  }
  onAccountPhotoClicked(){
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.goToAccountPage();
      }
      else{
        this.goToLoginPage();
      }
    })
  }
  goToAccountPage(){
    this.navCtrl.push('AccountPage');
  }
  goToRegistrationPage(){
    this.navCtrl.push('RegistrationCodePage');
  }
  goToLoginPage(){
    this.navCtrl.push('LoginPage');
  }

  getLatestNewsCollection(){
    this.newsProvider.getLatestNewsCollection().subscribe(latestNewsCollection => {
      this.latestNewsCollection = latestNewsCollection;
      console.log(latestNewsCollection);
    }, error => {
      console.log('Latest News error', error);
    });
  }

  openNewsDetailPage(newsDocumentId){
    console.log(newsDocumentId);
    this.navCtrl.push('NewsDetailPage', {
      id:newsDocumentId
    });
  }
}
