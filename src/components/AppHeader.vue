<script lang="ts" setup>
import { config } from '@/config';
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
			<section>
				<router-link to="/" class="px-5 py-2 overflow-hidden cursor-pointer rounded-l-md bg-base-lvl-2">
				   Home
				</router-link>
				<router-link to="/saved-plans" class="px-5 py-2 overflow-hidden cursor-pointer rounded-r-md bg-base-lvl-2">
				   My Plans
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
