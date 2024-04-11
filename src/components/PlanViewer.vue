<script setup lang="ts">
import { computed, ref } from "vue";
import { AtButton } from "atmosphere-ui";

import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import PlanNote from "@/components/PlanNote.vue"


const props = defineProps<{
	results: Record<string,string>
	processing: boolean
}>();


const getType = (instructions: string) => {
	if (instructions.toLowerCase().includes('note')) {
		return 'note'
	}

	if (instructions.includes('rest')) {
		return 'rest'
	}

	return 'workout';
}

const planSteps = computed(() => {
	const regexPattern = /Week\s\d:\n/;
	return props.results?.response.split(regexPattern).filter(value => value).map((week, index) => {
		return {
			title: `Week ${index+1}`,
			lines: week.split('\n').filter(value => value).map(line => ({
				day: line.slice(0, line.indexOf(':')),
				description: line.slice(line.indexOf(':') + 1),
				type: getType(line)
			}))
		}
	})
})

const selected = ref(0);
</script>

<template>
	<section>
		<main v-if="planSteps.length && !processing">
			<header class="flex bg-slate-800 rounded-md text-white justify-between">
				<section class="flex">
					<div v-for="(week, index) in planSteps" class="p-4 cursor-pointer" :class="{'bg-slate-700': index == selected}" @click="selected=index">
							{{ week.title }}
					</div>
				</section>
				<section>
					<AtButton @click="$emit('save')">Save</AtButton>
					<AtButton @click="$emit('back')">Back</AtButton>
				</section>
			</header>
			<section class="pl-6 mt-4">
				<template v-for="plan in planSteps[selected].lines">
					<WelcomeItem v-if="plan.type !== 'note'" :title="plan.day" >
						<template #icon>
							<DocumentationIcon />
						</template>
						<template #heading>{{ plan.day }} {{ plan.type}}</template>
						{{ plan.description }}
					</WelcomeItem>
					<PlanNote :plan="plan" v-else />
				</template>
			</section>
		</main>
		<p v-if="processing" class="text-center pt-8">Building your plan...Please wait</p>
	</section>
</template>
