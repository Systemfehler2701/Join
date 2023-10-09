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