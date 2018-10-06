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
    ref => ref.orderBy('program_timestamp_post_created', 'desc').limit(1));
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

  getG11FirstTermStrandSubjects(strand_id){
    let ref = this.afDb.collection(`strands/${strand_id}/grade_11/1st_term/subjects`);
    let collection = ref.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return collection;
  }
  getG11SecondTermStrandSubjects(strand_id){
    let ref = this.afDb.collection(`strands/${strand_id}/grade_11/2nd_term/subjects`);
    let collection = ref.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return collection;
  }

  getG12FirstTermStrandSubjects(strand_id){
    let ref = this.afDb.collection(`strands/${strand_id}/grade_12/1st_term/subjects`);
    let collection = ref.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return collection;
  }
  getG12SecondTermStrandSubjects(strand_id){
    let ref = this.afDb.collection(`strands/${strand_id}/grade_12/2nd_term/subjects`);
    let collection = ref.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return collection;
  }


}
