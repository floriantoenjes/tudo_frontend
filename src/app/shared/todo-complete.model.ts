export class TodoComplete {
  name: String;
  description: String;
  createdAt: Date;
  dueDate: Date;
  tags: String[];
  // ToDo: Add location model
  location: null;
  id: Number
  progress: Number;
  completed: Boolean;
  completedAt: Date;
  lastUpdated: Date;
}
