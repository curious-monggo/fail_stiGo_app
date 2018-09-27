import { AttendanceProvider } from './../../providers/attendance/attendance';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {
  programType="BSIT";
  eventDocumentId;
  program;
  list
  constructor(public navCtrl: NavController, public navParams: NavParams, private attendanceProvider: AttendanceProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePage');
    this.eventDocumentId = this.navParams.get('eventId');
    this.program = this.navParams.get('programType');
    this.getList();
    
  }
  getList(){
    this.attendanceProvider.getAttendanceList(this.eventDocumentId, this.program).subscribe(list => {
      console.log(list);
      this.list = list;
    });
  }

}
