let currentDraggedElement;


function startDragging(arrayName, i) {
    currentDraggedElement = { srcArray: arrayName, srcIndex: i };
}


function drop(targetArrayName) {
    let targetArray = taskLists[targetArrayName];
    currentDraggedElement
    targetArray.push()

}


function allowDrop(ev) {
    ev.preventDefault();
}