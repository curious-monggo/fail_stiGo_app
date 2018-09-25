import { Hotspot } from '@ionic-native/hotspot';
import { Event } from './../../models/event/event';
import { AttendanceProvider } from './../../providers/attendance/attendance';


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,  } from 'ionic-angular';

import { HotspotProvider } from './../../providers/hotspot/hotspot';
import { AuthProvider } from '../../providers/auth/auth';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  eventDocumentId;
  eventDocument:Event;
  isStudent = false;
  loadingComponent;
  isSBG = false;
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
    student_middle_name:'',
    student_last_name: '',
    student_program:'',
    student_year_level:''
  };
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams, 
     private eventProvider: EventProvider,
     private hotspotProvider:HotspotProvider,
     public alertCtrl: AlertController,
     public loadingCtrl: LoadingController,
     private authProvider: AuthProvider,
     public hotspot: Hotspot,
     private attendanceProvider: AttendanceProvider){
      this.authProvider.user$.subscribe(user =>{
        if(user){
          console.log(user, 'test');
          this.user_type = user.user_type;
          if(this.user_type == 'Student'){
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
          }
          else if(this.user_type == 'SBG'){
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

  openAttendancePage(){
    this.navCtrl.push('AttendancePage');
  }

  hostAttendance(){
    console.log(this.attendanceParameters, 'test for sign in');
    this.loading('Creating hotspot...');
    this.hotspot.createHotspot(
      this.attendanceParameters.attendance_event_name, 'WPA',this.attendanceParameters.attendance_password
    ).then((onCreateHotspotSuccess => {
      this.loadingComponent.dismiss();
      this.alert(
        'Hotspot creation successful!', 
        'Students may now connect to your device for proximity confirmation',
        'OK'
      );
      console.log(onCreateHotspotSuccess);
    }), error => {
      this.loadingComponent.dismiss();
      console.log(error);
      this.alert('Something went wrong...',
       'Hotspot creation was unsuccesful, please try again. If you encounter this error again that may mean that the app does not currently support your device.',
       'OK'
      );
    });
    
  }
  stopHostingAttendance(){
    this.loading('Stopping hotspot');
    this.hotspot.stopHotspot().then(onStop =>{
      this.loadingComponent.dismiss();
      this.alert('Hotspot on device has been stopped', 'Students will no longer be able to connect to your device.', 'ok');
    },onError => {
      this.loadingComponent.dismiss();
      this.alert(
        'Something went wrong...',
        'Hotspot stopping was unsuccesful, please try again. If you encounter this error again please report this to the system maintainers',
        'OK'
        );
    });
  }

  signForAttendance(){

  }
  getEventDocument(eventDocumentId){
    this.eventProvider.getEventDocument(eventDocumentId).subscribe(eventDocument => {
      this.eventDocument = eventDocument;
    }, error => {
      this.navCtrl.pop();
    });
  }
  getAttendanceParameters(){
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
  alert(title, message, buttons){
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [buttons]
    });
    alert.present();
  }
  loading(content){
    this.loadingComponent = this.loadingCtrl.create({
      content: content,
    });
    this.loadingComponent.present();
  }
  

}
