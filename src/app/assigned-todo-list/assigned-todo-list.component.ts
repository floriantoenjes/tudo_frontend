import { Component, OnInit } from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {Todo} from '../shared/todo.model';

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

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).then(updatedTodo => {
      console.log(updatedTodo);
    });
  }
}
