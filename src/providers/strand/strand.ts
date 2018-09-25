import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

//rxjs
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'; 

import { Program } from './../../models/program/program';
/*
  Generated class for the StrandProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StrandProvider {
	//list variables
	programCollectionRef: AngularFirestoreCollection<Program>;
  programCollection: Observable<Program[]>;
  
	//object variables
	programDocumentRef: AngularFirestoreDocument<Program>;
  programDocument: Observable<Program>;

  constructor(private afDb: AngularFirestore) {
    console.log('Hello StrandProvider Provider');
  }
  getStrandCollection() {
    this.programCollectionRef = this.afDb.collection('strands', 
    ref => ref.orderBy('program_timestamp_post_created', 'desc'));
    this.programCollection = this.programCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Program;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
    );
    return this.programCollection;
    // console.log(this.newsList);
   }
   getLatestStrandCollection(){
    let programCollectionRef = this.afDb.collection('strands', 
    ref => ref.orderBy('program_timestamp_post_created', 'desc').limit(2));
    let programCollection = programCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Program;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
    );
    return programCollection;
    // console.log(this.newsList);
  }
  getStrandDocument(id:string) {
    this.programDocumentRef = this.afDb.doc(`strands/${id}`);
    this.programDocument = this.programDocumentRef.valueChanges();
    return this.programDocument;
  }
}
