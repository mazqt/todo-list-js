import Task from "./task.js";
import view from "./view.js";
import memory from "./memory.js"

const tasks = memory.retrieveTasks();
view.renderTasks(tasks);
view.renderNewForm();
