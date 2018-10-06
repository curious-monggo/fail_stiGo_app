import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//providers
import { EventProvider } from './../../providers/event/event';

//model
import { Event } from './../../models/event/event';

import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  eventCollection:Event[];
  displayName;
  photo_url;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private eventProvider: EventProvider,
    private afAuth: AngularFireAuth
    ) {
      this.afAuth.authState.subscribe(user => {
        if(user){
          this.photo_url = user.photoURL;
        }
        else{
          this.photo_url = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
        }
      })
      this.getLatestEventCollection();
      
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
  goToLoginPage(){
    this.navCtrl.push('LoginPage');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');

  }
  getLatestEventCollection(){
    this.eventProvider.getLatestEventCollection().subscribe(eventCollection => {
      this.eventCollection = eventCollection;
      console.log(eventCollection);
    });
  }
  goToEventDetail(eventsDocumentId, timestamp){
    this.navCtrl.push('EventDetailPage', {
      id: eventsDocumentId,
      timestamp:timestamp
    });
  }
}
