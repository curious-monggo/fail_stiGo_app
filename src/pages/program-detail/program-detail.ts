import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CourseProvider } from '../../providers/course/course';
import { StrandProvider } from '../../providers/strand/strand';

/**
 * Generated class for the ProgramDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-program-detail',
  templateUrl: 'program-detail.html',
})
export class ProgramDetailPage {

  programId;
  programType;
  programAcronym;
  programDocument;
  yearLevel;
  grade;
  isCourse;


  firstYearFirstTermCollection;
  firstYearSecondTermCollection;

  secondYearFirstTermCollection;
  secondYearSecondTermCollection;

  thirdYearFirstTermCollection;
  thirdYearSecondTermCollection;

  fourthYearFirstTermCollection;
  fourthYearSecondTermCollection;

  grade11FirstTermCollection;
  grade11SecondTermCollection;

  grade12FirstTermCollection;
  grade12SecondTermCollection;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private courseProvider: CourseProvider,
    private strandProvider: StrandProvider
    ) {
      // if(this.yearLevel == '1st_year'){
      //   this.getFirstYearFirstTermCourseSubjects();
      //   this.getFirstYearSecondTermCourseSubjects();

      // }
      // else if(this.yearLevel == '2nd_year'){
      //   this.getSecondYearFirstTermCourseSubjects();
      //   this.getSecondYearSecondTermCourseSubjects();
      // }
      // else if(this.yearLevel == '3rd_year'){
      //   this.getThirdYearFirstTermCourseSubjects();
      //   this.getThirdYearSecondTermCourseSubjects();
      // }
      // else if(this.yearLevel == '4th_year'){
      //   this.getFourthYearFirstTermCourseSubjects();
      //   this.getFourthYearSecondTermCourseSubjects();

      // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgramDetailPage');
    this.programId = this.navParams.get('programId');
    this.programType = this.navParams.get('programType');
    this.programAcronym = this.navParams.get('programAcronym');
    console.log(this.programId, this.programType);
    if(this.programType == 'courses'){
      this.getCourseDocument();
      this.yearLevel = '1st_year';
      this.isCourse = true;
      this.getFirstYearFirstTermCourseSubjects();
      this.getFirstYearSecondTermCourseSubjects();
    }
    else if(this.programType == 'strands'){
      this.getStrandDocument();
      this.isCourse = false;
      this.grade = 'grade_11';
      this.getG11FirstTermStrandSubjects();
      this.getG11SecondTermStrandSubjects();
    }
  }

  getCourseDocument(){
    this.courseProvider.getCourseDocument(this.programId).subscribe(courseDocument => {
      this.programDocument = courseDocument;
      console.log(this.programDocument);
    });
  }
  getStrandDocument(){
    this.strandProvider.getStrandDocument(this.programId).subscribe(strandDocument => {
      this.programDocument = strandDocument;
      console.log(this.programDocument);
    });
  }

  firstYearClicked(){
    this.getFirstYearFirstTermCourseSubjects();
    this.getFirstYearSecondTermCourseSubjects();
  }
  secondYearClicked(){
    this.getSecondYearFirstTermCourseSubjects();
    this.getSecondYearSecondTermCourseSubjects();
  }
  thirdYearClicked(){
    this.getThirdYearFirstTermCourseSubjects();
    this.getThirdYearSecondTermCourseSubjects();
  }
  fourthYearClicked(){
    this.getFourthYearFirstTermCourseSubjects();
    this.getFourthYearSecondTermCourseSubjects();
  }

  g11Clicked(){
    this.getG11FirstTermStrandSubjects();
    this.getG11SecondTermStrandSubjects();
  }
  g12Clicked(){
    this.getG12FirstTermStrandSubjects();
    this.getG12SecondTermStrandSubjects();
  }
  getFirstYearFirstTermCourseSubjects(){
    this.courseProvider.getFirstYearFirstTermCourseSubjects(this.programId).subscribe(subjects => {
      this.firstYearFirstTermCollection = subjects;
      console.log(subjects);
    });
  }
  getFirstYearSecondTermCourseSubjects(){
    this.courseProvider.getFirstYearSecondTermCourseSubjects(this.programId).subscribe(subjects => {
      this.firstYearSecondTermCollection = subjects;
      console.log(subjects);
    });
  }


  getSecondYearFirstTermCourseSubjects(){
    this.courseProvider.getSecondYearFirstTermCourseSubjects(this.programId).subscribe(subjects => {
      this.secondYearFirstTermCollection = subjects;
      console.log(subjects);
    });
  }
  getSecondYearSecondTermCourseSubjects(){
    this.courseProvider.getSecondYearSecondTermCourseSubjects(this.programId).subscribe(subjects => {
      this.secondYearSecondTermCollection = subjects;
      console.log(subjects);
    });
  }


  getThirdYearFirstTermCourseSubjects(){
    this.courseProvider.getThirdYearFirstTermCourseSubjects(this.programId).subscribe(subjects => {
      this.thirdYearFirstTermCollection = subjects;
      console.log(subjects);
    });
  }
  getThirdYearSecondTermCourseSubjects(){
    this.courseProvider.getThirdYearSecondTermCourseSubjects(this.programId).subscribe(subjects => {
      this.thirdYearSecondTermCollection = subjects;
      console.log(subjects);
    });
  }

  getFourthYearFirstTermCourseSubjects(){
    this.courseProvider.getFourthYearFirstTermCourseSubjects(this.programId).subscribe(subjects => {
      this.fourthYearFirstTermCollection = subjects;
      console.log(subjects);
    });
  }
  getFourthYearSecondTermCourseSubjects(){
    this.courseProvider.getFourthYearSecondTermCourseSubjects(this.programId).subscribe(subjects => {
      this.fourthYearSecondTermCollection = subjects;
      console.log(subjects);
    });
  }


  getG11FirstTermStrandSubjects(){
    this.strandProvider.getG11FirstTermStrandSubjects(this.programId).subscribe(subjects => {
      this.grade11FirstTermCollection = subjects;
    });
  }
  getG11SecondTermStrandSubjects(){
    this.strandProvider.getG11SecondTermStrandSubjects(this.programId).subscribe(subjects => {
      this.grade11SecondTermCollection = subjects;
    });
  }

  getG12FirstTermStrandSubjects(){
    this.strandProvider.getG12FirstTermStrandSubjects(this.programId).subscribe(subjects => {
      this.grade12FirstTermCollection = subjects;
    });
  }
  getG12SecondTermStrandSubjects(){
    this.strandProvider.getG12SecondTermStrandSubjects(this.programId).subscribe(subjects => {
      this.grade12SecondTermCollection = subjects;
    });
  }



}
