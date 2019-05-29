import { AngularFireList } from 'angularfire2/database';
import { TasksService } from './../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  tasks$: AngularFireList<Task>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    this.tasks$ = this.tasksService.getTaskList();
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/signup']));
  }

}
