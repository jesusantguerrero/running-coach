<script setup lang="ts">
import PlanActivity from './PlanActivity.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'

defineProps<{
	plan: Record<string,string>
}>();

</script>

<template>
	<PlanActivity class="bg-yellow-300" card-class="text-yellow-500 bg-white" details-class="text-base-deep-1" :title="plan.day">
		<template #icon>
			<i class="note"/>
		</template>
		<template #heading>{{ plan.day }}</template>
		{{ plan.description }}
	</PlanActivity>
</template>
