angular.module('TimerApp', []).
  filter('digits', function() {
    return function(input) {
       if (input < 10) input = '0' + input;
      
      return input;
    }
  });

function TimeCtrl($scope) {
	$scope.running= false;
	$scope.current_index = 0; // at what speech is it now?
	$scope.time_left = 0; // how much time do we have left?
	$scope.time_left_m = 0; //minutes
	$scope.time_left_s = 00; //seconds

	$scope.end_timestamp = false; // current timestamp + time_left
	$scope.time_holder = document.getElementById("timeholder");
	$scope.speeches = [
		{
			'speech_length': 8*60,
			'speaker': '1st Prop',
			'offset' : 30, //how much time does the speaker have after the 'end' of the debate before MUTE
			'events' :[
				{
					'name':'Points allowed', // this will be used as subtitle
					'time_from_start': 60, // when this event happends after start?
				},
				{
					'name':'Points forbidden', // this will be used as subtitle
					'time_from_start': 7*60, // when this event happends after start?
				}
			]
		},
		{
			'speech_length': 8*60,
			'speaker': '2st Opp',
			'offset' : 30, //how much time does the speaker have after the 'end' of the debate before MUTE
			'events': [
				{
					'name':'Points allowed', // this will be used as subtitle
					'time_from_start': 60, // when this event happends after start?
				},
				{
					'name':'Points forbidden', // this will be used as subtitle
					'time_from_start': 7*60, // when this event happends after start?
				}
			]
		},
	];


	$scope.prepare_speaker = function () {
		// this function sets data for current speaker
		$scope.running = false;
		$scope.current_speech = $scope.speeches[$scope.current_index];
		$scope.time_left = $scope.current_speech.speech_length;
		$scope.time_left_m = Math.floor($scope.time_left/60);
		$scope.time_left_s = Math.floor($scope.time_left%60);

	};


	$scope.time_updater = function () {
		if ($scope.running) {
			var now = new Date().getTime()/1000;
			diff = $scope.end_timestamp - now;
			$scope.time_left = diff;
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
			$scope.timer = setInterval($scope.time_updater, 1000);
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
		$scope.prepare_speaker();
	};


	$scope.prepare_speaker(); //init values

}
