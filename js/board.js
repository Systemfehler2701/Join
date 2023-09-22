function showProgress() {
    let progress = answeredQuestions / subtasks.length ;
    progress = Math.round(progress*100);
    document.getElementById('progressBar').value = `${progress}% `;  
}