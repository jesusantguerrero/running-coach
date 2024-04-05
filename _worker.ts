import { Ai } from "@cloudflare/ai";
export interface Env {
	AI: any
	ASSETS: Fetcher;
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const ai = new Ai(env.AI)
		const { searchParams, pathname } = new URL(request.url);
		const distance = `${searchParams.get('distance') ?? ''}`;
		const minutes = `${searchParams.get('minutes') ?? ''}`;
		const weeks = `${searchParams.get('weeks') ?? 4}`;

		if (pathname.startsWith('/api/') && distance && minutes) {
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
						content: 'Please omit intro and start your response with "Week 1:"'
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
