<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  msg: string;
	distance: number|null
	selected?: Record<string, any>
}>()

defineEmits(['update:distance', 'submit'])
interface DistanceTemplates {
	[key: number]: {
		avgTimes: Record<string, number[]>
		templates: {
			weeks: number;
			level: string;
			minutes?: number;
			crossTraining?: boolean;
		}[]
	}
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
	}
}

const templates = computed(() => {
	return props.distance ? distances[props.distance]?.templates : null
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
			<template v-if="!distance">
				<section v-for="(distanceTemplate, distanceName) in distances"
					class="cursor-pointer"
					@click="$emit('update:distance', distanceName)"
				>
					{{ distanceName}} KM
				</section>
			</template>
			<section v-else-if="templates">
				<section
					v-for="(template, templateName) in templates"
					class="cursor-pointer rounded-md border border-gray-800 p-5"
					@click="$emit('submit', template)"
				>
					{{ template.weeks }} week-plan for {{  template.level }}
					<span v-if="template.minutes">
						{{ template.minutes}} min
					</span>
				</section>
			</section>
    </h3>
  </div>
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
