<script setup lang="ts">
import PlanViewer from '../components/PlanViewer.vue'

defineProps<{
	results: Record<string,string>
	processing: boolean;
}>()
</script>

<template>
  <main>
    <PlanViewer :results="results" :processing="processing" />
  </main>
</template>
