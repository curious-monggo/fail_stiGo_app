import { StrandProvider } from './../../providers/strand/strand';
import { CourseProvider } from './../../providers/course/course';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

//Provider
import { NewsProvider } from './../../providers/news/news';
import { EventProvider } from '../../providers/event/event';

import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  latestNewsCollection;

  latestCourseCollection;
  latestStrandCollection;

  latestEventCollection;

  displayName;
  photo_url;
  constructor(
    public navCtrl: NavController,
    private newsProvider: NewsProvider,
    private afAuth: AngularFireAuth,
    private courseProvider: CourseProvider,
    private strandProvider: StrandProvider,
    private eventProvider: EventProvider
    ) {
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.photo_url = user.photoURL;
      }
      else{
        this.photo_url = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
      }
    })
  }
  ionViewDidLoad(){
    this.getLatestNewsCollection();
    this.getLatestCourseCollection();
    this.getLatestStrandCollection();
    this.getLatestEventsCollection();

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
  goToProgramDetailPage(programId, programType, programAcronym){
    this.navCtrl.push('ProgramDetailPage', {
      programId: programId,
      programType: programType,
      programAcronym: programAcronym
    });
    console.log(programId, programType);
  }
  getLatestNewsCollection(){
    this.newsProvider.getLatestNewsCollection().subscribe(latestNewsCollection => {
      this.latestNewsCollection = latestNewsCollection;
      console.log(latestNewsCollection);
    }, error => {
      console.log('Latest News error', error);
    });
  }

  getLatestCourseCollection(){
    this.courseProvider.getLatestCourseCollection().subscribe(latestCourse => {
      this.latestCourseCollection = latestCourse;
    })
  }
  getLatestStrandCollection(){
    this.strandProvider.getLatestStrandCollection().subscribe(latestStrand => {
      this.latestStrandCollection = latestStrand;
    })
  }

  getLatestEventsCollection(){
    this.eventProvider.getLatestEventCollection().subscribe(latestEventCollection =>{
      this.latestEventCollection = latestEventCollection;
      console.log(latestEventCollection);
    });
  }


  openNewsDetailPage(newsDocumentId){
    console.log(newsDocumentId);
    this.navCtrl.push('NewsDetailPage', {
      id:newsDocumentId
    });
  }

  openEventDetailPage(eventDocumentId){
    this.navCtrl.push('EventDetailPage',{
      id: eventDocumentId
    });
  }
}
