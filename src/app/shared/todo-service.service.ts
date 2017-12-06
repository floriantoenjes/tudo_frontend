import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TodoList} from './todo-list.model';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable()
export class TodoService {

  constructor(private http: HttpClient) {
  }

  getTodoLists(): Promise<TodoList[]> {
    const headers = new Headers();

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

}
