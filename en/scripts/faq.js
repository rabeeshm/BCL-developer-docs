var BCLS_faq = (function (window, document) {
    "use strict";
    var // elements
        questions = document.getElementsByClassName("bcls-question"),
        answers = document.getElementsByClassName("bcls-answer");
    function showAnswer(evt) {
        var answerNumber = parseInt(evt.target.id.substring(1)),
            i = 0,
            j = answers.length;
        logit("evt", evt);
        logit("answerNumber", answerNumber);
        // hide all answers except the one for the selected question
        for (i = 0; i < j; i++) {
            if (i === answerNumber) {
                answers[i].style.display = "block";
            } else {
                answers[i].style.display = "none";
            }
        }
    }
    function init() {
        var i = 0, j = 0;
        if (questions) {
            j = questions.length;
        }

        // add IDs
        for (i = 0; i < j; i++) {
            // set ids for answers
            answers[i].setAttribute("id", ("a" + i.toString()));
            // hide all answers initially
            answers[i].setAttribute("style", "display:none");
            // set ids for questions
            questions[i].setAttribute("id", ("q" + i.toString()));
            // add styling to questions
            questions[i].setAttribute("style", "margin-top:1em;margin-bottom:1em;");
            // add event listeners
            questions[i].addEventListener("click", showAnswer);
        }
    }
    // call init to kick things off
    init();
})(window, document);
