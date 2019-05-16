import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Array<Task> = [];

  constructor() { }

  add(task: Task) {

  }

  remove(task: Task) {

  }

  done(task: Task) {

  }
}
