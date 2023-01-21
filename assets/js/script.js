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
        // answerContainer.style.display = `none`;
        // choice1.textContent = ``;
        // choice2.textContent = ``;
        // choice3.textContent = ``; 
        // choice4.textContent = ``;
        document.getElementById(`highScoreForm`).classList.remove(`hide`);
    }
}

var submitButton = document.getElementById(`submitButton`);
submitButton.addEventListener(`click`, function(event) {
    event.preventDefault();
    var initials = document.getElementById(`initials`).value;
    var scoreOb = {
        initials, score
    }
    highScoresArr.push(scoreOb)
    localStorage.setItem(`highScoresArr`, JSON.stringify(highScoresArr));
})

// function displayScores() {
//     var highScoresArr = JSON.parse(localStorage.getItem(`highScoresArr`));
//     console.log(highScoresArr);
// }




// if event.target.value() === questions[index].answer

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
    playing = true;
    displayQuestions(index);
};

function stopTimer() {
	clearInterval(timeInterval);
};

function resetTimer() {
    playing = false;
    questionsArea.textContent = `When you are ready, click the start button to begin.`;
    clearInterval(timeInterval);
    timeRemaining = 60;
    time.textContent = `Time: 60`;
    choice1.textContent = ``;
    choice2.textContent = ``;
    choice3.textContent = ``; 
    choice4.textContent = ``;
    scoreEl.textContent = `Score:`;
    index = 0;
    score = 0;
}

function nextQuestion(event) {
    if (playing) {
        var userChoice = event.target;
        console.log(userChoice.textContent)
        console.log(correctAnswers[index])

        if (userChoice.matches('.choices')) {
            if (userChoice.textContent == correctAnswers[index]) {
                score++;
                scoreEl.textContent = `Score: ${score}`
                console.log(`true`)
            }highScoresArr
            index++;
            displayQuestions(index);
        } 
    }

}



