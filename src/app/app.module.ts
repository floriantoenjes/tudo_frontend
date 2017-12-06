import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import {TodoListOverviewComponent} from './todo-list-overview/todo-list-overview.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoComponent} from './todo/todo.component';
import {UsersComponent} from './users/users.component';

const appRoutes: Routes = [
  {pathMatch: 'full', path: '', component: TodoListOverviewComponent},
  {pathMatch: 'full', path: 'todo_list/:todoListId', component: TodoListComponent},
  {pathMatch: 'full', path: 'todo_list/:todoListId/todo/:todoId', component: TodoComponent},
  {pathMatch: 'full', path: 'users', component: UsersComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TodoListOverviewComponent,
    TodoListComponent,
    TodoComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
