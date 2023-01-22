function displayScores() {
    var highScoresArr = JSON.parse(localStorage.getItem(`highScoresArr`));
    console.log(highScoresArr);
    
    for (var i = 0; i < highScoresArr.length; i++ ) {
        var scores = highScoresArr[i];
    
        var li = document.createElement('li');
        li.textContent = `Initials: ${highScores[i]} - Score: ${scoreOb.score}`;

        ulEl.appendChild(li);
    }
}

displayScores();