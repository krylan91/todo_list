document.getElementById('add-task-button').addEventListener("click", (e) => {
    e.preventDefault();
    const task_text = document.getElementById('input-task'),
        ul = document.getElementById('task-list'),
        li = createListItem();
    if (task_text.value !== "") {
        li.querySelector('span').innerHTML = task_text.value
        ul.appendChild(li);
        task_text.value = '';
    }
    save();
})

function createListItem() {
    let li = document.createElement('li');
    let input = document.createElement('input'),
        span = document.createElement('span'),
        button = document.createElement('button');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('onchange', 'throughLine(this)');
    span.setAttribute('class', 'task');
    button.setAttribute('onclick', 'deleteTask(this)');
    button.setAttribute('type', 'submit');
    button.setAttribute('class', 'delete-btn');
    button.innerHTML = 'x';
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    return li;
}

function deleteTask(li_task) {
    li_task.parentElement.remove();
    save();
}

function throughLine(checkbox) {
    if(checkbox.checked == true) {
        checkbox.nextElementSibling.classList.add('through-lined');
    } else {
        checkbox.nextElementSibling.classList.remove('through-lined');
    }
    save();
}

function save() {
    let task_list = document.querySelectorAll('li');
    let task_list_string = [];
    task_list.forEach(task => {
        task_list_string.push(task.innerHTML);
    });
    localStorage.setItem('tasks', JSON.stringify(task_list_string));
}

function load() {
    let tasklist = JSON.parse(localStorage.getItem('tasks')) || [];
    let ul = document.getElementById('task-list');
    tasklist.forEach(task => {
        let li = document.createElement('li');
        li.innerHTML = task;
        if (li.querySelector('span').classList.contains("through-lined")) {
            li.querySelector('input').checked = true;
        }
        ul.appendChild(li);
    });
}

window.onload = () => { load(); };