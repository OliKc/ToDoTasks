import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: AngularFireList<Task> = null;

  constructor(
    private db: AngularFireDatabase, private auth: AuthService) { }


  getTaskList(): AngularFireList<Task> {
    const uid = sessionStorage.getItem('userUID');

    if (!uid) {
      console.log(`User: ${uid}`);
      return;
    }

    // db connection
    this.tasks = this.db.list(`tasks/${uid}`);
    
    console.log('task service', this.tasks);
    return this.tasks;
  }

  add(task: Task) {

    console.log(`!!!!!!!!!! ${this.tasks}`);
    this.tasks.push(task).then(
      key => console.log(`key: ${key}`)
    )
    .catch((err) => {
      alert(err);
    });
    console.log(task);
  }

  remove(task: Task) {

  }

  update(task: Task) {

  }

  done(task: Task) {

  }
}
