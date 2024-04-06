import { Ai } from "@cloudflare/ai";

export default {
	async fetch(request, env, ctx) {
		const ai = new Ai(env.AI)
		const { searchParams, pathname } = new URL(request.url);
		const distance = `${searchParams.get('distance') ?? ''}`;
		const minutes = `${searchParams.get('minutes') ?? ''}`;
		const weeks = `${searchParams.get('weeks') ?? 4}`;
		const isApi = pathname.startsWith('/api/');

		console.log(isApi);

		if (isApi && distance && minutes) {
			const response = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
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
						content: 'Please be direct and to the point omit intro and start your response with "Week 1:" and also omit the notes'
					},
					{
						role:'user',
						content: `Give me a well structured ${weeks}-week training plan to run ${distance} km under ${minutes} minutes, please omit intro and start your response on week 1`
					}
				]
			})

			return new Response(JSON.stringify(response));
		}

		// Otherwise, serve the static assets.
		// Without this, the Worker will error and no assets will be served.
		return env.ASSETS.fetch(request);
	},
};
