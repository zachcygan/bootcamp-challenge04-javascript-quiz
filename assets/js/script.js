var highScores = document.getElementById(`highScores`);
var score = document.getElementById(`score`);
var time = document.getElementById(`time`);
var start = document.getElementById(`start`);
var stop = document.getElementById(`stop`);
var reset = document.getElementById(`reset`);
var questions = document.getElementById(`questions`);
var choice1 = document.getElementById(`choice1`);


time.textContent = `Time: `;
questions.textContent = `When you are ready, click the start button to begin.`

var timeRemaining = 60;
time.textContent = `Time: ${timeRemaining}`;
var timeInterval;

start.addEventListener('click', startTimer);
stop.addEventListener('click', stopTimer);
reset.addEventListener(`click`, resetTimer);


function startTimer() {
	timeInterval = setInterval(function() {
		time.textContent = `Time: ${timeRemaining}`;
        timeRemaining--;
    
    if (timeRemaining < 0) {
        time.textContent = `Time: 0`
        clearInterval(timerInterval)
    }
	}, 1000);
};

function stopTimer() {
	clearInterval(timeInterval);
};

function resetTimer() {
    clearInterval(timeInterval);
    timeRemaining = 60;
    time.textContent = `Time: 60`
}