<script setup lang="ts">
import { onMounted, ref } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import PlanViewer from "@/components/PlanViewer.vue";
import { usePlanStorage } from "@/libs/usePlanStorage";

const distance = ref<number|null>(null);
const results = ref({ response: ""});
const planConfig = ref();

const fetchPlans = async(config: any) => {
	const response = await fetch(`/api/plans?distance=${distance.value || config.distance || 5}&minutes=${config.minutes ?? 30}&weeks=${config.weeks ?? 4}`)
	.then(res => res)
	.then(res => res.json())

	return response;
}

const isLoading = ref(false);
const onSubmit = (config: any) => {
	isLoading.value = true;
	fetchPlans(config)
		.then((res) => {
			results.value = res;
		})
		.finally(() => {
			isLoading.value = false;
		})
}

const { list } = usePlanStorage();
const savedPlans = ref<any[]>([]);

onMounted(() => {
	savedPlans.value = list();
})
</script>

<template>
  <main>
		<AppHeader />
		<section v-if="!results.response">
			<div class="mt-4">
				<div v-for="plan in savedPlans">
					{{ plan.title }} {{  plan }}
				</div>
			</div>
		</section>
		<PlanViewer
			v-if="isLoading || results.response"
			:results="results"
			:config-date="planConfig"
			:processing="isLoading" class="px-4 mt-4"
			@save="onSave"
			@back="onBack"
		/>
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
