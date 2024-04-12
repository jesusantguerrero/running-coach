<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
	title: string;
	cardClass: string
	detailsClass: string;
}>(), {
	cardClass: 'bg-gray-600 text-white',
	detailsClass: 'text-body-1'
})

const initials = computed(() => {
	return props.title?.at(0)
})
</script>

<template>
  <div class="relative flex mb-4">
    <div class="flex items-center justify-center w-16 text-xl font-bold rounded-md"  :class="cardClass">
			{{  initials  }}
    </div>
    <div class="ml-2" :class="detailsClass">
      <h3 class="text-lg font-bold mb-1.5">
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>
