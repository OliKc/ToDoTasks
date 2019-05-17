import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks$: AngularFireList<Task[]> = null;
  tasks: Array<Task> = [];

  constructor(private db: AngularFireDatabase, private auth: AuthService) { }

  getTaskList(): AngularFireList<Task[]> {
    if (!this.auth.user)
    return;

    this.tasks$ = this.db.list(`Tasks/${this.auth.user}`);
    return this.tasks$;
  }

  add(task: Task) {

  }

  remove(task: Task) {

  }

  done(task: Task) {

  }
}
