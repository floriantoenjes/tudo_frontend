import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import {TodoListComponent} from './todo-list-overview/todo-list-overview.component';
import {TodoComponent} from './todo-list/todo-list.component';

const appRoutes: Routes = [
  {pathMatch: 'full', path: '', component: TodoListComponent},
  {pathMatch: 'full', path: 'todo_list/:id', component: TodoComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TodoListComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
