import { Component, OnInit } from '@angular/core';
import {Todo} from '../shared/todo.model';
import {TodoService} from '../shared/todo.service';
import {ActivatedRoute} from '@angular/router';
import {TodoForm} from '../shared/todo-form.model';

@Component({
  selector: 'app-assigned-todo',
  templateUrl: './assigned-todo.component.html'
})
export class AssignedTodoComponent implements OnInit {
  todo: Todo = new Todo();
  tags: String;
  assignedUsers: String = '';


  constructor(private todoService: TodoService, private route: ActivatedRoute) {
    this.todo.todoForm = new TodoForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todoService.getTodo(+params['todoId']).then(response => {
        this.todo = response;
        this.tags = this.todo.tags.join(', ');

        const assignedUsernames: String[] = [];
        this.todo['assignedUsers'].forEach(assignedUser => {
          assignedUsernames.push(assignedUser.username);
        });
        this.assignedUsers = assignedUsernames.join(', ');
      });
    });
  }

  onSubmit(): void {

  }
}
