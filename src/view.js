import memory from "./memory";
import Task from "./task";

const view = (function() {

  const listOfTasks = document.getElementById("listOfTasks");
  const newTask = document.getElementById("newtask")

  const renderTasks = function(tasks) {
    listOfTasks.innerHTML = "";

    const list = document.createElement("div");
    list.classList.toggle("taskList");
    tasks.forEach(task => {
      const taskElement = document.createElement("div");
      taskElement.classList.toggle(task.priority)
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
        task.notes.forEach(note => {
          const li = document.createElement("li");
          li.innerText = note;
          notes.appendChild(li);
        })
        taskElement.appendChild(notes);
      }

      list.appendChild(taskElement);
    })
    listOfTasks.appendChild(list);
  }

  const renderNewForm = function() {
    const form = document.createElement("form");

    const titleLabel = document.createElement("label");
    titleLabel.innerText = "Title: "
    form.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("required", "");
    form.appendChild(titleInput);

    const projectLabel = document.createElement("label");
    projectLabel.innerText = "Project: ";
    form.appendChild(projectLabel);

    const projectSelect = document.createElement("select");
    projectSelect.setAttribute("name", "project");
    projectSelect.setAttribute("required", "");
    // Will be generated dynamically from the list of projects saved in memory

    const option1 = document.createElement("option");
    option1.innerText = "Default";
    option1.setAttribute("value", "default");
    projectSelect.appendChild(option1);
    form.appendChild(projectSelect);

    const dueDateLabel = document.createElement("label");
    dueDateLabel.innerText = "Done by: ";
    form.appendChild(dueDateLabel);

    const dueDate = document.createElement("input");
    dueDate.setAttribute("type", "date");
    dueDate.setAttribute("name", "date");
    dueDate.setAttribute("required", "");
    dueDate.setAttribute("min", new Date().toJSON().slice(0, 10));
    dueDate.setAttribute("max", new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toJSON().slice(0, 10));
    //Set with date-fns at current day and some reasonable time forward, say 2 years
    form.appendChild(dueDate);

    const priorityLabel = document.createElement("label");
    priorityLabel.innerText = "Priority: ";
    form.appendChild(priorityLabel);

    const priority = document.createElement("select");
    priority.setAttribute("name", "priority");
    priority.setAttribute("required", "");

    const high = document.createElement("option");
    high.setAttribute("value", "high");
    high.innerText = "High";
    priority.appendChild(high);

    const medium = document.createElement("option");
    medium.setAttribute("value", "medium");
    medium.innerText = "Medium";
    priority.appendChild(medium);

    const low = document.createElement("option");
    low.setAttribute("value", "low");
    low.innerText = "Low";
    priority.appendChild(low);
    form.appendChild(priority);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.innerText = "Description: ";
    form.appendChild(descriptionLabel);

    const description = document.createElement("input");
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
      let formdata = new FormData(this);
      let newTask = new Task(formdata.get("title"), formdata.get("project"), formdata.get("date"), formdata.get("priority"), formdata.get("description"));
      console.log(newTask);
      memory.saveTask(newTask);
      renderTasks(memory.retrieveTasks());
    })
    newTask.appendChild(form);
  }

  const renderProjectDropdown = function() {

  }

  return {
    renderTasks,
    renderNewForm
  }

})()

export default view
