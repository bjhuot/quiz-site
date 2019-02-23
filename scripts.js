//Blank array var quizQueue for [Question, Answer] submitted by user 1.

var quizQueue = [];
var answeredRight = [];
var answeredWrong = [];
var score = 0;
let answeredRightList = '';
var answeredWrongList = '';
let question = document.getElementById('playerQuestion');
let answer = document.getElementById('playerAnswer');
let qi = Math.floor(Math.random() * parseInt(quizQueue.length));

//Alert function greeting user 1 on page load and explaining the game.

alert("Welcome to Huey B's Custom Quiz Game! Fill in as many quiz questions and answers as you'd like, and then when you're ready click 'Finished'. The page will then randomize your questions to quiz a friend - or your own memory!");

//Function that takes form values and inserts them into 2D-array as storage for user 2 to play game.
//Alerts user 1 that action was performed successfully.
//Called via onclick for submit button, not event listener
function quizQueueAdd() {
    quizQueue.push([document.getElementById('quizQuestion').value, document.getElementById('quizAnswer').value]);
    document.getElementById('quizQuestion').value = '';
    document.getElementById('quizAnswer').value = '';
    alert("Question saved!");
};

//Listener on finished button that display series of alerts:
//Explaining rules of game to user 2
document.getElementById("Finished").addEventListener('click', () => {
    document.getElementById('initial').style.display = 'none';
    document.getElementById('answer').style.display = 'flex';
    alert("PLAYER_1 has created a quiz for you! Are you ready? Click 'Ok' to start!");
    question.innerHTML = quizQueue[qi][0];
});

document.getElementById('playerButton').addEventListener('click', () => {
    if(answer.value.toLowerCase() == (quizQueue[qi][1]).toLowerCase()) {
        answer.value = '';
        answeredRight.push([quizQueue[qi][0], quizQueue[qi][1]]);
        score += 2;
        quizQueue.splice(qi,1);
        endCheck();
    } else {
        answeredWrong.push([quizQueue[qi][0], quizQueue[qi][1]]);
        answer.value = '';
        //Displays correct answer is given answer was wrong
        alert('Sorry, the correct answer was ' + quizQueue[qi][1] + '.');
        score = score - 1;
        quizQueue.splice(qi,1);
        endCheck();
    }
    question.innerHTML = quizQueue[qi][0];
});

//When array var quizQueue is empty, display results:
    //total score
function postResults() {
    //Posts final score
    document.getElementById('results').style.display = 'flex';
    document.getElementById('score').innerHTML = '<h2>Your final score is: ' + score + '.</h2><p>You got 2 points for each right answer and lost a point for each wrong answer.</p>'
    //Output correctly answered questions and answers
    if(quizQueue.length == 0 && (answeredRight.length > 0 || answeredWrong.length > 0)) {
        for(i=0;i<answeredRight.length;i+=1) {
            answeredRightList = answeredRightList + '<li class="question">' + answeredRight[i][0] + '</li>';
            answeredRightList = answeredRightList + '<li class="answer">' + answeredRight[i][1] + '</li>';
        };
    }
    document.getElementById('correct').innerHTML = '<h2>You got the following questions correct:</h2><ul>' + answeredRightList + '</ul>';
    //Output incorrectly answered questions and answers
    if(quizQueue.length == 0 && (answeredRight.length > 0 || answeredWrong.length > 0)) {
        for(i=0;i<answeredWrong.length;i+=1) {
            answeredWrongList = answeredWrongList + '<li class="question">' + answeredWrong[i][0] + '</li>';
            answeredWrongList = answeredWrongList + '<li class="answer">' + answeredWrong[i][1] + '</li>';
        };
    document.getElementById('wrong').innerHTML = '<h2>You got the following questions wrong:</h2><ul>' + answeredWrongList + '</ul>';
    };
}

function endCheck() {
    if (quizQueue.length == 0) {
        document.getElementById('answer').style.display = 'none';
        postResults();
    }
}