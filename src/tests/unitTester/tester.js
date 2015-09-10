module.exports = (function initTester() {
	'use strict';

	var config = require('../../config');
	var extend = require("jquery-extend");

	// Testing data
	var answered = 0;
	var correct  = 0

	var totalAnswered = 0;
	var totalCorrect = 0;

	var obj;

	function testResult(func, args, expected, errorString, flag) {
		answered++;
		
		try {
			var newFlag = {};
			extend(
				newFlag,
				{ print: false },
				flag
			);

			if(newFlag.print) {
				var redefinedArgs = []
				for(var i = 0; i < args.length; ++i) {
					switch(args[i]) {
						case null:
							redefinedArgs.push('null');
							break;
						case undefined:
							redefinedArgs.push('undefined');
							break;
						case '':
							redefinedArgs.push('\'\'');
							break;
						default:
							if(typeof args[i] === 'object') {
								redefinedArgs.push(JSON.stringify(args[i], null, 4));
							} else {
								redefinedArgs.push(args[i]);
							}
							break;
					}
				}
				if(obj.value === undefined) {
					console.log(obj.constructor.name + '.' + func + '(' + redefinedArgs.join(', ') + ')');
				} else {
					console.log(obj.value + '.' +  func + '(' + redefinedArgs.join(', ') + ')');
				}
			}
			
			var result = obj[func].apply(obj, args);
			if(result === expected) {
				correct++;
			} else {	
				console.log('ERROR: ' + errorString);
				console.log("Expcted :" + expected);
				console.log("Received:" + result);
			}
		} catch(err) {
			console.log('---------------------------------');
			console.log('CAUGHT EXCEPTION:\n');
			console.log(err.stack);
			console.log('ERROR: ' + errorString);
			console.log("Expcted :" + expected);
			console.log("Received:" + result);
			console.log('---------------------------------');
		}
	};

	function runFunction(func, expected, args, flag) {
		var errorString = [];

		// Function to string
		errorString.push(func);

		//args to string
		errorString.push('(');
		for(var i = 0; i < args.length; ++i) {
			switch(args[i]) {
				case null:
					errorString.push('null');
					break;
				case undefined:
					errorString.push('undefined');
					break;
				case '':
					errorString.push('\'\'');
					break;
				default:
					if(typeof args[i] === 'object') {
						errorString.push(JSON.stringify(args[i], null, 2));
					} else {
						errorString.push(args[i]);
					}
					break;
			}
			if(i < args.length - 1) {
				errorString.push(config.separator);
			}
		}
		errorString.push(') failed');
		
		testResult(func, args, expected, errorString.join(''), flag);
	};

	function runTree(func, testCase, arr, index, flag) {
		if(index < testCase.parameters.count) {
			for(var i = 0; i < testCase.parameters[index].length; ++i) {
				if(arr.length < index) {
					arr.push(null);
				}

				arr[index] = testCase.parameters[index][i];
				runTree(func, testCase, arr, index + 1, flag);
			}
		} else {
			runFunction(func, testCase.expected, arr, flag);
		}
	};

	function runMultiple(func, testCase, flag) {
		for(var i = 0; i < testCase.parameters[0].length; ++i) {
			var arr = [];
			arr.push(testCase.parameters[0][i]);
			runTree(func, testCase, arr, 1, flag);
		}
	};

	function startTest(func, testCase, flag) {
		if( testCase.parameters.count >= 0) {
			runMultiple(func, testCase, flag);
		} else {
			console.error('Invalid paramters given, please check format and count');
		}
	};

	return {
		init: function (object) {
			obj = object;
		},
			
		skip: function(func) {
			console.log('Skipping ' + func);
		},

		withFunction: function(func, testCases, flag) {
			for(var caseIndex = 0; caseIndex < testCases.length; ++caseIndex) {
				startTest(func, testCases[caseIndex], flag);
			}
			return this;
		},

		finished: function() {
			if(obj.value === undefined) {
				console.log(obj.constructor.name + ' had ' + correct + ' out of ' + answered + ' test cases pass');
			} else {
				console.log(obj.value + ' had ' + correct + ' out of ' + answered + ' test cases pass');
			}
			totalCorrect += correct;
			totalAnswered += answered;

			correct = 0;
			answered = 0;
			return this;
		},

		done: function() {
			console.log('Results: ', totalCorrect, '/', totalAnswered);
			if(totalCorrect === totalAnswered) {
				process.exit(0);
			}
			process.exit(1);
		}
	}
}());