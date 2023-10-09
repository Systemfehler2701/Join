let currentDraggedElement;


function startDragging(arrayAsString, i) {
    currentDraggedElement = { srcArray: arrayAsString, srcIndex: i };
}


async function drop(targetArrayName, element) {
    let targetArray = taskLists[targetArrayName];
    let srcArray = taskLists[currentDraggedElement.srcArray];
    let srcIndex = currentDraggedElement.srcIndex;
    let taskToMove = srcArray.splice(srcIndex, 1);
    targetArray.push(taskToMove[0]);
    await setItem(targetArrayName, JSON.stringify(targetArray));
    await setItem(currentDraggedElement.srcArray, JSON.stringify(srcArray));
    board_loadTasks();
    removeHighlight(element);
}


function allowDrop(ev) {
    ev.preventDefault();
}


function highlight(element) {
    element.classList.add('panelbody-highlight');
}


function removeHighlight(element) {
    let activeElement = document.querySelector('.panelbody.panelbody-highlight');
    if (activeElement != undefined) {
        activeElement.classList.remove('panelbody-highlight');
    }
}