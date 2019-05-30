import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.sass']
})
export class TodoTaskComponent implements OnInit {

  @Input()
  tasks: Task[];


  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    console.log('todo init', this.tasks);
  }

}
