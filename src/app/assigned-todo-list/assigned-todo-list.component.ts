import { Component, OnInit } from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {Todo} from '../shared/todo.model';
import {TodoForm} from '../shared/todo-form.model';

@Component({
  selector: 'app-assigned-todo-list',
  templateUrl: './assigned-todo-list.component.html'
})
export class AssignedTodoListComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getAssignedTodos().then(todos => {
      this.todos = todos;
    });
  }

  updateTodoForm(todoForm: TodoForm): void {
    this.todoService.updateTodoForm(todoForm).then(updatedTodo => {
      console.log(updatedTodo);
    });
  }
}
