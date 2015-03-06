//Self-invoking function on page load
(function(){


	var mole = document.getElementsByClassName('mole');
	var score;
	var level;
	var timeLimit;
	var moleNum;
	var health;
	var squeak = new Audio('../sound/rat_upset.wav');

	//randomly select a hole & fade-in a mole img
	//repeat this process if unclicked
	function moleGenerator(){
		score = 0;
		level = 1;
		moleNum = 0;
		health = 5;
		timeLimit = 3000;
		var oldMissedMoles = 0;
		var currentMissedMoles = 0;
		$('#score').text(score);
		$('#level').text(level);
		$('#health').text(health);

		var interval = setInterval(function() {
			//captures missed moles from last round
			oldMissedMoles = currentMissedMoles;
			console.log("OldMissedMoles: " + oldMissedMoles);
			
			//randomly select a mole and animate it
			var a = Math.floor(Math.random() * 9);	//a = index of holes
			animate(mole[a]);
			moleNum++;

			//add a click event to generated mole
			$(mole[a]).one('click', function(){
				squeak.play();
				$(this).fadeOut('fast');
				score++;
				$('#score').text(score);

				//increase level & speed every 4 points
				if(score % 4 == 0){
					timeLimit *= 0.75;
					level++
					$('#level').text(level);
				}
			});

			//Wait for click before calculating a miss
			setTimeout(function(){
				currentMissedMoles = moleNum - score;
				console.log("CurrentMissedMoles: " + currentMissedMoles);
				if(currentMissedMoles > oldMissedMoles){
					health--;
					$('#health').text(health);
				}

				if(health == 0){
					clearInterval(interval);
					$('#stop').css('display', 'none');
					$('#start').css('display', 'inline-block');
					alert("!!!GAME OVER!!!");
				}
			}, timeLimit/1.3);

			//Stop button resets game, turns self off, & turns on Start button
			$('#stop').click(function(){
				clearInterval(interval);
				$(this).css('display', 'none');
				$('#start').css('display', 'inline-block');
			});

		}, timeLimit);
	};

	//Animate each random mole
	function animate(thisMole){
			$(thisMole).fadeIn(timeLimit/2);
			setTimeout(function(){
				$(thisMole).fadeOut(timeLimit/4);
			}, timeLimit/1.5);
	};

	//Start button begins game, turns self off, and turns on Stop button
	$('#start').click(function(){
		$(this).css('display', 'none');
		$('#stop').css('display', 'inline-block');
		moleGenerator();
	});



// End self-invoking function
})();