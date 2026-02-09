<template>
  <div>
    <h1>Theme Generation</h1>
    <ThemePreview v-if="themeGenerated" :theme="theme" />
    <ThemeCustomizer v-if="themeGenerated" :theme="theme" @updateTheme="updateTheme" />
    <button v-if="!themeGenerated" @click="generateTheme">Generate Theme</button>
    <p v-if="loading">Generating theme, please wait...</p>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import ThemePreview from '@/components/ThemePreview.vue';
import ThemeCustomizer from '@/components/ThemeCustomizer.vue';
import { useAI } from '@/composables/useAI';
import { useTheme } from '@/composables/useTheme';

export default {
  components: {
    ThemePreview,
    ThemeCustomizer,
  },
  setup() {
    const themeGenerated = ref(false);
    const loading = ref(false);
    const theme = ref(null);
    const { generateTheme } = useAI();
    const { updateTheme } = useTheme();

    const generateNewTheme = async () => {
      loading.value = true;
      try {
        theme.value = await generateTheme();
        themeGenerated.value = true;
      } catch (error) {
        console.error('Error generating theme:', error);
      } finally {
        loading.value = false;
      }
    };

    return {
      themeGenerated,
      loading,
      theme,
      generateTheme: generateNewTheme,
      updateTheme,
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>