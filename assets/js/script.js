var highScores = document.getElementById(`highScores`);
var score = document.getElementById(`score`);
var time = document.getElementById(`time`);
var start = document.getElementById(`start`);
var stop = document.getElementById(`stop`);
var reset = document.getElementById(`reset`);
var questions = document.getElementById(`questions`);
var choice1 = document.getElementById(`choice1`);

var timeRemaining = 60;
time.textContent = `Time: `;
questions.textContent = `When you are ready, click the start button to begin.`

// start.addEventListener(`click`, function() {
//     start.dissabled = true;
//     var timeInterval = setInterval(function() {
//         if (timeRemaining > 1) {
//             time.textContent = `Time: ` + timeRemaining;
//             timeRemaining--;
//         } else {
//             time.textContent = `Time: 0`;
//             clearInterval(timeInterval);
//         }
//     }, 1000)
// });

// stop.addEventListener(`click`, function() {
//     var timeInterval = setInterval(function() {
//         time.textContent = `Time: ` + timeRemaining;
//         clearInterval(timeInterval)
//     })
// })