<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import { computed, ref } from "vue";


const props = defineProps<{
	results: Record<string,string>
	processing: boolean
}>();


const getType = (instructions: string) => {

	if (instructions.includes('rest')) {
		return 'rest'
	}

	if (instructions.includes('note')) {
		return 'note'
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
			<section class="flex bg-slate-800 rounded-md text-white">
				<section v-for="(week, index) in planSteps" class="p-4 cursor-pointer" :class="{'bg-slate-700': index == selected}" @click="selected=index">
					<header>
						{{ week.title }}
					</header>
				</section>
			</section>
			<section class="pl-6 mt-4">
				<WelcomeItem v-for="plan in planSteps[selected].lines">
					<template #icon>
						<DocumentationIcon />
					</template>
					<template #heading>{{ plan.day }}</template>
					{{ plan.description }}
				</WelcomeItem>
			</section>
		</main>
		<p v-if="processing" class="text-center pt-8">Building your plan...Please wait</p>
	</section>
</template>
