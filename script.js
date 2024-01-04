document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.querySelector('.task-list');
    const taskListImage = document.querySelector('.task-list img');
    const taskListMessage = document.querySelector('.task-list div');
    const todoCount = document.querySelector('.to-do-list .count');
    const highPriorityCount = document.querySelector('.high-priority .count');
    const completedCount = document.querySelector('.Completed .count');
    const date = document.getElementById('date');
    const priority = document.getElementById('selection');
    const mediumPriorityCount = document.querySelector('.medium-priority .count');
    const lowPriorityCount = document.querySelector('.low-priority .count');
    const InfoSelected = document.getElementById('info-select');

    // Initialize the priority count values
    let highPriorityTasks = 0;
    let mediumPriorityTasks = 0;
    let lowPriorityTasks = 0;

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        console.log("submit");
        // Get the task name from the input field
        const taskName = document.getElementById('taskName').value;

        // Get the priority value
        const priorityValue = priority.value;

        // Create a new task element
        const newTask = createTaskElement(taskName, priorityValue);

        // Append the new task to the task list
        taskList.appendChild(newTask);

        // Show/hide the task list image and message based on the number of tasks
        updateTaskListVisibility();

        // Update task counts after adding a task
        updateTaskCounts();

        // Clear the input field after adding the task
        document.getElementById('taskName').value = '';
        taskForm.reset();
    });

    // Function to create a new task element
    // Function to create a new task element
    function createTaskElement(taskName, priorityValue) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('current-task');

    const checkboxContainer = document.createElement('span');
    checkboxContainer.classList.add('radio-container');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function () {
        // Handle checkbox change event
        if (checkbox.checked) {
            taskContainer.classList.add('completed-task');
            taskText.style.textDecoration = "line-through";
        } else {
            taskContainer.classList.remove('completed-task');
        }

        // Update completed task count
        updateCompletedTask();

        // Update priority task count after changing the priority
        updatePriorityCounts();
    });

    const taskText = document.createElement('span');
    taskText.classList.add('task-text');
    taskText.textContent = taskName;

    const dueDate = document.createElement('span');
    dueDate.textContent = date.value;
    dueDate.classList.add('dueDate');

    const priorityValueSpan = document.createElement('span');
    priorityValueSpan.textContent = priorityValue;
    priorityValueSpan.classList.add('priority');

    const editIcon = document.createElement('span');
    editIcon.classList.add('material-symbols-outlined');
    editIcon.textContent = 'edit';

    editIcon.addEventListener("click", () => {
    const taskText = taskContainer.querySelector('.task-text');

    if (editIcon.innerText === "edit") {
        taskText.contentEditable = "true";
        taskText.focus();
        editIcon.innerText = "save";
    } else {
        taskText.focus();
        // Update the task text content with the new value
        new_text = taskText.textContent;
        taskText.contentEditable = "false";
        editIcon.innerText = "edit";
    }
    });


    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('material-symbols-outlined');
    deleteIcon.textContent = 'delete';
    deleteIcon.addEventListener('click', function () {
        // Remove the task when the delete icon is clicked
        taskContainer.remove();

        // Show/hide the task list image and message based on the number of tasks
        updateTaskListVisibility();

        // Update task counts after deleting a task
        updateTaskCounts();

        // Update priority task count after deleting a task
        updatePriorityCounts();
    });

    const divTask2 = document.createElement("div");
    divTask2.classList.add("task-div1");
    divTask2.appendChild(checkboxContainer);
    divTask2.appendChild(taskText);
    divTask2.appendChild(deleteIcon);
    divTask2.appendChild(editIcon);

    const divTask1 = document.createElement("div");
    divTask1.classList.add("task-div2");
    divTask1.appendChild(dueDate);
    divTask1.appendChild(priorityValueSpan);

    // Append child elements to the task container
    checkboxContainer.appendChild(checkbox);
    taskContainer.appendChild(divTask1);
    taskContainer.appendChild(divTask2);

    // If the task is initially marked as high priority
    if (priorityValue === "High") {
        taskContainer.classList.add('high-priority-task');
        highPriorityTasks++;
    } else {
        // Add priority class to the taskContainer based on the selected priority
        if (priorityValue === "High") {
            taskContainer.classList.add('high-priority-task');
            highPriorityTasks++;
        } else if (priorityValue === "Medium") {
            taskContainer.classList.add('medium-priority-task');
            mediumPriorityTasks++;
        } else if (priorityValue === "Low") {
            taskContainer.classList.add('low-priority-task');
            lowPriorityTasks++;
        }
    }

    // Update priority counts after creating a new task
    updatePriorityCounts();

    return taskContainer;
}


    // Function to show/hide the task list image and message based on the number of tasks
    function updateTaskListVisibility() {
        const tasks = document.querySelectorAll('.current-task');

        if (tasks.length > 0) {
            taskListImage.style.display = 'none';
            taskListMessage.style.display = 'none';
        } else {
            taskListImage.style.display = 'block';
            taskListMessage.style.display = 'block';
        }
    }

    // Function to update task counts
    function updateTaskCounts() {
        const todoTasks = document.querySelectorAll('.current-task').length;

        // Updating the displayed todo task count
        todoCount.textContent = todoTasks;
        console.log(todoTasks);
    }

    // Function to update priority task counts
    function updatePriorityCounts() {
        highPriorityCount.textContent = highPriorityTasks;
        mediumPriorityCount.textContent = mediumPriorityTasks;
        lowPriorityCount.textContent = lowPriorityTasks;
        console.log(highPriorityCount, mediumPriorityCount, lowPriorityCount);
    }

    // Function to update completed task
    function updateCompletedTask() {
        const completedTask = document.querySelectorAll('.completed-task').length;

        completedCount.textContent = completedTask;
    }

   // if taskcontainer priority change
   InfoSelected.value = "All";
   InfoSelected.addEventListener("change", function (e) {
       const selectedPriority = e.target.value.toLowerCase(); // Convert to lowercase
   
       // Get all task containers
       const taskContainers = document.querySelectorAll('.current-task');
   
       // Loop through each task container and check its priority
       taskContainers.forEach(taskContainer => {
           const priorityElement = taskContainer.querySelector('.priority');
   
           if (priorityElement) {
               const taskPriority = priorityElement.textContent.toLowerCase(); // Convert to lowercase
   
               // Check if the task container should be visible based on the selected priority
               const isVisible = selectedPriority === "all" || selectedPriority === taskPriority;
   
               // Toggle the visibility of the task container
               taskContainer.style.display = isVisible ? "flex" : "none";
           }
       });
   });
   

   
  // Add this code inside your 'DOMContentLoaded' event listener
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function () {
    const searchQuery = searchInput.value.toLowerCase();

    // Get all task containers
    const taskContainers = document.querySelectorAll('.current-task');

    // Loop through each task container and check its task name
    taskContainers.forEach(taskContainer => {
        const taskText = taskContainer.querySelector('.task-text');

        if (taskText) {
            const taskName = taskText.textContent.toLowerCase();

            // Check if the task container should be visible based on the search query
            const isVisible = taskName.includes(searchQuery);

            // Toggle the visibility of the task container
            taskContainer.style.display = isVisible ? "flex" : "none";
        }
    });
});



   



});
