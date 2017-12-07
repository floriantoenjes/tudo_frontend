import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo-service.service';
import {Todo} from '../shared/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html'
})
export class TodoListComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getTodos(1).then(response => {
      this.todos = response;
    });
  }
}
