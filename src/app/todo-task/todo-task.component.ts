import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { AngularFireList } from 'angularfire2/database';
import { Task } from '../models/task';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.sass']
})
export class TodoTaskComponent implements OnInit {

  tasks$: AngularFireList<Task> = null;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {

    this.tasks$ = this.tasksService.getTaskList();
  }

}
