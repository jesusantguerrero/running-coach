<script lang="ts" setup>
import { config } from '@/config';
</script>

<template>
   <div class="relative z-50 flex justify-between px-5 py-3 text-white bg-gray-700 items-center">
        <div class="flex items-center space-x-2">
            <h1 class="text-2xl font-bold text-primary">
                {{ config.appName }}
            </h1>
        </div>
        <div class="relative flex mr-24 space-x-2">

        </div>
        <router-link to="/dashboard" class="overflow-hidden bg-gray-700  rounded-md cursor-pointer right-5">
           My Plans
        </router-link>
    </div>
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
