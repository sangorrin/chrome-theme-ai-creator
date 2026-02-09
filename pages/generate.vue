<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="mb-8">
        <button
          @click="$router.push('/')"
          class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>←</span>
          <span>Back to Generator</span>
        </button>
      </div>

      <div v-if="!themeData" class="text-center py-20">
        <p class="text-xl text-gray-600">No theme generated yet. Go back and generate one!</p>
        <button
          @click="$router.push('/')"
          class="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Generate Theme
        </button>
      </div>

      <div v-else class="space-y-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ themeData.themeName }}</h1>
          <p class="text-lg text-gray-600">{{ themeData.themeDescription }}</p>
        </div>

        <ThemePreview :theme="themeData" />
        <ThemeCustomizer :theme="themeData" @update-theme="handleThemeUpdate" />
        <ThemeExport :theme="themeData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import ThemePreview from '@/components/ThemePreview.vue';
import ThemeCustomizer from '@/components/ThemeCustomizer.vue';
import ThemeExport from '@/components/ThemeExport.vue';
import { useAI } from '@/composables/useAI';

export default {
  components: {
    ThemePreview,
    ThemeCustomizer,
    ThemeExport,
  },
  setup() {
    const { themeData } = useAI();

    const handleThemeUpdate = (updatedTheme: any) => {
      themeData.value = updatedTheme;
    };

    return {
      themeData,
      handleThemeUpdate,
    };
  },
};
</script>