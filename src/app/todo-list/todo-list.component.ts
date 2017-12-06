import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo-service.service';
import {TodoComplete} from '../shared/todo-complete.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html'
})
export class TodoListComponent implements OnInit {
  todosComplete: TodoComplete[];

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getTodos(1).then(response => {
      this.todosComplete = response;
    });
  }
}
