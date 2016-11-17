console.log('loaded!')
// Given a month and a date, produce an array of x rows of 7
module.exports = function (month, year) {
	var daysInMonth = { 1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 },
		thisMonthDays = daysInMonth[month],
		dates = []

	// Account for leap year
	if (month === 2 && year % 4 === 0) {
		var thisMonthDays = 29
	}

	for (var day = 1; day <= thisMonthDays; day++) {
		let date = new Date(month + '/' + day + '/' + year)
		dates.push(date)
	}

	// Fill out front and end of month from preceding month
	var firstDate = new Date(dates[0]),
		firstDay = firstDate.getDay()

	while ( firstDay > 0) {
		dates.unshift('')
		firstDay--
	}

	var lastDate = new Date(dates[dates.length-1]),
		lastDay = lastDate.getDay()

	while ( lastDay < 6) {
		dates.push('')
		lastDay++
	}

	var weeksLength = Math.ceil(dates.length / 7),
		multiArray = []

	for (let i = 0; i < weeksLength; i++) {
		multiArray[i] = []

		for (let x = 0; x < 7; x++) {
			multiArray[i].push(dates[i * 7 + x])
		}
	}

	return multiArray
}
