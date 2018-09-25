import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

//rxjs
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'; 

//model
import { RegistrationCode } from './../../models/registration-code/registration-code';

//providers
import { AuthProvider } from './../auth/auth';
import { User } from './../../models/user/user';


/*
  Generated class for the RegistrationCodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegistrationCodeProvider {
	//list variables
	registrationCodeCollectionRef: AngularFirestoreCollection<RegistrationCode>;
  registrationCodeCollection: Observable<RegistrationCode[]>;
  
	//object variables
	userDocumentRef: AngularFirestoreDocument<User>;
  userDocument: Observable<User>;


  constructor(
    private afDb: AngularFirestore,
    private authProvider: AuthProvider
  ) {
    console.log('Hello RegistrationCodeProvider Provider');
    this.authProvider.checkAuthState();
  }

  checkIfRegistrationCodeExists(userTypedCode:string){
    console.log('user typed code',userTypedCode);
    this.registrationCodeCollectionRef = this.afDb.collection('registration-code', 
    ref => ref.where('registration_code', '==', userTypedCode));
    this.registrationCodeCollection = this.registrationCodeCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RegistrationCode;
        const id = a.payload.doc.id;
        return { id, ...data };
      })), 
    );
    return this.registrationCodeCollection;
  }
  registerUserAsStudent(){
    let userUid = this.authProvider.userUid;
    console.log(userUid);
    this.userDocumentRef = this.afDb.doc(`users/${userUid}`);
    this.userDocumentRef.update({user_type: 'student'})
    // let test = this.afDb.collection(`attendance/eventid/bsit`);
    // let user = {
    //   name:'name',
    //   signIn:'time in',
    //   signOut:'time out'
    // }
    // test.add({user});
  }
}
