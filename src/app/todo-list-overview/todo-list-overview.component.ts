import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo-service.service';
import {TodoList} from '../shared/todo-list.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list-overview.component.html'
})
export class TodoListOverviewComponent implements OnInit {
  todoLists: TodoList[];
  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {
    this.todoService.getTodoLists().then(response => {
      this.todoLists = response;
    });
  }
}
