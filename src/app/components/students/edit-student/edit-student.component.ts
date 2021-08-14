import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  studentData: any;
  student: any;
  formGroup!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }, public dialogRef: MatDialogRef<EditStudentComponent>, public studentService: StudentService, private formBuilder: FormBuilder) {

  }

  formControl = new FormControl('', [Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  ngOnInit(): void {

    this.getStudentData();
    this.formGroup = this.formBuilder.group({
      'id': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': [''],
      'phone': [''],
      'age': [''],
    });

  }

  getStudentData() {
    this.studentService.getByIdStudent
      (this.data)
      .pipe(first())
      .subscribe(
        res => {
          this.studentData = res;

          this.formGroup = this.formBuilder.group({
            'id': [this.studentData.id, Validators.required],
            'firstName': [this.studentData.firstName, Validators.required],
            'lastName': [this.studentData.lastName, Validators.required],
            'email': [this.studentData.email],
            'phone': [this.studentData.phone],
            'age': [this.studentData.age],
          });
        },
        errorRes => {
          console.log("Error")
        });
  }

  onSubmit(studentForm: any) {

    let post = {
      id: studentForm.value.id,
      firstName: studentForm.value.firstName,
      lastName: studentForm.value.lastName,
      email: studentForm.value.email,
      phone: studentForm.value.phone,
      age: studentForm.value.age
    }

    this.studentService.updateStudentData(post, this.data)
      .pipe(first())
      .subscribe(
        resObj => {
          console.log("resObj", resObj)
          this.studentService.tableRefresh.emit(this.student);
        },
        errorRes => {
          console.log("errorRes", errorRes)
        });

  }

  close() {
    this.dialogRef.close();
  }

}
