import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

import { Observable } from 'rxjs';
import { map, refCount } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

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
    this.tasksCollection = this.afs.collection('users').doc(uid).collection('tasks', ref =>
      ref.orderBy('deadline'));

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

    // get user id
    const uid = sessionStorage.getItem('userUID');

    console.log(task);

    //taskDoc: AngularFirestoreDocument<Task>;
    // this.taskDoc = this.afs.doc(`users/${uid}/tasks/${task.id}`);
    // this.taskDoc.delete();
    this.tasksCollection.doc(task.id).delete();
  }

  update(task: Task) {

    this.tasksCollection.doc(task.id).update({
      content: task.content
    });
    console.log('service task update');
  }

  done(task: Task) {

  }
}
