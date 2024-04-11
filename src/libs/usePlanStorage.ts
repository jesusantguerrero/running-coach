export const usePlanStorage = () => {
	const list = (): any[] => {
		const plans = window.localStorage.getItem('plans');
		return JSON.parse(plans || '[]');
	}

	const save = (newPlan: any) => {
		window.localStorage.setItem('plans', JSON.stringify([
			...list(),
			newPlan
		]))
	}

	return {
		save,
		list
	}
}
