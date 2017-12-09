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
  filteredContacts: User[];
  assignedUsers: User[];
  assignedUsersBinding: String[];
  contacts: User[];
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
          this.filteredContacts = this.filterContactsForAssignedUsers(contacts, assignedUsers);
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
    this.todo.tags = this.todo.tags.map(tag => tag.trim());

    this.todoService.updateTodo(this.todo).then(response => {
      this.router.navigateByUrl('todo_list/1');
    });

    const newAssignedUsers = [];

    if (this.assignedUsersBinding !== undefined) {
      this.mapToUserModel(this.assignedUsersBinding, newAssignedUsers);
      this.todoService.addAssignees(this.todo.id, newAssignedUsers);
    }
  }

  mapToUserModel(assignedUsersBinding: String[], newAssignedUsers: User[]) {
    this.assignedUsersBinding.forEach(assignedUserName => {
      for (let i = 0; i < this.contacts.length; i++) {
        if (this.contacts[i].username === assignedUserName) {
          const user: User = new User();
          user.username = assignedUserName;
          user.id = this.contacts[i].id;
          newAssignedUsers.push(user);
        }
      }
    });
  }
}
