var myTimeout =null;
 
//fancy animations, that lead into the game starting
//each function does a thing, then set's a timeout to call the next "animation" function in the chain

//fade in "long ago"
function startAnimation(){
  $("#title1").animate({"opacity": "1"}, 5000);  
  myTimeout=setTimeout(animate2, 5000);
}

//fade out "long ago"
//fade in and grow "star wars"
function animate2(){
  var myElement = document.getElementById("intro-music");
  myElement.volume = 0.5;
  myElement.play();

  $("#title1").animate({"opacity": "0"}, 2000, function() { $("#title1").attr("src", "./assets/images/titleshot.jpg"); });
  $("#title2").animate({"opacity": "1", "height": "480px"}, 2000); 
  myTimeout=setTimeout(animate3, 4000);
}


//fade out "star wars" title
//fade in "star wars holidal sepcial" title and subtext
function animate3() {
  $("#title2").animate({"opacity": "0"}, 2000); 
  $("#title1").animate({"opacity": "1"}, 2000); 
  $("#title-subtext").animate({"opacity": "1"}, 4000); 
  myTimeout=setTimeout(animate4, 5000);
}

//fade out "star wars holidal sepcial" title and subtext
//preload first intro image
function animate4(){
  $("#title1").animate({"opacity": "0"}, 2000); 
  $("#title-subtext").animate({"opacity": "0"}, 2000); 

  //using title2 to preload image next for smooth browsing on slow/laggy internet connections
  $("#title2").attr("src", myIntros[0].url);
  myTimeout=setTimeout(displayIntro, 2000, 0);
}

//helper function to fade in intro image and subtext
//also preloads next image in a holder tag
function fadeInIntro(index) {
  //using title2 to preload image next for smooth browsing on slow/laggy internet connections
  //condition to stop outofbounds of the next access
  if(index<myIntros.length-1)
    $("#title2").attr("src", myIntros[index+1].url);

  $("#title1").attr("src", myIntros[index].url);
  $("#title-subtext").text(myIntros[index].desc);
  $("#title1").animate({"opacity": "1"}, 1000); 
  $("#title-subtext").animate({"opacity": "1"}, 1000);
}

//helper function to fade out intro image and subtext
function fadeOutIntro(){
  $("#title1").animate({"opacity": "0"}, 1000); 
  $("#title-subtext").animate({"opacity": "0"}, 1000);
}

//semi recursive function that loops through the array myIntros in intros.js
//after base base is if the index reaches the end of the array, it calls endAnimation to start displaying the main game page
function displayIntro(index){
  if(index>=myIntros.length) {
    setTimeout(endAnimation, 1000);
    return;
  }
  else {
    //console.log(myIntros[index]);
    fadeInIntro(index);
    setTimeout(fadeOutIntro, 2000);
    myTimeout=setTimeout(displayIntro, 3000, index+1);

  }

}


//after the animation finishes, or is canceld by the skip button, 
//animates the main game screen into view, letting you play the game
function endAnimation() {
  $("#intro-music").animate({volume: 0}, 1000, function() {
    document.getElementById("intro-music").pause();
  });
  clearTimeout(myTimeout);
  $("#animation").addClass("hidden");
  $("#trivia-main").removeClass("hidden");
  $(".off-screen-vertical-center").animate({"margin-top": "0"}, 2500);
}