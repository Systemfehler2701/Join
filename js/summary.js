function greet() {
    let date = new Date();
    let hour = date.getHours();;
    if (hour >= 17) {
        document.getElementById('summary-greeting').innerHTML = `Good evening`;
    } else if (hour >= 14) {
        document.getElementById('summary-greeting').innerHTML = `Good afternoon`;
    } else if (hour >= 11) {
        document.getElementById('summary-greeting').innerHTML = `Welcome`;
    } else if (hour >= 6) {
        document.getElementById('summary-greeting').innerHTML = `Good morning`;
    } else if (hour >= 0) {
        document.getElementById('summary-greeting').innerHTML = `Don't feed the Gremlins`;
    }
}