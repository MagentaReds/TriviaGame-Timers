


var trivia_game = {
  questions: null,
  currentQuestion: null,
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  timerId: null,
  timeoutId: null,
  timeLeft: 0,

  //starts/restarts the game round
  newGame: function(){
    this.correct=0;
    this.incorrect=0;
    this.unanswered=0;
    this.timerId=null;
    this.timeoutId=null;
    this.timeLeft=0;
    this.questions=JSON.parse(JSON.stringify(myQuestions));
    //console.log(this.questions);

    this.startDisplay();
    this.runGame();
  },

  //hide/shows divs we want hidden at the start of the game once the start/restart button is pressed
  //using bootstrap's hidden/show classes
  startDisplay: function() {
    $("#start, #div-results, #answer-display, #bonus-button").addClass("hidden");
    $("#div-question, #choices-display").removeClass("hidden");
  },

  //main game function, displays a question and anwsers, sets timers
  //randomally chooses a question for the list of function
  runGame: function() {
    if(this.questions.length>0) {
      this.startDisplay();
      var randomIndex=Math.floor(Math.random()*this.questions.length);
      this.currentQuestion= this.questions[randomIndex];
      this.questions.splice(randomIndex, 1);

      this.fillQuestionDisplay();
      this.setTimer();
    }
    else {
      this.displayGameResults();

    }
  },

  //using jquery, fill in the DOM based on the currentQuestion
  //choices are shown in a random order
  fillQuestionDisplay: function() {
    //console.log(this.currentQuestion);
    $("#timer-display").text("10");
    $("#question-display").text(this.currentQuestion.question);
    $("#image-display").attr("src", this.currentQuestion.image);
    for(var i=0; i<4; ++i) {
      var rng=Math.floor(Math.random()*this.currentQuestion.choices.length);
      var randomChoice=this.currentQuestion.choices[rng];
      this.currentQuestion.choices.splice(rng, 1);

      var divSelect="#answer"+i;

      $(divSelect+" > h2").text(randomChoice);

      if(randomChoice===this.currentQuestion.answer)
        $(divSelect).attr("data-bool", "true");
      else 
        $(divSelect).attr("data-bool", "false");
    }
  },

  //display the end of game stats, shows/hides elements we want
  //also unhides the bonus button if you get all the questions right
  displayGameResults: function() {
    $("#div-question").addClass("hidden");
    $("#div-results").removeClass("hidden");
    if(this.incorrect===0 && this.unanswered===0)
      $("#bonus-button").removeClass("hidden");

    $("#correct-answers").text(this.correct);
    $("#incorrect-answers").text(this.incorrect);
    $("#unanswered-answers").text(this.unanswered);
  },

  //sets Timeout and Interval for a question countdown and automatic timeout if the user doesn't select an answer
  setTimer: function() {
    this.timeLeft=10;
    this.timeoutId=setTimeout(timedOut, 11000);
    this.timerId= setInterval(timerUpdate, 1000);
  },

  //function that is called if the question timer times out, calls selectAnswer with that a specific case
  timedOut: function() {
    this.selectAnswer("timeout");
  },

  //function that the interval countdown calls, updates the timer on the page
  timerUpdate: function() {
    //console.log(this.timeLeft--);
    $("#timer-display").text(--(this.timeLeft));
  },

  //called with "true", "false", "timeout" depending on the user selection, or the timer running out.
  //clears timers/intervals, displays the result of the answer for that question for a few seconds with a Timeout
  //automatically start's next round after 5 seconds
  selectAnswer: function(answer) {
    clearTimeout(this.timeoutId);
    clearInterval(this.timerId);

    //console.log(bool);
    $("#choices-display").addClass("hidden");
    $("#answer-display").removeClass("hidden");

    var result="";
    var correctAnswer = "";
    if(answer==="true"){
      ++(this.correct);
      result="Correct!";
    }
    else if(answer==="false") {
      ++(this.incorrect);
      result="Incorrect!";
      correctAnswer="The correct answer was: "+this.currentQuestion.answer;
    }
    else {
      ++(this.unanswered);
      result="Out of Time!";
      correctAnswer="The correct answer was: "+this.currentQuestion.answer;

    }
    
    $("#question-display").text(result);
    $("#correct-answer").text(correctAnswer);
    $("#question-info").text(this.currentQuestion.info);

    setTimeout(nextRound, 5000);
  }

    


};

//since DOM elements are always on the page and only shown, hidden, we only need to set the on click event listeners once for those elements
$("#start, #restart").on("click", function() { trivia_game.newGame(); });
$(".answer-select").on("click", function() { trivia_game.selectAnswer($(this).attr("data-bool")); });
$("#skip-intro").on("click", endAnimation);
$("#bonus-button").on("click", function() { 
  var myElement = document.getElementById("bonus");
  myElement.volume = .2;
  myElement.play();
});

//helper functions for interval and setTimeout to get correct execution context when set from inside trivia_game
function timedOut() {
  trivia_game.timedOut();
}
function timerUpdate() {
  trivia_game.timerUpdate();
}
function nextRound() {
  trivia_game.runGame();
}




//Start the intro page animation
startAnimation();