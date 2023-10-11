let currentDraggedElement;

/**
 * This function saves the selected task in a variable
 * 
 * @param {string} arrayAsString - this is the name of the array to move from
 * @param {number} i - this is the index of the task in the array that is to be moved
 */
function startDragging(arrayAsString, i) {
    currentDraggedElement = { srcArray: arrayAsString, srcIndex: i };
}

/**
 * This function adds the taks to be moved to the target array and deletes it from the source array
 * 
 * @param {string} targetArrayName - this is the name of the array into which the task should be moved
 * @returns void
 */
async function drop(targetArrayName) {
    let targetArray = taskLists[targetArrayName];
    let srcArray = taskLists[currentDraggedElement.srcArray];
    let srcIndex = currentDraggedElement.srcIndex;
    if (srcArray == targetArray) {
        removeHighlight();
        return;
    } else {
        let taskToMove = srcArray.splice(srcIndex, 1);
        targetArray.push(taskToMove[0]);
        await setItem(targetArrayName, JSON.stringify(targetArray));
        await setItem(currentDraggedElement.srcArray, JSON.stringify(srcArray));
        board_loadTasks();
        removeHighlight();
    }
}

/**
 * This function allows to drop elements here
 * 
 * @param {event} ev - drop event
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * This function highlights the element over which a task is dragged
 * 
 * @param {HTMLElement} element - This element will get the class panelbody-highlight
 */
function highlight(element) {
    element.classList.add('panelbody-highlight');
}

/**
 * This function remove the class panelbody-highlight
 */
function removeHighlight() {
    let activeElement = document.querySelector('.panelbody.panelbody-highlight');
    if (activeElement != undefined) {
        activeElement.classList.remove('panelbody-highlight');
    }
}