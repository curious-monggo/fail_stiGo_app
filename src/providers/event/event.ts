import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

//rxjs
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'; 

import { Event } from '../../models/event/event';
/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {
	//list variables
	eventCollectionRef: AngularFirestoreCollection<Event>;
  eventCollection: Observable<Event[]>;
  
	//object variables
	eventDocumentRef: AngularFirestoreDocument<Event>;
  eventDocument: Observable<Event>;

  constructor(private afDb: AngularFirestore) {
    console.log('Hello eventProvider Provider');
  }
  getEventCollection() {
    this.eventCollectionRef = this.afDb.collection('events', 
    ref => ref.orderBy('event_date', 'desc'));
    this.eventCollection = this.eventCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Event;
        const id = a.payload.doc.id;
        return { id, ...data };
      })), 
    );
    return this.eventCollection;
    // console.log(this.newsList);
   }
   getLatestEventCollection(){
    let eventCollectionRef = this.afDb.collection('events', 
    ref => ref.orderBy('event_date', 'desc'));
    let eventCollection = eventCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Event;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
    );
    return eventCollection;
    // console.log(this.newsList);
  }
   getEventDocument(id:string) {
    this.eventDocumentRef = this.afDb.doc(`events/${id}`);
    this.eventDocument = this.eventDocumentRef.valueChanges();
    return this.eventDocument;
  }

}
