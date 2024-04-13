<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { usePlanStorage } from "@/libs/usePlanStorage"

import IStarCheck from "@/components/icons/IStarCheck.vue";
import IChevronRight from "@/components/icons/IChevronRight.vue";
import IChevronLeft from "@/components/icons/IChevronLeft.vue";
import { useRouter } from "vue-router";


defineProps<{
	disabled?: boolean;
}>();

const { list } = usePlanStorage();
const saved = ref();
const currentActivity = ref();

onMounted(() => {
	saved.value = list();
	if (hasActivities.value) {
		currentActivity.value = 0
	}
})

const current = computed(() => {
	const currentIndex = saved.value?.findIndex?.((item: any) => item.current);
	if (!saved.value || !saved.value[currentIndex]) return null
	return  {
		...saved.value[currentIndex],
		id: currentIndex
	};
});

const activitiesToComplete = computed(() => {
	return current.value?.steps?.reduce((activities: any[], week: { lines: any[]}) => {
		activities.push(...week.lines.filter((activity: any) => !activity.completed))
		return activities;
	}, [])
})

const nextActivity = computed(() => {
	return activitiesToComplete.value?.length
	? activitiesToComplete.value[currentActivity.value]
	: null;
})


const hasActivities = computed(() => {
	return activitiesToComplete.value?.length
})

const moveNext = () => {
	if (currentActivity.value < hasActivities.value) {
		currentActivity.value +=1
	}
}

const movePrevious = () => {
	if (currentActivity.value > 0) {
		currentActivity.value -=1
	}
}

const { push } = useRouter();
const goToCurrentPlan = () => {
	if (!current.value) return
	push(`/plans/${current.value.id}`)
}

</script>

<template>
<article class="px-4 py-3 rounded-md bg-base-lvl-3 text-body-1" :class="{'opacity-10': disabled}">
	<header class="flex justify-between">
		<h2 class="flex items-center text-body-1">
			<span class="flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-base-lvl-1">
				<IStarCheck class="text-yellow-500" />
			</span>
			<span class="font-bold">
				Current Plan
			</span>
		</h2>
		<section>
			<button class="px-4 py-2 bg-base-lvl-2 hover:bg-base-lvl-1 rounded-l-md" @click="movePrevious">
				<IChevronLeft />
			</button>
			<button class="px-4 py-2 bg-base-lvl-2 hover:bg-base-lvl-1 rounded-r-md" @click="moveNext">
				<IChevronRight />
			</button>
		</section>
	</header>
	<section v-if="current" class="mt-4 cursor-pointer" @click="goToCurrentPlan">
		<header class="flex justify-between">
			<h4 class="font-bold text-body"> {{  current.title }} </h4>
			<section class="flex" v-if="hasActivities">
				<span> {{ currentActivity + 1 }}</span> /
				<span> {{ hasActivities }}</span>
			</section>
		</header>
		<p class="pt-2" v-if="hasActivities"> <span class="font-bold text-success" >Next activity:</span>
			{{ nextActivity.description }}
		</p>
	</section>
	<p class="pt-2 mt-4" v-else>
		There's no activities marked as current
	</p>
</article>
</template>
