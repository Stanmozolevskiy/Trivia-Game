$(document).ready(function () {
	var index = 0;
	var countdownTimer = {
		time: 30,
		reset: function () {
			this.time = 30;
			$("#timer").html('<h3>' + this.time + ' seconds remaining</h3>');
		},
		start: function () {
			counter = setInterval(countdownTimer.count, 1000);
		},
		stop: function () {
			clearInterval(counter);
		},
		count: function () {
			countdownTimer.time--;
			console.log(countdownTimer.time);
			if (countdownTimer.time >= 0) {
				$("#timer").html('<h3>' + countdownTimer.time + ' seconds remaining</h3>');
			}
			else {
				index++;
				answerWrong();
				countdownTimer.reset();
				if (index < questionArray.length) {
					loadQuestion(index);
				} else {
					$(".answerchoice").hide();
					showScore();
				}
			}
		}
	};
	var correctAnswer = 0;
	var incorrectAnswer = 0;
	
	function loadQuestion(questionSelection) {
		countdownTimer.reset();
		$("#question").html(questionArray[questionSelection].question);
		for (let i = 0; i < questionArray[questionSelection].answers.length; i++) {
			var answers = $("#button" + i).text(questionArray[questionSelection].answers[i]).show()
			$("#button" + i).val(questionArray[questionSelection].answers[i])
			$("#answers").append(answers)
		}
		showProgress()
	}

	function setup() {
		index = 0;
		$('#question').append('<button id="startButton">Start Quize</button>');
		$('#startButton').on('click', function () {
			$(this).hide();
			countdownTimer.start();
			loadQuestion(index);
		});
	}

	function getAnswer() {
		$(document).on('click', '.answerchoice', function () {
			console.log('alert', index);
			index++;
			console.log('click', index);
			$("#question").text('');
			loadQuestion();
		})
	}

	function answerCorrect() {
		correctAnswer++;
		alert("Correct")
		console.log("correct");
	}

	function answerWrong() {
		incorrectAnswer++;
		alert("Incorrect")
		console.log("wrong");
	}

	function showProgress(){
		var progress = $("#result").text(correctAnswer + " out of " + questionArray.length);
	}

	function showScore() {
		countdownTimer.stop();
		$("#timer").empty();
		var result = $("#result").text(orrectAnswer + ' out of ' + questionArray.length);
	}

	setup();
	$(document).on('click', '.answerchoice', function () {
		if ($(this).val() == questionArray[index].correct) {
			answerCorrect();
		} else {
			answerWrong();
		}
		index++;
		if (index < questionArray.length) {
			loadQuestion(index);
		} else {
			$("#answers").hide();
			$("#question").hide();
			// $("#timer").hide();
			showScore();
		}
	});
});