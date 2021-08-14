import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { StudentService } from '../shared/student.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  studentData: any;
  deleteModel: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }, public dialogRef: MatDialogRef<DeleteStudentComponent>, public studentService: StudentService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log("data", this.data)
    this.getStudentData();
  }

  getStudentData() {
    this.studentService.getByIdStudent
      (this.data)
      .pipe(first())
      .subscribe(
        res => {
          this.deleteModel = true;
          this.studentData = res;
          console.log("Delete", res)
        },
        errorRes => {
          console.log("Error")
        });
  }

  confirmDelete() {
    this.studentService.deleteStudent
      (this.data)
      .pipe(first())
      .subscribe(
        res => {
          this._snackBar.open('Student Deleted Successfully', 'Done', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 1000,
          });
          this.studentService.tableRefresh.emit(this.data);
          console.log("Delete", res)
        },
        errorRes => {
          console.log("Error")
        });

  }

  close() {
    this.dialogRef.close();
  }
}
