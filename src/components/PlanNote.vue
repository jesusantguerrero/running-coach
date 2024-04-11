<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'

defineProps<{
	plan: Record<string,string>
}>();

</script>

<template>
	<WelcomeItem class="bg-yellow-300" card-class="bg-white text-yellow-500" :title="plan.day">
		<template #icon>
			<i class="note"/>
		</template>
		<template #heading>{{ plan.day }}</template>
		{{ plan.description }}
	</WelcomeItem>
</template>
