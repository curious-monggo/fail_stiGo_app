
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

//deviceLogin
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { of, Observable } from 'rxjs';
// import { GooglePlus } from '@ionic-native/google-plus';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  displayName;  
  photo_URL;
  isLoginSuccessful:boolean;
  userUid;
  user$:Observable<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFirestore,
    // private gPlus: GooglePlus,
    private fb: Facebook, 
    private platform: Platform
  ) {
    this.checkAuthState();
  }
  checkAuthState(){
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afDb.doc<any>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }
  // signInWithGoogle() {
  //   if (this.platform.is('cordova')) {
  //     return this.gPlus.login({
  //       'webClientId': '510666125923-n9ps10efp52ac3mncsjk3hau5epqo390.apps.googleusercontent.com',
  //       'offline': true,
  //       'scopes': 'profile email'
  //     }).then(res => {
  //       const googlePlusCredential = firebase.auth.GoogleAuthProvider.credential(res.authResponse.accessToken);
  //       return firebase.auth().signInWithCredential(googlePlusCredential);
  //     })
  //   }
  //   else {
  //     return this.afAuth.auth
  //       .signInWithPopup(new firebase.auth.GoogleAuthProvider())
  //       .then(res => console.log(res));
  //   }
  // }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.userUid = null;
    this.displayName = null;
    this.photo_URL = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";     
    console.log(this.displayName);
  }

}
