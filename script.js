const inputField = document.getElementById('task-input');
const taskItemsContainer = document.getElementById('list-items-container');
const listRow = document.querySelector('.list-row');
//buttons for filters and clear all
let i = 0;
const removeAllCompletedButton = document.getElementsByClassName('clear-completed-btn')[0];
const showActiveButtons = document.querySelectorAll('.show-active-btn');
const showActiveButton = showActiveButtons[i];
//const showActiveButton = document.getElementsByClassName('show-active-btn')[0];
//const showCompletedButton = document.getElementsByClassName('show-completed-btn')[0];
const showCompletedButtons = document.querySelectorAll('.show-completed-btn');
const showCompletedButton = showCompletedButtons[i];
const showAllButtons = document.querySelectorAll('.show-all-btn');
const showAllButton = showAllButtons[i];


//add a task to the list
function addTask(task, close) {
    if (inputField.value === '' || inputField.value == null) {
        alert('You must write a task!')

        saveData()
    } else {
        let listRow = document.createElement("div");
        let task = inputField.value
        let listRowContent = `<div class="list-row" draggable="true"><span class="circle"></span><span class="task-name">${task}</span><span id="close"><img id="close-icon" src="./images/icon-cross.svg" alt="close"></span></div>`

        taskItemsContainer.append(listRow)
        listRow.innerHTML = listRowContent

        //const close = document.getElementById('close-icon')
        countTasks()
        saveData()

    }
    inputField.value = ''
}

//executes the function when we hit enter and adds tasks to the list
inputField.addEventListener('keypress', function (e) {
    if (e.code === "Enter") {
        addTask()
        countTasks() //not needed
    }
});

//removes the task if we click on the x
taskItemsContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG') { //removes the list items
        e.target.parentElement.parentElement.remove();
        saveData()
    } else if (e.target.tagName === 'SPAN' && e.target.classList.contains('circle')) {
        let taskName = document.querySelector('.task-name')
        taskName = e.target.nextElementSibling;
        e.target.classList.toggle("checked");
        taskName.classList.toggle('active');

        saveData()
    }
    countTasks()
});

// removes all completed tasks - CLEAR COMPLETED button
function removeAllCompleted() {
    let taskNames = document.querySelectorAll('.task-name')

    for (let i = 0; i < taskNames.length; i++) {
        let taskName = taskNames[i]

        if (taskName !== undefined && taskName.classList.contains('active')) {
            taskName.parentElement.parentElement.remove();

            countTasks()
            saveData()
        } // taskName !== undefined can be written simply: taskName
    }
}

removeAllCompletedButton.addEventListener('click', removeAllCompleted)

//START FILTERS

//active task (without active list) & completed
function showActive() {
    let taskNames = document.querySelectorAll('.task-name')

    for (let i = 0; i < taskNames.length; i++) {
        let taskName = taskNames[i]

        //here the active classlist means completed
        if (taskName !== undefined && taskName.classList.contains('active')) {
            console.log(taskName) //remove it when check
            taskName.parentElement.parentElement.style.display = 'none'
        } else if (taskName !== undefined && taskName.classList.contains('active') == false) {
            taskName.parentElement.parentElement.style.display = 'block'
        }

    }

    [showAllButton, showActiveButton, showCompletedButton].forEach(button => {
        button.classList.toggle('active', button === showActiveButton);
    });
}

showActiveButtons.forEach(button => {
    button.addEventListener('click', showActive)
});


//shows completed tasks
function showCompleted() {
    let taskNames = document.querySelectorAll('.task-name')

    for (let i = 0; i < taskNames.length; i++) {
        let taskName = taskNames[i]

        //here the active classlist means completed
        if (taskName !== undefined && taskName.classList.contains('active')) {
            console.log(taskName) //remove it when check
            taskName.parentElement.parentElement.style.display = 'block'
        } else if (taskName !== undefined && taskName.classList.contains('active') == false) {
            taskName.parentElement.parentElement.style.display = 'none'
        }
    }

    [showAllButton, showActiveButton, showCompletedButton].forEach(button => {
        button.classList.toggle('active', button === showCompletedButton);
    });
}

showCompletedButtons.forEach(button => {
    button.addEventListener('click', showCompleted)
});

//show all tasks
function showAll() {
    let taskNames = document.querySelectorAll('.task-name')

    for (let i = 0; i < taskNames.length; i++) {
        let taskName = taskNames[i]

        if (taskName !== undefined) {
            taskName.parentElement.parentElement.style.display = 'block'
        }
    }

    [showAllButton, showActiveButton, showCompletedButton].forEach(button => {
        button.classList.toggle('active', button === showAllButton);
    });
}

showAllButtons.forEach(button => {
    button.addEventListener('click', showAll)
});

//END FILTERS

//STORE THE DATA IN THE BROWSER
function saveData() {
    localStorage.setItem('data', taskItemsContainer.innerHTML);
}

function showTasks() {
    taskItemsContainer.innerHTML = localStorage.getItem('data')
}
showTasks()


// COUNT TASKS
const taskCounter = document.getElementsByClassName('task-counter')[0]

function countTasks() {
    let taskNames = document.querySelectorAll('.task-name');
    let taskChecked = 0; // needed to count the checked tasks

    for (let i = 0; i < taskNames.length; i++) {
        let taskName = taskNames[i];
        //counts the checked tasks (here active class means checked)
        if (taskName.classList.contains('active')) {
            taskChecked++;
        }
        //these are the remaining tasks
        let taskTotal = taskNames.length - taskChecked;

        taskCounter.innerHTML = taskTotal + ' items left';
    }

    //saveData() //might not needed here
}
countTasks()


// DARK-LIGHT MODE TOGGLE

const body = document.getElementById('body');
const modeIconContainer = document.getElementsByClassName('mode-icon-container')[0]
const modeIcon = document.getElementsByClassName('light-mode')[0];


function toggleLightDark() {
    body.classList.toggle('light-mode')

    if (document.body.classList.contains('light-mode')) {
        modeIcon.src = "./images/icon-moon.svg"
    } else {
        modeIcon.src = "./images/icon-sun.svg"
    }

    saveData()
}

modeIconContainer.addEventListener('click', toggleLightDark);



//// DRAG AND DROP FUNCTIONALITY

let items = document.querySelectorAll('.list-row')

function handleDragStart(e) {
    this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.style.opacity = '1';
}

items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
});

items.forEach(function (item) {
    item.classList.remove('over');
});

function handleDragOver(e) {
    e.preventDefault();
    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    this.classList.remove('over');
    e.stopPropagation(); //stops the browser from redirecting

    if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}

items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('dragend', saveData); //saves the list in the browser after we reordered it
    item.addEventListener('drop', handleDrop);
});








