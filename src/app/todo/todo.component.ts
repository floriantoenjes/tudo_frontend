import {Component, OnInit} from '@angular/core';
import {Todo} from '../shared/todo.model';
import {TodoService} from '../shared/todo.service';
import {ActivatedRoute} from '@angular/router';
import {TodoForm} from '../shared/todo-form.model';

@Component({
  selector: 'app-todo',
  templateUrl: 'todo.component.html'
})
export class TodoComponent implements OnInit {
  todo: Todo = new Todo();

  constructor(private todoService: TodoService, private route: ActivatedRoute) {
    this.todo.todoForm = new TodoForm();
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todoService.getTodo(+params['todoId']).then(response => {
        this.todo = response;
      });
    });
  }
}
