import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/services/todo.service';
import {Todo} from '../shared/models/todo.model';
import {TodoForm} from '../shared/models/todo-form.model';
import {Subject} from 'rxjs/Subject';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-assigned-todo-list',
  templateUrl: './assigned-todo-list.component.html'
})
export class AssignedTodoListComponent implements OnInit {
  todos: Todo[] = [];
  todoSubject: Subject<Todo> = new Subject<Todo>();

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getAssignedTodos().then(todos => {
      this.todos = todos;
      this.sortByPriority(this.todos);
    });

    this.todoSubject.asObservable().pipe(
      debounceTime(300),
      distinctUntilChanged(null, todo => {
        return todo.todoForm.progress;
      })
    ).subscribe(todo => {
      this.updateTodoForm(todo.todoForm);
    });
  }

  updateTodoForm(todoForm: TodoForm): void {
    this.todoService.updateTodoForm(todoForm).then(updatedTodo => {
      this.sortByPriority(this.todos);
    });
  }

  updateTodoSubscription(todo: Todo) {
    this.todoSubject.next(todo);
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
