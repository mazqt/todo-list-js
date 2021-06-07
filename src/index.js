import Task from "./task.js";
import view from "./view.js";
import memory from "./memory.js"

const task1 = new Task("title1", "project1", "date1", "high", "desc1");
const task2 = new Task("title2", "project2", "date2", "medium", "desc2");
const tasks = memory.retrieveTasks();
console.log(tasks)
console.log(memory.tasks);
console.log(memory.currentTasks)
console.log(tasks[0].dueDate.slice(0, 10))
view.renderTasks(tasks);
view.renderNewForm();
