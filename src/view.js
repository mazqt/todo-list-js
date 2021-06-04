const view = (function() {

  const content = document.getElementById("content");
  const newTask = document.getElementById("newtask")

  const renderTasks = function(tasks) {
    const list = document.createElement("div");
    list.classList.toggle("taskList");
    tasks.forEach(task => {
      const taskElement = document.createElement("div");
      taskElement.classList.toggle(task.priority)
      const title = document.createElement("h2");
      title.innerText = task.title;
      const dueDate = document.createElement("p");
      dueDate.innerText = task.dueDate;
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
    content.appendChild(list);
  }

  const renderNewForm = function() {
    const form = document.createElement("form");
    const titleLabel = document.createElement("label");
    titleLabel.innerText = "Title: "
    form.appendChild(titleLabel);
    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    form.appendChild(titleInput);
    const projectLabel = document.createElement("label");
    projectLabel.innerText = "Project: ";
    form.appendChild(projectLabel);
    const projectSelect = document.createElement("select");
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
    dueDate.setAttribute("type", "date")
    //Set with date-fns at current day and some reasonable time forward, say 2 years
    form.appendChild(dueDate);

    const priorityLabel = document.createElement("label");
    priorityLabel.innerText = "Priority: ";
    form.appendChild(priorityLabel);
    const priority = document.createElement("select");
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
    description.setAttribute("type", "text");
    form.appendChild(description);

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
