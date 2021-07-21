import memory from "./memory";
import Task from "./task";

const view = (function () {
  const listOfTasks = document.getElementById("listOfTasks");
  const form = document.getElementById("newtask");
  const dropdown = document.getElementById("dropdown");

  const _renderTasks = function (tasks) {
    listOfTasks.innerHTML = "";
    console.log(listOfTasks.innerHTML);

    const list = document.createElement("div");
    list.classList.toggle("taskList");
    tasks.forEach((task) => {
      const taskElement = document.createElement("div");
      const index = memory.taskIndex(task);
      taskElement.setAttribute("index", index);
      taskElement.classList.toggle(task.priority);
      const title = document.createElement("h2");
      title.innerText = task.title;
      const dueDate = document.createElement("p");
      dueDate.innerText = task.dueDate.slice(0, 10);
      const description = document.createElement("p");
      description.innerText = task.description;

      taskElement.appendChild(title);
      taskElement.appendChild(dueDate);
      taskElement.appendChild(description);

      if (task.notes != null) {
        const notes = document.createElement("ul");
        task.notes.forEach((note) => {
          const li = document.createElement("li");
          li.innerText = note;
          notes.appendChild(li);
        });
        taskElement.appendChild(notes);
      }

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete task";
      deleteButton.addEventListener("click", function () {
        if (confirm("Are you sure you wanna delete this task?")) {
          console.log(index);
          memory.deleteTask(index, task.project);
          memory.loadDB().then(() => {
            _renderTasks(memory.retrieveTasks());
          });
        }
      });

      taskElement.appendChild(deleteButton);

      const editForm = _createEditForm(task, index);

      const editButton = document.createElement("button");
      editButton.innerText = "Edit task";
      editButton.addEventListener("click", function () {
        editForm.classList.toggle("hidden");
      });

      taskElement.appendChild(editButton);
      taskElement.appendChild(editForm);

      list.appendChild(taskElement);
    });
    listOfTasks.appendChild(list);
  };

  const _renderNewForm = function () {
    const titleLabel = document.createElement("label");
    titleLabel.innerText = "Title: ";
    form.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("required", "");
    form.appendChild(titleInput);

    const projectLabel = document.createElement("label");
    projectLabel.innerText = "Project: ";
    form.appendChild(projectLabel);

    const projectSelect = document.createElement("input");
    projectSelect.setAttribute("type", "text");
    projectSelect.setAttribute("name", "project");
    projectSelect.setAttribute("required", "");
    projectSelect.setAttribute("list", "projects");

    const projectList = document.createElement("datalist");
    projectList.setAttribute("id", "projects");

    memory.retrieveProjectList().forEach((project) => {
      const listOption = document.createElement("option");
      listOption.setAttribute("value", project);
      projectList.appendChild(listOption);
    });

    projectSelect.appendChild(projectList);
    form.appendChild(projectSelect);

    const dueDateLabel = document.createElement("label");
    dueDateLabel.innerText = "Done by: ";
    form.appendChild(dueDateLabel);

    const dueDate = document.createElement("input");
    dueDate.setAttribute("value", new Date().toJSON().slice(0, 10));
    dueDate.setAttribute("type", "date");
    dueDate.setAttribute("name", "date");
    dueDate.setAttribute("required", "");
    dueDate.setAttribute("min", new Date().toJSON().slice(0, 10));
    dueDate.setAttribute(
      "max",
      new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toJSON()
        .slice(0, 10)
    );
    // Set with date-fns at current day and some reasonable time forward, say 2 years
    form.appendChild(dueDate);

    const priorityLabel = document.createElement("label");
    priorityLabel.innerText = "Priority: ";
    form.appendChild(priorityLabel);

    const priority = document.createElement("select");
    priority.setAttribute("name", "priority");
    priority.setAttribute("required", "");

    const high = document.createElement("option");
    high.setAttribute("value", "1");
    high.innerText = "High";
    priority.appendChild(high);

    const medium = document.createElement("option");
    medium.setAttribute("value", "2");
    medium.innerText = "Medium";
    priority.appendChild(medium);

    const low = document.createElement("option");
    low.setAttribute("value", "3");
    low.innerText = "Low";
    priority.appendChild(low);
    form.appendChild(priority);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.innerText = "Description: ";
    form.appendChild(descriptionLabel);

    const description = document.createElement("textarea");
    description.classList.toggle("desc");
    description.setAttribute("name", "description");
    description.setAttribute("type", "text");
    description.setAttribute("required", "");
    form.appendChild(description);

    const submit = document.createElement("button");
    submit.innerText = "Create new task";
    submit.setAttribute("type", "submit");
    form.appendChild(submit);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const formdata = new FormData(this);
      const newTask = new Task(
        formdata.get("title"),
        formdata.get("project"),
        formdata.get("date"),
        formdata.get("priority"),
        formdata.get("description")
      );
      memory.saveTask(newTask);
      _renderTasks(memory.retrieveTasks());
    });
  };

  const _renderProjectDropdown = function () {
    const dropdownLabel = document.createElement("label");
    dropdownLabel.innerText = "Select what project to view";
    dropdown.appendChild(dropdownLabel);
    const dropdownList = document.createElement("select");
    dropdownList.setAttribute("name", "project");
    dropdownList.setAttribute("id", "project-select");
    const allTasks = document.createElement("option");
    allTasks.setAttribute("value", "all");
    allTasks.innerText = "All projects";
    dropdownList.appendChild(allTasks);
    memory.retrieveProjectList().forEach((project) => {
      const projectOption = document.createElement("option");
      projectOption.setAttribute("value", project);
      projectOption.innerText = project;
      dropdownList.appendChild(projectOption);
    });

    dropdownList.addEventListener("change", function (event) {
      if (event.target.value != "all") {
        const dropdownTasks = memory.retrieveProjectTasks(event.target.value);
        _renderTasks(dropdownTasks);
      } else {
        _renderTasks(memory.retrieveTasks());
      }
    });

    dropdown.appendChild(dropdownList);
  };

  const _createEditForm = function (task, index) {
    const form = document.createElement("form");
    form.classList.toggle("hidden");
    form.classList.toggle("form");

    const titleLabel = document.createElement("label");
    titleLabel.innerText = "Title: ";
    form.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.setAttribute("value", task.title);
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("required", "");
    form.appendChild(titleInput);

    const projectLabel = document.createElement("label");
    projectLabel.innerText = "Project: ";
    form.appendChild(projectLabel);

    const projectSelect = document.createElement("input");
    projectSelect.setAttribute("type", "text");
    projectSelect.setAttribute("name", "project");
    projectSelect.setAttribute("value", task.project);
    projectSelect.setAttribute("required", "");
    projectSelect.setAttribute("list", "projects");

    const projectList = document.createElement("datalist");
    projectList.setAttribute("id", "projects");

    memory.retrieveProjectList().forEach((project) => {
      const listOption = document.createElement("option");
      listOption.setAttribute("value", project);
      projectList.appendChild(listOption);
    });

    const option1 = document.createElement("option");
    option1.setAttribute("value", "Default");
    projectList.appendChild(option1);

    projectSelect.appendChild(projectList);
    form.appendChild(projectSelect);

    const dueDateLabel = document.createElement("label");
    dueDateLabel.innerText = "Done by: ";
    form.appendChild(dueDateLabel);

    const dueDate = document.createElement("input");
    dueDate.setAttribute("value", task.dueDate);
    dueDate.setAttribute("type", "date");
    dueDate.setAttribute("name", "date");
    dueDate.setAttribute("required", "");
    dueDate.setAttribute("min", new Date().toJSON().slice(0, 10));
    dueDate.setAttribute(
      "max",
      new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toJSON()
        .slice(0, 10)
    );
    // Set with date-fns at current day and some reasonable time forward, say 2 years
    form.appendChild(dueDate);

    const priorityLabel = document.createElement("label");
    priorityLabel.innerText = "Priority: ";
    form.appendChild(priorityLabel);

    const priority = document.createElement("select");
    priority.setAttribute("name", "priority");
    priority.setAttribute("required", "");

    const high = document.createElement("option");
    high.setAttribute("value", "1");
    high.innerText = "High";
    priority.appendChild(high);

    const medium = document.createElement("option");
    medium.setAttribute("value", "2");
    medium.innerText = "Medium";
    priority.appendChild(medium);

    const low = document.createElement("option");
    low.setAttribute("value", "3");
    low.innerText = "Low";
    priority.appendChild(low);
    form.appendChild(priority);

    if (task.priority == "1") {
      high.setAttribute("selected", "");
    } else if (task.priority == "2") {
      medium.setAttribute("selected", "");
    } else {
      low.setAttribute("selected", "");
    }

    const descriptionLabel = document.createElement("label");
    descriptionLabel.innerText = "Description: ";
    form.appendChild(descriptionLabel);

    const description = document.createElement("textarea");
    description.classList.toggle("desc");
    description.innerText = task.description;
    description.setAttribute("name", "description");
    description.setAttribute("type", "text");
    description.setAttribute("required", "");
    form.appendChild(description);

    const submit = document.createElement("button");
    submit.innerText = "Edit task";
    submit.setAttribute("type", "submit");
    form.appendChild(submit);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const formdata = new FormData(this);

      if (confirm("Are you sure you want to edit this task?")) {
        memory.editTask(task, formdata, index);
        memory.saveTasks();
        _renderTasks(memory.retrieveTasks());
      }
    });
    return form;
  };

  const render = function (tasks) {
    _renderTasks(tasks);
    _renderNewForm();
    _renderProjectDropdown();
  };

  return {
    render,
  };
})();

export default view;
