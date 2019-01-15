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
            correct: "2",
            gif: "#"
        },
        q2: {
            question: "what is 2 + 2?",
            answers: {
                a1: "2",
                a2: "4",
                a3: "6",
                a4: "8",
            },
            correct: "4",
            gif: "#"
        },
        q3: {
            question: "what is 3 + 3?",
            answers: {
                a1: "3",
                a2: "6",
                a3: "9",
                a4: "12",
            },
            correct: "6",
            gif: "#"
        }
    }

    // Generates a random number equal to the number of questions  in the questions object
    var i = Math.floor(Math.random() * 3);

    // Questions array
    var allQuestions = [];

    // Populate questions array
    for (var key in questions) {
        allQuestions.push(questions[key]);
    }

    // Test console logs
    console.log("questions Object: " + questions.q1.correct);
    console.log("allQuestions array: " + allQuestions[0].correct);

    /*
    ===============================
    Timers
    ===============================
    */

    // Timers that take displayQuestion function as an argument

    /*
    ===============================
    Function Declarations
    ===============================
    */

    // displayQuestion function that takes the properties from each object in the array and displays them in the html
    function displayQuestion(questionObj) {
        $("#question").append("<p>" + questionObj.question + "</p>");
    }

    // displayAnswers function that takes the question as a parameter and displays the appropriate answer choices
    function displayAnswers(questionObj) {
        $("#choices").append("<p id='a1'>" + questionObj.answers.a1 + "</p>");
        $("#choices").append("<p id='a2'>" + questionObj.answers.a2 + "</p>");
        $("#choices").append("<p id='a3'>" + questionObj.answers.a3 + "</p>");
        $("#choices").append("<p id='a4'>" + questionObj.answers.a4 + "</p>");
    }

    /*
    ===============================
    Function Calls
    ===============================
    */

    // Calling displayQuestion takes an argument of a random question from the questions object (by getting the question from the index equal to the random number generator)
    displayQuestion(questions[Object.keys(questions)[i]]);

    // Calling displayAnswers takes the same argument of a random question from the questions object as displayQuestion
    displayAnswers(questions[Object.keys(questions)[i]]);

    /*
    ===============================
    Click Handlers
    ===============================
    */

    // Listens for clicks on the p tags of the answer choices
    $("#a1, #a2, #a3, #a4").on("click", function() {
        alert("You clicked me!");
    });

});