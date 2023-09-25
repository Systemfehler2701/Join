const ToDo = [];
const InProgress = [];
const Awaiting = [];
const Done = [];
let Prio = [];
let priorities = [
  {
    priority: "Urgent",
    symbol: '../img/Prio alta.png',
    color: 'FF3D00',
  },
  {
    priority: "Medium",
    symbol: '../img/Prio media.png',
    color: 'FFA800',
  },
  {
    priority: "Medium",
    symbol: '../img/Prio baja.png',
    color: '7AE229',
  }
];

const categories = [
    {
        name: 'CSS',
        color: '2862E9'
    },
    {
        name: 'HTML',
        color: 'E96228'
    },
    {
        name: 'Javascript',
        color: 'F5D032'
    },
]

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
    let date = new Date(dueDate.value)
    array.push({
      title: title.value,
      description: description.value,
      assignee: assignee.value,
      dueDate: date.getTime(),
      category: category.value,
      priority: Prio[0],
    });

    resetForm();
    // await setItem("tasks", JSON.stringify(array));
    console.log(array);
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
  Prio =[];
}

function setPrio(x) {
    Prio.push(priorities[x])
}

function CheckInputValidity(title, description, dueDate, category) {
  let validitiy = true;
  if (title == "") {
    document.getElementById("errorTitle").style.display = "block";
    validitiy = false;
  }
  if (description == '') {
    document.getElementById("errorDescription").style.display = "block";
    validitiy = false;
  }
  if (dueDate == '') {
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
    return(validitiy);
  }
}
