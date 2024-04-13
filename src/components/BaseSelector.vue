<script setup lang="ts">
import { ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

const props = defineProps<{
	options: string[]
}>();

const selected = ref(props.options[0])
</script>


<template>
		<select class="">
			<option value="" v-for="option in options" class="bg-white/5 text-base-lvl-3">
				{{ option }}
			</option>
		</select>
  </template>
