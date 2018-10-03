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
  programType;
  eventDocumentId;
  program;
  attendanceList;
  programsList;
  constructor(public navCtrl: NavController, public navParams: NavParams, private attendanceProvider: AttendanceProvider) {
    this.getProgramsCoursesAttended();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePage');
    this.eventDocumentId = this.navParams.get('eventId');
    this.program = this.navParams.get('programType');

    //this.getList();


    
  }
  ionViewDidEnter(){
   
  }
  getList(program){
    this.attendanceProvider.getAttendanceCourseList(this.eventDocumentId, program).subscribe(attendanceList => {
      console.log(attendanceList);
      this.attendanceList = attendanceList;
      this.programType = program;
    });
  }

  getProgramsCoursesAttended(){
    this.attendanceProvider.getProgramsCoursesAttended().subscribe(available_courses => {
      console.log(available_courses);
      this.programsList = available_courses.currently_available_courses;
      // this.programType = this.programsList[0];
      console.log(this.programsList);
    });
  }

}
