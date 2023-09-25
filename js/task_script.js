const ToDo = [];
const InProgress = [];
const Awaiting =[];
const Done = []

async function addTask(array) {
    title = document.getElementById('title');
    description = document.getElementById('description');
    assignee = document.getElementById('assign_select');
    dueDate = document.getElementById('due');
    category = document.getElementById('category_selector');

    array.push({
        'title': title.value,
        'description': description.value,
        'assignee': assignee.value,
        'dueDate': due.value,
        'category': category.value,
    });

    resetForm();
    await setItem('tasks', JSON.stringify(array));
}

function resetForm() {
document.getElementById('title').value = '';
document.getElementById('description').value = '';
document.getElementById('assign_select').value = '';
document.getElementById('due').value = '';
document.getElementById('category_selector').value = '';
}