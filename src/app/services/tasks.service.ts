import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';


import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasksCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;

  constructor(private afs: AngularFirestore, private auth: AuthService) { }


  getTasks(): Observable<Task[]> {

    // get user id
    const uid = sessionStorage.getItem('userUID');

    if (!uid) {
      console.log(`User: ${uid}`);
      return;
    }

    // map tasks collection from firestore
    this.tasksCollection = this.afs.collection('users').doc(uid).collection('tasks');

    // map tasks from firestore
    this.tasks = this.tasksCollection.snapshotChanges().pipe(
      map(a => {
        return a.map(aa => {
          const data = aa.payload.doc.data() as Task;
          const id = aa.payload.doc.id;

          return { id, ...data };
        });
      })
    );

    console.log('task service - get tasks', this.tasks);
    return this.tasks;
  }

  add(task: Task) {

    this.tasksCollection.add(task);
  }

  remove(task: Task) {

  }

  update(task: Task) {

  }

  done(task: Task) {

  }
}
