import {Component, OnInit, ViewChildren, QueryList} from '@angular/core';
import {TodoService} from '../shared/services/todo.service';
import {Todo} from '../shared/models/todo.model';
import {ActivatedRoute} from '@angular/router';
import {TodoList} from '../shared/models/todo-list.model';
import {Subject} from 'rxjs/Subject';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList: TodoList =  new TodoList();
  todos: Todo[] = [];
  newTodo: Todo = new Todo();

  todoSubject: Subject<Todo> = new Subject<Todo>();

  @ViewChildren('progress')
  private progressModels: QueryList<NgModel>;

  @ViewChildren('priority')
  private priorityModels: QueryList<NgModel>;

  constructor(private route: ActivatedRoute, private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todoService.getTodoList(+params['todoListId']).then(response => {
        this.todoList = response;
      });

      this.todoService.getTodos(+params['todoListId']).then(response => {
        this.todos = response;
        this.sortByPriority(this.todos);
      });
    });

    this.todoSubject.asObservable().pipe(
      debounceTime(300),
      distinctUntilChanged((todoObj1, todoObj2) => {
        return todoObj1.priority === todoObj2.priority && todoObj1.progress === todoObj2.progress;
      }, (todoObj: Todo) => {
        return {priority: todoObj.priority, progress: todoObj.todoForm.progress};
      })
    ).subscribe(todo => {
      this.updateTodo(todo);
    });
  }

  updateTodoSubscription(todo: Todo, index: number) {
    if (this.isTodoValid(index)) {
      this.todoSubject.next(todo);
    }
  }

  isTodoValid(index: number): boolean {
    return this.progressModels.toArray()[index].valid && this.priorityModels.toArray()[index].valid;
  }

  addTodo(): void {
    this.newTodo['todoList'] = this.todoList['_links']['self']['href'];

    this.todoService.createTodo(this.newTodo).then( response => {
      this.todos.push(response);
      this.sortByPriority(this.todos);
    });
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo);
    this.sortByPriority(this.todos);
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo).then(() => {
      this.todos.splice(this.todos.indexOf(todo), 1);
    });
  }

  sortByPriority(todos: Todo[]): void {
    todos.sort((todo1, todo2) => {
      if (todo1.todoForm.completed && !todo2.todoForm.completed) {
        return 1;
      } else if (!todo1.todoForm.completed && todo2.todoForm.completed) {
        return -1;
      }

      if (todo1.priority === todo2.priority) {
        return todo1.name.localeCompare(todo2.name.toString());
      } else {
        return +todo2.priority - +todo1.priority ;
      }
    });
  }
}
