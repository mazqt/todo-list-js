import Task from "./task.js"

const memory = (function() {

  let tasks;
  if (storageAvailable('localStorage')) {
   if (localStorage.getItem("myTasks") === null) {
      tasks = [new Task("My task", "Get started", new Date(), "high", "Time to start logging the things I need to do!")]
      localStorage.setItem("myTasks", JSON.stringify(tasks));
    };
    tasks = JSON.parse(localStorage.getItem("myTasks"));
    tasks = tasks.map(task => {
      return Object.assign(new Task, task);
    });
  } else {
    tasks = [new Task("My task", "Get started", new Date(), "high", "Time to start logging the things I need to do!")];
  }

  const retrieveTasks = function() {
    return tasks;
  }

  const saveTasks = function() {

  }

  //I'm going to let the memory module handle all the sorting and formating that the view module wants of the data before it sends it over.
  const _sortTasks = function() {
    //Will sort the tasks by priority and date in that order. Called both for a plain retrieval of all tasks and for one that only wants a specific project
  }

  const _selectTasks = function(project) {
    //Selects only those tasks with a matching project value
  }

  return {
    retrieveTasks
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
