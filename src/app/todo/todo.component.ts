import {Component, OnInit} from '@angular/core';
import {Todo} from '../shared/models/todo.model';
import {TodoService} from '../shared/services/todo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoForm} from '../shared/models/todo-form.model';
import {User} from '../shared/models/user.model';
import {UserService} from '../shared/services/user.service';
import {TodoList} from '../shared/models/todo-list.model';

@Component({
  selector: 'app-todo',
  templateUrl: 'todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoListId: number;
  todoList: TodoList = new TodoList();

  todo: Todo = new Todo();
  filteredContacts: User[];
  assignedUsers: User[];
  assignedUsersBinding: string[] = [];
  contacts: User[];
  tags: string;

  wasCompleted: Boolean;

  constructor(private route: ActivatedRoute, private router: Router, private todoService: TodoService, private userService: UserService) {
    this.todo.todoForm = new TodoForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todoListId = +params['todoListId'];

      this.todoService.getTodoList(this.todoListId).then(response => {
        this.todoList = response;
      });

      this.todoService.getTodo(+params['todoId']).then(todo => {
        this.todo = todo;
        if (this.todo.todoForm.completed) {
          this.wasCompleted = true;
        }

        this.assignedUsers = todo['assignedUsers'];

        this.assignedUsers.forEach(assignedUser => {
          this.assignedUsersBinding.push(assignedUser.username);
        });

        this.getContacts().then(contacts => {
          this.contacts = contacts;
        });

        this.tags = todo.tags.join(', ');
      });
    });
  }

  getContacts(): Promise<User[]> {
    return this.userService.getContacts().then(response => {
      return response;
    });
  }

  saveTodo() {
    this.splitAndMapTags();
    this.setCompletedAt();

    this.todoService.updateTodo(this.todo).then(response => {
      this.router.navigateByUrl(`todo_list/${this.todoListId}`);
    });

    if (this.assignedUsersBinding.length > 0) {
      const newAssignedUsers = [];
      this.mapToUserModel(this.assignedUsersBinding, newAssignedUsers);
      this.todoService.addAssignees(this.todo.id, newAssignedUsers);
    }
  }

  splitAndMapTags() {
    this.todo.tags = this.tags.split(',');
    this.todo.tags = this.todo.tags.map(tag => tag.trim());
  }

  setCompletedAt() {
    if (!this.wasCompleted && this.todo.todoForm.completed) {
      this.todo.todoForm.completedAt = new Date();
    } else if (this.wasCompleted && !this.todo.todoForm.completed) {
      this.todo.todoForm.completedAt = null;
    }
  }

  mapToUserModel(assignedUsersBinding: string[], newAssignedUsers: User[]) {
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

  deleteTodo(): void {
    this.todoService.deleteTodo(this.todo).then(response => {
      this.router.navigateByUrl(`/todo_list/${this.todoListId}`);
    });
  }
}
