import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTodoComponent } from './assigned-todo.component';

describe('AssignedTodoComponent', () => {
  let component: AssignedTodoComponent;
  let fixture: ComponentFixture<AssignedTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
