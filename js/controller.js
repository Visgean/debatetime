function TimeCtrl($scope) {
	$scope.running= false;
	$scope.current_index = 0; // at what speech is it now?

	$scope.speeches = [
		{
			'length': 8*60,
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
			'length': 8*60,
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




}
