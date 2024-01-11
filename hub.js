function addTask() {
  const taskText = document.getElementById("taskText").value;
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  // Handle the task creation with optional attachment
  const newTask = {
    text: taskText,
    attachment: file ? URL.createObjectURL(file) : null,
  };

  // Call a function to display the task or save it to your database
  displayTask(newTask);

  // Reset form fields
  document.getElementById("taskText").value = "";
  fileInput.value = "";
}

function displayTask(task) {
  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.textContent = task.text;

  if (task.attachment) {
    const img = document.createElement("img");
    img.src = task.attachment;
    img.alt = "Attachment";
    img.style.maxWidth = "100%";
    li.appendChild(img);
  }

  taskList.appendChild(li);
}
//
//
//
//
//
//
document.addEventListener("DOMContentLoaded", function () {
  const appElement = document.getElementById("hub");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    const taskList = document.createElement("ul");
    taskList.className = "task-list";

    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.className = `task-item ${task.completed ? "completed" : ""}`;

      const taskText = document.createElement("span");
      taskText.textContent = task.text;

      const toggleButton = document.createElement("button");
      toggleButton.textContent = task.completed ? "Undo" : "Complete";
      toggleButton.addEventListener("click", () => toggleTask(index));

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteTask(index));

      taskItem.appendChild(taskText);
      taskItem.appendChild(toggleButton);
      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
    });

    appElement.innerHTML = "";
    appElement.appendChild(taskList);
    appElement.appendChild(renderTaskForm());
  }

  function renderTaskForm() {
    const taskForm = document.createElement("div");
    taskForm.className = "task-form";

    const input = document.createElement("input");
    input.placeholder = "Enter task...";

    const addButton = document.createElement("button");
    addButton.textContent = "Add Task";
    addButton.addEventListener("click", () => addTask(input.value));

    taskForm.appendChild(input);
    taskForm.appendChild(addButton);

    return taskForm;
  }

  function addTask(text) {
    if (text.trim() !== "") {
      tasks.push({ text, completed: false });
      saveTasks();
      renderTasks();
    }
  }

  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  renderTasks();
});

//
//
//
//
