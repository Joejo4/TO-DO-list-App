document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("input-task");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  const addTask = (event) => {
    event.preventDefult();
    const taskText = textInput.value.trim();
    if (!teskTaxt) {
      return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;
    taskList.appendChild(li);
    taskInput.value = "";
  };
  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener('keypress', () => {
    if(else.key ==='Enter') {
        addTask(e);
    }
  })
});
