<script setup lang="ts">
// @ts-ignore: no types
import { AtField, AtInput, AtButton } from "atmosphere-ui";
import { reactive, watch } from "vue";

const props = defineProps<{
	distance: number|null
	selected?: Record<string, any>
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
  <section class="px-4 py-4 rounded-lg bg-slate-700">
		<p>Please provide some info to build your plan</p>
		<form action="" class="grid grid-cols-3 gap-2" @submit.prevent id="plan-form">
			<AtField label="Distance">
				<AtInput v-model="form.distance" />
			</AtField>
			<AtField label="Weeks">
				<AtInput v-model="form.weeks" />
			</AtField>
			<AtField label="Time (in minutes)">
				<AtInput v-model="form.minutes" />
			</AtField>
		</form>
		<AtButton class="bg-green-500 w-full" rounded @click="onSubmit"> Generate Plan </AtButton>
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
