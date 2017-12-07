import {TodoForm} from './todo-form.model';

export class Todo {
  name: String;
  description: String;
  createdAt: Date;
  dueDate: Date;
  tags: String[];
  location: null;
  id: Number;
  todoForm: TodoForm;
}
