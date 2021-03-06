import Task from "./task.js";
let db;

const memory = (function () {
  let projects = {};
  let tasks = [];

  async function loadDB() {
    tasks = [];
    let data = await firebase
      .firestore()
      .collection("JSON")
      .get()
      .then((querySnapshot) => {
        let documents = querySnapshot.docs.map((doc) => doc.data());
        return JSON.parse(documents[0].data);
      });
    projects = data;
    Object.values(projects).forEach((project) => {
      projects[project[0].project] = project.map((task) => {
        Object.assign(new Date(), task.dueDate);
        task = Object.assign(new Task(), task);
        tasks.push(task);
        return task;
      });
    });
    console.log(tasks);
  }

  const taskIndex = function (task) {
    const index = projects[task.project].indexOf(task);
    return index;
  };

  const retrieveProjectList = function () {
    return Object.keys(projects);
  };

  const retrieveProjectTasks = function (project) {
    const projectTasks = projects[project];
    _sortTasks(projectTasks);
    return projectTasks;
  };

  const retrieveTasks = function () {
    _sortTasks(tasks);
    return tasks;
  };

  const saveTask = function (task) {
    if (projects[task.project] === undefined) {
      projects[task.project] = [];
      projects[task.project].push(task);
    } else {
      projects[task.project].push(task);
    }
    tasks.push(task);
    saveTasks();
  };

  const deleteTask = function (index, project) {
    projects[project].splice(index, 1);
    if (projects[project].length == 0) {
      delete projects[project];
    }
    saveTasks();
  };

  const editTask = function (task, formdata, index) {
    projects[task.project][index].title = formdata.get("title");
    projects[task.project][index].project = formdata.get("project");
    projects[task.project][index].dueDate = formdata.get("date");
    projects[task.project][index].priority = formdata.get("priority");
    projects[task.project][index].description = formdata.get("description");
  };

  const saveTasks = function () {
    const newData = { data: JSON.stringify(projects) };
    firebase.firestore().collection("JSON").doc("tasks").set(newData);
  };

  const _sortTasks = function (selectedTasks) {
    selectedTasks.sort(function (task1, task2) {
      const dCount = new Date(task1.dueDate) - new Date(task2.dueDate);
      if (dCount) return dCount;

      return task1.priority - task2.priority;
    });
  };

  return {
    retrieveTasks,
    saveTask,
    taskIndex,
    deleteTask,
    saveTasks,
    editTask,
    retrieveProjectList,
    retrieveProjectTasks,
    loadDB,
  };
})();

export default memory;

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
