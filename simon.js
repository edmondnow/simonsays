
/* This is a Simon's says game based on FreeCodeCamp's requirements 
for more info, please visit https://www.freecodecamp.org/challenges/build-a-simon-game */

//execute .ready function to set lexical scope
$(document).ready(function() {

var pattern = []; //stores random array that denotes different colored quadrants
var onoff = 0; //records whether the simon says game has been turned on (0 = off);
var roundCount = 0; //counts the current rounds (max 20) (0 = computer);
var turn = 0; //records whether it's the turn of the computer or human
var roundCheck = []; //stores the played quadrants so far by the computer based on the round count 
var roundInput = []; //stores which pattern the user played each turn
var varStrict = 0; //records whether strict mode is turned on (0 = off);
var start = 0; //check if round was started (0 = off);


//Turn's on Simon machine
$(".begin").click(function(){

	$(".slider").toggleClass('slideranimate');

	if(onoff ==0){

		onoff = 1;

		$(".display-text").css("visibility","visible");
	} else {
	//Turn's off Simon machine and reset's variable's
		onoff = 0;
		pattern = [];
		roundCount = 0;
		turn = 0;
		roundCheck = [];
		roundInput = [];
		$(".display-text").css("visibility","hidden");
		updateRound(roundCount);
		$(".strict-on").removeClass("strict-it-on");

	}

})



//Turn's on Strict mode (if user fails to input correct pattern, new pattern is generated and user has to start over again)
$("#strict").click(function(){
	if(onoff==1&&varStrict==0){
		varStrict = 1;
		$(".strict-on").toggleClass("strict-it-on");
		//!!! must add trigger to turn on strict-mode
	} else if(onoff==1&&varStrict==1){
		varStrict = 0;
		$(".strict-on").toggleClass("strict-it-on");
	
	}


	})


//enables pattern to be be started by computer
$("#start").click(function(){
	randomGen();
	if(onoff==1&&start==0){
		start = 1
		turn = 0;
		roundCount++
		updateRound(roundCount);
		setTimeout(function(){
			playPattern();
		}, 1000);
		$(".display-text").css({'visibility':'visible'});

	
	} else if (onoff=1&&start==1){
		roundCount = 1;
		roundInput = [];
		roundCheck = [];
		randomGen();
		turn = 0;
		updateRound(roundCount);
		setTimeout(function(){
			playPattern();
		}, 2000);

	}

})



//updates round count on display (red digits)
function updateRound(roundCount){
	var updatedCount;
	if(roundCount.toString().length==1){
			updatedCount = '0'+roundCount;
		} else {updatedCount = roundCount;}

	$(".display-text").html(updatedCount);
}

//generates array of random numbers corresponding to quadrants
function randomGen(){

	pattern = [];

	for(var i = 0; i<20;i++){

		pattern.push(Math.floor(Math.random()*(4-1+1))+1);
	}

}

//records which quadrant is clicked and passes it to be animated and checked if correct
$(".pad").click(function(){
	if(turn==1){
		var div = this.outerHTML;
		if(div.indexOf('upper-left')!=-1){
			patternAnimate(1);
			inputCheck(1);
		} else if(div.indexOf('upper-right')!=-1){	
			patternAnimate(2);
			inputCheck(2);
		} else if(div.indexOf('lower-left')!=-1){
			patternAnimate(3);
			inputCheck(3);
		} else if(div.indexOf('lower-right')!=-1){
			patternAnimate(4);
			inputCheck(4);
		}

	}
})


//assign's to animaton() which quadrant to animate.
function patternAnimate(patternum){

		switch(patternum){
			case 1:
				var divName = $(".upper-left-quadrant");
				animation(divName, patternum);
				break;
			case 2: 
				var divName = $(".upper-right-quadrant");
				animation(divName, patternum);
				break;
			case 3:
				var divName = $(".lower-left-quadrant");
				animation(divName, patternum);
				break;
			case 4: 
				var divName = $(".lower-right-quadrant");
				animation(divName, patternum);
				break;

		}

}


//animates quadrants

function animation(divName, patternum){

		var audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound" + patternum + ".mp3");
		audio.play()
		divName.animate({opacity: "1"});
		setTimeout(function(){
			divName.animate({opacity: "0.5"});
		}, 1000)

}


//checks if input is correct

function inputCheck(input){

	roundInput.push(input);

	for(var i = 0; i<roundInput.length; i++){

		if(roundCheck[i]!=roundInput[i]){
			if(varStrict==1){
				randomGen();
				roundCount = 1;
			}
			var audio = new Audio("error.mp3");
			audio.play();
			turn = 0;
			roundInput = [];
			roundCheck = [];
			updateRound(roundCount);
			setTimeout(function(){
				playPattern();
			}, 2500)
			
		}

	}

		if(roundInput.length == roundCount){

			turn = 0;
			roundCount++;

			if(roundCount==20){
				win();
			}

			updateRound(roundCount);
			roundCheck = [];
			
			setTimeout(function(){
				playPattern();
			}, 2000)
		}

}



//play's computer's pattern up to Roundcount, reset's player's pattern


function playPattern(){

	roundInput = [];
	if(roundCheck.length<roundCount){
			patternAnimate(pattern[roundCheck.length]);
			roundCheck.push(pattern[roundCheck.length]);
			setTimeout(function(){
				playPattern();
			}, 1100)
	}else{
		turn = 1;
	}
	
}


//win() show's win animation and resets variables

checker = 0; //count's win animation

function win(){
	randomGen();
	turn = 0;
	checker++
	roundInput = [];
	roundCheck = [];
	roundCount = '!!'
	if(checker<5){
		
		patternAnimate(checker);
		win()
	} else {
		setTimeout(function(){roundCount = 0;updateRound(roundCount)}, 2000)
		
	}
	

}





























}) //END