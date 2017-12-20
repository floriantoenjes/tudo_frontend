import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TodoList} from '../models/todo-list.model';
import {Todo} from '../models/todo.model';
import {TodoForm} from '../models/todo-form.model';
import {TodoHead} from '../models/todo-head.model';
import {User} from '../models/user.model';
import {AuthService} from './auth.service';
import {ServiceUtils} from '../service-utils';

@Injectable()
export class TodoService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getTodoLists(): Promise<TodoList[]> {
    return this.http.get(
      `http://localhost:8080/api/v1/todoLists/search/findAllByCreator?creator=/api/v1/users/${this.authService.getUserId()}`, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise().then(response => {
        const todoLists: TodoList[] = response['_embedded']['todoLists'] as TodoList[];

        todoLists.forEach(todoList => {
          todoList.id = ServiceUtils.getId(todoList);
        });

        return response['_embedded']['todoLists'] as TodoList[];
      });
  }

  getTodoList(todoListId: number): Promise<TodoList> {
    return this.http.get(`http://localhost:8080/api/v1/todoLists/${todoListId}`, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise().then(response => {
        const todoList: TodoList = response as TodoList;
        todoList.id = ServiceUtils.getId(todoList);

        return todoList;
      });
  }

  addTodoList(todoList: TodoList): Promise<TodoList> {
    return this.http.post('http://localhost:8080/api/v1/todoLists/', todoList, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/json')
    })
      .toPromise()
      .then(response => {
        const newTodoList: TodoList = response as TodoList;
        newTodoList.id = ServiceUtils.getId(response);

        return newTodoList;
      });
  }

  getTodos(todoListId: number): Promise<Todo[]> {
    return this.http.get(`http://localhost:8080/api/v1/todoLists/${todoListId}/todos?projection=todoProjection`, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        const todos: Todo[] = response['_embedded']['todos'];

        todos.forEach(todo => {
          todo.id = ServiceUtils.getId(todo);
        });

        return todos;
      });
  }

  getTodo(todoId: number): Promise<Todo> {
    return this.http.get(`http://localhost:8080/api/v1/todos/${todoId}?projection=todoProjection`, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        const todo: Todo = response as Todo;
        todo.id = ServiceUtils.getId(response);

        return todo;
      });
  }

  createTodo(todo: Todo): Promise<Todo> {
    return this.http.post('http://localhost:8080/api/v1/todos/?projection=todoProjection', todo, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/json')
    })
      .toPromise()
      .then(response => {
        const newTodo = response as Todo;
        newTodo.id = ServiceUtils.getId(newTodo);

        return newTodo;
      });
  }

  deleteTodo(todo: Todo): Promise<void> {
    return this.http.delete(`http://localhost:8080/api/v1/todos/${todo.id}`, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        return;
      });
  }

  getAssignedTodos(): Promise<Todo[]> {
    return this.http.get(
      `http://localhost:8080/api/v1/todos/search/findAllByAssignedUsersContaining?assignee=/api/v1/users/${this.authService.getUserId()}/` +
      '&projection=todoProjection', {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        const todos: Todo[] = response['_embedded']['todos'] as Todo[];

        todos.forEach(todo => {
          todo.id = ServiceUtils.getId(todo);
        });

        return todos;
      });
  }

  getTodoForm(todoFormId: number): Promise<TodoForm> {
    return this.http.get(`http://localhost:8080/api/v1/todos/${todoFormId}/todoForm`, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        return response as TodoForm;
      });
  }

  updateTodo(todo: Todo): Promise<Todo> {
    const todoHead: TodoHead = new TodoHead();
    todoHead.name = todo.name;
    todoHead.createdAt = todo.createdAt;
    todoHead.description = todo.description;
    todoHead.dueDate = todo.dueDate;
    todoHead.priority = todo.priority;
    todoHead.location = todo.location;
    todoHead.tags = todo.tags;

    const todoForm: TodoForm = todo.todoForm;

    const promises: Promise<Object>[] = [];

    promises.push(this.http.put(`http://localhost:8080/api/v1/todos/${todo.id}`, todoHead, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/json')
    })
      .toPromise());

    promises.push(this.http.put(`http://localhost:8080/api/v1/todoForms/${todoForm.id}`, todoForm, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/json')
    })
      .toPromise());

    return Promise.all(promises).then(values => {
      const newTodo: Todo = new Todo();
      newTodo.todoForm = new TodoForm();

      Object.assign(newTodo, values[0]);
      Object.assign(newTodo.todoForm, values[1]);

      return newTodo;
    });
  }

  updateTodoForm(todoForm: TodoForm): Promise<TodoForm> {
    return this.http.put(`http://localhost:8080/api/v1/todoForms/${todoForm.id}`, todoForm, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/json')
    })
      .toPromise()
      .then(response => {
        return response as TodoForm;
      });
  }

  clearAssignees(todoId: number): Promise<void> {
    return this.http.put(`http://localhost:8080/api/v1/todos/${todoId}/assignedUsers`, '', {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'text/uri-list')
    })
      .toPromise()
      .then(response => {
        return;
      });
  }

  addAssignees(todoId: number, assignees: User[]): Promise<void> {
    let body: String = '';

    assignees.forEach(assignee => {
      body += `http://localhost:8080/api/v1/users/${assignee.id}\n`;
    });

    return this.http.put(`http://localhost:8080/api/v1/todos/${todoId}/assignedUsers`,
      body, {
        headers: new HttpHeaders()
          .set('Authorization', this.authService.getToken())
          .set('Content-Type', 'text/uri-list')
      })
      .toPromise()
      .then(response => {
        return;
      });
  }

}