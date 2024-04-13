<script lang="ts" setup>
import { config } from '@/config';
import IPlans from "@/components/icons/IPlans.vue";
import IHome from "@/components/icons/IHome.vue";
</script>

<template>
   <header class="relative z-50 flex items-center text-white border-b bg-base border-base-lvl-2">
        <section class="flex items-center justify-between w-full px-5 py-3 mx-auto max-w-7xl">
			<div class="flex items-center space-x-2">
				<h1 class="text-2xl font-bold text-white">
					<router-link to="/">
						<span class="font-bold text-primary">Neat</span>Coach
					</router-link>
				</h1>
			</div>
			<div class="relative flex mr-24 space-x-2">

			</div>
			<section class="flex">
				<router-link to="/" class="flex items-center px-5 py-2 overflow-hidden cursor-pointer rounded-l-md bg-base-lvl-2">
					<IHome />
					<span class="hidden ml-2 md:inline-block">
						Home
					</span>
				</router-link>
				<router-link to="/saved-plans" class="flex items-center px-5 py-2 overflow-hidden cursor-pointer rounded-r-md bg-base-lvl-2">
					<IPlans />
					<span class="hidden ml-2 md:inline-block">
						My Plans
					</span>
				</router-link>
			</section>
		</section>
    </header>
</template>

<style>
.profile-card {
    width: 100%;
    height: 100%;
    object-fit: cover;
    min-width: 200px;
    object-position: -10px -10px;
}
</style>
