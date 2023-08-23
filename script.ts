//@ts-nocheck
document.addEventListener("DOMContentLoaded", function () {
    const contentContainer = document.getElementById("section-3") as HTMLElement;// taking input of html input and set it as into cc
    const addButton = document.getElementById("addButton") as HTMLElement;
    const nameInput = document.getElementById("nameInput") as HTMLInputElement;

    const existingTasks = new Set<string>(); // create new set for already present task

    addButton.addEventListener("click", function () {
        const name = nameInput.value.trim();

        if (name && !existingTasks.has(name)) { // prevent from duplicate
            const newItem = document.createElement("div");
            newItem.classList.add("item");

            const nameInputContainer = document.createElement("div");
            const newTaskNameInput = document.createElement("input");

            newItem.innerHTML = `
            <input type="checkbox" name="check-group" class="checkbox-item" >
            <span class="task-name">${name}</span>
            <select class="select">
              <option>To - do</option>
              <option>In-progress</option>
              <option>Completed</option>
            </select>
            <button class="deleteButton">Delete</button>
          `;

            const deleteButton = newItem.querySelector(".deleteButton") as HTMLElement;
            const checkbox = newItem.querySelector(".checkbox-item") as HTMLInputElement;
            const taskNameSpan = newItem.querySelector(".task-name") as HTMLElement;
            const selectElement = newItem.querySelector(".select") as HTMLSelectElement;

            deleteButton.addEventListener("click", function () { // delete btton to remove item
                contentContainer.removeChild(newItem); // delete newItem
                existingTasks.delete(name); // delete in existing tasks for tracking duplicate
            });

            selectElement.addEventListener("change", function () {// drop down as completed -> checkbox checked
                if (selectElement.value === "Completed") {
                    taskNameSpan.classList.add("completed");
                    checkbox.checked = true;
                    checkbox.classList.add("green-checkbox");
                    nameInputContainer.appendChild(newTaskNameInput);
                } else {
                    taskNameSpan.classList.remove("completed");
                    checkbox.checked = false;
                    checkbox.classList.remove("green-checkbox");
                    nameInputContainer.removeChild(newTaskNameInput);
                }
            });

            checkbox.addEventListener("change", function () {// check box unchecked -> drop down inprogress
                if (!checkbox.checked) {
                    selectElement.value = "In-progress";
                }
            });

            checkbox.addEventListener("change", function () {// chnage function checkbox checked -> unstrike
                if (checkbox.checked) {
                    selectElement.value = "Completed";
                    taskNameSpan.classList.add("completed");
                    nameInputContainer.appendChild(newTaskNameInput);
                } else {
                    taskNameSpan.classList.remove("completed");
                    nameInputContainer.removeChild(newTaskNameInput);
                }
            });

            contentContainer.appendChild(newItem); // Append the newly created task item to the content container
            existingTasks.add(name); // Add the task name to the existingTasks set to track it
            nameInput.value = ""; // Clear the input field after adding the task
        } else {
            alert("Task with the same name already exists!");
        }
    });
});

const searchInput = document.getElementById('searchInput') as HTMLInputElement;
const searchButton = document.getElementById('searchButton') as HTMLButtonElement;
const section3 = document.getElementById('section-3') as HTMLElement;

searchButton.addEventListener('click', function () {
    const query = searchInput.value.toLowerCase();
    const tasks = section3.getElementsByClassName('item');

    Array.from(tasks).forEach(task => {
        const taskName = task.querySelector('.task-name').textContent.toLowerCase();
        if (taskName.includes(query)) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
});