<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
	distance: number|null
	selected?: Record<string, any>
}>()

defineEmits(['update:distance', 'submit'])

interface DistanceConfig {
		avgTimes: Record<string, number[]>
		templates: {
			weeks: number;
			level: string;
			minutes?: number;
			crossTraining?: boolean;
		}[]
}
interface DistanceTemplates {
	[key: number]: DistanceConfig
}

const distances: DistanceTemplates = {
	5: {
		avgTimes: {
			beginner: [32, 40],
			novice: [27, 33],
			intermediate: [23, 29],
			advanced: [23, 29],
			elite: [18, 22]
		},
		templates: [{
			weeks: 8,
			level: 'beginner'
		},
		{
			weeks: 8,
			crossTraining: true,
			level: 'beginner'
		},
		{
			weeks: 4,
			level: 'beginner',
			minutes: 25
		},
		{
			weeks: 8,
			level: 'intermediate',
			minutes: 24
		},
		{
			weeks: 8,
			crossTraining: true,
			level: 'intermediate',
			minutes: 23
		},
		{
			weeks: 4,
			level: 'intermediate',
			minutes: 22
		},
		{
			weeks: 4,
			level: 'intermediate',
			minutes: 21
		}
		],
	},
	10: {
		avgTimes: {
			beginner: [32, 40],
			novice: [27, 33],
			intermediate: [23, 29],
			advanced: [23, 29],
			elite: [18, 22]
		},
		templates: [
		{
			weeks: 4,
			level: 'beginner',
			minutes: 60
		},
		{
			weeks: 4,
			level: 'intermediate',
			minutes: 50
		},
		{
			weeks: 4,
			level: 'intermediate',
			minutes: 40
		}
		],
	},
	21: {
		avgTimes: {
			beginner: [32, 40],
			novice: [27, 33],
			intermediate: [23, 29],
			advanced: [23, 29],
			elite: [18, 22]
		},
		templates: [
		{
			weeks: 4,
			level: 'beginner',
			minutes: 120
		},
		{
			weeks: 4,
			level: 'intermediate',
			minutes: 90
		}
		],
	}
}

const templates = computed(() => {
	return props.distance ? distances[props.distance]?.templates : Object.entries(distances).reduce((all: any[], [distance, distanceConfig]) => {
		const config = distanceConfig as DistanceConfig;
		all.push(...config.templates.map(planTemplate => ({
			...planTemplate,
			distance,
		})))
		return all;
	}, [])
})


</script>

<template>
  <section class="px-4">
	<h4 class="font-bold text-xl mb-2"> Workout Templates</h4>
	<section class="flex space-x-2">
		<span v-for="(distanceTemplate, distanceName) in distances"
			class="cursor-pointer bg-green-100 px-4 text-green-400 rounded-md border-2 border-green-400"
			@click="$emit('update:distance', distanceName)"
		>
			{{ distanceName}} KM
		</span>
		<span
		class="cursor-pointer bg-green-100 px-4 text-green-400 rounded-md border-2 border-green-400"
		@click="$emit('update:distance', null)"
		>
			All
		</span>
	</section>
	<section class="mt-4 grid md:grid-cols-4 grid-cols-2 gap-2 mb-20">
		<section
			v-for="(template, templateName) in templates"
			class="cursor-pointer rounded-md border border-gray-800 p-5"
			@click="$emit('submit', template)"
		>
			{{ template.distance || distance }}km {{ template.weeks }} week-plan for {{  template.level }}
			<span v-if="template.minutes">
				{{ template.minutes}} min
			</span>
		</section>
	</section>
  </section>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
