class Task {
  constructor(title, project, dueDate, priority, description) {
    this.title = title;    this.project = project;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description
  }

  addNote(note) {
    if (this.notes == null ) {
      this.notes = [note];
    } else {
      this.notes.push(note);
    }
  }

}

export default Task
