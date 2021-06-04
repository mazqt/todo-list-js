class Task {
  constructor(title, dueDate, priority, description) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description
  }

  addNote(note) {
    if (this.note == null ) {
      this.note = [note];
    } else {
      this.note.push(note);
    }
  }

}

export default Task
