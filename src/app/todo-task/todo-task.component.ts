import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { AngularFireList } from 'angularfire2/database';
import { Task } from '../models/task';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.sass']
})
export class TodoTaskComponent implements OnInit {

  @Input() tasks$: AngularFireList<Task>;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    console.log('hello from todo ', this.tasks$);
    this.tasks$.valueChanges().subscribe(res => console.log(res));
    this.tasks$.snapshotChanges().subscribe(res => console.log(res));

  }

}
