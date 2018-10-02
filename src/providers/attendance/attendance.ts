
import { Injectable } from '@angular/core';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

//rxjs
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'; 

// import * as firebase from 'firebase';

// declare var firebase:any;

/*
  Generated class for the AttendanceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AttendanceProvider {
	//list variables
	attendanceCollectionRef: AngularFirestoreCollection<any>;
  attendanceCollection: Observable<any[]>;
  
	//object variables
	attendanceDocumentRef: AngularFirestoreDocument<any>;
  attendanceDocument: Observable<any>;
  constructor(
    private afDb: AngularFirestore
    ) {
    console.log('Hello AttendanceProvider Provider');
  }
  getAttendanceParameters(eventId){
    this.attendanceDocumentRef = this.afDb.doc(`attendance/${eventId}`);
    this.attendanceDocument = this.attendanceDocumentRef.valueChanges();
    return this.attendanceDocument;
  }

  signInForAttendance(eventId, userObj, dateTimeNow) {

    this.attendanceDocumentRef = this.afDb.doc(`attendance/${eventId}/${userObj.student_program}/${userObj.student_id_number}`);
    let attendance = {
      student_first_name: userObj.student_first_name,
      student_last_name: userObj.student_last_name,
      signIn: true,
      signIn_datetimestamp: dateTimeNow
    };
    this.attendanceDocumentRef.set(attendance, {merge:true});
  }

  signOutForAttendance(eventId, userObj, dateTimeNow) {
    this.attendanceDocumentRef = this.afDb.doc(`attendance/${eventId}/${userObj.student_program}/${userObj.student_id_number}`);
    let attendance = {
      student_first_name: userObj.student_first_name,
      student_last_name: userObj.student_last_name,
      signOut: true,
      signOut_datetimestamp: dateTimeNow
    };
    this.attendanceDocumentRef.set(attendance, {merge:true});
  }

  checkAttendanceStatus(eventId, userObj){
    this.attendanceDocumentRef = this.afDb
      .doc(`attendance/${eventId}/${userObj.student_program}/${userObj.student_id_number}`);
    this.attendanceDocument = this.attendanceDocumentRef.snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data();
        const id = action.payload.id;
        const metadata = action.payload.metadata;
        return { id, metadata, ...data };
      })
    );
    return this.attendanceDocument;
  }

  getAttendanceList(eventId, program){
    this.attendanceCollectionRef = this.afDb.collection(`attendance/${eventId}/${program}`, ref => ref.orderBy('student_last_name'));
    this.attendanceCollection = this.attendanceCollectionRef.valueChanges();
    return this.attendanceCollection;
  }

  getAttendanceCourseList(eventId, program){
    this.attendanceCollectionRef = this.afDb.collection(`attendance/${eventId}/${program}`, ref => ref.orderBy('student_last_name'));
    // this.attendanceCollection = this.attendanceCollectionRef.valueChanges();
    // return this.attendanceCollection;
    this.attendanceCollection = this.attendanceCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        const metadata = a.payload.doc.metadata;
      //  const doc = a.payload.doc;
        return { id,metadata, ...data };
      }))
    );
    return this.attendanceCollection;

  }

  getProgramsCoursesAttended(){
    this.attendanceDocumentRef = this.afDb.doc(`available_programs/courses`);
    this.attendanceDocument = this.attendanceDocumentRef.valueChanges();
    return this.attendanceDocument;
  }

}
