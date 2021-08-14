import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { DeleteStudentComponent } from '../delete-student/delete-student.component';
import { EditStudentComponent } from '../edit-student/edit-student.component';
import { StudentService } from './../shared/student.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  loadingSpinner: boolean = true;
  studentList: any;
  //filter
  dataSource = new MatTableDataSource;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'age', 'actions'];

  // MatPaginator Inputs
  limit: number = 2;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [2, 5, 10];

  constructor(public studentService: StudentService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.studentService.tableRefresh.subscribe(
      (data) => {
        this.getAllRecords();
      }
    );

    this.getAllRecords();
  }

  applyFilter(event: any) {
    var searchValue = event.target.value;
    this.dataSource.filter = searchValue;
    this.studentList = this.dataSource;
  }

  ngAfterViewInit() {
   /*  this.studentList.sort = this.sort;
    this.studentList.paginator = this.paginator; */
  }

  getAllRecords() {
    this.loadingSpinner = true;
    this.studentService.getAllStudents().subscribe((data) => {
      setTimeout(() => {
        this.loadingSpinner = false;
      }, 1000)
      this.studentList = data.reverse();
      this.dataSource = new MatTableDataSource(this.studentList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.studentList = this.dataSource;
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(AddStudentComponent, {});

    this.studentService.tableRefresh.subscribe(
      (data) => {
        this.getAllRecords();
      }
    );
  }

  editStudent(id: number) {
    console.log("Id", id);
    const dialogRef = this.dialog.open(EditStudentComponent, {
      data: id
    });

    this.studentService.tableRefresh.subscribe(
      (data) => {
        this.getAllRecords();
      }
    );
  }

  deleteStudent(id: number) {
    console.log("Id", id);
    const dialogRef = this.dialog.open(DeleteStudentComponent, {
      data: id
    });

    this.studentService.tableRefresh.subscribe(
      (data) => {
        this.getAllRecords();
      }
    );

  }
}
