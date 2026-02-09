<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <div class="container mx-auto px-4 py-12 max-w-5xl">
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Chrome Theme AI Creator
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Create and customize your own Chrome themes effortlessly with AI!
        </p>
      </div>
      <ThemeGenerator @generate="handleGenerate" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ThemeGenerator from '@/components/ThemeGenerator.vue';

export default defineComponent({
  components: {
    ThemeGenerator,
  },
});
</script>