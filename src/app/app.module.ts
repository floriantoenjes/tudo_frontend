import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {TodoListOverviewComponent} from './todo-list-overview/todo-list-overview.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoComponent} from './todo/todo.component';
import {UsersComponent} from './users/users.component';
import {ContactsComponent} from './contacts/contacts.component';
import {ContactRequestsComponent} from './contact-requests/contact-requests.component';
import {AssignedTodoListComponent} from './assigned-todo-list/assigned-todo-list.component';
import {AssignedTodoComponent} from './assigned-todo/assigned-todo.component';
import {UserComponent} from './user/user.component';
import {HttpClientModule} from '@angular/common/http';
import {TodoService} from './shared/services/todo.service';
import {FormsModule} from '@angular/forms';
import {UserService} from './shared/services/user.service';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthService} from './shared/services/auth.service';
import {SignInGuard} from './shared/guards/sign-in.guard';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AlreadySignedInGuard} from './shared/guards/already-signed-in.guard';
import { AlertComponent } from './alert/alert.component';
import {AlertService} from './shared/services/alert.service';

const appRoutes: Routes = [
  {pathMatch: 'full', path: '', component: TodoListOverviewComponent, canActivate: [SignInGuard]},
  {pathMatch: 'full', path: 'todo_list/:todoListId', component: TodoListComponent, canActivate: [SignInGuard]},
  {pathMatch: 'full', path: 'todo_list/:todoListId/todo/:todoId', component: TodoComponent, canActivate: [SignInGuard]},
  {pathMatch: 'full', path: 'users', component: UsersComponent, canActivate: [SignInGuard]},
  {pathMatch: 'full', path: 'contacts', component: ContactsComponent, canActivate: [SignInGuard]},
  {pathMatch: 'full', path: 'contact_requests', component: ContactRequestsComponent, canActivate: [SignInGuard]},
  {pathMatch: 'full', path: 'assigned_todo_list', component: AssignedTodoListComponent, canActivate: [SignInGuard]},
  {pathMatch: 'full', path: 'assigned_todo_list/:todoId', component: AssignedTodoComponent, canActivate: [SignInGuard]},
  {pathMatch: 'full', path: 'users/:userId', component: UserComponent, canActivate: [SignInGuard]},
  {pathMatch: 'full', path: 'sign_in', component: SignInComponent, canActivate: [AlreadySignedInGuard]},
  {pathMatch: 'full', path: 'sign_up', component: SignUpComponent, canActivate: [AlreadySignedInGuard]}
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
    UserComponent,
    SignInComponent,
    SignUpComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [TodoService, UserService, AuthService, AlertService, SignInGuard, AlreadySignedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
