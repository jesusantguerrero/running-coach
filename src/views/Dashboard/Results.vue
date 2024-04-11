<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import PlanViewer from '@/components/PlanViewer.vue'

defineProps<{
	results: Record<string,string>
	processing: boolean;
}>()
</script>

<template>
  <main>
		<AppHeader />
    <PlanViewer :results="results" :processing="processing" />
  </main>
</template>
