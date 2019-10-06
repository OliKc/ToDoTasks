import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.sass']
})
export class TodoTaskComponent implements OnInit {

  @Input()
  tasks: Task[];
  editTaskVisible = false;
  editedTask: Task;


  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    console.log('todo init', this.tasks);
  }

  editItem(event, task: Task) {
    this.editedTask = task;
    this.editTaskVisible = true;
  }
}
