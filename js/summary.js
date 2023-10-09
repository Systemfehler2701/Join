function greet() {
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 17) {
        return 'Good evening';
    } else if (hour >= 14) {
        return `Good afternoon`;
    } else if (hour >= 11) {
        return `Welcome`;
    } else if (hour >= 6) {
        return `Good morning`;
    } else if (hour >= 0) {
        return `Don't feed the Gremlins`;
    }
}