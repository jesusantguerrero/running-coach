import { Ai } from "@cloudflare/ai";


const models = {
	mistral: '@cf/mistral/mistral-7b-instruct-v0.1',
	llama: '@cf/meta/llama-2-7b-chat-int8'
}

export default {
	async fetch(request, env) {
		const ai = new Ai(env.AI)
		const { searchParams, pathname } = new URL(request.url);
		const distance = `${searchParams.get('distance') ?? ''}`;
		const minutes = `${searchParams.get('minutes') ?? ''}`;
		const weeks = `${searchParams.get('weeks') ?? 4}`;
		const timesAWeek = `${searchParams.get('times') ?? 4}`;
		const isApi = pathname.startsWith('/api/');

		if (isApi && distance && minutes) {
			const response = await ai.run(models.llama, {
				messages: [
					{
						role: 'system',
						content: 'As an expert running coach, capable of structuring great running plans'
					},
					{
						role: 'assistant',
						content: `The plan should increase weekly kilometers by 10% until the race day, running ${timesAWeek} times a week, incorporate speed work, tempo runs, heels, easy runs and long runs. alternate speed work and tempo runs by weekly basis.`
					},
					{
						role: 'assistant',
						content: 'Please be direct and to the point omit intro and start your response with "Week 1:" and also omit the notes'
					},
					{
						role:'user',
						content: `Please structure a ${weeks}-week training plan to run ${distance}km under ${minutes} minutes. Each activity should mention which run time it is with the following format "Day of week {run-type}: instructions..." eg. "Monday (easy run): instructions..." instructions should be in the same line.`
					}
				],
				max_tokens: 1000
			})

			return new Response(JSON.stringify(response));
		}

		// Otherwise, serve the static assets.
		// Without this, the Worker will error and no assets will be served.
		return env.ASSETS.fetch(request);
	},
};
