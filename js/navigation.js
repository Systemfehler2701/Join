function navigationMenuClicked(element) {
    let activeElement = document.querySelector('.menu-button.active');
    if (activeElement != undefined) {
        activeElement.classList.remove('active');
    }
    element.classList.add('active');
}


function openSubmenu() {
    document.getElementById('headersubmenu').classList.toggle("d-none");
}