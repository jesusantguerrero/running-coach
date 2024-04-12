<script setup lang="ts">
import { ref, watch } from "vue";
import { AtButton } from "atmosphere-ui";

import PlanActivity from './PlanActivity.vue'
import IStarCheck from './icons/IStarCheck.vue'
import IStarOutline from './icons/IStarOutline.vue'
import PlanNote from "@/components/PlanNote.vue"

import { parsePlanResponse } from "@/libs"
import { emit } from "process";


const props = defineProps<{
	results: Record<string,string>;
	processing: boolean;
	hideSave?: boolean;
}>();

const emit = defineEmits(['update']);

const planSteps = ref([]);


watch(() => props.results, () => {
	planSteps.value = !props.results.steps
	? parsePlanResponse(props.results?.response)
	: props.results?.steps
}, { immediate: true })

watch(() => planSteps.value, (steps) => {
	emit('update', steps)
}, { deep: true })


const selected = ref(0);
</script>

<template>
	<section>
		<header v-if="results.title" class="flex items-center">
			<h4  class="mb-4 text-4xl font-bold text-body"> {{ results.title }}</h4>
			<button @click="$emit('mark', results)" class="items-center h-full my-auto ml-2 ">
				<IStarOutline v-if="!results.current" class="text-4xl text-gray-500" />
				<IStarCheck v-else class="text-4xl text-yellow-400" />
			</button>
		</header>
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
					<AtButton @click="$emit('remove')" class="h-full transition-all ease-in hover:bg-error" v-if="hideSave">Delete</AtButton>
				</section>
			</header>
			<section class="mt-4">
				<template v-for="activity in planSteps[selected].lines">
					<PlanActivity v-if="activity.type !== 'note'" :title="activity.day" >
						<template #heading>{{ activity.day }}</template>
						<section class="flex justify-between w-full">
							<span>
								{{ activity.description }}
							</span>
							<span v-if="activity.type == 'workout'">
								<input type="checkbox" @click="activity.completed = !activity.completed" v-model="activity.completed" />
							</span>
						</section>
					</PlanActivity>
					<PlanNote :plan="activity" v-else />
				</template>
			</section>
		</main>
		<p v-if="processing" class="pt-8 text-center">Building your plan...Please wait</p>
	</section>
</template>
