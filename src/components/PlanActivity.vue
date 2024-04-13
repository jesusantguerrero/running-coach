<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
	title: string;
	cardClass: string
	detailsClass: string;
	index: number;
	activity: {
		description: string;
		completed: boolean;
	};
	allowCheck: boolean;
}>(), {
	cardClass: 'bg-gray-600 text-white',
	detailsClass: 'text-body-1'
})

const initials = computed(() => {
	return props.title?.at(0)
})
</script>

<template>
  <article class="relative flex mb-4 rounded-l-md">
    <section class="flex items-center justify-center w-16 text-xl font-bold rounded-md"  :class="cardClass">
			{{  initials  }}
    </section>
    <main class="w-full py-1 ml-2" :class="detailsClass">
      <h3 class="text-lg font-bold mb-1.5">
        <slot name="heading">
					{{  title }}
				</slot>
      </h3>
			<section class="flex justify-between w-full ">
				<label :for="`${activity.description}${index}`">
					<span>
						{{ activity.description }}
					</span>
				</label>
			</section>
    </main>
		<section class="flex items-center" v-if="allowCheck">
			<input :id="`${activity.description}${index}`" type="checkbox" class="mr-2 checkbox-done" @click="activity.completed = !activity.completed" v-model="activity.completed" />
		</section>
  </article>
</template>
