const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const countSpan = document.getElementById('count');

document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    const taskItem = document.createElement('li');
    taskItem.className = 'list-group-item';
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <div>
            <input type="checkbox" class="complete-check">
            <button class="delete-btn">Delete</button>
        </div>
    `;
  
    taskList.appendChild(taskItem);
    taskInput.value = '';
    
    const completeCheck = taskItem.querySelector('.complete-check');
    const deleteBtn = taskItem.querySelector('.delete-btn');
    
    completeCheck.addEventListener('change', function() {
        taskItem.classList.toggle('completed', this.checked);
        updateCount();
        saveTasks();
    });
    
    deleteBtn.addEventListener('click', function() {
        taskItem.remove();
        updateCount();
        saveTasks();
    });
  
    updateCount();
    saveTasks();
}

function updateCount() {
    const totalTasks = document.querySelectorAll('.list-group-item').length;
    const completedTasks = document.querySelectorAll('.completed').length;
    countSpan.textContent = totalTasks - completedTasks;
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.list-group-item').forEach(item => {
        tasks.push({
            text: item.querySelector('span').textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('spaceTasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('spaceTasks')) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item';
        if (task.completed) taskItem.classList.add('completed');
        
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div>
                <input type="checkbox" class="complete-check" ${task.completed ? 'checked' : ''}>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        
        taskList.appendChild(taskItem);
        
        const completeCheck = taskItem.querySelector('.complete-check');
        const deleteBtn = taskItem.querySelector('.delete-btn');
        
        completeCheck.addEventListener('change', function() {
            taskItem.classList.toggle('completed', this.checked);
            updateCount();
            saveTasks();
        });
        
        deleteBtn.addEventListener('click', function() {
            taskItem.remove();
            updateCount();
            saveTasks();
        });
    });
    
    updateCount();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});