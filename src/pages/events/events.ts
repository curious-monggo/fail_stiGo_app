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

  }
  goToAccountPage(){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
    this.getLatestEventCollection();
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
