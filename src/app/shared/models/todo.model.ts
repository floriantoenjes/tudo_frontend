import {TodoForm} from './todo-form.model';
import { TodoList } from './todo-list.model';
import { User } from './user.model';

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
  todoList: TodoList;
  assignedUsers: User[];
}
