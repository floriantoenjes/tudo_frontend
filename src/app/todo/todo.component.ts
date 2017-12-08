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
  originalContacts: User[];
  tags: String;

  constructor(private todoService: TodoService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.todo.todoForm = new TodoForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todoListId = +params['todoListId'];
      this.todoService.getTodo(+params['todoId']).then(todo => {
        this.todo = todo;
        const assignedUsers: User[] = todo['assignedUsers'];
        this.assignedUsers = assignedUsers;

        this.getContacts().then(contacts => {
          this.contacts = contacts;
          this.originalContacts = contacts;
          this.contacts = this.filterContactsForAssignedUsers(contacts, assignedUsers);
        });

        this.tags = todo.tags.toString();
      });
    });
  }

  getContacts(): Promise<User[]> {
    return this.userService.getContacts().then(response => {
      return response;
    });
  }

  filterContactsForAssignedUsers(contacts: User[], assignedUsers: User[]): User[] {
    return contacts.filter(contact => {
      for (let i = 0; i < assignedUsers.length; i++) {
        if (assignedUsers[i].username === contact.username) {
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

    const assignedUsersAfterReal = [];

    if (this.assignedUsersAfter) {

      this.assignedUsersAfter.forEach(assignedUserName => {
        for (let i = 0; i < this.originalContacts.length; i++) {
          if (this.originalContacts[i].username === assignedUserName) {
            const user: User = new User();
            user.username = assignedUserName;
            user.id = this.originalContacts[i].id;
            assignedUsersAfterReal.push(user);
          }
        }
      });


      this.todoService.addAssignees(this.todo.id, assignedUsersAfterReal);

    }

  }
}
