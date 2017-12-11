import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {TodoList} from '../shared/todo-list.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list-overview.component.html'
})
export class TodoListOverviewComponent implements OnInit {
  todoLists: TodoList[];
  newTodoList: TodoList = new TodoList();

  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {
    this.todoService.getTodoLists().then(response => {
      this.todoLists = response;
    });
  }

  onSubmit(): void {
    this.todoService.addTodoList(this.newTodoList).then(response => {
      this.todoLists.push(response);
    });

  }
}
