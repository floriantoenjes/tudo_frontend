import {TodoForm} from './todo-form.model';

export class Todo {
  name: string;
  description: string;
  createdAt: Date;
  dueDate: Date;
  tags: string[];
  location: null;
  id: number;
  todoForm: TodoForm;
  priority: number;
}
