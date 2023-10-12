/**
 * This function is used to change the color of a clicked menu button
 * 
 * @param {HTMLElement} element - This element will get the class active
 */
function navigationMenuClicked(element) {
    let activeElement = document.querySelector('.menu-button.active');
    if (activeElement != undefined) {
        activeElement.classList.remove('active');
    }
    if(element != undefined)
        element.classList.add('active');
}

/**
 * This function open/close the submenu
 */
function openSubmenu() {
    document.getElementById('headersubmenu').classList.toggle("d-none");
}