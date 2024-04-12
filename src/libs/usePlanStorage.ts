export const usePlanStorage = () => {
	const list = (): any[] => {
		const plans = window.localStorage.getItem('plans');
		return JSON.parse(plans || '[]');
	}

	const save = (newPlan: any, defaultTitle = 'Plan {n}') => {
		const plans = list();
		window.localStorage.setItem('plans', JSON.stringify([
			...plans,
			{
				...newPlan,
				title: newPlan.title ?? defaultTitle.replace('{n}', plans.length.toString())

			}
		]))
	}

	const remove = (toDeleteIndex: number) => {
		const plans = list();
		const savedPlans = plans.filter((item, index) => index !== toDeleteIndex)
		window.localStorage.setItem('plans', JSON.stringify([
			...savedPlans
		]))
	}

	const update = (toUpdateIndex: number, newPlan) => {
		const plans = list();
		plans[toUpdateIndex] = {
			...newPlan,
			title: newPlan.title ?? plans[toUpdateIndex].title
		}


		window.localStorage.setItem('plans', JSON.stringify([
			...plans,
		]))
	}

	return {
		save,
		list,
		remove,
		update
	}
}
