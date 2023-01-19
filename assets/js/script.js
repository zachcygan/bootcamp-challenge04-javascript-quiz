var highScores = document.getElementById(`highScores`);
var score = document.getElementById(`score`);
var start = document.getElementById(`start`);
var time = document.getElementById(`time`);

time.textContent = `Time: `

start.addEventListener(`click`, function() {
    var timeRemaining = 60;
    
    var timeInterval = setInterval(function() {
        if (timeRemaining > 1) {
            time.textContent = `Time: ` + timeRemaining;
            timeRemaining--;
        } else {
            time.textContent = `Time: 0`;
            clearInterval(timeInterval);
        }
    }, 1000)

    return time;
});

