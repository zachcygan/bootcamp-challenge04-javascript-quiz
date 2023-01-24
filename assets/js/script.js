var highScores = document.getElementById(`highScores`);
var scoreEl = document.getElementById(`score`);
var time = document.getElementById(`time`);
var startButton = document.getElementById(`startButton`);
var stopButton = document.getElementById(`stopButton`);
var reset = document.getElementById(`reset`);
var questionsArea = document.getElementById(`questions`);
var answerContainer = document.querySelector(`.answerContainer`);
var playing = false;
var viewingScores = false;
var choice1 = document.getElementById(`choice1`);
var choice2 = document.getElementById(`choice2`);
var choice3 = document.getElementById(`choice3`);
var choice4 = document.getElementById(`choice4`);
var index = 0;
var score = 0;
var clearScoresButton = document.getElementById('clearScoreButton');
var submitButton = document.getElementById(`submitButton`);
var olEl = document.querySelector('.score-list');
// if there is no local storage, give an empty array
var highScoresArr = JSON.parse(localStorage.getItem(`highScoresArr`)) || [];
var timeInterval;
var timeRemaining = 60;
time.textContent = `Time: ${timeRemaining}`;


startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
reset.addEventListener(`click`, resetTimer);
answerContainer.addEventListener(`click`, nextQuestion);
highScores.addEventListener('click', function() {
    if (!viewingScores) {
        displayQuestions();
        displayScores();
        document.getElementById(`highScoreForm`).classList.add(`hide`);
        viewingScores = true;
        questionsArea.textContent = 'These are the current high scores!'
    }
});

// stores all the questions, choices, and answers
var questions = [
    {
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
        question: `What is the correct JavaScript syntax to change the content of the HTML element below?`,
        choice: {
            1: `document.getElement("p").innerHTML = "Hello World!";`,
            2: `document.getElementById("demo").innerHTML = "Hello World!";`,
            3: `document.getElementByName("p").innerHTML = "Hello World!";`,
            4: `#demo.innerHTML = "Hello World!";`,
        },
        answer: `document.getElementById("demo").innerHTML = "Hello World!";`
    },

    {
        question: `Where is the correct place to insert a JavaScript?`,
        choice: {
            1: `The <head> section`,
            2: `Both the <head> section and the <body> section are correct`,
            3: `The <body> section`,
            4: `The <footer>`,
        },
        answer: `The <body> section`
    },

    {
        question: `What is the correct syntax for referring to an external script called "xxx.js"?`,
        choice: {
            1: `<script href="xxx.js">`,
            2: `<script name="xxx.js">`,
            3: `<script jssrc="xxx.js">`,
            4: `<script src="xxx.js">`,
        },
        answer: `<script src="xxx.js">`
    },

    {
        question: `The external JavaScript file must contain the <script> tag`,
        choice: {
            1: `false`,
            2: `true`,
            3: `true and false`,
            4: `neither true or false`,
        },
        answer: `false`
    },
    
    {
        question: `How do you write "Hello World" in an alert box?`,
        choice: {
            1: `alert("Hello World");`,
            2: `alertBox("Hello World");`,
            3: `msg("Hello World");`,
            4: `msgBox("Hello World");`,
        },
        answer: `alert("Hello World");`
    },
    
    {
        question: `How do you create a function in JavaScript?`,
        choice: {
            1: `function myFunction() `,
            2: `function = myFunction()`,
            3: `function:myFunction()`,
            4: `function == myFunction()`,
        },
        answer: `function myFunction() `
    },
    
    {
        question: `How do you call a function named "myFunction"?`,
        choice: {
            1: `call function myFunction()`,
            2: `myFunction()`,
            3: `call myFunction()`,
            4: `myFunction(), please work`,
        },
        answer: `myFunction()`
    },
    
    {
        question: `How to write an IF statement in JavaScript?`,
        choice: {
            1: `if (i == 5)`,
            2: `if i = 5 then`,
            3: `if i = 5`,
            4: `if i == 5 then`,
        },
        answer: `if (i == 5)`
    },
    
    {
        question: `How to write an IF statement for executing some code if "i" is NOT equal to 5?`,
        choice: {
            1: `if i =! 5 then`,
            2: `if (i != 5)`,
            3: `if (i <> 5)`,
            4: `if i <> 5`,
        },
        answer: `if (i != 5)`
    },
    
    {
        question: `How does a WHILE loop start?`,
        choice: {
            1: `while (i <= 10)`,
            2: `while i = 1 to 10`,
            3: `while (i <= 10; i++)`,
            4: `while (i = 0; i++)`,
        },
        answer: `while (i <= 10)`
    },
    
    {
        question: `How does a FOR loop start?`,
        choice: {
            1: `for i = 1 to 5`,
            2: `for (i = 0; i <= 5)`,
            3: `for (i = 0; i <= 5; i++)`,
            4: `for (i <= 5; i++)`,
        },
        answer: `for (i = 0; i <= 5; i++)`
    },
    
    {
        question: `How can you add a comment in a JavaScript?`,
        choice: {
            1: `<!--This is a comment-->`,
            2: `//This is a comment`,
            3: `'This is a comment`,
            4: `?/This is a comment`,
        },
        answer: `//This is a comment`
    },
    
    {
        question: `How to insert a comment that has more than one line?`,
        choice: {
            1: `//This comment has
                more than one line//`,
            2: `/*This comment has
                more than one line*/`,
            3: `<!--This comment has
                more than one line-->`,
            4: `<?--This comment has
                more than one line--?>`,
        },
        answer: `/*This comment has
                more than one line*/`
    },
    
    {
        question: `What is the correct way to write a JavaScript array?`,
        choice: {
            1: `var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")`,
            2: `var colors = "red", "green", "blue"`,
            3: `var colors = (1:"red", 2:"green", 3:"blue")`,
            4: `var colors = ["red", "green", "blue"]`,
        },
        answer: `var colors = ["red", "green", "blue"]`
    },
    
    {
        question: `How do you round the number 7.25, to the nearest integer?`,
        choice: {
            1: `Math.rnd(7.25)`,
            2: `Math.round(7.25)`,
            3: `round(7.25)`,
            4: `rnd(7.25)`,
        },
        answer: `Math.round(7.25)`
    },
    
    {
        question: `How do you find the number with the highest value of x and y?`,
        choice: {
            1: `ceil(x, y)`,
            2: `top(x, y)`,
            3: `Math.ceil(x, y)`,
            4: `Math.max(x, y)`,
        },
        answer: `Math.max(x, y)`
    },
    
    {
        question: `What is the correct JavaScript syntax for opening a new window called "w2"?`,
        choice: {
            1: `w2 = window.new("http://www.w3schools.com");`,
            2: `w2 = window.o("http://www.w3schools.com");`,
            3: `w2 = window.please("http://www.w3schools.com");`,
            4: `w2 = window.open("http://www.w3schools.com");`,
        },
        answer: `w2 = window.open("http://www.w3schools.com");`
    },
    
    {
        question: `JavaScript is the same as Java.`,
        choice: {
            1: `false`,
            2: `neither true or false`,
            3: `true`,
            4: `true and false`,
        },
        answer: `false`
    },
    
    {
        question: `How can you detect the client's browser name?`,
        choice: {
            1: `navigator.appName`,
            2: `client.navName`,
            3: `browser.name`,
            4: `console.name`,
        },
        answer: `navigator.appName`
    },
    
    {
        question: `Which event occurs when the user clicks on an HTML element?`,
        choice: {
            1: `onmouseclick`,
            2: `onchange`,
            3: `onmouseover`,
            4: `onclick`,
        },
        answer: `onclick`
    },
    
    {
        question: `How do you declare a JavaScript variable?`,
        choice: {
            1: `variable carName;`,
            2: `v carName;`,
            3: `varr carName`,
            4: `var carName;`,
        },
        answer: `var carName;`
    },
    
    {
        question: `Which operator is used to assign a value to a variable?`,
        choice: {
            1: `x`,
            2: `-`,
            3: `*`,
            4: `=`,
        },
        answer: `=`
    },
    
    {
        question: `What will the following code return: Boolean(10 > 9)`,
        choice: {
            1: `NaN`,
            2: `true`,
            3: `false`,
            4: `undefined`,
        },
        answer: `true`
    },
    
    {
        question: `Is JavaScript case-sensitive?`,
        choice: {
            1: `no`,
            2: `yes`,
            3: `no and yes`,
            4: `neither no and yes`,
        },
        answer: `yes`
    },
    

]

// correctAnswers stores the correct answer from each question
var correctAnswers = [];
for (var i = 0; i < questions.length; i++) {
    correctAnswers.push(questions[i].answer)
}

function displayQuestions(index) {
    if (index < questions.length) {
        questionsArea.textContent = questions[index].question;
        choice1.textContent = questions[index].choice[1];
        choice2.textContent = questions[index].choice[2];
        choice3.textContent = questions[index].choice[3];
        choice4.textContent = questions[index].choice[4];
    } else {
        clearInterval(timeInterval);
        questionsArea.textContent = `Done! Your final score is ${score}/${questions.length}`;
        choice1.classList.add(`hide`);
        choice2.classList.add(`hide`);
        choice3.classList.add(`hide`);
        choice4.classList.add(`hide`);
        document.getElementById(`scoresContainerID`).classList.remove(`hide`);
        document.getElementById(`highScoreForm`).classList.remove(`hide`);
        playing = false;
        viewingScores = true;

        // clears the li elements inside the olEl so it does not duplicate if children exist
        if (olEl.children.length > 0) {
            while (olEl.firstChild) {
                olEl.removeChild(olEl.firstChild)
                console.log('removeChild')
            }
        }
    }
}

submitButton.addEventListener(`click`, function(event) {
    event.preventDefault();
    var initials = document.getElementById(`initials`).value.trim();
    var scoreOb = {
        initials, score
    }

    highScoresArr.push(scoreOb);
    localStorage.setItem(`highScoresArr`, JSON.stringify(highScoresArr));
    
    displayScores();
})

clearScoresButton.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.removeItem(`highScoresArr`);

    if (olEl.children.length > 0) {
        while (olEl.firstChild) {
            olEl.removeChild(olEl.firstChild)
            console.log('removeChild')
        }
    }

    highScoresArr = [];
})

function displayScores() {
    console.log(highScoresArr);
    var highScoresArr = JSON.parse(localStorage.getItem(`highScoresArr`));

    highScoresArr.sort(function(a, b) {
        return b.score - a.score;
    })

    for (var i = 0; i < highScoresArr.length; i++ ) {
        var scores = highScoresArr[i];
    
        var li = document.createElement('li');
        li.textContent = `${scores.initials} - ${scores.score}`;

        olEl.appendChild(li);
    }
}

// used https://code.mu/en/javascript/book/prime/timers/stop-button/ for stopping interval in different 
// function while making the var global
function startTimer() {
    if (viewingScores) {
        document.getElementById(`scoresContainerID`).classList.add(`hide`);
        choice1.classList.remove(`hide`);
        choice2.classList.remove(`hide`);
        choice3.classList.remove(`hide`);
        choice4.classList.remove(`hide`);

        viewingScores = false;
    }

    if (!playing) {
        displayQuestions(index);
        playing = true;
        timeInterval = setInterval(function() {
            timeRemaining--;
            time.textContent = `Time: ${timeRemaining}`;
    
            // clears the interval if the timer runs out
            if (timeRemaining < 0) {
                playing = false;
                startButton.disabled = false; 
                time.textContent = `Time: 0`
                clearInterval(timeInterval)
            }
        }, 1000);
    }
};

function stopTimer() {
	clearInterval(timeInterval);
    playing = false;
};

function resetTimer() {
    if (viewingScores) {
        document.getElementById(`scoresContainerID`).classList.add(`hide`);

        choice1.classList.remove(`hide`);
        choice2.classList.remove(`hide`);
        choice3.classList.remove(`hide`);
        choice4.classList.remove(`hide`);
        viewingScores = false;
    }

    if (olEl.children.length > 0) {
        while (olEl.firstChild) {
            olEl.removeChild(olEl.firstChild)
            console.log('removeChild')
        }
    }

    playing = false;
    viewingScores = false;
    startButton.disabled = false; 
    questionsArea.textContent = `When you are ready, click the start button to begin.`;
    clearInterval(timeInterval);

    timeRemaining = 60;
    time.textContent = `Time: 60`;

    choice1.textContent = '';
    choice2.textContent = '';
    choice3.textContent = ''; 
    choice4.textContent = '';
    scoreEl.textContent = `Score: `;
    index = 0;
    score = 0;
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




