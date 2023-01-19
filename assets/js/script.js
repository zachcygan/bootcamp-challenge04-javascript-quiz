var highScores = document.getElementById(`highScores`);
var score = document.getElementById(`score`);
var time = document.getElementById(`time`);
var start = document.getElementById(`start`);
var stop = document.getElementById(`stop`);
var reset = document.getElementById(`reset`);
var questions = document.getElementById(`questions`);
var choice1 = document.getElementById(`choice1`);


time.textContent = `Time: 0`;
questions.textContent = `When you are ready, click the start button to begin.`

start.addEventListener(`click`, function() {
    var timeRemaining = 60;
    
    var timeInterval = setInterval(function() {
        if (timeRemaining > 0) {
            time.textContent = `Time: ` + timeRemaining;
            timeRemaining--;
        } else {
            time.textContent = `Time: 0`;
            clearInterval(timeInterval);
        }
    }, 1000)

    return time;
});