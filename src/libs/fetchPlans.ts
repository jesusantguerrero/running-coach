import { Ai } from "@cloudflare/ai";

export const useFetchPlans = async (ai: any, url: string ): Promise<any> => {
	const { searchParams } = new URL(url);
	const distance = `${searchParams.get('distance') ?? ''}`;
	const minutes = `${searchParams.get('minutes') ?? ''}`;
	const weeks = `${searchParams.get('weeks') ?? 4}`;

	if (distance && minutes) {
		return await ai.run('@cf/meta/llama-2-7b-chat-int8', {
			messages: [
				{
					role: 'system',
					content: 'As an expert running coach, capable of structuring great running plans'
				},
				{
					role: 'assistant',
					content: 'The plan should increase weekly mileage by 10% until the race day, 4 times a week, incorporate speed work, tempo runs and heels.'
				},
				{
					role: 'assistant',
					content: 'Please omit intro and start your response with "Week 1:"'
				},
				{
					role:'user',
					content: `Give me a well structured ${weeks}-week training plan to run ${distance} km under ${minutes} minutes, please omit intro and start your response on week 1`
				}
			]
		})

	}

	return Promise.resolve(null);
}
