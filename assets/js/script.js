var highScores = document.getElementById(`highScores`);
var scoreEl = document.getElementById(`score`);
var time = document.getElementById(`time`);
var startButton = document.getElementById(`startButton`);
var stopButton = document.getElementById(`stopButton`);
var reset = document.getElementById(`reset`);
var questionsArea = document.getElementById(`questions`);
var answerContainer = document.querySelector(`.answerContainer`);
var playing = false;
// if there is no local storage, give an empty array
var highScoresArr = JSON.parse(localStorage.getItem(`highScoresArr`)) || [];


var timeRemaining = 60;
time.textContent = `Time: ${timeRemaining}`;
var timeInterval;

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
reset.addEventListener(`click`, resetTimer);
answerContainer.addEventListener(`click`, nextQuestion);

// stores all the questions, choices, and answers
var questions = [
    {
        id: 0,
        question: `Inside which HTML element do we put the JavaScript?`,
        choice: {
            1: `<scripting>`,
            2: `<js>`,
            3: `<script>`,
            4: `<javascript>`,
        },
        answer: `<script>`
    },

    {
        id: 1,
        question: `What is 2+1?`,
        choice: {
            1: `2`,
            2: `15`,
            3: `3`,
            4: `0`,
        },
        answer: `3`
    },

    {
        id: 2,
        question: `What is 1+1?`,
        choice: {
            1: `2`,
            2: `5`,
            3: `9`,
            4: `0`,
        },
        answer: `2`
    },
]

// correctAnswers stores the correct answer from each question
var correctAnswers = [];
for (var i = 0; i < questions.length; i++) {
    correctAnswers.push(questions[i].answer)
}

var choice1 = document.getElementById(`choice1`);
var choice2 = document.getElementById(`choice2`);
var choice3 = document.getElementById(`choice3`);
var choice4 = document.getElementById(`choice4`);
var index = 0;
var score = 0;

function displayQuestions(index) {
    if (index < questions.length) {
        questionsArea.textContent = questions[index].question;
        choice1.textContent = questions[index].choice[1];
        choice2.textContent = questions[index].choice[2];
        choice3.textContent = questions[index].choice[3];
        choice4.textContent = questions[index].choice[4];
    } else {
        clearInterval(timeInterval);
        questionsArea.textContent = `Done! Your final score is ${score}/3`;
        choice1 = document.getElementById(`choice1`).classList.add(`hide`);
        choice2 = document.getElementById(`choice2`).classList.add(`hide`);
        choice3 = document.getElementById(`choice3`).classList.add(`hide`);
        choice4 = document.getElementById(`choice4`).classList.add(`hide`);
        document.getElementById(`scoresContainer`).classList.remove(`hide`);
        document.getElementById(`highScoreForm`).classList.remove(`hide`);
    }
}

var submitButton = document.getElementById(`submitButton`);
var ulEl = document.querySelector('.score-list');
submitButton.addEventListener(`click`, function(event) {
    event.preventDefault();
    var initials = document.getElementById(`initials`).value;
    var scoreOb = {
        initials, score
    }
    highScoresArr.push(scoreOb);
    localStorage.setItem(`highScoresArr`, JSON.stringify(highScoresArr));
    displayScores();
})

function displayScores() {
    var highScoresArr = JSON.parse(localStorage.getItem(`highScoresArr`));
    console.log(highScoresArr);
    
    for (var i = 0; i < highScoresArr.length; i++ ) {
        var scores = highScoresArr[i];
    
        var li = document.createElement('li');
        li.textContent = `Initials: ${Scores[i]} - Score: ${scoreOb.score}`;

        ulEl.appendChild(li);
        console.log(ulEl);
    }
}

// function displayScores() {
//     var highScoresArr = JSON.parse(localStorage.getItem(`highScoresArr`));
//     console.log(highScoresArr);
// }


// used https://code.mu/en/javascript/book/prime/timers/stop-button/ for stopping interval in different 
// function while making the var global
function startTimer() {
	timeInterval = setInterval(function() {
        // disables the start button so it cannot be pressed twice
        startButton.disabled = true; 
        timeRemaining--;
        time.textContent = `Time: ${timeRemaining}`;

        // clears the interval if the timer runs out automatically
        if (timeRemaining < 0) {
            playing = false;
            startButton.disabled = false; 
            time.textContent = `Time: 0`
            clearInterval(timeInterval)
        }
	}, 1000);
    playing = true;
    displayQuestions(index);
};

function stopTimer() {
	clearInterval(timeInterval);
};

function resetTimer() {
    playing = false;
    startButton.disabled = false; 
    questionsArea.textContent = `When you are ready, click the start button to begin.`;
    clearInterval(timeInterval);
    timeRemaining = 60;
    time.textContent = `Time: 60`;
    choice1.textContent = ``;
    choice2.textContent = ``;
    choice3.textContent = ``; 
    choice4.textContent = ``;
    scoreEl.textContent = `Score: `;
    index = 0;
    score = 0;
    document.getElementById(`highScoreForm`).classList.add(`hide`);
}

function nextQuestion(event) {
    if (playing) {
        var userChoice = event.target;

        if (userChoice.matches('.choices')) {
            if (userChoice.textContent == correctAnswers[index]) {
                score++;
                scoreEl.textContent = `Score: ${score}`
            }
            index++;
            displayQuestions(index);
        } 
    }

}

function displayScores() {

}



