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
      this.sortByPriority(this.todos);
    });
  }

  updateTodoForm(todoForm: TodoForm): void {
    this.todoService.updateTodoForm(todoForm).then(updatedTodo => {
      this.sortByPriority(this.todos);
    });
  }

  // ToDo: Move to utility class
  sortByPriority(todos: Todo[]): void {
    todos.sort((todo1, todo2) => {
      if (todo1.todoForm.completed && !todo2.todoForm.completed) {
        return 1;
      } else if (!todo1.todoForm.completed && todo2.todoForm.completed) {
        return -1;
      }

      if (todo1.priority === todo2.priority) {
        return todo1.name.localeCompare(todo2.name.toString());
      } else {
        return +todo2.priority - +todo1.priority ;
      }
    });
  }
}
