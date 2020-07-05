    //General Variables
var questIndex = 0;
var allAnswers = "";
var timeOnClock = 75;
var points = 0;
var playerInput = document.querySelector("#initialEnter")

var savedScore = [];

var questArray = [
    {
        question: "What is a JavaScript element that represents either TRUE or FALSE values",
        answer: ["Event", "RegExp", "Boolean", "Condition"],
        correctAns: "Boolean"
    },
    {
        question: "Where is the JavaScript placed inside an HTML document or page?",
        answer: ["In the <footer> section.", "In the <title> section.", "In the <meta> section.", "In the <body> and <head> sections."],
        correctAns: "In the <body> and <head> sections."
    },
    {
        question: "What tag is used to specify a section of text that has been quoted from another source?",
        answer: ["<blockquote>", "<em>", "<strong>", "<a>"],
        correctAns: "<blockquote>"
    },
    {
        question: "In JavaScript, what is a block of code called that is used to perform a specific task?",
        answer: ["String", "Variable", "Declaration", "Function"],
        correctAns: "Function"
    },
    {
        question: "What is a condition?",
        answer: ["An object used instead of a hammer.", "A type of syrup for waffles.", "An expression that evaluates whether something is true or false.", "An illness or disease."],
        correctAns: "An expression that evaluates whether something is true or false."
    },
    {
        question: "What tag is used to define the metadata about an HTML document, and must always be included inside the element?",
        answer: ["<img>", "<div>", "<meta>", "<table>"],
        correctAns: "<meta>"
    },
    {
        question: "What does API stand for?",
        answer: ["Artificial Pie Index", "Accepting Preferential Intelligence", "Application Programming Interface", "Autonomous Pizzas International"],
        correctAns: "Application Programming Interface"
    },
    {
        question: "What is the element used – and hidden – in code that explains things and makes the content more readable?",
        answer: ["Comments", "Notes", "Quotations", "Comparisons"],
        correctAns: "Comments"
    },
];


//initiate quiz
function startQuiz() {
    if (localStorage.getItem("savedScore")) {
        savedScore = JSON.parse(localStorage.getItem("savedScore"))
    }
    //timer
    var timerStop = setInterval(function () {
        timeOnClock--;
        var timerEl = document.querySelector("#time");
        timerEl.textContent = timeOnClock;
        if (timeOnClock <= 0) {
            clearInterval(timerStop);
            document.querySelector('.right-wrong').classList.add('hide');
            document.querySelector('.right-wrong').classList.remove('show');
            var endScreen = document.querySelector('#gameOver');
            endScreen.classList.remove('hide');
            endScreen.classList.add('show');
            var endHidden = document.querySelector("#question-container");
            endHidden.classList.remove('show')
            endHidden.classList.add('hide');
        }
        if (questIndex === 9) {
            clearInterval(timerStop);
            document.querySelector('.right-wrong').classList.add('hide');
            document.querySelector('.right-wrong').classList.remove('show');
            var endScreen = document.querySelector('#gameOver');
            endScreen.classList.remove('hide');
            endScreen.classList.add('show');
            var endHidden = document.querySelector("#question-container");
            endHidden.classList.remove('show')
            endHidden.classList.add('hide');

            points = timeOnClock;
            finalScoreEl.textContent = points;

            console.log('******game over');
        }
    }, 1000);

    //hide start elements
    var startEl = document.querySelector('.startUp');
    startEl.classList.add('hide');
    var startEl1 = document.querySelector(".start");
    startEl1.classList.add('hide');
    var startEl2 = document.querySelector("#highScoreDiv");
    startEl2.classList.add("hide");

    //show question elements
    var questionEl = document.querySelector('#question-container');
    questionEl.classList.remove('hide');
    questionEl.classList.add('show');


    //show first question
    questionSelection();
};

// this function "grabs" #quizQuestion and sets it equal to questEl1
// and "grabs" each of the answers in the answer array and sets them equal
// to a variable of their own
// then it sets the text of of the variables to the corresponding item as
//specified by the for loop.

function questionSelection() {
    //remove correct tag
    var allAnswers = document.querySelectorAll(".answer"); // get array of all choices
    for (i = 0; i < allAnswers.length; i++) { // loop trough choices and check if the choice is right
        allAnswers[i].classList.remove('correct');
    }

    //populated the html with question data
    var questEl = document.querySelector("#quizQuestion");
    questEl.textContent = questArray[questIndex].question;
    var answer1El = document.querySelector("#answer1");
    answer1El.textContent = questArray[questIndex].answer[0];
    var answer2El = document.querySelector("#answer2");
    answer2El.textContent = questArray[questIndex].answer[1];
    var answer3El = document.querySelector("#answer3");
    answer3El.textContent = questArray[questIndex].answer[2];
    var answer4El = document.querySelector("#answer4");
    answer4El.textContent = questArray[questIndex].answer[3];

    //loop through the choices and tag with a correct one
    var rightAns = questArray[questIndex].correctAns; // in questions array
    for (i = 0; i < allAnswers.length; i++) { // loop trough choices and check if the choice is right
        var answerTxt = allAnswers[i].textContent; // store in a variable the text of each choice
        if (answerTxt === rightAns) { //check/compare choice text with stored answer
            allAnswers[i].classList.add('correct'); // if check is passed then add correct class
        }
    }

    questIndex++;

}

var answerClickHandler = function () {
    //indicate right answer or wrong answer
    if (event.target.className.indexOf('correct') > -1) {
        //if you get it right then add 5 to time
        timeOnClock = timeOnClock + 10;
        //add display showing "correct"
        document.querySelector('.right-wrong').classList.remove('hide');
        document.querySelector('.right-wrong').classList.add('show');
        document.querySelector('.right-wrong').textContent = "correct!";
    } else {
        //else substract 5 secs
        timeOnClock = timeOnClock - 10;
        //add display showing "wrong"
        document.querySelector('.right-wrong').classList.remove('hide');
        document.querySelector('.right-wrong').classList.add('show');
        document.querySelector('.right-wrong').textContent = "wrong!";
    }
    //render next quesstion
    questionSelection()

}


//add start btn function to initialize quiz
var startBtn = document.querySelector(".startUp");
startBtn.addEventListener("click", startQuiz);

//setting up parent delegator   aplies event listener to the answer buttons without
document.querySelector('#question-container').addEventListener('click', function () {
    //checking for right className
    if (event.target.className.indexOf('answer') > -1) {
        answerClickHandler(); // do something
    }
});

var initalSub = document.querySelector('#subBtn');
initalSub.addEventListener("click", highscoreDirect);
