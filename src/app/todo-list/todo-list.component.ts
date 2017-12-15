import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {Todo} from '../shared/todo.model';
import {ActivatedRoute} from '@angular/router';
import {TodoList} from '../shared/todo-list.model';
import {TodoForm} from '../shared/todo-form.model';
import {Subject} from 'rxjs/Subject';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html'
})
export class TodoListComponent implements OnInit {
  todoList: TodoList =  new TodoList();
  todos: Todo[];
  newTodo: Todo = new Todo();

  todoSubject: Subject<Todo> = new Subject<Todo>();

  constructor(private route: ActivatedRoute, private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todoService.getTodoList(+params['todoListId']).then(response => {
        this.todoList = response;
      });

      this.todoService.getTodos(+params['todoListId']).then(response => {
        this.todos = response;
        this.sortByPriority(this.todos);
      });
    });

    this.todoSubject.asObservable().pipe(
      debounceTime(300),
      distinctUntilChanged(null, todo => {
        return todo.priority;
      })
    ).subscribe(todo => {
      this.updateTodo(todo);
    });
  }

  updatePriority(todo: Todo) {
    this.todoSubject.next(todo);
  }

  addTodo(): void {
    this.newTodo['todoList'] = this.todoList['_links']['self']['href'];

    this.todoService.createTodo(this.newTodo).then( response => {
      this.todos.push(response);
    });
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo);
    this.sortByPriority(this.todos);
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo).then(response => {
      this.todos.splice(this.todos.indexOf(todo), 1);
    });
  }

  sortByPriority(todos: Todo[]): void {
    todos.sort((todo1, todo2) => {
      if (todo1.priority === todo2.priority) {
        return todo1.name.localeCompare(todo2.name.toString());
      } else {
        return +todo2.priority - +todo1.priority ;
      }
    });
  }
}
