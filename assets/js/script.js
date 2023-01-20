var highScores = document.getElementById(`highScores`);4
var score = document.getElementById(`score`);
var time = document.getElementById(`time`);
var start = document.getElementById(`start`);
var stop = document.getElementById(`stop`);
var reset = document.getElementById(`reset`);
var questionsArea = document.getElementById(`questions`);

questionsArea.textContent = `When you are ready, click the start button to begin.`

var timeRemaining = 60;
time.textContent = `Time: ${timeRemaining}`;
var timeInterval;

start.addEventListener('click', startTimer);
stop.addEventListener('click', stopTimer);
reset.addEventListener(`click`, resetTimer);

var questions = [
    {
        prompt: `Inside which HTML element do we put the JavaScript?`,
        choices: {
            1: `<scripting>`,
            2: `<js>`,
            3: `<script>`,
            4: `<javascript>`,
        },
        answer: `<script>`
    },

    {
        prompt: `What is 2+1?`,
        choices: {
            1: `4`,
            2: `15`,
            3: `3`,
            4: `0`,
        },
        answer: `3`
    }
]

var choice1 = document.getElementById(`choice1`);
var choice2 = document.getElementById(`choice2`);
var choice3 = document.getElementById(`choice3`);
var choice4 = document.getElementById(`choice4`);

var questionNumber = 0;
choice1.addEventListener(`click`, displayQuestions(questionNumber))

console.log(displayQuestions(0))

function displayQuestions(index) {
    console.log(index)
    questionsArea.textContent = questions[index][prompt];
    choice1.textContent = questions[index].choices[1];
    choice2.textContent = questions[index].choices[2];
    choice3.textContent = questions[index].choices[3];
    choice4.textContent = questions[index].choices[4];
}


// used https://code.mu/en/javascript/book/prime/timers/stop-button/ for stopping interval in different 
// function while making the var global
function startTimer() {
	timeInterval = setInterval(function() {
        timeRemaining--;
		time.textContent = `Time: ${timeRemaining}`;
    
    if (timeRemaining < 0) {
        time.textContent = `Time: 0`
        clearInterval(timeInterval)
    }
    // start.disabled = true;
	}, 1000);

    displayQuestions(questionNumber);
};

function stopTimer() {
	clearInterval(timeInterval);
};

function resetTimer() {
    questionsArea.textContent = `When you are ready, click the start button to begin.`;
    clearInterval(timeInterval);
    timeRemaining = 60;
    time.textContent = `Time: 60`
    // need to include reseting the game as well, not just the timer
    choice1.textContent = ``;
    choice2.textContent = ``;
    choice3.textContent = ``; 
    choice4.textContent = ``; 
}