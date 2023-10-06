let currentDraggedElement;


function startDragging(arrayName, i) {
    currentDraggedElement = { srcArray: arrayName, srcIndex: i };
}


async function drop(targetArrayName) {
    let targetArray = taskLists[targetArrayName];
    let srcArray = taskLists[currentDraggedElement.srcArray];
    let srcIndex = currentDraggedElement.srcIndex;
    let taskToMove = srcArray.splice(srcIndex, 1);
    targetArray.push(taskToMove[0]);
    await setItem(targetArrayName, JSON.stringify(targetArray));
    await setItem(currentDraggedElement.srcArray, JSON.stringify(srcArray));
    board_loadTasks();
}


function allowDrop(ev) {
    ev.preventDefault();
}