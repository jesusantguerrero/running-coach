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
		const maxTokens = 1000;

		if (isApi && distance && minutes) {
			const messages = [
				{
					role: 'system',
					content: 'You are an expert running coach, capable of structuring great running plans for 5k, 10k and 21k'
				},
				// {
				// 	role: 'assistant',
				// 	content: `The generated plans should increase weekly kilometers gradually by 10% until the race day, incorporate speed work, tempo runs, heels, easy runs and long runs and race day. alternate speed work and tempo runs by weekly basis.`
				// },
				{
					role:'user',
					content: `Build a training plan to run ${distance}km in ${minutes} minutes by the end of the last week of the training plan. Taking the following considerations: the plan must be from Week 1 to Week ${weeks}; running sessions must not be more than ${timesAWeek} per week (This is important!); Each activity should mention which run time it is with the following format: "Day of week {run-type}, [instructions]..." eg. "Monday(easy run), run {N} km..."; The last day of the plan is the race day, so the given distance in the given minutes should be the activity for that day`
				},
				{
					role: 'assistant',
					content: 'Please be direct and to the point omit any introduction or notes and start your response with "Week 1:"'
				},
			]

			try {
				const response = await ai.run(models.llama, {
					messages,
					max_tokens: maxTokens
				})

				return new Response(JSON.stringify({
					...response,
					messages
				}));
			} catch (err) {
				return new Response(JSON.stringify({
					message: "server error",
					text: err
				}), {
					headers: { 'content-type': 'application/json' },
					status: 404
				})
			}
		}

		// Otherwise, serve the static assets.
		// Without this, the Worker will error and no assets will be served.
		return env.ASSETS.fetch(request);
	},
};
