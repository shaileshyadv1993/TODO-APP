document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const updateBtn = document.getElementById("update-btn");
  const noTaskMsg = document.getElementById("no-task-message");
  const taskDisplay = document.getElementById("task-display");

  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  createElement();
  noTaskDisplay();

  // Remove "No task message"
  function noTaskDisplay() {
    if (taskList.length > 0) {
      noTaskMsg.innerHTML = "My Tasks";
    } else {
      noTaskMsg.innerHTML = "No Task to do.";
    }
  }

  addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (addBtn.innerText != "Update") {
      if (taskInput.value != "") {
        const newTask = {
          id: Date.now(),
          task: taskInput.value,
        };
        taskList.push(newTask);

        // Clearing Input field
        taskInput.value = "";

        // Save in local storage
        saveToLocalStorage();
        createElement();
        console.log(taskList);
      } else {
        alert("Please Enter Task.");
      }
    } else {
      updateTask(indexValue);
    }
  });

  // Create task "li"
  function createElement() {
    taskDisplay.innerHTML = "";
    taskList.forEach((element) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${element.task}</span> <div class = "flex flex-row items-center justify-between gap-4 py-2">
      <input id="checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500   focus:ring-1  ">
      <i class="fa-regular fa-pen-to-square" id="edit"></i> 
      <i class=" fa-solid fa-trash-can text-red-500 hover:text-red-600 mr-2" data-id = ${element.id} id="delete"></i></div>`;
      taskDisplay.append(li);
      li.setAttribute(
        "class",
        "flex flex-row justify-between font-bold text-1xl px-2 py-0 bg-slate-300 rounded-sm mx-3 items-center"
      );
      noTaskDisplay();
      // Check the action for buttons
      li.addEventListener("click", (e) => {
        let functionType = e.target.getAttribute("id");

        switch (functionType) {
          case "checkbox":
            let checkboxState = e.target.checked;
            buttontask(li, checkboxState);
            break;
          case "edit":
            editTask(li);
            break;
          case "delete":
            deleteTask(e);
            break;

          default:
            break;
        }
      });
    });
  }

  // Local storage function
  function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }

  // Strike through function
  function buttontask(li, checkboxState) {
    const textValue = li.getElementsByTagName("span");
    if (checkboxState == true) {
      textValue[0].setAttribute("class", "line-through decoration-red-500");
    } else {
      textValue[0].removeAttribute("class", "line-through decoration-red-500");
    }
  }

  // Delete Task
  function deleteTask(e) {
    let taskID = e.target.getAttribute("data-id");
    taskList = taskList.filter((task) => task.id != taskID);
    createElement();
    saveToLocalStorage();
    noTaskDisplay();
  }

  // Edit task
  function editTask(li) {
    let taskID = li.getElementsByTagName("i")[1].getAttribute("data-id");
    let searchTask = taskList.find((task) => task.id == taskID);
    indexValue = taskList.indexOf(searchTask);
    taskInput.value = searchTask.task;
    addBtn.innerText = "Update";

    // console.log(searchTask.task);
    // console.log(searchTask);
    // console.log(taskList.indexOf(searchTask));
  }

  // Update task
  function updateTask(indexValue) {
    taskList[indexValue].task = taskInput.value;
    addBtn.innerText = "Add";
    console.log(taskList);
    createElement();
    saveToLocalStorage();
    taskInput.value = "";
  }
});
