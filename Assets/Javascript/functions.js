//Questions of the trivia
var questions= {
    question1:{
        question: 'Which band realesed the song, "Man in the box"?',
        answers: ["The Doors","Pearl Jam","Alice in Chains","Guns & Roses"],
        correctAnswer: "Alice in Chains",
        Image: "Assets/Images/gif/AliceInChains.gif"
    },
    question2:{
        question: "Which of the following is not a Soundgarden song?",
        answers: ["I Stay Away", "Spoonman", "Black Hole Sun", "Jesus Christ Pose"],
        correctAnswer: "I Stay Away",
        Image: "Assets/Images/gif/IStayAway.gif"
    },
    question3:{
        question: "Who is the lead guitarist for Rage Against The Machine?",
        answers: ["Dave Mustaine", "Tom Morello", "Zach De La Rocha", "Slash"],
        correctAnswer: "Tom Morello",
        Image: "Assets/Images/gif/TomMorello.gif"
    },
    question4:{
        question: "Which group released the hit song, 'Smells Like Teen Spirit'?",
        answers: ["Nirvana", "Backstreet Boys", "The Offspring", "No Doubt"],
        correctAnswer: "Nirvana",
        Image: "Assets/Images/gif/Nirvana.gif"
    },
    question5:{
        question: "Which of the following bands is from Australia?",
        answers: ["Bush", "Silverchair", "Blur", "Oasis"],
        correctAnswer: "Silverchair",
        Image: "Assets/Images/gif/Silverchair.gif"
    }
}

//global variables
var card = $('#trivia-area');
var questionKey;
var questionToGuess;
var counter = 0;
var timer = 0;
var correct = 0;
var wrong = 0;
var question;
var answers;
var correctAnswer;
var countDown;
var interval;
var gif;

//Functions to display the game
createQuestArea = function(){
    $('#btn-play').hide();
    card.html('<h2 class= "col-md-12" id="counter"></h2>')
    questionsKey = Object.keys(questions);
    questionToGuess = questionsKey[counter];
    getQuestion();
}

getQuestion = function(){
    countDown = 20;
    interval = setInterval(timer, 1000);
    question = questions[questionToGuess]["question"];
    answers = questions[questionToGuess]["answers"];
    correctAnswer = questions[questionToGuess]["correctAnswer"];
    gif = questions[questionToGuess]["Image"];
    console.log(question, answers, correctAnswer, gif);
    card.append('<h2 class= "col-md-12" style="margin: 20px">'+question+'<h2>');
    for( i=0; i<answers.length; i++){
        card.append('<button class="btn btn-block bg-warning" style="margin: 20px" id="button" data-name="' +answers[i]+ '">'+answers[i]+'</button>');
    }
}

timer = function(){
    countDown--;
    $('#counter').text("Time remaining: "+countDown+" seconds left");
    if (countDown === 0){
        timeUp();
    }
}

timeUp = function() {
    clearInterval(interval);
    card.html('<h2 class= "col-md-12">Out of Time!</h2>');
    card.append('<h3 class= "col-md-12">The Correct Answer was: ' + correctAnswer);
    card.append('<div class="col-md-12" style="margin-bottom: 5%"><img id="gif-answer" src="' + gif + '"/></div>');
    if (counter === questionsKey.length - 1) {
        setTimeout(results, 2*1000);
    }
    else {
        setTimeout(nextQuestion, 2*1000);
    }
}

clicked = function(e) {
    if ($(e.target).attr("data-name") === correctAnswer) {
        answeredCorrectly();
    }
    else {
        answeredIncorrectly();
    }
}

answeredIncorrectly = function() {
    wrong++;
    console.log(wrong+" incorrect")
    clearInterval(interval);
    card.html('<h2 class="col-md-12">Nope!</h2>');
    card.append('<h3 class="col-md-12">The Correct Answer was: ' + correctAnswer + '</h3>');
    card.append('<div class="col-md-12" style="margin-bottom: 5%"><img id="gif-answer" src="' + gif + '"/></div>');
    //setTimeout(nextQuestion, 3*1000);
    if (counter === questionsKey.length - 1) {
        setTimeout(results, 2*1000);
    }
    else {
        setTimeout(nextQuestion, 2*1000);
    }
}

answeredCorrectly = function() {
    correct++;
    console.log(correct+" correct");
    clearInterval(interval);
    card.html('<h2 class="col-md-12">Correct!</h2>');
    card.append('<div class="col-md-12" style="margin-bottom: 5%"><img id="gif-answer" src="' + gif + '"/></div>');
    //setTimeout(nextQuestion, 3*1000);
    if (counter === questionsKey.length - 1) {
        setTimeout(results, 2*1000);
    }
    else {
        setTimeout(nextQuestion, 2*1000);
    }
}

nextQuestion = function(){
    counter++;
    createQuestArea();
}

results = function(){
    clearInterval(timer);

    card.html('<h2 class="col-md-12">You finished, here are your results!</h2>');
    card.append('<h3 class="col-md-12">Correct Answers: ' + correct + '</h3>');
    card.append('<h3 class="col-md-12">Incorrect Answers: ' + wrong + '</h3>');
    card.append('<h3 class="col-md-12">Unanswered: ' + (questionsKey.length - (wrong + correct)) + '</h3>');
}

//Click events of the buttons
$(document).on("click", "#btn-play", function(){
    createQuestArea();
})


$(document).on("click", ".btn-block", function(e) {
    clicked(e);
});