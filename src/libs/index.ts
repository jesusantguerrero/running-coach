export const getActivityType = (instructions: string) => {
	if (instructions.toLowerCase().includes('note')) {
		return 'note'
	}

	if (instructions.includes('rest')) {
		return 'rest'
	}

	return 'workout';
}

export const parsePlanResponse = (responseText: string) => {
	const regexPattern = /Week\s\d:\n/;
	return responseText.split(regexPattern).filter(value => value).map((week, index) => {
		return {
			title: `Week ${index+1}`,
			lines: week.split('\n').filter(value => value).map(line => ({
				day: line.slice(0, line.indexOf(',')),
				description: line.slice(line.indexOf(',') + 1),
				type: getActivityType(line),
				completed: false
			}))
		}
	})
}
