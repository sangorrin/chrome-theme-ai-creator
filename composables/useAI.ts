import { ref } from 'vue';

export function useAI() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const themeData = useState<any>('generatedTheme', () => null);
  const progress = ref(0);

  const generateTheme = async (description: string) => {
    loading.value = true;
    error.value = null;
    progress.value = 0;

    try {
      // Call the API endpoint to generate the theme
      const response = await $fetch('/api/generate', {
        method: 'POST',
        body: { description },
      });

      progress.value = 100;
      themeData.value = response.theme;

      return response;
    } catch (err: any) {
      console.error('Failed to generate theme:', err);
      error.value = err.message || 'Failed to generate theme. Please try again.';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const regenerateImage = async (description: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch('/api/generate-image', {
        method: 'POST',
        body: { description },
      });

      if (themeData.value) {
        themeData.value.backgroundImage = response.imageUrl;
      }

      return response;
    } catch (err: any) {
      console.error('Failed to regenerate image:', err);
      error.value = err.message || 'Failed to regenerate image. Please try again.';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    themeData,
    progress,
    generateTheme,
    regenerateImage,
  };
}