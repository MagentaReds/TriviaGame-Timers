


var trivia_game = {
  questions: null,
  currentQuestion: null,
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  timerId: null,
  timeoutId: null,
  timeLeft: 0,

  newGame: function(){
    this.correct=0;
    this.incorrect=0;
    this.unanswered=0;
    this.timerId=null;
    this.timeoutId=null;
    this.timeLeft=0;
    this.questions=JSON.parse(JSON.stringify(myQuestions));
    console.log(this.questions);

    this.startDisplay();
    this.runGame();
  },

  startDisplay: function() {
    //console.log($("#start"));
    $("#start, #div-results, #answer-display").hide();
    $("#div-question, #choices-display").show();
  },

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

  fillQuestionDisplay: function() {
    console.log(this.currentQuestion);
    $("#timer-display > h3 > span").text("10");
    $("#question-display > h3").text(this.currentQuestion.question);
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

  displayGameResults: function() {
    $("#div-question").hide();
    $("#div-results").show();

    $("#correct-answers").text(this.correct);
    $("#incorrect-answers").text(this.incorrect);
    $("#unanswered-answers").text(this.unanswered);
  },

  setTimer: function() {
    this.timeLeft=10;
    this.timeoutId=setTimeout(timedOut, 11000);
    this.timerId= setInterval(timerUpdate, 1000);
  },

  timedOut: function() {
    this.selectAnswer("timeout");
  },

  timerUpdate: function() {
    //console.log(this.timeLeft--);
    $("#timer-display > h3 > span").text(--(this.timeLeft));
  },

  //sent "true", "false", "timeout" depending on the user selection, or the timer running out.
  selectAnswer: function(answer) {
    clearTimeout(this.timeoutId);
    clearInterval(this.timerId);

    //console.log(bool);
    $("#choices-display").hide();
    $("#answer-display").show();
    $("#image-display").attr("src", this.currentQuestion.image);

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
    
    $("#question-display > h3").text(result);
    $("#answer-display > h3").text(correctAnswer);

    setTimeout(nextRound, 5000);
  }

    


};

$("#start, #restart").on("click", function() { trivia_game.newGame(); });
$(".answer-select").on("click", function() { trivia_game.selectAnswer($(this).attr("data-bool")); });

//helper functions for interval and setTimeout to get correct execution context
function timedOut() {
  trivia_game.timedOut();
}
function timerUpdate() {
  trivia_game.timerUpdate();
}
function nextRound() {
  trivia_game.runGame();
}