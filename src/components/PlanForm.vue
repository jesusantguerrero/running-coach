<script setup lang="ts">
// @ts-ignore: no types
import { AtField, AtInput, AtButton } from "atmosphere-ui";
import { reactive, ref, watch } from "vue";

import IAutoFix from "./icons/IAutoFix.vue";
import ILoadingPoints from "./icons/ILoadingPoints.vue";
import BaseSelector from "@/components/BaseSelector.vue";

const props = defineProps<{
	distance: number|null
	selected?: Record<string, any>
	processing?: boolean;
}>()

const emit = defineEmits(['update:distance', 'submit'])
interface PlanInfo {
	distance: number;
	weeks: number;
	level: string;
	minutes?: number;
}

const form = reactive({
	distance: props.distance ?? 0,
	weeks: 4,
	level: 'beginner',
	minutes: 26,
})


const onSubmit = () => {
	emit('submit', form)
}

watch(() => form.distance, (value) => {
	if (props.distance !== form.distance) {
		emit('update:distance', value);
	}
})

watch(() => props.distance, (value) => {
	if (props.distance !== form.distance) {
		form.distance = value ?? 0;
	}
})


const loadingWords = [
	'Setting the stopwatches',
	'Analyzing data',
	'preparing speed works',
	'structuring the plan',
];

const loadingWord = ref(0);
const iterateWords = () => {
	if (loadingWord.value == loadingWords.length - 1) {
		loadingWord.value = 0
		return;
	}
	loadingWord.value++;
}

const intervalIndex = ref<any>(null)
watch(() => props.processing, (isLoading) => {
	if (isLoading) {
		intervalIndex.value = setInterval(iterateWords, 5000)
	} else {
		if (intervalIndex.value) clearInterval(intervalIndex.value)
		loadingWord.value = 0;
	}
}, { immediate: true })
</script>

<template>
  <section class="px-4 py-4 rounded-lg bg-base-lvl-3">
		<h2 class="flex items-center mb-4">
			<span class="flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-base-lvl-1">
				<IAutoFix class="text-success" />
			</span>
			<p>Provide some info to build your plan with <span class="italic">AI</span></p>
		</h2>
		<form action="" class="grid grid-cols-3 gap-2" @submit.prevent id="plan-form" v-if="!processing">
			<AtField label="Distance (KM)">
				<BaseSelector
					class="w-full h-10 px-2 text-white border rounded-md bg-white/5"
					v-model="form.distance"
					:options="[5, 10, 21]"
				/>
			</AtField>
			<AtField label="Weeks">
				<AtInput v-model="form.weeks"  class="text-white rounded-md bg-white/5" disabled />
			</AtField>
			<AtField label="Time (in minutes)">
				<AtInput v-model="form.minutes"  class="text-white rounded-md bg-white/5" type="number" />
			</AtField>
		</form>
		<p v-if="processing" class="text-center first-letter:capitalize">
			{{ loadingWords[loadingWord] }} ...
		</p>
		<AtButton class="flex items-center justify-center w-full bg-green-500 disabled:text-white"  :disabled="processing"  rounded @click="onSubmit">
			Generate Plan
			<ILoadingPoints v-if="processing" />
		</AtButton>
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
