<script setup lang="ts">
import { computed, ref } from "vue";
import { AtButton } from "atmosphere-ui";

import PlanActivity from './PlanActivity.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import PlanNote from "@/components/PlanNote.vue"


const props = defineProps<{
	results: Record<string,string>;
	processing: boolean;
	hideSave?: boolean;
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
				day: line.slice(0, line.indexOf(',')),
				description: line.slice(line.indexOf(',') + 1),
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
			<header class="flex justify-between text-white rounded-md bg-slate-800">
				<section class="flex">
					<div v-for="(week, index) in planSteps" class="p-4 cursor-pointer" :class="{'bg-slate-700': index == selected}" @click="selected=index">
							{{ week.title }}
					</div>
				</section>
				<section>
					<AtButton @click="$emit('save')" class="h-full transition-all ease-in hover:bg-primary" v-if="!hideSave">Save</AtButton>
					<AtButton @click="$emit('back')" class="h-full transition-all ease-in hover:bg-base-lvl-3">Back</AtButton>
				</section>
			</header>
			<section class="mt-4">
				<template v-for="plan in planSteps[selected].lines">
					<PlanActivity v-if="plan.type !== 'note'" :title="plan.day" >
						<template #icon>
							<DocumentationIcon />
						</template>
						<template #heading>{{ plan.day }} {{ plan.type}}</template>
						{{ plan.description }}
					</PlanActivity>
					<PlanNote :plan="plan" v-else />
				</template>
			</section>
		</main>
		<p v-if="processing" class="pt-8 text-center">Building your plan...Please wait</p>
	</section>
</template>
