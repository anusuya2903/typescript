//@ts-nocheck
document.addEventListener("DOMContentLoaded", function () {
    var contentContainer = document.getElementById("section-3");
    var addButton = document.getElementById("addButton");
    var nameInput = document.getElementById("nameInput");
    var existingTasks = new Set();
    addButton.addEventListener("click", function () {
        var name = nameInput.value.trim();
        if (name && !existingTasks.has(name)) {
            var newItem_1 = document.createElement("div");
            newItem_1.classList.add("item");
            var nameInputContainer_1 = document.createElement("div");
            var newTaskNameInput_1 = document.createElement("input");
            newItem_1.innerHTML = "\n            <input type=\"checkbox\" name=\"check-group\" class=\"checkbox-item\" >\n            <span class=\"task-name\">".concat(name, "</span>\n            <select class=\"select\">\n              <option>To - do</option>\n              <option>In-progress</option>\n              <option>Completed</option>\n            </select>\n            <button class=\"deleteButton\">Delete</button>\n          ");
            var deleteButton = newItem_1.querySelector(".deleteButton");
            var checkbox_1 = newItem_1.querySelector(".checkbox-item");
            var taskNameSpan_1 = newItem_1.querySelector(".task-name");
            var selectElement_1 = newItem_1.querySelector(".select");
            deleteButton.addEventListener("click", function () {
                contentContainer.removeChild(newItem_1);
                existingTasks.delete(name);
            });
            selectElement_1.addEventListener("change", function () {
                if (selectElement_1.value === "Completed") {
                    taskNameSpan_1.classList.add("completed");
                    checkbox_1.checked = true;
                    checkbox_1.classList.add("green-checkbox");
                    nameInputContainer_1.appendChild(newTaskNameInput_1);
                }
                else {
                    taskNameSpan_1.classList.remove("completed");
                    checkbox_1.checked = false;
                    checkbox_1.classList.remove("green-checkbox");
                    nameInputContainer_1.removeChild(newTaskNameInput_1);
                }
            });
            checkbox_1.addEventListener("change", function () {
                if (!checkbox_1.checked) {
                    selectElement_1.value = "In-progress";
                }
            });
            checkbox_1.addEventListener("change", function () {
                if (checkbox_1.checked) {
                    selectElement_1.value = "Completed";
                    taskNameSpan_1.classList.add("completed");
                    nameInputContainer_1.appendChild(newTaskNameInput_1);
                }
                else {
                    taskNameSpan_1.classList.remove("completed");
                    nameInputContainer_1.removeChild(newTaskNameInput_1);
                }
            });
            contentContainer.appendChild(newItem_1);
            existingTasks.add(name);
            nameInput.value = "";
        }
        else {
            alert("Task with the same name already exists!");
        }
    });
});
// Search function
var searchInput = document.getElementById('searchInput');
var searchButton = document.getElementById('searchButton');
var section3 = document.getElementById('section-3');
searchButton.addEventListener('click', function () {
    var query = searchInput.value.toLowerCase();
    var tasks = section3.getElementsByClassName('item');
    Array.from(tasks).forEach(function (task) {
        var taskName = task.querySelector('.task-name').textContent.toLowerCase();
        if (taskName.includes(query)) {
            task.style.display = 'flex';
        }
        else {
            task.style.display = 'none';
        }
    });
});
