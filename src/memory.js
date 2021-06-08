import Task from "./task.js"

const memory = (function() {

  let projects = {};
  let tasks = [];
  if (storageAvailable('localStorage')) {
   if (localStorage.getItem("myTasks") === null) {
     projects["Get started"] = [new Task("My task", "Get started", new Date().toJSON().slice(0, 10), "1", "Time to start logging the things I need to do!")];
      localStorage.setItem("myTasks", JSON.stringify(projects));
    };
    projects = JSON.parse(localStorage.getItem("myTasks"));
    Object.values(projects).forEach(project => {
      projects[(project[0].project)] = project.map(task => {
        Object.assign(new Date, task.dueDate);
        task = Object.assign(new Task, task);
        tasks.push(task);
        return task
      });
    })
  } else {
    tasks = [new Task("My task", "Get started", new Date(), "high", "Time to start logging the things I need to do!")];
  }

  const taskIndex = function(task) {
    let index = projects[task.project].indexOf(task);
    return index
  }

  const retrieveProjectList = function() {
    return Object.keys(projects);
  }

  const retrieveProjectTasks = function(project) {
    let projectTasks = projects[project];
    _sortTasks(projectTasks);
    return projectTasks;
  }

  const retrieveTasks = function() {
    _sortTasks(tasks);
    return tasks;
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
    if (projects[project].length == 0) {
      delete projects[project];
    }
    saveTasks();
  }

  const editTask = function(task, formdata, index) {
    projects[task.project][index].title = formdata.get("title");
    projects[task.project][index].project = formdata.get("project");
    projects[task.project][index].dueDate = formdata.get("date");
    projects[task.project][index].priority = formdata.get("priority");
    projects[task.project][index].description = formdata.get("description");
  }

  const saveTasks = function() {
    if (storageAvailable('localStorage')) {
      localStorage.setItem("myTasks", JSON.stringify(projects));
    }
  }

  //I'm going to let the memory module handle all the sorting and formating that the view module wants of the data before it sends it over.
  const _sortTasks = function(selectedTasks) {
    selectedTasks.sort(function(task1, task2) {
      var dCount = new Date(task1.dueDate) - new Date(task2.dueDate);
      if (dCount) return dCount;

     var dPrio = task1.priority - task2.priority;
    })
  }

  const _selectTasks = function(project) {
    //Sets tasks to the tasks of a certain project
  }

  return {
    retrieveTasks,
    saveTask,
    taskIndex,
    deleteTask,
    saveTasks,
    editTask,
    retrieveProjectList,
    retrieveProjectTasks
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
