import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.sass']
})
export class EditTaskComponent implements OnInit {

  @Input() task: Task;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
  }

  updateTask(event, task: Task) {
    this.tasksService.update(task);
    this.close.emit(null);
  }

  deleteTask(event, task: Task) {
    this.tasksService.remove(task);
    this.close.emit(null);
  }
}
