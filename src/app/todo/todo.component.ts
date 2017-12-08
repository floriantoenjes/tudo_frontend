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
  assignedUsersAfter: String[];
  assignedUsersAfterReal: User[] = [];
  tags: String;
  originalContacts: User[];

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

        this.tags = response.tags.toString();
      });
    });

  }

  getContacts(): void {
    this.userService.getContacts().then(response => {
      this.contacts = response;
      this.originalContacts = response;
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
    this.todo.tags = this.tags.split(',');
    this.todoService.updateTodo(this.todo).then(response => {
      this.router.navigateByUrl('todo_list/1');
    });

    this.assignedUsersAfterReal = [];

    console.log('UsersAfter');
    console.log(this.assignedUsersAfter);

    if (this.assignedUsersAfter) {

      this.assignedUsersAfter.forEach(assignedUserName => {
        for (let i = 0; i < this.originalContacts.length; i++) {

          console.log('forName');
          console.log(this.originalContacts[i].username);
          console.log(assignedUserName);

          console.log('Length');
          console.log(this.originalContacts.length);
          console.log(this.assignedUsersAfter.length);

          if (this.originalContacts[i].username === assignedUserName) {

            console.log('For ID');
            console.log(this.originalContacts[i].id);

            const user: User = new User();
            user.username = assignedUserName;
            user.id = this.originalContacts[i].id;
            this.assignedUsersAfterReal.push(user);
          }
        }
      });

      console.log('UsersReal');
      console.log(this.assignedUsersAfterReal);

      this.todoService.addAssignees(this.todo.id, this.assignedUsersAfterReal);

    }

  }
}
