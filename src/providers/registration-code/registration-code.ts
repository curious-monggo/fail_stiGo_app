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

import { AngularFireFunctions } from '@angular/fire/functions';
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
  data$:Observable<any>;

  constructor(
    private afDb: AngularFirestore,
    private afFns: AngularFireFunctions,
    private authProvider: AuthProvider
  ) {
    console.log('Hello RegistrationCodeProvider Provider');
    this.authProvider.checkAuthState();
  }

  checkIfRegistrationCodeExists(userTypedCode:string){
    const callable = this.afFns.httpsCallable('registerUserAsStudent');
    this.data$ = callable({userTypedCode: userTypedCode});
    this.data$.subscribe(data => {
      console.log('observable: ', data);
    });

  }
}
