function greet() {
    let date = new Date();
    let hour = date.getHours();
    let greeting = "";

    if (hour >= 17) {
        greeting = 'Good evening';
    } else if (hour >= 14) {
        greeting = `Good afternoon`;
    } else if (hour >= 11) {
        greeting = `Welcome`;
    } else if (hour >= 6) {
        greeting = `Good morning`;
    } else if (hour >= 0) {
        greeting = `Don't feed the Gremlins`;
    }
    if (currentUser.name == 'Guest') {
        greeting += '!';
    } else {
        greeting += ',';
    }
    return greeting;
}


function getUserGreeting() {
    if (currentUser.name == 'Guest') {
        return '';
    }
    return currentUser.name;

}


function getCountPriority() {
    let amountUrgent = 0;
    taskLists.feedback.concat(taskLists.toDo).concat(taskLists.inProgress).map((element) => {
        if (element.priority.priority == 'Urgent') {
            amountUrgent++
        }
    });
    return amountUrgent;
}


function getDeadlineDate() {
    let smallestDate = 0;
    taskLists.feedback.concat(taskLists.toDo).concat(taskLists.inProgress).find((element) => {
        if (element.dueDate < smallestDate || smallestDate == 0) {
            smallestDate = element.dueDate;
        }
    });
    if (smallestDate == 0) {
        return "";
    }
    const timeOptions = { month: "long", day: "numeric", year: "numeric" }
    return new Date(smallestDate).toLocaleString("en", timeOptions);
}