import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {Todo} from '../shared/todo.model';
import {ActivatedRoute} from '@angular/router';
import {TodoList} from '../shared/todo-list.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html'
})
export class TodoListComponent implements OnInit {
  todoList: TodoList =  new TodoList();
  todos: Todo[];
  newTodo: Todo = new Todo();

  constructor(private todoService: TodoService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todoService.getTodoList(+params['todoListId']).then(response => {
        this.todoList = response;
      });

      this.todoService.getTodos(+params['todoListId']).then(response => {
        this.todos = response;
      });
    });
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).then(updatedTodo => {
      console.log(updatedTodo);
    });
  }

  onSubmit(): void {
    this.todoService.createTodo(this.newTodo).then( response => {
      console.log(response);
    });
  }
}
