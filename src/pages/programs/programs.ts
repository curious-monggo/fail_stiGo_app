import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//provider
import { CourseProvider } from './../../providers/course/course';
import { StrandProvider } from './../../providers/strand/strand';

//model
import { Program } from './../../models/program/program';

//browser
// import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the ProgramsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-programs',
  templateUrl: 'programs.html',
})
export class ProgramsPage {
  displayName;
  photo_url;
  programType;
  courseCollection: Program[];
  strandCollection: Program[];
  programDocumentId;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private courseProvider: CourseProvider,
    private strandProvider: StrandProvider,
    // private inAppBrowser: InAppBrowser,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.photo_url = user.photoURL;
      }
      else {
        this.photo_url = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
      }
    })
    this.programType = 'Courses';
    if (this.programType == 'Courses') {
      this.getCourseCollection();
      console.log('course');

    }
    else if (this.programType == 'Strands') {
      this.getStrandCollection();
      console.log('Strands');
    }
  }
  goToProgramDetailPage(programId, programType, programAcronym) {
    this.navCtrl.push('ProgramDetailPage', {
      programId: programId,
      programType: programType,
      programAcronym: programAcronym
    });
    console.log(programId, programType);
  }
  onAccountPhotoClicked(){
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.goToAccountPage();
      }
      else{
        this.goToLoginPage();
      }
    })
  }
  goToAccountPage(){
    this.navCtrl.push('AccountPage');
  }
  goToLoginPage(){
    this.navCtrl.push('LoginPage');
  }
  getCourseCollection() {
    this.courseProvider.getCourseCollection().subscribe(courseCollection => {
      this.courseCollection = courseCollection;
      console.log(courseCollection);
    });
  }
  getStrandCollection() {
    this.strandProvider.getStrandCollection().subscribe(strandCollection => {
      this.strandCollection = strandCollection;
      console.log(strandCollection);
    });
  }
  // openInAppBrowser(url: string) {
  //   const options:InAppBrowserOptions = {
  //     zoom: 'no'
  //   };
  //   //open url then return inappbrowser object
  //   const browser = this.inAppBrowser.create(url, '_self',options);

  // }

}
