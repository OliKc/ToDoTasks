import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass']
})
export class AddTaskComponent implements OnInit {

  newTaskContent: string;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
  }

  add() {
    if (this.newTaskContent) {
      const newTask: Task = ({content: this.newTaskContent, created: new Date()});
      this.tasksService.add(newTask);
      this.newTaskContent = '';
      console.log(newTask);
    }
  }

}
