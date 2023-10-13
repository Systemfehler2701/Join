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
    if (element != undefined)
        element.classList.add('active');
}

/**
 * This function toggle the submenu
 */
function toggleSubmenu() {
    document.getElementById('headersubmenu').classList.toggle("d-none");
}