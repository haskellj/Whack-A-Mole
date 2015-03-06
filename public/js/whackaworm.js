//Self-invoking function on page load
(function(){


	var mole = document.getElementsByClassName('mole');
	var score;
	var level;
	var timeLimit;
	var moleNum;
	var health;

	//randomly select a hole & fade-in a mole img
	//repeat this process if unclicked
	function moleGenerator(){
		score = 0;
		level = 1;
		moleNum = 0;
		health = 5;
		timeLimit = 4000;
		var oldMissedMoles = 0;
		var currentMissedMoles = 0;
		$('#score').text(score);
		$('#level').text(level);
		$('#health').text(health);

		var interval = setInterval(function() {
			//captures missed moles from last round
			oldMissedMoles = currentMissedMoles;
			
			//randomly select a mole and animate it
			var a = Math.floor(Math.random() * 12);	//a = index of holes
			animate(mole[a]);
			moleNum++;

			//add a click event to generated mole
			$(mole[a]).one('click', function(){
				$(this).effect('explode', timeLimit/4);
				score++;
				console.log('score: ' + score)
				$('#score').text(score);

				//increase level & speed every 4points
				if(score % 4 == 0){
					timeLimit *= 0.75;
					level++
					$('#level').text(level);
				}
			});

			//Wait for click before calculating a miss
			setTimeout(function(){
				currentMissedMoles = moleNum - score;

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

	//Animate each random mole using a JQuery UI plugin.
	//This plug-in confuses the click event when the speed increases,
	//causing occassional double-clicks to register.
	function animate(thisMole){
		$(thisMole).show('slide', {direction: 'down'}, timeLimit/2);
		setTimeout(function(){
			$(thisMole).hide('slide', {direction: 'down'}, timeLimit/4);
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