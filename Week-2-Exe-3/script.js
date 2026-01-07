function addTask() {
    const input = document.getElementById('taskInput');
    const taskName = input.value;

    if (taskName.trim() === "") {
        alert("Please enter a task name!");
        return;
    }

    const taskId = "task-" + Date.now();
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.id = taskId;
    taskCard.draggable = true;
   
    taskCard.ondragstart = drag;

    const date = new Date().toLocaleDateString();
    taskCard.innerHTML = `
        <strong>${taskName}</strong>
        <span class="date-text">Created: ${date}</span>
        <div class="msg-container"></div>
    `;

    document.querySelector('#todo .task-list').appendChild(taskCard);
   
   
    input.value = "";
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const taskCard = document.getElementById(data);
   
    let target = ev.target;
    while (target && !target.classList.contains('column')) {
        target = target.parentElement;
    }

    if (target) {
        const taskList = target.querySelector('.task-list');
        taskList.appendChild(taskCard);

        const msgContainer = taskCard.querySelector('.msg-container');
        if (target.id === 'completed') {
            taskCard.classList.add('done');
            msgContainer.innerHTML = '<span class="status-msg">Task Completed Successfully</span>';
        } else {
            taskCard.classList.remove('done');
            msgContainer.innerHTML = '';
        }
    }
}
