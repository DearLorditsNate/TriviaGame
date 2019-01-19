$(document).ready(function() {

    /*
    ===============================
    Global Variables
    ===============================
    */
 
    // Stores questions, answer choices, correct answer, and gif
    var questions = {
        q1: {
            question: "What color is Mace Windu's lightsaber?",
            answers: {
                a1: "Blue",
                a2: "Green",
                a3: "Purple",
                a4: "Red",
            },
            correct: "a3",
            gif: "assets/images/mace-windu.gif"
        },
        q2: {
            question: "What type of ship is the Millennium Falcon?",
            answers: {
                a1: "Nubian",
                a2: "Corellian",
                a3: "Gungan",
                a4: "Mon Calamari",
            },
            correct: "a2",
            gif: "assets/images/millennium-falcon.gif"
        },
        q3: {
            question: "What does Luke Skywalker call Obi-Wan Kenobi?",
            answers: {
                a1: "Old Ben",
                a2: "Father",
                a3: "Smelly",
                a4: "Papa Kenobi",
            },
            correct: "a1",
            gif: "assets/images/old-ben.gif"
        },
        q4: {
            question: "What is the capital planet of the Galactic Republic?",
            answers: {
                a1: "Kashyyyk",
                a2: "Endor",
                a3: "Coruscant",
                a4: "Dantooine",
            },
            correct: "a3",
            gif: "assets/images/coruscant.gif"
        },
        q5: {
            question: "What is Count Dooku's Sith name?",
            answers: {
                a1: "Darth Sidious",
                a2: "Darth Plagueis",
                a3: "Darth Maul",
                a4: "Darth Tyranus",
            },
            correct: "a4",
            gif: "assets/images/darth-tyranus.gif"
        },
        q6: {
            question: "How old does Yoda claim he is on his deathbed?",
            answers: {
                a1: "900 years",
                a2: "800 years",
                a3: "1100 years",
                a4: "750 years",
            },
            correct: "a1",
            gif: "assets/images/yoda.gif"
        },
        q7: {
            question: "Who made the predecessors to the Storm Troopers?",
            answers: {
                a1: "Kaminoans",
                a2: "Wookies",
                a3: "Bothans",
                a4: "Mandalorians",
            },
            correct: "a1",
            gif: "assets/images/kaminoans.gif"
        },
        q8: {
            question: "Who was Anakin's podracing nemesis?",
            answers: {
                a1: "Ben Quadinaros",
                a2: "Sebulba",
                a3: "Dud Bolt",
                a4: "Gasgano",
            },
            correct: "a2",
            gif: "assets/images/sebulba.gif"
        },
        q9: {
            question: "What do Obi-Wan and Luke sell to pay for passage on Han Solo's ship?",
            answers: {
                a1: "Luke's speeder",
                a2: "Uncle Owen's moisture farm",
                a3: "Aunt Beru's blue milk",
                a4: "Luke's droids",
            },
            correct: "a1",
            gif: "assets/images/droids.gif"
        },
        q10: {
            question: "Which of these did Anakin make?",
            answers: {
                a1: "Podracer",
                a2: "Droid",
                a3: "Bad choices",
                a4: "All of the above",
            },
            correct: "a4",
            gif: "assets/images/anakin-liar.gif"
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
            $("#no-time").show();
            $("#choices").html("<img src='" + currentQuestion.gif + "'>")
            getAnswer(currentQuestion);
            clearInterval(timeTracker);
            setTimeout(newQuestion, 1000 * 5);
        }
    }

    function incrementQuestionIndex() {
        if (questionIndex < 10) {
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
        if (questionIndex >= 10) {
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