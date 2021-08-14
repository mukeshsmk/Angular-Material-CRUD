import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { StudentService } from './shared/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  reload: any;
  @Output() childName = new EventEmitter();
  constructor(public studentService: StudentService) { }

  ngOnInit(): void {
  }

  refreshPage() {
    this.studentService.tableRefresh.emit('data');
  }
}
