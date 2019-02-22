//Blank array var quizQueue for [Question, Answer] submitted by user 1.

var quizQueue = [];
var answeredRight = [];
var answeredWrong = [];
var score = 0;
let answeredRightList = '';
var answeredWrongList = '';
//Generates random number between 0 and array.length
let qi = Math.floor(Math.random() * parseInt(quizQueue.length));
// let question = document.getElementById('question');

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
    while (quizQueue.length > 0) {
//Asks question at index location of random number
//Checks answer to supplied answer and responds if correct or wrong
//Removes question from array and places it in new array (var answeredRight or var answeredWrong)
//Updates score

        //This section does is with prompt boxes

        let question = prompt(quizQueue[qi][0]);
        // let qi = Math.floor(Math.random() * parseInt(quizQueue.length));
        if(question == quizQueue[qi][1]) {
            answeredRight.push([quizQueue[qi][0], quizQueue[qi][1]]);
            score += 2;
        } else {
            answeredWrong.push([quizQueue[qi][0], quizQueue[qi][1]]);
            //Displays correct answer is given answer was wrong
            alert('Sorry, the correct answer was ' + quizQueue[qi][1] + '.');
            score = score - 1;
        }



        quizQueue.splice(qi,1);
        postResults();
    }
});

//When array var quizQueue is empty, display results:
    //total score
function postResults() {
    //Posts final score
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
    //button to reload page to "Play again"