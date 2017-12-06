import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import {TodoListOverviewComponent} from './todo-list-overview/todo-list-overview.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoComponent} from './todo/todo.component';
import {UsersComponent} from './users/users.component';
import {ContactsComponent} from './contacts/contacts.component';
import { ContactRequestsComponent } from './contact-requests/contact-requests.component';
import { AssignedTodoListComponent } from './assigned-todo-list/assigned-todo-list.component';
import { AssignedTodoComponent } from './assigned-todo/assigned-todo.component';
import { UserComponent } from './user/user.component';

const appRoutes: Routes = [
  {pathMatch: 'full', path: '', component: TodoListOverviewComponent},
  {pathMatch: 'full', path: 'todo_list/:todoListId', component: TodoListComponent},
  {pathMatch: 'full', path: 'todo_list/:todoListId/todo/:todoId', component: TodoComponent},
  {pathMatch: 'full', path: 'users', component: UsersComponent},
  {pathMatch: 'full', path: 'contacts', component: ContactsComponent},
  {pathMatch: 'full', path: 'contact_requests', component: ContactRequestsComponent},
  {pathMatch: 'full', path: 'assigned_todo_list', component: AssignedTodoListComponent},
  {pathMatch: 'full', path: 'assigned_todo_list/:todoId', component: AssignedTodoComponent},
  {pathMatch: 'full', path: 'users/:userId', component: UserComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TodoListOverviewComponent,
    TodoListComponent,
    TodoComponent,
    UsersComponent,
    ContactsComponent,
    ContactRequestsComponent,
    AssignedTodoListComponent,
    AssignedTodoComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
