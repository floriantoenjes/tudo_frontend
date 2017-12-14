import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {Todo} from '../shared/todo.model';
import {ActivatedRoute} from '@angular/router';
import {TodoList} from '../shared/todo-list.model';
import {TodoForm} from '../shared/todo-form.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html'
})
export class TodoListComponent implements OnInit {
  todoList: TodoList =  new TodoList();
  todos: Todo[];
  newTodo: Todo = new Todo();

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
      return +todo2.priority - +todo1.priority ;
    });
  }
}
