import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo-service.service';
import {Todo} from '../shared/todo.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html'
})
export class TodoListComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todoService.getTodos(+params['todoListId']).then(response => {
        this.todos = response;
      });
    });
  }
}
