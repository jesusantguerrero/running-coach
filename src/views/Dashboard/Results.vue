<script setup lang="ts">
import { onMounted, ref } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import PlanViewer from "@/components/PlanViewer.vue";
import { usePlanStorage } from "@/libs/usePlanStorage";
import TemplateItem from "@/components/TemplateItem.vue";

const results = ref({ response: ""});
const planConfig = ref();

const isLoading = ref(false);

const { list, remove, markAsCurrent, update } = usePlanStorage();
const savedPlans = ref<any[]>([]);
const fetchPlans = () => {
	savedPlans.value = list();
}

onMounted(() => {
	fetchPlans();
})

const reset = () => {
	results.value = {
		response: ''
	};
}

const onSelect = (plan: any, id: number) => {
	results.value = {
		...plan,
		id
	}
}

const onRemove = (plan: any) => {
	remove(plan.id)
	fetchPlans()
	reset()
}

const onMark = () => {
	const isCurrent = !results.value?.current;
	results.value.current = isCurrent;
	savedPlans.value[results.value.id].current = isCurrent;
	markAsCurrent(results.value.id)
}

const onUpdate = (updatedPlan: any) => {
	const updatedData = {
		...results.value,
		steps: updatedPlan,
		id: results.value.id
	};
	savedPlans.value[results.value.id] = updatedData;
	update(results.value.id, updatedData)
}
</script>

<template>
  <main>
		<AppHeader />
		<TransitionGroup name="slide">
			<section v-if="!results.response" class="mx-auto mt-8 max-w-7xl">
				<h4 class="mb-2 text-4xl font-bold text-body">Saved plans</h4>
				<div class="grid grid-cols-1 gap-2 mt-4 md:grid-cols-2">
					<TemplateItem
						v-for="(plan, id) in savedPlans"
						:plan="plan" @click="onSelect(plan, id)"
					/>
				</div>
			</section>
			<PlanViewer
				v-if="isLoading || results.response"
				:results="results"
				:config-date="planConfig"
				:processing="isLoading" class="px-4 mx-auto mt-8 max-w-7xl"
				hide-save
				@back="reset"
				@mark="onMark"
				@update="onUpdate"
				@remove="onRemove(results)"
			/>
		</TransitionGroup>
	</main>

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
