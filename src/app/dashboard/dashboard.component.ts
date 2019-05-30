import { AngularFireList } from 'angularfire2/database';
import { TasksService } from './../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  tasks$: Observable<Task[]>;
  tasks: Task[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private tasksService: TasksService
  ) { }

  ngOnInit() {

    console.log('dashboard init');

    //this.tasks$ = this.tasksService.getTasks();

    this.tasksService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
    console.log(this.tasks);

    
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/signup']));
  }

}
