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
		'events' :[
			{
					'name':'Points forbidden', // this will be used as subtitle
					'start_time': 0, // when this event happens before end?
					'duration': 60, // how long is it going to last?
				},
				{
					'name':'Points allowed', // this will be used as subtitle
					'start_time': 60, // when this event happends after start?
					'duration': 6*60, // how long is it going to last?
				}
				]
			},
			{
				'speaker': '1st Opp',
				'speaker_full': '1st Opposition speaker',

				'speech_length': 8*60,
			'offset' : 30, //how much time does the speaker have after the 'end' of the debate before MUTE
			'events' :[
			{
					'name':'Points forbidden', // this will be used as subtitle
					'start_time': 0, // when this event happens before end?
					'duration': 60, // how long is it going to last?
				},
				{
					'name':'Points allowed', // this will be used as subtitle
					'start_time': 60, // when this event happends after start?
					'duration': 6*60, // how long is it going to last?
				}
				]
			},
			{
				'speaker': '2nd Prop',
				'speaker_full': '2nd Proposition speaker',
				'speech_length': 8*60,
				'events' :[
				{
					'name':'Points forbidden', // this will be used as subtitle
					'start_time': 0, // when this event happens before end?
					'duration': 60, // how long is it going to last?
				},
				{
					'name':'Points allowed', // this will be used as subtitle
					'start_time': 60, // when this event happends after start?
					'duration': 6*60, // how long is it going to last?
				}
				]
			},
			{
				'speaker': '2nd Opp',
				'speaker_full': '2nd Opposition speaker',

				'speech_length': 8*60,
				'events' :[
				{
					'name':'Points forbidden', // this will be used as subtitle
					'start_time': 0, // when this event happens before end?
					'duration': 60, // how long is it going to last?
				},
				{
					'name':'Points allowed', // this will be used as subtitle
					'start_time': 60, // when this event happends after start?
					'duration': 6*60, // how long is it going to last?
				}
				]
			},
			{
				'speaker': '3rd Prop',
				'speaker_full': '3rd Proposition speaker',
				'speech_length': 8*60,
				'events' :[
				{
					'name':'Points forbidden', // this will be used as subtitle
					'start_time': 0, // when this event happens before end?
					'duration': 60, // how long is it going to last?
				},
				{
					'name':'Points allowed', // this will be used as subtitle
					'start_time': 60, // when this event happends after start?
					'duration': 6*60, // how long is it going to last?
				}
				]
			},
			{
				'speaker': '3rd Opp',
				'speaker_full': '3rd Opposition speaker',
				'speech_length': 8*60,
				'events' :[
				{
					'name':'Points forbidden', // this will be used as subtitle
					'start_time': 0, // when this event happens before end?
					'duration': 60, // how long is it going to last?
				},
				{
					'name':'Points allowed', // this will be used as subtitle
					'start_time': 60, // when this event happends after start?
					'duration': 6*60, // how long is it going to last?
				}
				]
			},
			{
				'speaker': 'Reply Prop',
				'speaker_full': 'Proposition Reply speaker',
				'speech_length': 4*60,
				'events': [
				]
			},
			{
				'speaker': 'Reply Opp',
				'speaker_full': 'Opposition Reply speaker',

				'speech_length': 4*60,
				'events': [
				]
			},
			];


	$scope.current_index = 0; // at what speech is it now?
	$scope.bg_color = ''
	$scope.Math = window.Math;


	$scope.stopwatch_running = false;
	$scope.stopwatch_time_done = 0;
	$scope.stopwatch_time_done_m = 0;
	$scope.stopwatch_time_done_s = 0;
	$scope.stopwatch_time_done_before_pause = 0;

	$scope.stopwatch_times = [];


	$scope.go_pink = function (color) { 
		$scope.bg_color = color;
		
	};


	$scope.prepare_speaker = function () { // this function sets data for current speaker
		$scope.running = false;
		$scope.current_speech = $scope.speeches[$scope.current_index];
		$scope.time_left = $scope.current_speech.speech_length;
		$scope.time_left_m = Math.floor($scope.time_left/60);
		$scope.time_left_s = Math.floor($scope.time_left%60);
		$scope.time_done = 0;


		$scope.progress = 100; //seconds
	};

	$scope.prepare_speaker(); //init values


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

			$scope.time_done = Math.floor($scope.current_speech.speech_length - $scope.time_left)+1;

			$scope.$apply();
		};
	};

	$scope.Pause = function () {
		if (!$scope.running) {
			var now = new Date().getTime()/1000;
			$scope.end_timestamp = now + $scope.time_left;
			$scope.running = true;
			$scope.timer = setInterval($scope.time_updater, 100);
		}
		else {
			clearInterval($scope.timer);
			$scope.running = false;
		};
	};

	$scope.NextSpeaker = function () {
		clearInterval($scope.timer);

		$scope.current_speech.real_length = $scope.time_done;
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


	$scope.GetCurrentEvents = function () {
		var current_events = [];	

		angular.forEach($scope.current_speech.events, function(debate_event){
			if ($scope.time_done > debate_event.start_time & $scope.time_done < (debate_event.start_time + debate_event.duration)) {
				this.push(debate_event);
			};
		}, current_events);

		return (current_events);
	};

	$scope.GetProgressForEvent = function (debate_event) {
		var event_done =  $scope.time_done - debate_event.start_time;
		var percentage = 100-(event_done / debate_event.duration)*100;

		return (percentage);
	};


	$scope.Stopwatch = function () {
		$('#stopwatch').foundation('reveal', 'open');
	};

	$scope.stopwatch_time_updater = function () {
		if ($scope.stopwatch_running) {
			var now = new Date().getTime()/1000;
			$scope.stopwatch_time_done = (now - $scope.stopwatch_start) + $scope.stopwatch_time_done_before_pause;
			$scope.stopwatch_time_done_m = Math.floor($scope.stopwatch_time_done/60);
			$scope.stopwatch_time_done_s = Math.floor($scope.stopwatch_time_done%60);

			$scope.$apply();
		};
	};

	$scope.StopwatchPause = function () {
			if (!$scope.stopwatch_running) {
				var now = new Date().getTime()/1000;
				$scope.stopwatch_start = now;
				$scope.stopwatch_running = true;

				$scope.stopwatch_timer = setInterval($scope.stopwatch_time_updater, 100);
			}
			else {
				clearInterval($scope.stopwatch_timer);
				$scope.stopwatch_running = false;
				$scope.stopwatch_time_done_before_pause = $scope.stopwatch_time_done;
			};
		};

	$scope.StopwatchNewTime = function () {
			$scope.stopwatch_times.push($scope.stopwatch_time_done);
			clearInterval($scope.stopwatch_timer);
			$scope.stopwatch_running = false;

			$scope.stopwatch_time_done_before_pause = 0	
			$scope.stopwatch_time_done = 0;
			$scope.stopwatch_time_done_m = 0;
			$scope.stopwatch_time_done_s = 0;
	
		};
		

}
