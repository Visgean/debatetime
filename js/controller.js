angular.module('TimerApp', []).
filter('digits', function() {
	return function(input) {
		if (input < 10 & input >= 0) input = '0' + input;

		return input;
	}
});

function TimeCtrl($scope) {
	$scope.speeches = [
	{
		'speaker': '1st Prop',
		'speaker_full': '1st Proposition speaker',
		'speech_length': 8*60,
			'offset' : 30, //how much time does the speaker have after the 'end' of the debate before MUTE
			'events' :[
			{
					'name':'Points allowed', // this will be used as subtitle
					'time_from_end': 7*60, // when this event happends after start?
				},
				{
					'name':'Points forbidden', // this will be used as subtitle
					'time_from_end': 60, // when this event happends after start?
				}
				]
			},
			{
				'speaker': '1st Opp',
				'speaker_full': '1st Opposition speaker',

				'speech_length': 8*60,
			'offset' : 30, //how much time does the speaker have after the 'end' of the debate before MUTE
			'events': [
			{
					'name':'Points allowed', // this will be used as subtitle
					'time_from_end': 60, // when this event happends after start?
				},
				{
					'name':'Points forbidden', // this will be used as subtitle
					'time_from_end': 7*60, // when this event happends after start?
				}
				]
			},
			{
				'speaker': '2nd Prop',
				'speaker_full': '2nd Proposition speaker',
				'speech_length': 8*60,
			'offset' : 30, //how much time does the speaker have after the 'end' of the debate before MUTE
			'events': [
			{
					'name':'Points allowed', // this will be used as subtitle
					'time_from_end': 60, // when this event happends after start?
				},
				{
					'name':'Points forbidden', // this will be used as subtitle
					'time_from_end': 7*60, // when this event happends after start?
				}
				]
			},
			{
				'speaker': '2nd Opp',
				'speaker_full': '2nd Opposition speaker',

				'speech_length': 8*60,
			'offset' : 30, //how much time does the speaker have after the 'end' of the debate before MUTE
			'events': [
			{
					'name':'Points allowed', // this will be used as subtitle
					'time_from_end': 60, // when this event happends after start?
				},
				{
					'name':'Points forbidden', // this will be used as subtitle
					'time_from_end': 7*60, // when this event happends after start?
				}
				]
			},
			{
				'speaker': '3rd Prop',
				'speaker_full': '3rd Proposition speaker',
				'speech_length': 8*60,
			'offset' : 30, //how much time does the speaker have after the 'end' of the debate before MUTE
			'events': [
			{
					'name':'Points allowed', // this will be used as subtitle
					'time_from_end': 60, // when this event happends after start?
				},
				{
					'name':'Points forbidden', // this will be used as subtitle
					'time_from_end': 7*60, // when this event happends after start?
				}
				]
			},
			{
				'speaker': '3rd Opp',
				'speaker_full': '3rd Opposition speaker',
				'speech_length': 8*60,
			'offset' : 30, //how much time does the speaker have after the 'end' of the debate before MUTE
			'events': [
			{
					'name':'Points allowed', // this will be used as subtitle
					'time_from_end': 60, // when this event happends after start?
				},
				{
					'name':'Points forbidden', // this will be used as subtitle
					'time_from_end': 7*60, // when this event happends after start?
				}
				]
			},
			{
				'speaker': 'Reply Prop',
				'speaker_full': 'Proposition Reply speaker',
				'speech_length': 5*60,
			'offset' : 30, //how much time does the speaker have after the 'end' of the debate before MUTE
			'events': [
			]
		},
		{
			'speaker': 'Reply Opp',
			'speaker_full': 'Opposition Reply speaker',

			'speech_length': 5*60,
			'offset' : 30, //how much time does the speaker have after the 'end' of the debate before MUTE
			'events': [
			]
		},
		];


	$scope.current_index = 0; // at what speech is it now?
	$scope.bg_color = ''
	$scope.Math = window.Math;

	$scope.go_pink = function (color) { 
		$scope.bg_color = color;
		
	};


	$scope.prepare_speaker = function () { // this function sets data for current speaker
		$scope.running = false;
		$scope.current_speech = $scope.speeches[$scope.current_index];
		$scope.time_left = $scope.current_speech.speech_length;
		$scope.time_left_m = Math.floor($scope.time_left/60);
		$scope.time_left_s = Math.floor($scope.time_left%60);

		$scope.progress = 100; //seconds
	};


	$scope.time_updater = function () {
		if ($scope.running) {
			var now = new Date().getTime()/1000;
			

			if ($scope.end_timestamp<=now) { // uz jsme v minusu
				$scope.progress = 0;
				diff = now - $scope.end_timestamp;
				$scope.time_left = -diff; // time left musi byt negativni - jinak se bude spatne delat soucet
			}
			else {
				diff = $scope.end_timestamp - now;
				$scope.time_left = diff;
				$scope.progress = Math.floor(($scope.time_left/ $scope.current_speech.speech_length)*100);
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
		$scope.current_speech.real_length = Math.floor($scope.current_speech.speech_length - $scope.time_left);
		$scope.current_speech.real_length_m = Math.floor($scope.current_speech.real_length/60);
		$scope.current_speech.real_length_s = Math.floor($scope.current_speech.real_length%60);
		
		if ($scope.current_index < $scope.speeches.length-1) { 
			$scope.current_index++;
			$scope.prepare_speaker();
		}
		else {
			$('#final_modal').foundation('reveal', 'open');
		};

	};

	$scope.CloseFinalModal = function () {
		$('#final_modal').foundation('reveal', 'close');
		$scope.current_index = 0;
		$scope.prepare_speaker();
	};


	$scope.prepare_speaker(); //init values

}
