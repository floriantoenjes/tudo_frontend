import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TodoList} from './todo-list.model';
import {Todo} from './todo.model';
import {TodoForm} from './todo-form.model';
import {TodoHead} from './todo-head.model';

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
          // ToDo: Use split instead of last digit to fetch values with many digits and not only one
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
        const todo: Todo = response as Todo;

        const selfLink: String = todo['_links']['self']['href'];
        todo.id = Number(selfLink.substr(selfLink.length - 1, 1));

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
          const selfLink: String = todo['_links']['self']['href'];
          todo.id = Number(selfLink.substr(selfLink.length - 1, 1));
        });

        return response['_embedded']['todos'] as Todo[];
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


}
