import {Component, OnInit} from '@angular/core';
import {Todo} from '../shared/todo.model';
import {TodoService} from '../shared/todo-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: 'todo.component.html'
})
export class TodoComponent implements OnInit {
  todo: Todo;

  constructor(private todoService: TodoService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todoService.getTodo(+params['todoId']).then(response => {
        this.todo = response;
        console.log(response);
      });
    });
  }
}
