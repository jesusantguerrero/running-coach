<script setup lang="ts">
// @ts-ignore: no types
import { AtField, AtInput, AtButton } from "atmosphere-ui";
import { reactive, watch } from "vue";

import IAutoFix from "./icons/IAutoFix.vue";
import ILoadingPoints from "./icons/ILoadingPoints.vue";

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
	crossTraining?: boolean;
}

const form = reactive({
	distance: props.distance ?? 0,
	weeks: 4,
	level: 'beginner',
	minutes: 26,
	crossTraining: true
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
			<AtField label="Distance">
				<AtInput v-model="form.distance" class="text-white rounded-md bg-white/5"/>
			</AtField>
			<AtField label="Weeks">
				<AtInput v-model="form.weeks"  class="text-white rounded-md bg-white/5"/>
			</AtField>
			<AtField label="Time (in minutes)">
				<AtInput v-model="form.minutes"  class="text-white rounded-md bg-white/5" />
			</AtField>
		</form>
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
