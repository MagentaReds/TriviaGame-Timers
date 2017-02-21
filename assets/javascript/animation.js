var myTimeout =null;
 
//fancy animations, that lead into the game starting
function startAnimation(){
  $("#title1").animate({"opacity": "1"}, 5000, animate2);  
}

function animate2(){
  $("#title1").animate({"opacity": "0"}, 2000, function() { $("#title1").attr("src", "./assets/images/titleshot.jpg"); });
  $("#title2").animate({"opacity": "1", "height": "480px"}, 2000); 
  myTimeout=setTimeout(animate3, 4000);
}

function animate3() {
  $("#title2").animate({"opacity": "0"}, 2000); 
  $("#title1").animate({"opacity": "1"}, 2000); 
  $("#title-subtext").animate({"opacity": "1"}, 4000); 
  myTimeout=setTimeout(animate4, 5000);
}

function animate4(){
  $("#title1").animate({"opacity": "0"}, 2000); 
  $("#title-subtext").animate({"opacity": "0"}, 2000); 
  myTimeout=setTimeout(displayIntro, 2000, 0);
}

function fadeInIntro(index) {
  $("#title1").attr("src", myIntros[index].url);
  $("#title-subtext").text(myIntros[index].desc);
  $("#title1").animate({"opacity": "1"}, 1000); 
  $("#title-subtext").animate({"opacity": "1"}, 1000);
}

function fadeOutIntro(){
  $("#title1").animate({"opacity": "0"}, 1000); 
  $("#title-subtext").animate({"opacity": "0"}, 1000);
}

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

function endAnimation() {
  clearTimeout(myTimeout);
  $("#animation").addClass("hidden");
  $("#trivia-main").removeClass("hidden");
  $(".off-screen-vertical-center").animate({"margin-top": "0"}, 3000);
}