import { Hotspot } from '@ionic-native/hotspot';
import { Event } from './../../models/event/event';
import { AttendanceProvider } from './../../providers/attendance/attendance';


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, } from 'ionic-angular';

import { HotspotProvider } from './../../providers/hotspot/hotspot';
import { AuthProvider } from '../../providers/auth/auth';
import { EventProvider } from '../../providers/event/event';

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  eventDocumentId;
  eventDocAdded;
  eventDocument: Event;
  isStudent;
  loadingComponent;
  isSBG = false;
  isAttendanceFinished = false;
  user_type;
  attendanceParameters = {
    attendance_event_date: '',
    attendance_event_name: '',
    attendance_password: '',
    attendance_time_end: '',
    attendance_time_start: ''
  }
  userObj = {
    student_id_number: '',
    student_first_name: '',
    student_middle_name: '',
    student_last_name: '',
    student_program: '',
    student_year_level: ''
  };
  checkStatusSubscriptionSignIn;
  checkStatusSubscriptionSignOut;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eventProvider: EventProvider,
    private hotspotProvider: HotspotProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private authProvider: AuthProvider,
    public hotspot: Hotspot,
    private attendanceProvider: AttendanceProvider) {
     
    this.authProvider.user$.subscribe(user => {
      if (user) {
        console.log(user, 'test');
        this.user_type = user.user_type;
        if (this.user_type == 'Student') {
          this.isStudent = true;
          this.isSBG = false;
          this.userObj = {
            student_id_number: user.student_id_number,
            student_first_name: user.student_first_name,
            student_middle_name: user.student_middle_name,
            student_last_name: user.student_last_name,
            student_program: user.student_program,
            student_year_level: user.student_year_level
          };
          this.getAttendanceList();
        }
        else if (this.user_type == 'SBG') {
          this.isStudent = false;
          this.isSBG = true;

        }
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
    this.eventDocumentId = this.navParams.get('id');
    console.log(this.eventDocumentId);
    this.getEventDocument(this.eventDocumentId);
    this.getAttendanceParameters();

  }

  getEventDocument(eventDocumentId) {
    this.eventProvider.getEventDocument(eventDocumentId).subscribe(eventDocument => {
      this.eventDocument = eventDocument;
    }, error => {
      this.navCtrl.pop();
    });
  }
  getAttendanceParameters() {
    this.attendanceProvider.getAttendanceParameters(this.eventDocumentId).subscribe(params => {
      this.attendanceParameters = {
        attendance_event_date: params.attendance_event_date,
        attendance_event_name: params.attendance_event_name,
        attendance_password: params.attendance_password,
        attendance_time_end: params.attendance_time_end,
        attendance_time_start: params.attendance_time_start
      };

    });
  }
  openAttendancePage() {

    this.navCtrl.push('AttendancePage', {
      eventId: this.eventDocumentId,
      programType: this.userObj.student_program
    });

  }
  getAttendanceList() {
    this.attendanceProvider.getAttendanceList(this.eventDocumentId, this.userObj.student_program).subscribe(list => {
      console.log(list, 'listahan');
    });
  }
  checkAttendanceStatusSignIn(eventId, userObj) {

    this.checkStatusSubscriptionSignIn = this.attendanceProvider.checkAttendanceStatus(eventId, userObj).subscribe(status => {

      console.log(status, 'before');
      if (status == undefined) {
        console.log(status);
        this.checkDateTimeBeforeSignIn();
      }
      else if (status.signIn == true, status.signOut == undefined) {

        this.alert('You have already signed in!', 'Please click the sign out button once the event ends, thank you!', 'Ok');
        //this.checkDateTimeBeforeSignOut();
      }
      else if (status.signIn == true, status.signOut == true) {
        this.isAttendanceFinished = true;

        this.openAttendancePage();
        this.alert(
          'You have already finished signing in and out!',
          'Thank you for reconfirming!',
          'Ok');
        this.checkStatusSubscriptionSignIn.unsubscribe();
      }


      console.log(this.isAttendanceFinished)
    });


  }
  checkAttendanceStatusSignOut(eventId, userObj) {

    this.checkStatusSubscriptionSignOut = this.attendanceProvider.checkAttendanceStatus(eventId, userObj).subscribe(status => {

      console.log(status, 'before');
      if (status == undefined) {
        console.log(status);
        // this.checkDateTimeBeforeSignIn();
        this.alert('You still have not signed in!', 'Please click the sign in button, thank you!', 'Ok');
      }
      else if (status.signIn == true, status.signOut == undefined) {

        //this.alert('You have already signed in!', 'Please click the sign out button once the event ends, thank you!', 'Ok');
        this.checkDateTimeBeforeSignOut();
      }
      else if (status.signIn == true, status.signOut == true) {
        this.isAttendanceFinished = true;


        this.openAttendancePage();
        this.alert(
          'You have already finished signing in and out!',
          'Thank you for reconfirming!',
          'Ok');
        this.checkStatusSubscriptionSignOut.unsubscribe();
      }


      console.log(this.isAttendanceFinished)

    });
  }
  checkDateTimeBeforeSignIn() {

    let now = new Date().toLocaleString('en-PH');
    let eventStart = new Date(
      `${this.attendanceParameters.attendance_event_date}, 
       ${this.attendanceParameters.attendance_time_start}`).toLocaleString('en-PH');
    let eventEnd = new Date(
      `${this.attendanceParameters.attendance_event_date}, 
       ${this.attendanceParameters.attendance_time_end}`).toLocaleString('en-PH');
      console.log(eventStart, eventEnd)
    if (now >= eventStart && now <= eventEnd) {
      console.log('Sign in pwede');
      //connect to host
      // 
      this.connectToHostSignIn(now);

    }
    else if (now > eventEnd) {
      console.log('event has ended, you may now try to sign out', now);
      this.alert('Event has already ended', 'Only signout is available, please try clicking the sign out button', 'OK');

    }
    else if (now < eventStart) {
      this.alert('Event has not yet started', 'Please wait until the event starts, thank you!', 'Ok');
    }
    //

  }
  checkDateTimeBeforeSignOut() {
    let now = new Date().toLocaleString('en-PH');
    let eventStart = new Date(
      `${this.attendanceParameters.attendance_event_date}, 
       ${this.attendanceParameters.attendance_time_start}`).toLocaleString('en-PH');
    let eventEnd = new Date(
      `${this.attendanceParameters.attendance_event_date}, 
       ${this.attendanceParameters.attendance_time_end}`).toLocaleString('en-PH');
    if (now >= eventStart && now <= eventEnd) {
      console.log('Di pwede, ongoing yung event');
      this.alert('The event is still ongoing...', 'You can only sign out once the event ends, thank you!', 'Ok');
    }
    else if (now > eventEnd) {
      console.log('event has ended, you may now try to sign out', now);
      // 
      this.connectToHostSignOut(now);
      //this.alert('Event has already ended', 'Only signout is available, please try clicking the sign out button', 'OK');
    }
    else if (now < eventStart) {
      this.alert('Event has not yet started', 'Please wait until event has concluded, thank you!', 'Ok');
    }
  }
  signInButtonClicked() {
    this.loading('Connecting to database...');
    this.checkAttendanceStatusSignIn(this.eventDocumentId, this.userObj);
    this.loadingComponent.dismiss();
  }
  signOutButtonClicked() {
    this.loading('Connecting to database...');
    console.log(this.eventDocumentId, this.userObj);
    this.checkAttendanceStatusSignOut(this.eventDocumentId, this.userObj);
    this.loadingComponent.dismiss();
  }
  signInForAttendance(dateTimeNow) {
    this.attendanceProvider.signInForAttendance(this.eventDocumentId, this.userObj, dateTimeNow)
    console.log(this.eventDocumentId, this.userObj, dateTimeNow, 'Params');
    this.alert('Sign in was saved in device', 'Please connect to your preferred network to send your attendance', 'Ok');
  }
  signOutForAttendance(dateTimeNow) {
    console.log(this.eventDocumentId, this.userObj, dateTimeNow, 'Params');
    this.attendanceProvider.signOutForAttendance(this.eventDocumentId, this.userObj, dateTimeNow);
    this.alert('Sign out was saved in device', 'Please connect to your preferred network to send your attendance', 'Ok');
  }

  alert(title, message, buttons) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [buttons]
    });
    alert.present();
  }
  loading(content) {
    this.loadingComponent = this.loadingCtrl.create({
      content: content,
    });
    this.loadingComponent.present();
  }
  //coonnect
  connectToHostSignIn(dateTimeNow){
    this.hotspot.connectToWifi(
      `${this.attendanceParameters.attendance_event_name}: sign in`, 
      this.attendanceParameters.attendance_password)
      .then((onConnectToHotspotSuccess => {
      console.log(onConnectToHotspotSuccess);
      this.hotspot.removeWifiNetwork(`${this.attendanceParameters.attendance_event_name}: sign in`).then((onRemoveSuccess => {
        this.signInForAttendance(dateTimeNow);
      }));
    }),
    onRejected => {
      console.log(onRejected);
      this.alert(
        'Unable to connect to host',
        'You might be out of reach, please try going closer to the host, if this persists then the app might not support your device as of now',
        'OK'
      );
    })
  }
  connectToHostSignOut(dateTimeNow){
    this.hotspot.connectToWifi(
      `${this.attendanceParameters.attendance_event_name}: sign out`, 
      this.attendanceParameters.attendance_password)
      .then((onConnectToHotspotSuccess => {
      console.log(onConnectToHotspotSuccess);
      this.hotspot.removeWifiNetwork(`${this.attendanceParameters.attendance_event_name}: sign out`).then((onRemoveSuccess => {
        this.signOutForAttendance(dateTimeNow);
      }));
    }),
    onRejected => {
      console.log(onRejected);
      this.alert(
        'Unable to connect to host',
        'You might be out of reach, please try going closer to the host, if this persists then the app might not support your device as of now',
        'OK'
      );
    })
  }



  //hotspot
  hostAttendance() {
    let now = new Date();
    let eventStart = new Date(
      `${this.attendanceParameters.attendance_event_date}, 
       ${this.attendanceParameters.attendance_time_start}`);
    let eventEnd = new Date(
      `${this.attendanceParameters.attendance_event_date}, 
       ${this.attendanceParameters.attendance_time_end}`);
    if (now >= eventStart && now <= eventEnd) {
      this.hostSignInAttendance();
      // let now = new Date();
      // let eventStart = new Date(
      //   `${this.attendanceParameters.attendance_event_date}, 
      //    ${this.attendanceParameters.attendance_time_start}`);
      // let eventEnd = new Date(
      //   `${this.attendanceParameters.attendance_event_date}, 
      //    ${this.attendanceParameters.attendance_time_end}`);
      // let difference = (+eventEnd) - (+now);
      // console.log(difference);
      // setTimeout(() => {
      //   this.hostSignOutAttendance();
      // }, difference)  
    }
    else if (now > eventEnd) {
      this.alert('Event has ended', 'The app will now rehost for sign out attendance', 'Ok');
      this.hostSignOutAttendance();
    }
    else if (now < eventStart) {
      this.alert('Event has not yet started..', 'Please wait until event has started, thank you!', 'Ok');
    }
  }


  hostSignInAttendance() {
    console.time('Host attendance');
    console.log(this.attendanceParameters, 'test for sign in');
    this.loading('Creating hotspot...');
    this.hotspot.createHotspot(
      `${this.attendanceParameters.attendance_event_name}: sign in`, 'WPA', this.attendanceParameters.attendance_password
    ).then((onCreateHotspotSuccess => {
      this.loadingComponent.dismiss();
      this.alert(
        'Hotspot creation for sign in successful!',
        'Students may now connect to your device for proximity confirmation',
        'OK'
      );
      console.log(onCreateHotspotSuccess);
      console.timeEnd('Host attendance');
    }), error => {
      this.loadingComponent.dismiss();
      console.log(error);
      this.alert('Something went wrong...',
        'Hotspot creation was unsuccesful, please try again. If you encounter this error again that may mean that the app does not currently support your device.',
        'OK'
      );
      console.timeEnd('Host attendance');
    });
  }
  hostSignOutAttendance() {
    console.time('Host attendance');
    console.log(this.attendanceParameters, 'test for sign out');
    this.loading('Creating hotspot...');
    this.hotspot.createHotspot(
      `${this.attendanceParameters.attendance_event_name}: sign out`, 'WPA', this.attendanceParameters.attendance_password
    ).then((onConfigureHotspotSuccess => {
      this.loadingComponent.dismiss();
      this.alert(
        'Hotspot creation for sign out successful!',
        'Students may now connect to your device for proximity confirmation',
        'OK'
      );
      console.log(onConfigureHotspotSuccess);
      console.timeEnd('Host attendance');
    }), error => {
      this.loadingComponent.dismiss();
      console.log(error);
      this.alert('Something went wrong...',
        'Hotspot creation was unsuccesful, please try again. If you encounter this error again that may mean that the app does not currently support your device.',
        'OK'
      );
      console.timeEnd('Host attendance');
    });
  }
  stopHostingAttendance() {
    this.loading('Stopping hotspot');
    this.hotspot.stopHotspot().then(onStop => {
      this.loadingComponent.dismiss();
      this.alert('Hotspot on device has been stopped', 'Students will no longer be able to connect to your device.', 'ok');
    }, onError => {
      this.loadingComponent.dismiss();
      this.alert(
        'Something went wrong...',
        'Hotspot stopping was unsuccesful, please try again. If you encounter this error again please report this to the system maintainers',
        'OK'
      );
    });
  }


}
