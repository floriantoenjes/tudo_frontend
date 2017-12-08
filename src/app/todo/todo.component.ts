import {Component, OnInit} from '@angular/core';
import {Todo} from '../shared/todo.model';
import {TodoService} from '../shared/todo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoForm} from '../shared/todo-form.model';
import {User} from '../shared/user.model';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-todo',
  templateUrl: 'todo.component.html'
})
export class TodoComponent implements OnInit {
  todoListId: Number;
  todo: Todo = new Todo();
  contacts: User[];
  assignedUsers: User[];
  assignedUsersAfter: User[];

  constructor(private todoService: TodoService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.todo.todoForm = new TodoForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todoListId = +params['todoListId'];
      this.todoService.getTodo(+params['todoId']).then(response => {
        this.todo = response;
        this.assignedUsers = this.todo['assignedUsers'];

        this.getContacts();
      });
    });

  }

  getContacts(): void {
    this.userService.getContacts().then(response => {
      this.contacts = response;
      this.filterContactsForAssignedUsers();
    });
  }

  filterContactsForAssignedUsers(): void {
    this.contacts = this.contacts.filter(contact => {
      for (let i = 0; i < this.assignedUsers.length; i++) {
        if (this.assignedUsers[i].username === contact.username) {
          return false;
        }
      }
      return true;
    });
  }

  onSubmit() {
    this.todoService.updateTodo(this.todo).then(response => {

      console.log('Assigned User:');
      console.log(this.assignedUsersAfter);

      this.router.navigateByUrl('todo_list/1');
    });
  }
}
