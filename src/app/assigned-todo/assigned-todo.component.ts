import {Component, OnInit} from '@angular/core';
import {Todo} from '../shared/models/todo.model';
import {TodoService} from '../shared/services/todo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoForm} from '../shared/models/todo-form.model';

@Component({
  selector: 'app-assigned-todo',
  templateUrl: './assigned-todo.component.html'
})
export class AssignedTodoComponent implements OnInit {
  todo: Todo = new Todo();
  tags: string;
  assignedUsers = '';

  wasCompleted: Boolean;


  constructor(private route: ActivatedRoute, private router: Router, private todoService: TodoService) {
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

        const assignedUsernames: string[] = [];
        this.todo.assignedUsers.forEach(assignedUser => {
          assignedUsernames.push(assignedUser.username);
        });
        this.assignedUsers = assignedUsernames.join(', ');
      });
    });
  }

  updateTodoForm(): void {
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
