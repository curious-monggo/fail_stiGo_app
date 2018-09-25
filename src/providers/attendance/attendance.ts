import { Injectable } from '@angular/core';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

//rxjs
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'; 


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



  signInForAttendance(eventId, userObj) {
    this.attendanceDocumentRef = this.afDb.doc(`attendance/${eventId}/${userObj.student_program}/${userObj.student_id_number}`);
    let attendance = {
      signIn: true,
      signOut: false
    };
    this.attendanceDocumentRef.set(attendance, {merge:true});
  }
  signOutForAttendance(eventId, userObj) {
    this.attendanceDocumentRef = this.afDb.doc(`attendance/${eventId}/${userObj.student_program}/${userObj.student_id_number}`);
    let attendance = {
      signIn: true,
      signOut: true
    };
    this.attendanceDocumentRef.set(attendance, {merge:true});
  }
  checkAttendanceStatus(eventId, userObj){
    this.attendanceDocumentRef = this.afDb
      .doc(`attendance/${eventId}/${userObj.student_program}/${userObj.student_id_number}`);
    this.attendanceDocument = this.attendanceDocumentRef.valueChanges();
    return this.attendanceDocument;
  }
  // checkIfUserIsAttendanceHost(id:string){
  //   this.attendanceHostsDocumentRef = this.afDb.doc(`attendanceHosts/${id}`);
  //   this.attendanceHostsDocument = this.attendanceHostsDocumentRef.valueChanges();
  //   this.attendanceHostsDocument.subscribe((attendanceHostDoc => {
  //     if(attendanceHostDoc){
  //       //meron
  //       //allow attendance hosting
  //       this.isUserAnAttendanceHost == true;
  //     }
  //     else{
  //       //wala
  //       this.isUserAnAttendanceHost == false;
  //     }
  //   }), onError => {
  //     console.log(onError);
  //   });
  //   // this.attendanceHostsCollectionRef = this.afDb.collection('attendanceHosts', ref => ref.where('user_type.', 'array-contains'))
  // }
  // checkIfUserIsAttendee(id:string){
  //   this.attendeeDocumentRef = this.afDb.doc(`users/${id}`);
  //   this.attendeeDocument = this.attendeeDocumentRef.valueChanges();
  //   this.attendeeDocument.subscribe((attendeeDoc => {
  //     if(attendeeDoc.student_id){

  //       this.isUserAnAttendee == true;
  //     }
  //     else{
  //       //wala
  //       this.isUserAnAttendee == false;
  //     }
  //   }), onError => {
  //     console.log(onError);
  //   });
  //   // this.attendanceHostsCollectionRef = this.afDb.collection('attendanceHosts', ref => ref.where('user_type.', 'array-contains'))
  // }

  // signForAttendance(){
  //   let eventId= 'eventid';
  //   let attendance = {
      
  //     studentId: '123',
  //     student: 'name'
  //   };
  //   let ref = this.afDb.collection(`attendance/${eventId}/bsit`).add(attendance);
  // }

}
