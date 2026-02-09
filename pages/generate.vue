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

        <!-- Two-column layout on large screens: Customizer (left) and Preview (right, wider) -->
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <!-- Preview first on mobile, left column (2/5) on desktop -->
          <div class="lg:col-span-2 order-1 lg:order-1">
            <ThemeCustomizer
              :theme="themeData"
              @update-theme="handleThemeUpdate"
              @regenerate-background="regenerateBackground"
              :is-regenerating="isRegeneratingBackground"
            />
          </div>
          <!-- Customizer second on mobile, right column (3/5) on desktop -->
          <div class="lg:col-span-3 order-0 lg:order-2">
            <ThemePreview :theme="themeData" />
          </div>
        </div>

        <!-- Export section at the bottom -->
        <ThemeExport :theme="themeData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
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
    const { themeData, regenerateImage } = useAI();
    const isRegeneratingBackground = ref(false);

    const handleThemeUpdate = (updatedTheme: any) => {
      themeData.value = updatedTheme;
    };

    const regenerateBackground = async () => {
      if (!themeData.value) return;

      isRegeneratingBackground.value = true;
      try {
        const response = await regenerateImage(themeData.value.themeDescription);
        if (response?.imageUrl && themeData.value) {
          themeData.value = {
            ...themeData.value,
            backgroundImage: response.imageUrl
          };
        }
      } finally {
        isRegeneratingBackground.value = false;
      }
    };

    return {
      themeData,
      handleThemeUpdate,
      regenerateBackground,
      isRegeneratingBackground,
    };
  },
};
</script>