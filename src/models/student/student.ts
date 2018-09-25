export interface Student {
    //key?:string; student id number is enough of a unique identifier
    id?:string;
    student_id_number?:string;
    student_first_name?:string;
    student_middle_name?:string;
    student_last_name?:string;
    student_timestamp_added?:any;
   // student_number?:string; replaced wiht id number
    student_program?:string;
    student_year_level?:string;
}
