<script setup lang="ts">
import { ref } from "vue";
import { usePlanStorage } from "@/libs/usePlanStorage"

import CurrentPlanWidget from "./Partials/CurrentPlanWidget.vue";
import TemplateSelector from '@/components/TemplateSelector.vue'
import PlanForm from '@/components/PlanForm.vue'
import AppHeader from "@/components/AppHeader.vue";
import PlanViewer from "@/components/PlanViewer.vue";
import { parsePlanResponse } from "@/libs";

const distance = ref<number|null>(null);
const results = ref({
	response: ""
    // "response": "Week 1:\nMonday (easy run): Go for a 30-minute run at a comfortable pace.\nTuesday (speed work): Do 4-6 x 1000m intervals at race pace with 200m recovery jog in between each interval.\nWednesday (rest): Take a rest day and do not run.\nThursday (easy run): Go for a 30-minute run at a comfortable pace.\nFriday (tempo run): Do a 4-6 km run at race pace with 200m recovery jog in between each km.\nSaturday (long run): Go for a 60-minute run at a comfortable pace.\nSunday (rest): Take a rest day and do not run.\n\nWeek 2:\nMonday (easy run): Go for a 25-minute run at a comfortable pace.\nTuesday (speed work): Do 5-7 x 800m intervals at race pace with 200m recovery jog in between each interval.\nWednesday (rest): Take a rest day and do not run.\nThursday (easy run): Go for a 25-minute run at a comfortable pace.\nFriday (tempo run): Do a 5-7 km run at race pace with 200m recovery jog in between each km.\nSaturday (long run): Go for a 50-minute run at a comfortable pace.\nSunday (rest): Take a rest day and do not run.\n\nAnd so on...\nNote: Make sure to gradually increase the duration and intensity of the runs as the weeks progress, and also make sure to listen to your body and rest when needed. Also, make sure to properly fuel and hydrate before, during and after each run."
  // "response": "Sure, here's a 4-week training plan to help you run 5km under 25 minutes:\nWeek 1: (40 km)\nMonday (easy run): Go for a 30-minute run at a comfortable pace. (30 min)\nTuesday (speed work): Do 4-6 x 1000m at race pace with 200m recovery jog in between each interval. (45 min)\nWednesday (rest): Take a rest day and do not run.\nThursday (tempo run): Go for a 30-minute run at a slightly faster pace than your easy run on Monday. (30 min)\nFriday (easy run): Go for a 20-minute run at a comfortable pace. (20 min)\nSaturday (long run): Go for a 30-minute run at a steady pace. (30 min)\nSunday (rest): Take a rest day and do not run.\nWeek 2: (45 km)\nMonday (easy run): Go for a 35-minute run at a comfortable pace. (35 min)\nTuesday (speed work): Do 5-7 x 1200m at race pace with 200m recovery jog in between each interval. (50 min)\nWednesday (rest): Take a rest day and do not run.\nThursday (tempo run): Go for a 35-minute run at a slightly faster pace than your easy run on Monday. (35 min)\nFriday (easy run): Go for a 25-minute run at a comfortable pace. (25 min)\nSaturday (long run): Go for a 35-minute run at a steady pace. (35 min)\nSunday (rest): Take a rest day and do not run.\nWeek 3: (50 km)\nMonday (easy run): Go for a 40-minute run at a comfortable pace. (40 min)\nTuesday (speed work): Do 6-8 x 1500m at race pace with 200m recovery jog in between each interval. (60 min)\nWednesday (rest): Take a rest day and do not run.\nThursday (tempo run): Go for a 40-minute run at a slightly faster pace than your easy run on Monday. (40 min)\nFriday (easy run): Go for a 30-minute run at a comfortable pace. (30 min)\nSaturday (long run): Go for a 40-minute run at a steady pace. (40 min)\nSunday (rest): Take a rest day and do not run.\nWeek 4: (55 km)\nMonday (easy run): Go for a 45-minute run at a comfortable pace. (45 min)\nTuesday (speed work): Do 7-9 x 1600m at race pace with 200m recovery jog in between each interval. (75 min)\nWednesday (rest): Take a rest day and do not run.\nThursday (tempo run): Go for a 45-minute run at a slightly faster pace than your easy run on Monday. (45 min)\nFriday (easy run): Go for a 30-minute run at a comfortable pace. (30 min)\nSaturday (long run): Go for a 45-minute run at a steady pace. (45 min)\nSunday (race day): Go for a 5km race at a fast pace. (5 km)\nNote: Make sure to stretch before and after each run, and also to listen to your body and adjust the plan according to your needs. Also, make sure to fuel your body with a balanced diet and enough hydration throughout the training."
});
const planConfig = ref();

const fetchPlans = async(config: any) => {
	const response = await fetch(`/api/plans?distance=${distance.value || config.distance || 5}&minutes=${config.minutes ?? 30}&weeks=${config.weeks ?? 4}`)
	.then(res => res)
	.then(res => res.json())

	return response;
}

const isLoading = ref(false);
const onSubmit = async (config: any) => {
	if (isLoading.value) return;
	isLoading.value = true;
	fetchPlans(config)
		.then((res) => {
			results.value = {
				...res,
				...config
			};
		})
		.finally(() => {
			isLoading.value = false;
		})

}

const onBack = () => {
	results.value = { response: '' };
}

const { save } = usePlanStorage();
const onSave = async () => {
	const name = await prompt("Whats the name for this plan?")
	save({
		title: name,
		description: 'Description',
		...results.value,
		steps: parsePlanResponse(results.value.response)
	}, `Plan {n}`)

	results.value.response = "";
}
</script>

<template>
  <main>
		<AppHeader />
		<section v-if="!results.response" class="flex flex-col px-4 mt-8 md:space-x-4 md:mx-auto md:flex-row md:max-w-7xl">
			<article class="w-full md:w-8/12">
				<section class="text-white">
					<PlanForm
						v-model:distance="distance"
						@submit="onSubmit"
						:processing="isLoading"
					/>
				</section>
				<div class="mt-8">
					<TemplateSelector
						v-model:distance="distance"
						v-model:selected="planConfig"
						@submit="onSubmit"
						:class="{'opacity-10': isLoading }"
					/>
				</div>
			</article>
			<aside class="w-full mb-4 md:w-4/12">
				<CurrentPlanWidget :disabled="isLoading " />
			</aside>
		</section>
		<PlanViewer
			v-if="results.response"
			:results="results"
			:config-date="planConfig"
			:processing="isLoading" class="px-4 mx-auto mt-4 max-w-7xl"
			@save="onSave"
			@back="onBack"
		/>
	</main>

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
