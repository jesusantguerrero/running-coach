<script setup lang="ts">
import { computed, ref } from "vue";
import VLazyImage from "v-lazy-image";
import Image from "@/assets/bruno-nascimento-PHIgYUGQPvU-unsplash.jpg"

const props = defineProps<{
	plan: {
		distance: number;
		minutes: number;
		title?: string;
	},
	distance: number;
	imageOnly?: boolean
}>();

const hasImageErrors = ref(false);
const handleLoadError = () => {
  hasImageErrors.value = true;
};


const isHovered = ref(false);
</script>

<template>
  <article
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    class="relative overflow-hidden border rounded-md shadow-md group shadow-base-lvl-3"
  >
    <div
      class="relative flex items-center justify-center w-full overflow-hidden font-bold text-gray-200 cursor-pointer h-72 bg-gradient-to-br from-base to-base-lvl-2"
    >
      <v-lazy-image
        v-if="!hasImageErrors"
        :src="Image"
        @error="handleLoadError"
        @onload="handledLoaded"
        class="object-cover object-top w-full h-full transition-transform ease-in-out transform group-hover:scale-110"
        :alt="plan.title"
      />
    </div>
    <section
      class="absolute w-full px-4 py-4 text-white transition ease-linear cursor-pointer group-hover:pb-20 bg-gradient-to-b from-transparent via-base to-base-lvl-3 top-56"
      v-if="!imageOnly"
    >
      <h4 class="flex w-full font-bold overflow-ellipsis">
				<span v-if="plan.title" class="px-4"> {{ plan.title }} </span>
				<span v-else>
					{{ plan.weeks }} week-plan for
				</span>
      </h4>
      <footer class="flex justify-between text-gray-200">
        <p>
          <span class="italic"> Minutes: </span>
          <span class="font-bold text-primary">
            {{ plan.minutes }}
          </span>
        </p>
        <span class="text-gray-200 capitalize">{{ plan.distance ?? distance }} KM</span>
      </footer>
    </section>
  </article>
</template>
