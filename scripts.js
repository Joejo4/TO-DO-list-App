document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("input-task");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");
  const emptyImage = document.querySelector(".Empty-imgage");

  let tasks = [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    try {
      const raw = localStorage.getItem("tasks");
      tasks = raw ? JSON.parse(raw) : [];
    } catch (err) {
      tasks = [];
    }
  }

  function updateEmptyImage() {
    if (!emptyImage) return;
    if (tasks.length === 0) {
      emptyImage.style.display = "block";
    } else {
      emptyImage.style.display = "none";
    }
  }

  const addTask = (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (!taskText) {
      return;
    }

    const task = {
      id: Date.now().toString(),
      text: taskText,
      completed: false,
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = "";
  };

  function createTaskElement(task) {
    const li = document.createElement("li");
    li.dataset.id = task.id;

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;
    if (task.completed) text.style.textDecoration = "line-through";
    text.style.flex = "1";

    const actions = document.createElement("div");
    actions.className = "task-actions";
    actions.style.display = "flex";
    actions.style.gap = "8px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!task.completed;
    checkbox.title = "Mark complete";
    checkbox.dataset.action = "toggle";

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.title = "Delete task";
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';
    delBtn.dataset.action = "delete";

    actions.appendChild(checkbox);
    actions.appendChild(delBtn);

    li.appendChild(text);
    li.appendChild(actions);
    return li;
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((t) => {
      const el = createTaskElement(t);
      taskList.appendChild(el);
    });
    updateEmptyImage();
  }

  function toggleTask(id) {
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return;
    tasks[idx].completed = !tasks[idx].completed;
    saveTasks();
    renderTasks();
  }

  function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    renderTasks();
  }

  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask(e);
    }
  });

  taskList.addEventListener("click", (e) => {
    const control = e.target.closest('button, input[type="checkbox"]');
    if (!control) return;
    const action = control.dataset.action;
    const li = control.closest("li");
    if (!li) return;
    const id = li.dataset.id;
    if (action === "toggle") toggleTask(id);
    if (action === "delete") deleteTask(id);
  });

  // initialize
  loadTasks();
  renderTasks();
});
