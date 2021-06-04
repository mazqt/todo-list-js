import Task from "./task.js";
import view from "./view.js";

const task1 = new Task("title1", "project1", "date1", "high", "desc1");
const task2 = new Task("title2", "project2", "date2", "medium", "desc2");
const tasks = [task1, task2];
view.renderTasks(tasks);
view.renderNewForm();
