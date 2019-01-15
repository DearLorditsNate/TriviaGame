$(document).ready(function() {

    /*
    ===============================
    Global Variables
    ===============================
    */
    // Store the question objects in an array
    // Create objects for each questions | will include question, 4 answer choices, and the gif
    // Users
    var questions = {
        q1: {
            question: "what is 1 + 1?",
            answers: {
                a1: "1",
                a2: "2",
                a3: "3",
                a4: "4",
            },
            correct: "a2",
            gif: "assets/images/spongebob_1.gif"
        },
        q2: {
            question: "what is 2 + 2?",
            answers: {
                a1: "2",
                a2: "4",
                a3: "6",
                a4: "8",
            },
            correct: "a2",
            gif: "#"
        },
        q3: {
            question: "what is 3 + 3?",
            answers: {
                a1: "3",
                a2: "12",
                a3: "9",
                a4: "6",
            },
            correct: "a4",
            gif: "#"
        }
    }

    // Question Index
    var questionIndex = 0;

    // Stores currect question object
    var currentQuestion = questions[Object.keys(questions)[questionIndex]];

    // Amount of time remaining to guess
    var timeLeft = 30;

    // Initializes holder for interval timer
    var timeTracker;



    // Generates a random number equal to the number of questions  in the questions object
    var i = Math.floor(Math.random() * 3);

    // Questions array
    var allQuestions = [];

    // Populate questions array
    for (var key in questions) {
        allQuestions.push(questions[key]);
    }

    // Test console logs
    // console.log("questions Object: " + questions.q1.correct);
    // console.log("allQuestions array: " + allQuestions[0].correct);

    /*
    ===============================
    Timers
    ===============================
    */

    // var countDown = setInterval(function() {
    //     reset();
    // }, 1000 * 3);

    // setTimeout for 30 seconds for each question
    // var timerTracker = setInterval(timer, 1000);
    
    // setTimeout to move to next question after 10 seconds


    /*
    ===============================
    Function Declarations
    ===============================
    */

    // displayQuestion function that takes the properties from each object in the array and displays them in the html
    function displayQuestion(currentQuestion) {
        $("#question").append("<p>" + currentQuestion.question + "</p>");
    }

    // displayAnswers function that takes the question as a parameter and displays the appropriate answer choices
    function displayAnswers(currentQuestion) {
        $("#choices").append("<p id='a1'>" + currentQuestion.answers.a1 + "</p>");
        $("#choices").append("<p id='a2'>" + currentQuestion.answers.a2 + "</p>");
        $("#choices").append("<p id='a3'>" + currentQuestion.answers.a3 + "</p>");
        $("#choices").append("<p id='a4'>" + currentQuestion.answers.a4 + "</p>");
    }

    function isCorrect(currentQuestion, event) {
        if (event.target.id === currentQuestion.correct) {
            alert("You're right!");
        } else {
            alert("sorry...");
        }
        clearInterval(timeTracker);
        setTimeout(newQuestion, 1000 * 5);
        $("#choices").html("<img src='" + currentQuestion.gif + "'>")
    }

    function timer() {
        timeLeft--;
        $("#time").text(timeLeft);
        if (timeLeft === 0) {
            alert("You ran out of time!");
            clearInterval(timeTracker);
            setTimeout(newQuestion, 1000 * 5);
        }
    }

    // incrementQuestionIndex adds one to questionIndex, which is taken as a parameter for the displayQuestion/Answer functions | resets to 0 once all items in the questions object have been displayed
    function incrementQuestionIndex() {
        if (questionIndex < 2) {
            questionIndex++;
        } else {
            questionIndex = 0;
        }
    }

    function newQuestion() {
        timeLeft = 30;
        $("#time").text(timeLeft);
        timeTracker = setInterval(timer, 1000)
        currentQuestion = questions[Object.keys(questions)[questionIndex]];
        $("#question, #choices, #gif").empty();
        displayQuestion(currentQuestion);
        displayAnswers(currentQuestion);
        $("#a1, #a2, #a3, #a4").on("click", function (event) {
            isCorrect(currentQuestion, event);
        });
        incrementQuestionIndex();
    }

    /*
    ===============================
    Function Calls
    ===============================
    */

    newQuestion();


    /*
    ===============================
    Click Handlers
    ===============================
    */

});