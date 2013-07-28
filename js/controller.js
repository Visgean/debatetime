angular.module('TimerApp', []).
filter('digits', function() {
	return function(input) {
		if (input < 10 & input >= 0) input = '0' + input;

		return input;
	}
});

function TimeCtrl($scope) {
	$scope.current_index = 0; // at what speech is it now?
	$scope.pink_active = false;
	$scope.speeches = [
		{
			'speaker': '1st Prop',
			'speech_length': 8*60,
		},
		{
			'speaker': '1st Opp',
			'speech_length': 8*60,
		},
		{
			'speaker': '2nd Prop',
			'speech_length': 8*60,
		},
		{
			'speaker': '2nd Opp',
			'speech_length': 8*60,
		},
		{
			'speaker': '3rd Prop',
			'speech_length': 8*60,
		},
		{
			'speaker': '3rd Opp',
			'speech_length': 8*60,
		},
		{
			'speaker': 'Reply Prop',
			'speech_length': 5*60,
		},
		{
			'speaker': 'Reply Opp',
			'speech_length': 5*60,
		},
	];


	$scope.go_pink = function () { //this cannot use angular as controller is activated after body tag
		if ($scope.pink_active) {
			$('body').css({ "background-color": ''});
		}
		else {
			$('body').css({ "background-color": 'pink'});
		};
		$scope.pink_active = !$scope.pink_active;
		
	};


	$scope.prepare_speaker = function () { // this function sets data for current speaker
		$scope.running = false;
		$scope.current_speech = $scope.speeches[$scope.current_index];
		$scope.time_left = $scope.current_speech.speech_length;
		$scope.time_left_m = Math.floor($scope.time_left/60);
		$scope.time_left_s = Math.floor($scope.time_left%60);

		$scope.progress = 00; //seconds
	};


	$scope.time_updater = function () {
		if ($scope.running) {
			var now = new Date().getTime()/1000;
			

			if ($scope.end_timestamp<=now) { // uz jsme v minusu
				$scope.progress = 100;
				diff = now - $scope.end_timestamp;
				$scope.time_left = -diff; // time left musi byt negativni - jinak se bude spatne delat soucet
			}
			else {
				diff = $scope.end_timestamp - now;
				$scope.time_left = diff;
				$scope.progress = 100 - Math.floor(($scope.time_left/ $scope.current_speech.speech_length)*100);
			};
			
			$scope.time_left_m = Math.floor(diff/60);
			$scope.time_left_s = Math.floor(diff%60);

			$scope.$apply();
		};
	};

	$scope.Pause = function () {
		if (!$scope.running) {
			var now = new Date().getTime()/1000;
			$scope.end_timestamp = now + $scope.time_left;
			$scope.running = true;
			$scope.timer = setInterval($scope.time_updater, 500);
		}
		else {
			clearInterval($scope.timer);
			$scope.running = false;
		};
	};

	$scope.NextSpeaker = function () {
		if ($scope.current_index < $scope.speeches.length-1) { 
			$scope.current_index++;
		}
		else {
			$scope.current_index = 0;
		};

		$scope.current_speech.real_length = Math.floor($scope.current_speech.speech_length - $scope.time_left);

		$scope.current_speech.real_length_m = Math.floor($scope.current_speech.real_length/60);
		$scope.current_speech.real_length_s = Math.floor($scope.current_speech.real_length%60);

		$scope.prepare_speaker();
	};


	$scope.prepare_speaker(); //init values

}
