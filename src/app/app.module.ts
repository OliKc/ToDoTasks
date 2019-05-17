import { TasksService } from './services/tasks.service';
import { AuthService } from './services/auth.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { DoneTaskComponent } from './done-task/done-task.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { environment } from 'src/environments/environment.prod';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    DoneTaskComponent,
    TodoTaskComponent,
    SignupComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    AuthService,
    TasksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
