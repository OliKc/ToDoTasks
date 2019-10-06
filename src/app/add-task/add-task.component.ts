import { Component, OnInit, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass']
})
export class AddTaskComponent implements OnInit {

  newTaskContent: string;
  deadline: number;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private tasksService: TasksService) { }


  ngOnInit() {
  }

  saveTask(form) {
    if (form.value.content) {

      // when no deadine is specified
      const maxDate = 8640000000000000;

      const newTask: Task = ({ content: form.value.content, created: Date.now(), deadline: this.deadline || maxDate });
      this.tasksService.add(newTask);
    }

    // close new task
    this.close.emit(null);
  }

  deleteTask() {
    this.close.emit(null);
  }

}
