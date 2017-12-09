import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TodoList} from './todo-list.model';
import {Todo} from './todo.model';
import {TodoForm} from './todo-form.model';
import {TodoHead} from './todo-head.model';
import {User} from './user.model';

@Injectable()
export class TodoService {

  constructor(private http: HttpClient) {
  }

  getTodoLists(): Promise<TodoList[]> {
    return this.http.get('http://localhost:8080/api/v1/todoLists/search/findAllByCreator?creator=/api/v1/users/1', {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise().then(response => {
        const todoLists: TodoList[] = response['_embedded']['todoLists'] as TodoList[];

        todoLists.forEach(todoList => {
          todoList.id = this.getId(todoList);
        });

        return response['_embedded']['todoLists'] as TodoList[];
      });
  }

  getId(restEntity: Object): Number {
    const selfLink = restEntity['_links']['self']['href'];
    const splitted = selfLink.split('/');
    if (splitted[splitted.length - 1] === '') {
      return Number(splitted[splitted.length - 2]);
    } else {
      return Number(splitted[splitted.length - 1]);
    }
  }

  getTodoList(todoListId: Number): Promise<TodoList> {
    return this.http.get(`http://localhost:8080/api/v1/todoLists/${todoListId}`, {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise().then(response => {
        return response as TodoList;
      });
  }

  addTodoList(todoList: TodoList): Promise<TodoList> {
    return this.http.post('http://localhost:8080/api/v1/todoLists/', todoList, {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
        .set('Content-Type', 'application/json')
    })
      .toPromise()
      .then(response => {
        const newTodoList: TodoList = response as TodoList;
        newTodoList.id = this.getId(response);

        return newTodoList;
      });
  }

  getTodos(todoListId: Number): Promise<Todo[]> {
    return this.http.get(`http://localhost:8080/api/v1/todoLists/${todoListId}/todos?projection=todoProjection`, {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        const todos: Todo[] = response['_embedded']['todos'];

        todos.forEach(todo => {
          todo.id = this.getId(todo);
        });
        return todos;
      });
  }

  getTodo(todoId: Number): Promise<Todo> {
    return this.http.get(`http://localhost:8080/api/v1/todos/${todoId}?projection=todoProjection`, {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        const todo: Todo = response as Todo;
        todo.id = this.getId(response);

        return todo;
      });
  }

  getAssignedTodos(): Promise<Todo[]> {
    return this.http.get('http://localhost:8080/api/v1/todos/search/findAllByAssignedUsersContaining?assignee=/api/v1/users/3/' +
      '&projection=todoProjection', {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjM6cGFzc3dvcmQ=')
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        const todos: Todo[] = response['_embedded']['todos'] as Todo[];

        todos.forEach(todo => {
          todo.id = this.getId(todo);
        });

        return todos;
      });
  }

  getTodoForm(todoFormId: Number): Promise<TodoForm> {
    return this.http.get(`http://localhost:8080/api/v1/todos/${todoFormId}/todoForm`, {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
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
    todoHead.location = todo.location;
    todoHead.tags = todo.tags;

    const todoForm: TodoForm = todo.todoForm;

    const promises: Promise<Object>[] = [];

    promises.push(this.http.put(`http://localhost:8080/api/v1/todos/${todo.id}`, todoHead, {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
        .set('Content-Type', 'application/json')
    })
      .toPromise());

    promises.push(this.http.put(`http://localhost:8080/api/v1/todoForms/${todoForm.id}`, todoForm, {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
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
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
        .set('Content-Type', 'application/json')
    })
      .toPromise()
      .then(response => {
        return response as TodoForm;
      });
  }

  clearAssignees(todoId: Number): Promise<void> {
    return this.http.put(`http://localhost:8080/api/v1/todos/${todoId}/assignedUsers`, '', {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
        .set('Content-Type', 'text/uri-list')
    })
      .toPromise()
      .then(response => {
        console.log('Response:');
        console.log(response);
      });
  }

  addAssignees(todoId: Number, assignees: User[]): Promise<Object> {

    let body: String = '';

    assignees.forEach(assignee => {
      body += `http://localhost:8080/api/v1/users/${assignee.id}\n`;
    });

    console.log('Body:');
    console.log(body);

    return this.http.put(`http://localhost:8080/api/v1/todos/${todoId}/assignedUsers`,
      body, {
        headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
          .set('Content-Type', 'text/uri-list')
      })
      .toPromise()
      .then(response => {
        return response;
      });
  }


}
