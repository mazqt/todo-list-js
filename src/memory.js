import Task from "./task.js"

const memory = (function() {

  //Could store it as an object with projects for keys instead
  let projects = {};
  let tasks = [];
  if (storageAvailable('localStorage')) {
   if (localStorage.getItem("myTasks") === null) {
     projects["Get started"] = [new Task("My task", "Get started", new Date().toJSON().slice(0, 10), "high", "Time to start logging the things I need to do!")];
      localStorage.setItem("myTasks", JSON.stringify(projects));
    };
    projects = JSON.parse(localStorage.getItem("myTasks"));
    console.log(projects)
    Object.values(projects).forEach(project => {
      project.map(task => {
        Object.assign(new Date, task.dueDate);
        task = Object.assign(new Task, task);
        tasks.push(task);
      });
    })
  } else {
    tasks = [new Task("My task", "Get started", new Date(), "high", "Time to start logging the things I need to do!")];
  }
  let currentTasks = tasks;

  const taskIndex = function(task) {
    let index = projects[task.project].indexOf(task);
    return index
  }

  const retrieveTasks = function() {
    return currentTasks;
  }

  const saveTask = function(task) {
    if (projects[task.project] === undefined) {
      projects[task.project] = [];
      projects[task.project].push(task);
    } else {
      projects[task.project].push(task);
    }
    tasks.push(task);
    saveTasks();
  }

  const deleteTask = function(index, project) {
    projects[project].splice(index, 1);
    saveTasks();
  }

  const saveTasks = function() {
    if (storageAvailable('localStorage')) {
      localStorage.setItem("myTasks", JSON.stringify(projects));
    }
  }

  //I'm going to let the memory module handle all the sorting and formating that the view module wants of the data before it sends it over.
  const _sortTasks = function() {
    //Will sort the tasks by priority and date in that order. Called both for a plain retrieval of all tasks and for one that only wants a specific project
  }

  const _selectTasks = function(project) {
    //Selects only those tasks with a matching project value
  }

  return {
    retrieveTasks,
    saveTask,
    taskIndex,
    deleteTask,
    saveTasks
  }

})()

export default memory;

function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0);
  }
}
