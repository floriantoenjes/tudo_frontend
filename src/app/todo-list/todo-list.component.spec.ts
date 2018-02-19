import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../shared/services/todo.service';
import { TodoList } from '../shared/models/todo-list.model';
import { Todo } from '../shared/models/todo.model';
import { TodoForm } from '../shared/models/todo-form.model';

let fixture: ComponentFixture<TodoListComponent>;
let comp: TodoListComponent;

let todoServiceStub: {
    getTodoList: Function;
    getTodos: Function
};

const todoList = {
    name: 'TodoList',
    id: 1
};

const todoForm1 = new TodoForm();
todoForm1.completed = true;

const todo1 = new Todo();
todo1.todoForm = todoForm1;


const todoForm2 = new TodoForm();
todoForm2.completed = false;

const todo2 = new Todo();
todo2.todoForm = todoForm2;

const todos = [todo1, todo2];

describe('TodoListComponent', () => {

    beforeEach(async(() => {
        todoServiceStub = {
            getTodoList: () => Promise.resolve(todoList),
            getTodos: () => Promise.resolve(todos)
        };

        TestBed.configureTestingModule({
            declarations: [
                TodoListComponent
            ],
            imports: [
                FormsModule,
                RouterTestingModule
            ],
            providers: [
                {provide: TodoService, useValue: todoServiceStub}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListComponent);
        comp = fixture.componentInstance;
    });

    it('should create the component', async(() => {
        expect(comp).toBeTruthy();
    }));

    it('should get TodoList', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(comp.todoList).toBe(todoList);
        });
    }));

    it('should get Todos', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(comp.todos).toBe(todos);
        });
    }));

});
