$(document).ready(function() {

    /*
    ===============================
    Global Variables
    ===============================
    */
 
    // Stores questions, answer choices, correct answer, and gif
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

    // Stores number correct
    var correct = 0;

    // Stores number incorrect
    var incorrect = 0;

    // Stores the answer
    var answer;

    /*
    ===============================
    Function Declarations
    ===============================
    */

    function displayQuestion(currentQuestion) {
        $("#question").append("<p>" + currentQuestion.question + "</p>");
    }

    function displayAnswers(currentQuestion) {
        $("#choices").append("<p id='a1'>" + currentQuestion.answers.a1 + "</p>");
        $("#choices").append("<p id='a2'>" + currentQuestion.answers.a2 + "</p>");
        $("#choices").append("<p id='a3'>" + currentQuestion.answers.a3 + "</p>");
        $("#choices").append("<p id='a4'>" + currentQuestion.answers.a4 + "</p>");
    }

    // Compares user choice to correct answer and alerts correct or incorrect
    function isCorrect(currentQuestion, event) {
        if (event.target.id === currentQuestion.correct) {
            correct++;
            $("#right").show();
        } else {
            incorrect++;
            $("#wrong").show();
        }
        // Clears interval and sets timeout for 5 seconds to next question
        clearInterval(timeTracker);
        setTimeout(newQuestion, 1000 * 5);
        // Display gif
        $("#choices").html("<img src='" + currentQuestion.gif + "'>")
        // Gets correct answer
        getAnswer(currentQuestion);
    }

    function getAnswer(currentQuestion) {
        var answerList = currentQuestion.answers;
        for (i in answerList) {
            if (currentQuestion.correct === i) {
            answer = answerList[i];
            }
        }
        $(".hidden, #correct").show();
        $("#correct").text(answer);
        console.log("Answer: " + answer);
    }

    function timer() {
        timeLeft--;
        $("#time").text(timeLeft);
        if (timeLeft === 0) {
            // alert("You ran out of time!");
            $("#no-time").show();
            $("#choices").html("<img src='" + currentQuestion.gif + "'>")
            getAnswer(currentQuestion);
            clearInterval(timeTracker);
            setTimeout(newQuestion, 1000 * 5);
        }
    }

    function incrementQuestionIndex() {
        if (questionIndex < 3) {
            questionIndex++;
        }
    }

    // Initialize Game
    function initialize() {
        // Hides HTML elements
        $("#time, #question, #right, #wrong, #no-time, #choices, #correct, #score-correct, #score-incorrect, #reset-btn, .hidden, h2").hide();
        // Resets scores and question index
        $("#score-correct, #score-incorrect").empty();
        correct = 0;
        incorrect = 0;
        questionIndex = 0;
    }

    // End Game
    function endGame() {
        // Make this number equal to the number of questions in the object

        // Checks for end of questions
        if (questionIndex >= 3) {
            clearInterval(timeTracker);
            // Hides and shows HTML elements for end game
            $("#reset-btn").show();
            $("#time, #question, #right, #wrong, #no-time, #choices, #correct, .hidden, h2").hide();
            $("#score-correct, #score-incorrect").show();
            // Displays final score count
            $("#score-correct").text("Correct: " + correct);
            $("#score-incorrect").text("Incorrect: " + incorrect);
        }
    }

    // Populates a new question
    function newQuestion() {
        // Hides and shows elements
        $("#time, #question, #choices, h2").show();
        $("#start-btn, #reset-btn, .hidden, #right, #wrong, #no-time, #correct").hide();
        // Resets time left
        timeLeft = 30;
        $("#time").text(timeLeft);
        timeTracker = setInterval(timer, 1000)
        // Checks for endgame conditions
        endGame();
        // Grabs next question
        currentQuestion = questions[Object.keys(questions)[questionIndex]];
        // Empties HTML elements and populates new question and answers
        $("#question, #choices, #correct").empty();
        displayQuestion(currentQuestion);
        displayAnswers(currentQuestion);
        // Listens for user answer selection
        $("#a1, #a2, #a3, #a4").on("click", function (event) {
            isCorrect(currentQuestion, event);
        });
        // Increments question index
        incrementQuestionIndex();
    }

    /*
    ===============================
    Function Calls
    ===============================
    */

    // Hide elements on page load
    initialize();

    /*
    ===============================
    Click Handlers
    ===============================
    */

    $("#start-btn").on("click", newQuestion);

    $("#reset-btn").on("click", function() {
        initialize();
        newQuestion();
    });

});