import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

//rxjs
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'; 

import { Program } from './../../models/program/program';
/*
  Generated class for the CourseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CourseProvider {
	//list variables
	programCollectionRef: AngularFirestoreCollection<Program>;
  programCollection: Observable<Program[]>;
  
	//object variables
	programDocumentRef: AngularFirestoreDocument<Program>;
  programDocument: Observable<Program>;

  constructor(private afDb: AngularFirestore) {
    console.log('Hello CourseProvider Provider');
  }
  getCourseCollection() {
    this.programCollectionRef = this.afDb.collection('courses', 
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
   getLatestCourseCollection(){
    let programCollectionRef = this.afDb.collection('courses', 
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
   getCourseDocument(id:string) {
    this.programDocumentRef = this.afDb.doc(`courses/${id}`);
    this.programDocument = this.programDocumentRef.valueChanges();
    return this.programDocument;
  }




  //first year
  getFirstYearFirstTermCourseSubjects(course_id){
    let ref = this.afDb.collection(`courses/${course_id}/1st_year/1st_term/subjects`);
    let collection = ref.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return collection;
  }
  getFirstYearSecondTermCourseSubjects(course_id){
    let ref = this.afDb.collection(`courses/${course_id}/1st_year/2nd_term/subjects`);
    let collection = ref.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return collection;
  }
  //second year
  getSecondYearFirstTermCourseSubjects(course_id){
    let ref = this.afDb.collection(`courses/${course_id}/2nd_year/1st_term/subjects`);
    let collection = ref.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return collection;
  }
  getSecondYearSecondTermCourseSubjects(course_id){
    let ref = this.afDb.collection(`courses/${course_id}/2nd_year/2nd_term/subjects`);
    let collection = ref.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return collection;
  }
  //third year
  getThirdYearFirstTermCourseSubjects(course_id){
    let ref = this.afDb.collection(`courses/${course_id}/3rd_year/1st_term/subjects`);
    let collection = ref.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return collection;
  }
  getThirdYearSecondTermCourseSubjects(course_id){
    let ref = this.afDb.collection(`courses/${course_id}/3rd_year/2nd_term/subjects`);
    let collection = ref.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return collection;
  }
  //fourth year
  getFourthYearFirstTermCourseSubjects(course_id){
    let ref = this.afDb.collection(`courses/${course_id}/4th_year/1st_term/subjects`);
    let collection = ref.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return collection;
  }
  getFourthYearSecondTermCourseSubjects(course_id){
    let ref = this.afDb.collection(`courses/${course_id}/4th_year/2nd_term/subjects`);
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
