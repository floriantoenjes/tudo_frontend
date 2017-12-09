import { Component, OnInit } from '@angular/core';
import {Todo} from '../shared/todo.model';
import {TodoService} from '../shared/todo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoForm} from '../shared/todo-form.model';

@Component({
  selector: 'app-assigned-todo',
  templateUrl: './assigned-todo.component.html'
})
export class AssignedTodoComponent implements OnInit {
  todo: Todo = new Todo();
  tags: String;
  assignedUsers: String = '';

  wasCompleted: Boolean;


  constructor(private todoService: TodoService, private route: ActivatedRoute, private router: Router) {
    this.todo.todoForm = new TodoForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todoService.getTodo(+params['todoId']).then(response => {
        this.todo = response;
        this.tags = this.todo.tags.join(', ');

        if (this.todo.todoForm.completed) {
          this.wasCompleted = true;
        }

        const assignedUsernames: String[] = [];
        this.todo['assignedUsers'].forEach(assignedUser => {
          assignedUsernames.push(assignedUser.username);
        });
        this.assignedUsers = assignedUsernames.join(', ');
      });
    });
  }

  onSubmit(): void {
    if (!this.wasCompleted && this.todo.todoForm.completed) {
      this.todo.todoForm.completedAt = new Date();
    } else if (this.wasCompleted && !this.todo.todoForm.completed) {
      this.todo.todoForm.completedAt = null;
    }

    this.todoService.updateTodoForm(this.todo.todoForm).then(response => {
      this.router.navigateByUrl('assigned_todo_list');
    });

  }
}
