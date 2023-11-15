var currentDate = new Date();

// domyslna wartos w polu daty
var datetimeInput = document.getElementById('deadlineInput');
datetimeInput.value = formatDate(currentDate);

// formatowania daty na tekst yyyy-mm-ddThh:mm
function formatDate(date) {
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  var hours = ('0' + date.getHours()).slice(-2);
  var minutes = ('0' + date.getMinutes()).slice(-2);

  return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
}

var formattedDate = dateTimeFormatter.format(currentDate);

document.getElementById("deadlineInput").value = formattedDate;

// Zaznaczenie
function toggleTaskCompletion(taskItem) {
    taskItem.classList.toggle("checked");
    saveTasksToLocal();
}

// Dodawanie nowego zadania
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var deadlineInput = document.getElementById("deadlineInput");

    if (validateTask(taskInput.value, deadlineInput.value)) {
        var newTask = document.createElement("div");
        var taskText = `${taskInput.value} (Termin: ${deadlineInput.value})`;
        newTask.innerHTML = `<li onclick="toggleTaskCompletion(this)">${taskText}</li>`;

        document.getElementById("taskList").appendChild(newTask);
        saveTasksToLocal();

        taskInput.value = "";
        deadlineInput.value = "";
    } else {
        alert("Nieprawidłowe zadanie lub termin!");
    }
}

// Edytowanie zadania
function editSelectedTask() {
    const selectedTask = document.querySelector("#taskList li.checked");

    if (selectedTask) {
        const taskText = selectedTask.firstChild.nodeValue;
        const newText = prompt("Edit task:", taskText);

        if (newText && newText.trim() !== "") {
            selectedTask.firstChild.nodeValue = newText;
            saveTasksToLocal();
        }
    } else {
        alert("Select a task to edit.");
    }
}

// Walidacja
function validateTask(task, deadline) {
    return task.length >= 3 && deadline && new Date(deadline) > new Date();
}

// Wyszukiwanie
function searchTasks() {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var tasks = document.getElementById("taskList").getElementsByTagName("li");

    for (var i = 0; i < tasks.length; i++) {
        var taskText = tasks[i].innerText.toLowerCase();
        if (taskText.includes(searchInput)) {
            tasks[i].style.display = "block";
            highlightSearchTerm(tasks[i], searchInput);
        } else {
            tasks[i].style.display = "none";
        }
    }
}

// Usuwanie
function deleteSelectedTask() {
    var selectedTasks = document.querySelectorAll("#taskList li.checked");
    selectedTasks.forEach(function (task) {
        task.parentNode.removeChild(task);
    });
    saveTasksToLocal();
}

// Podświetlenie zaznaczenia
function highlightSearchTerm(task, term) {
    var taskText = task.innerText;
    var startIndex = taskText.toLowerCase().indexOf(term);
    var endIndex = startIndex + term.length;

    if (startIndex !== -1) {
        var highlightedText =
            taskText.substring(0, startIndex) +
            "<span class='highlight'>" +
            taskText.substring(startIndex, endIndex) +
            "</span>" +
            taskText.substring(endIndex);

        task.innerHTML = highlightedText;
    }
}

// Zapisywanie do local storage
function saveTasksToLocal() {
    var taskList = document.getElementById("taskList").innerHTML;
    localStorage.setItem("tasks", taskList);
}

// Wczytywanie z local storage
window.onload = function () {
    var savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        document.getElementById("taskList").innerHTML = savedTasks;

        var tasks = document.getElementById("taskList").getElementsByTagName("li");
        for (var i = 0; i < tasks.length; i++) {
            tasks[i].onclick = function () {
                toggleTaskCompletion(this);
            };
        }
    }
};