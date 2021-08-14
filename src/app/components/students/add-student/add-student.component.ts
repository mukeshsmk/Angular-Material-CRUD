import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { StudentService } from '../shared/student.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  formGroup!: FormGroup;
  constructor(public studentService: StudentService, public dialogRef: MatDialogRef<AddStudentComponent>, private _snackBar: MatSnackBar, private formBuilder: FormBuilder) {
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
    this.formGroup = this.formBuilder.group({
      'id': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': [''],
      'phone': [''],
      'age': [''],
    });
  }

  submit() {
    // emppty stuff
    this.formGroup = this.formBuilder.group({
      'id': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': [''],
      'phone': [''],
      'age': [''],
    });
  }

  /*   onSubmit(data: any) {
  
    } */
  onSubmit(studentForm: any) {
    console.log("data", studentForm.value)
    let post = {
      id: studentForm.value.id,
      firstName: studentForm.value.firstName,
      lastName: studentForm.value.lastName,
      email: studentForm.value.email,
      phone: studentForm.value.phone,
      age: studentForm.value.age
    }
    this.studentService.addStudentData(post)
      .pipe(first())
      .subscribe(
        resObj => {
          console.log("resObj", resObj)
          this.studentService.tableRefresh.emit(post);
          this._snackBar.open('Student Added Successfully', 'Done', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 1000,
          });
        },
        errorRes => {
          console.log("errorRes", errorRes)
        });


  }

  close() {
    this.dialogRef.close();
  }
}



