document.addEventListener("DOMContentLoaded", () => {
  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  function updateTaskCounters() {
    let totalTasks = taskList.length;
    let completedTasks = taskList.filter(task => task.completed).length;
    let pendingTasks = totalTasks - completedTasks;
    document.getElementById("total-task-count").innerText = totalTasks;
    document.getElementById("completed-task-count").innerText = completedTasks;
    document.getElementById("pending-task-count").innerText = pendingTasks;
  }
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }
  function startCountdown(task, index) {
    let countdownElement = document.getElementById(`countdown-${index}`);
    if (!countdownElement) return;
    function updateCountdown() {
      let now = new Date().getTime();
      let deadline = new Date(task.estimatedTime).getTime(); 
      let timeLeft = deadline - now;
      if (timeLeft <= 0) {
        countdownElement.innerHTML = "<span style='color: red;'>⏳ Overdue</span>";
        return;
      }
      let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      let seconds = Math.floor((timeLeft / 1000) % 60);
      countdownElement.innerHTML = `⏳ ${hours}h ${minutes}m ${seconds}s`;
      setTimeout(updateCountdown, 1000);
    }
    updateCountdown();
  }
function renderTasks(filterStatus = "all", filterPriority = "all") {
  let taskContainer = document.getElementById("tasksContainer");
  taskContainer.innerHTML = "";
  let filteredTasks = taskList.filter(task => {
    let statusMatch = filterStatus === "all" ||
      (filterStatus === "completed" && task.completed) ||
      (filterStatus === "pending" && !task.completed);
    let priorityMatch = filterPriority === "all" || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });
  filteredTasks.forEach((task, index) => {
    let taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p><b>Estimated Time:</b> ${new Date(task.estimatedTime).toLocaleString()}</p>
        <p><b>Priority:</b> ${task.priority}</p>
        <p><b>Status:</b> <span id="status-${index}">${task.completed ? "✅ Completed" : "⏳ Pending"}</span></p>
        <p><b>Time Left:</b> <span id="countdown-${index}">Calculating...</span></p>
        <p><b>Points:</b> <span id="points-${index}">${task.points}</span></p> <!-- Added Points Display -->
        <button class="start-task" data-index="${index}" ${task.started ? 'disabled' : ''}>Start Now</button>
        <button class="end-task" data-index="${index}" style="display:${task.started && !task.completed ? 'inline' : 'none'};">End Now</button>
        <button class="mark-completed" data-index="${index}" ${task.completed ? "disabled" : ""}>Mark as Completed</button>
        <button class="edit-task" data-index="${index}">Edit</button>
        <button class="delete-task" data-index="${index}">Delete</button>
    `;
    taskContainer.appendChild(taskElement);
    if (task.started && !task.completed) {
      startCountdown(task, index);
    }
    document.querySelectorAll(".start-task").forEach(button => {
      button.addEventListener("click", function () {
        let index = button.getAttribute("data-index");
        startTimer(index); 
      });
    });
    document.querySelectorAll(".end-task").forEach(button => {
      button.addEventListener("click", function () {
        let index = button.getAttribute("data-index");
        endTimer(index); 
      });
    });
  });
  document.querySelectorAll(".mark-completed").forEach(button => {
    button.addEventListener("click", function () {
      let index = button.getAttribute("data-index");
      markCompleted(index);
    });
  });
  document.querySelectorAll(".edit-task").forEach(button => {
    button.addEventListener("click", function () {
      let index = button.getAttribute("data-index");
      editTask(index);
    });
  });
  document.querySelectorAll(".delete-task").forEach(button => {
    button.addEventListener("click", function () {
      let index = button.getAttribute("data-index");
      deleteTask(index);
    });
  });
  updateTaskCounters();
}
  function startTimer(index) {
    let task = taskList[index];
    let countdownElement = document.getElementById(`countdown-${index}`);
    if (isNaN(task.estimatedTime)) {
      countdownElement.innerHTML = "<span style='color: red;'>Invalid Estimated Time</span>";
      return;
    }
    let startTime = new Date().getTime();  
    task.started = true;  
    task.startTime = startTime; 
    document.querySelector(`[data-index="${index}"].start-task`).disabled = true;
    document.querySelector(`[data-index="${index}"].end-task`).style.display = 'inline';
    task.countdownInterval = setInterval(function () {
      let now = new Date().getTime();
      let timeLeft = task.estimatedTime - now;  
      if (timeLeft <= 0) {
        clearInterval(task.countdownInterval); 
        countdownElement.innerHTML = "Time's Up!";
        if (!task.completed) {
          addPenaltyPoints(index);
        }
      } else {
        let hours = Math.floor(timeLeft / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        countdownElement.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
      }
    }, 1000);
  }
  function endTimer(index) {
    let task = taskList[index];
    let countdownElement = document.getElementById(`countdown-${index}`);
    let endTime = new Date().getTime(); 
    
    task.completed = true;  
    task.endTime = endTime; 
    if (task.countdownInterval) {
      clearInterval(task.countdownInterval);
      task.countdownInterval = null;  
    }
    countdownElement.innerHTML = "Completed";
    calculatePoints(index, task);
    document.querySelector(`[data-index="${index}"].start-task`).disabled = false;
    document.querySelector(`[data-index="${index}"].end-task`).style.display = 'none';
    
    saveTasks(); 
    renderTasks(); 
  }
  document.getElementById("taskForm").addEventListener("submit", (event) => {
    event.preventDefault();
    let title = document.getElementById("task-title").value.trim();
    let description = document.getElementById("task-description").value.trim();
    let estimatedTime = new Date(document.getElementById("task-estimate-time").value).getTime();  
    let priority = document.getElementById("Priority").value;
    if (!title || !description || !estimatedTime || !priority) {
      alert("Please fill out all fields before submitting.");
      return;
    }
    let confirmation = confirm("Are you sure you want to add this task?");
    if (!confirmation) return;
    taskList.push({
      title,
      description,
      estimatedTime,
      priority,
      completed: false,
      points: 0
    });
    saveTasks();
    renderTasks();
    event.target.reset();
  });
function markCompleted(index) {
  let task = taskList[index];
  let currentTime = new Date().getTime();
  task.completed = true;
  task.endTime = currentTime; 
  if (task.endTime <= task.estimatedTime) {
    task.points += 10;  
  } else {
    task.points -= 5;  
  }
  saveTasks();
  renderTasks();
}
function editTask(index) {
  let task = taskList[index];
  let oldEstimatedTime = task.estimatedTime; 
  task.completed = false; 
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-description").value = task.description;
  document.getElementById("task-estimate-time").value = new Date(task.estimatedTime).toLocaleString();
  document.getElementById("Priority").value = task.priority;
  document.querySelector("button[type='submit']").style.display = "none";
  document.getElementById("saveTaskBtn").style.display = "inline";
  document.getElementById("saveTaskBtn").onclick = function () {
    let title = document.getElementById("task-title").value.trim();
    let description = document.getElementById("task-description").value.trim();
    let estimatedTime = new Date(document.getElementById("task-estimate-time").value).getTime();  
    let priority = document.getElementById("Priority").value;
    if (!title || !description || !estimatedTime || !priority) {
      alert("Please fill out all fields before submitting.");
      return;
    }
    let timeDifference = estimatedTime - oldEstimatedTime; 

    if (timeDifference > 0) {
      task.points -= 5;
    } else if (timeDifference < 0) {
      task.points += 5;
    }
    taskList[index] = {
      title,
      description,
      estimatedTime,
      priority,
      completed: false,  
      points: task.points 
    };
    saveTasks();
    renderTasks();
    document.getElementById("saveTaskBtn").style.display = "none";
    document.querySelector("button[type='submit']").style.display = "inline";
    document.getElementById("taskForm").reset();
  };
}
function deleteTask(index) {
  let task = taskList[index];
  task.points -= 10; 
  taskList.splice(index, 1);
  saveTasks();
  renderTasks();
}
function filterTasks() {
  let filterStatus = document.getElementById("filterStatus").value;
  let filterPriority = document.getElementById("filterPriority").value;
  renderTasks(filterStatus, filterPriority);
}
  renderTasks();
  document.getElementById("filterStatus").addEventListener("change", filterTasks);
    document.getElementById("filterPriority").addEventListener("change", filterTasks);
});
