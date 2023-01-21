function displayScores() {
    var highScoresArr = JSON.parse(localStorage.getItem(`highScoresArr`));
    console.log(highScoresArr);
}

displayScores();