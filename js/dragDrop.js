let currentDraggedElement;
let cloneMoveTouch;


function startDragging(srcArray, srcIndex) {
    currentDraggedElement = { srcArray, srcIndex };
}

function drop(targetArrayName) {
    removeHighlight();
    tryMoveTaskToArray(targetArrayName);
}

function startTouching(srcArray, srcIndex, event) {
    currentDraggedElement = { srcArray, srcIndex };
    cloneMoveTouch = event.currentTarget.cloneNode(true);
    cloneMoveTouch.classList.add('taskcard-clone');
    cloneMoveTouch.style.width = `${event.currentTarget.clientWidth}px`;
    document.body.appendChild(cloneMoveTouch);
}

function moveTouching(event) {
    cloneMoveTouch.xy = {x:event.touches[0].clientX,y:event.touches[0].clientY};
    cloneMoveTouch.style.top = `${cloneMoveTouch.xy.y}px`;
    cloneMoveTouch.style.left = `${cloneMoveTouch.xy.x}px`;
    let activePanel = getTouchMoveInPanel();
    removeHighlight();
    if(activePanel != '') {
        highlight(activePanel);
    }
}

async function endTouching() {
    try {
        let targetArray = getTouchMoveInArrayName();
        if (targetArray != '') {
            tryMoveTaskToArray(targetArray);
        }
    }
    catch(error) {
        console.error(error);
    }
    finally {
        cancelTouch();
    }
}

function cancelTouch() {
    currentDraggedElement = {};
    removeHighlight();
    document.querySelectorAll('.taskcard-clone').forEach(e => e.remove());
    cloneMoveTouch.remove();
}

function getTouchMoveInArrayName() {
    let targetPanel = getTouchMoveInPanel();
    if (targetPanel == '') {
        return '';
    }
    return targetPanel.id.replace('awaitFeedback', 'feedback')
}

function getTouchMoveInPanel() {
    let panelList = document.querySelectorAll('.panelbody');
    for (let i = 0; i < panelList.length; i++) {
        const panel = panelList[i];
        let pXY = panel.getClientRects()[0];
        if(pXY.left < cloneMoveTouch.xy.x && cloneMoveTouch.xy.x < pXY.right && 
           pXY.top < cloneMoveTouch.xy.y && cloneMoveTouch.xy.y < pXY.bottom) {
            return panel;
        }
    }
    return '';
}

async function tryMoveTaskToArray(targetArrayName) {
    let sourceArrayName = currentDraggedElement.srcArray;
    let targetArray = taskLists[targetArrayName];
    let sourceArray = taskLists[sourceArrayName];
    let sourceIndex = currentDraggedElement.srcIndex;
    if (sourceArray != targetArray) {
        let taskToMove = sourceArray.splice(sourceIndex, 1);
        targetArray.push(taskToMove[0]);
        await setItem(targetArrayName, JSON.stringify(targetArray));
        await setItem(sourceArrayName, JSON.stringify(sourceArray));
        board_loadTasks();
        removeHighlight();
    }
}


function allowDrop(ev) {
    ev.preventDefault();
}


function highlight(element) {
    element.classList.add('panelbody-highlight');
}


function removeHighlight() {
    let activeElement = document.querySelector('.panelbody.panelbody-highlight');
    if (activeElement != undefined) {
        activeElement.classList.remove('panelbody-highlight');
    }
}