const ToDo = [];
const InProgress = [];
const Awaiting = [];
const Done = [];
let subtasks = [];
let Prio = [];
let priorities = [
  {
    priority: "Urgent",
    symbol: "../img/Prio alta.png",
    color: "rgb(255, 61, 0)",
  },
  {
    priority: "Medium",
    symbol: "../img/Prio media.png",
    color: "rgb(255, 168, 0)",
  },
  {
    priority: "Medium",
    symbol: "../img/Prio baja.png",
    color: "rgb(122,226,41)",
  },
];

const categories = [
  {
    name: "CSS",
    color: "rgb(40,98,233)",
  },
  {
    name: "HTML",
    color: "rgb(233,98,40)",
  },
  {
    name: "Javascript",
    color: "rgb(247,214,36)",
  },
];

async function addTask(array) {
  title = document.getElementById("title");
  description = document.getElementById("description");
  assignee = document.getElementById("assign_select");
  dueDate = document.getElementById("due");
  category = document.getElementById("category_selector");

  const validity = CheckInputValidity(
    title.value,
    description.value,
    assignee.value,
    dueDate.value,
    category.value
  );

  if (validity == true) {
    let date = new Date(dueDate.value);
    array.push({
      title: title.value,
      description: description.value,
      assignee: assignee.value,
      dueDate: date.getTime(),
      category: category.value,
      priority: Prio[0],
      subtasks: subtasks,
    });

    resetForm();
    // await setItem("tasks", JSON.stringify(array));
    console.log(array);
    Board_loadTasks();
  } else {
    setTimeout(() => {
      alert("Ебаный рот блять");
    }, 30);
  }
}

function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("assign_select").value = null;
  document.getElementById("due").value = "";
  document.getElementById("category_selector").value = null;
  Prio = [];
  subtasks = [];
}

function addSubtask() {
  subtask = document.getElementById("subtask").value;
  subtasks.push(subtask);
  subtask = "";
}

function setPrio(x) {
  Prio = [];
  Prio.push(priorities[x]);
  colorPriorityButtons(x)
}

function colorPriorityButtons(x) {
  //changes the backgroundcolor based on the selected Priority
  document.getElementById(`Prio0`).style.backgroundColor = 'white'
  document.getElementById(`Prio1`).style.backgroundColor = 'white'
  document.getElementById(`Prio2`).style.backgroundColor = 'white'
  document.getElementById(`Prio${x}`).style.backgroundColor =`${priorities[x]['color']}`

  //Adds classes that make the image and text white
  document.getElementById(`Prio0`).classList.remove('whiteFilterText')
  document.getElementById(`Prio1`).classList.remove('whiteFilterText')
  document.getElementById(`Prio2`).classList.remove('whiteFilterText')
  document.getElementById(`Prio${x}`).classList.add('whiteFilterText')

  document.getElementById(`Prio0_img`).classList.remove('whiteFilterImg')
  document.getElementById(`Prio1_img`).classList.remove('whiteFilterImg')
  document.getElementById(`Prio2_img`).classList.remove('whiteFilterImg')
  document.getElementById(`Prio${x}_img`).classList.add('whiteFilterImg')
}

function CheckInputValidity(title, description, dueDate, category) {
  let validitiy = true;
  if (title == "") {
    document.getElementById("errorTitle").style.display = "block";
    validitiy = false;
  }
  if (description == "") {
    document.getElementById("errorDescription").style.display = "block";
    validitiy = false;
  }
  if (dueDate == "") {
    document.getElementById("errorDate").style.display = "block";
    validitiy = false;
  }
  if (category == null) {
    document.getElementById("errorCategory").style.display = "block";
    validitiy = false;
  }
  if (Prio == null) {
    document.getElementById("errorPrio").style.display = "block";
    validitiy = false;
  } else {
    return validitiy;
  }
}
