$(document).ready(function () {
	let questionCount = 0;
	let correctAnswer = 0;
	let incorrectAnswer = 0;
	const countdownTimer = {
		time: 60,
		reset: function () {
			this.time = 60;
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
			if (countdownTimer.time >= 0) {
				$("#timer").html('<h3>' + countdownTimer.time + ' seconds remaining</h3>');
			}
			else {
				questionCount++;
				answerWrong();
				countdownTimer.reset();
				if (questionCount < questionArray.length) {
					loadQuestion(questionCount);
				} else {
					$(".answerchoice").hide();
					showScore();
				}
			}
		}
	};
	function setup() {
		$('#question').append('<button id="startButton" class="yellow-button">Start Quize</button>');
		$('#startButton').on('click', function () {
			$(this).hide();
			countdownTimer.start();
			loadQuestion(questionCount);
		});
	}
	function loadQuestion(questionSelection) {
		countdownTimer.reset();
		$("#question").html(questionArray[questionSelection].question);
		for (let i = 0; i < questionArray[questionSelection].answers.length; i++) {
			const answers = $("#button" + i).text(questionArray[questionSelection].answers[i]).show()
			$("#button" + i).val(questionArray[questionSelection].answers[i])
			$("#answers").append(answers)
		}
		showProgress()
	}
	function getAnswer() {
		$(document).on('click', '.answerchoice', function () {
			questionCount++;
			$("#question").text('');
			loadQuestion();
		})
	}
	function answerCorrect() {
		correctAnswer++;
		alert("Correct answer")
	}
	function answerWrong() {
		incorrectAnswer++;
		alert(`Wrong answer! Correct ansewer is: ${questionArray[questionCount].correct}`)
	}
	function showProgress() {
		const progress = $("#result").text(correctAnswer + " out of " + questionArray.length);
	}
	function showScore() {
		countdownTimer.stop();
		$("#timer").empty();
		$('#score').append(`<button id="restart" class="yellow-button">Restart</button>`)
		$("#result").text(correctAnswer + ' out of ' + questionArray.length)
		$('#score').on('click',() =>{ location.reload()} )
	}
	setup();
	$(document).on('click', '.answerchoice', function () {
		if ($(this).val() == questionArray[questionCount].correct) {
			answerCorrect();
		} else {
			answerWrong();
		}
		questionCount++;
		if (questionCount < questionArray.length) {
			loadQuestion(questionCount);
		} else {
			$("#answers").hide();
			$("#question").hide();
			showScore();
		}
	});
});