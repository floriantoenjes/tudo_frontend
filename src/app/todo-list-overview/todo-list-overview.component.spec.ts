import {async, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {TodoListOverviewComponent} from './todo-list-overview.component';
import {RouterModule, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {TodoService} from '../shared/services/todo.service';
import Spy = jasmine.Spy;
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../shared/services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('TodoListOverviewComponent', () => {

  let comp;
  let fixture;
  let todoService;
  let spy: Spy;

  const testTodoLists = [
    {name: 'TodoList1', id: 1},
    {name: 'TodoList2', id: 2}
    ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoListOverviewComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        AuthService,
        TodoService,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(TodoListOverviewComponent);
    comp = fixture.componentInstance;

    todoService = fixture.debugElement.injector.get(TodoService);

    spy = spyOn(todoService, 'getTodoLists')
      .and.returnValue(Promise.resolve(testTodoLists));
  });

  it('should create the component', async(() => {
    expect(comp).toBeTruthy();
  }));

  it('should get TodoLists', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(comp.todoLists.length).toBe(2, 'fetches TodoLists');
    });

  }));
});
