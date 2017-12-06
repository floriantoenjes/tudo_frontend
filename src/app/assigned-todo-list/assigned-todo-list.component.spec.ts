import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTodoListComponent } from './assigned-todo-list.component';

describe('AssignedTodoListComponent', () => {
  let component: AssignedTodoListComponent;
  let fixture: ComponentFixture<AssignedTodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedTodoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
