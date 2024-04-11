<script setup lang="ts">
import { computed, ref } from "vue";
import VLazyImage from "v-lazy-image";
import Image from "@/assets/bruno-nascimento-PHIgYUGQPvU-unsplash.jpg"

const props = defineProps<{
	plan: {
		distance: number;
		minutes: number;
	},
	distance: number;
	imageOnly?: boolean
}>();

const hasImageErrors = ref(false);
const handleLoadError = () => {
  hasImageErrors.value = true;
};

const imageUrl = computed(() => {
  return hasImageErrors.value ? null : props.plan.imageUrl;
});

const isHovered = ref(false);
</script>

<template>
  <article
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    class="group rounded-md overflow-hidden border shadow-md shadow-base-lvl-3 group relative"
  >
    <div
      class="w-full text-gray-200 font-bold h-72 flex items-center justify-center bg-gradient-to-br from-base to-base-lvl-2 overflow-hidden relative cursor-pointer"
    >
      <v-lazy-image
        v-if="!hasImageErrors"
        :src="Image"
        @error="handleLoadError"
        @onload="handledLoaded"
        class="w-full h-full group-hover:scale-110 transform ease-in-out transition-transform object-cover object-top"
        :alt="plan.title"
      />
      <span v-else class="px-4"> {{ plan.title }} </span>
    </div>
    <section
      class="w-full ease-linear group-hover:pb-20 cursor-pointer transition px-4 py-4 bg-gradient-to-b from-transparent via-base to-base-lvl-3 absolute text-white top-56"
      v-if="!imageOnly"
    >
      <h4 class="font-bold w-full flex overflow-ellipsis">
		{{ plan.weeks }} week-plan for
      </h4>
      <footer class="flex justify-between text-gray-200">
        <p>
          <span class="italic"> Minutes: </span>
          <span class="text-primary font-bold">
            {{ plan.minutes }}
          </span>
        </p>
        <span class="capitalize text-gray-200">{{ distance }} KM</span>
      </footer>
    </section>
  </article>
</template>
