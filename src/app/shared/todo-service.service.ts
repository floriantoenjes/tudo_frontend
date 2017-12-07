import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TodoList} from './todo-list.model';
import {forEach} from '@angular/router/src/utils/collection';
import {Todo} from './todo.model';
import {TodoForm} from './todo-form.model';

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
          const selfLink: String = todoList._links['self']['href'];
          todoList.id = Number(selfLink.substr(selfLink.length - 1, 1));
        });

        console.log(todoLists);
        return response['_embedded']['todoLists'] as TodoList[];
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
          const selfLink: String = todo['_links']['self']['href'];
          todo.id = Number(selfLink.substr(selfLink.length - 1, 1));
        });
        console.log(todos);
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
        return response as Todo;
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

}
