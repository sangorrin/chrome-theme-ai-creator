<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 backdrop-blur-sm bg-opacity-90">
    <form @submit.prevent="handleThemeGeneration" class="space-y-8">
      <div class="space-y-3">
        <label for="description" class="block text-lg font-semibold text-gray-700">
          Theme Description
        </label>
        <div class="relative">
          <textarea
            v-model="themeDescription"
            id="description"
            required
            :disabled="loading"
            placeholder="Describe your theme... (type # to insert a color)"
            @input="handleInput"
            @keydown="handleKeydown"
            ref="textareaRef"
            class="w-full min-h-[200px] px-4 py-3 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-y font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <input
            v-if="showColorPicker"
            type="color"
            ref="colorPickerRef"
            @change="insertColor"
            @blur="hideColorPicker"
            class="fixed z-50 opacity-0 pointer-events-auto"
            :style="{ top: colorPickerPosition.top + 'px', left: colorPickerPosition.left + 'px' }"
          />
          <div class="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded">
            💡 Tip: Type # for color picker
          </div>
        </div>
      </div>

      <!-- Error message -->
      <div v-if="error" class="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700">
        <p class="font-semibold">Error:</p>
        <p>{{ error }}</p>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
        <div class="flex items-center space-x-3">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <p class="text-blue-700 font-semibold">Generating your theme...</p>
        </div>
        <p class="text-sm text-blue-600 mt-2">This may take 10-20 seconds</p>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        ✨ Generate Theme
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, nextTick } from 'vue';
import { useAI } from '@/composables/useAI';

export default {
  setup() {
    const themeDescription = ref('');
    const showColorPicker = ref(false);
    const colorPickerPosition = ref({ top: 0, left: 0 });
    const textareaRef = ref<HTMLTextAreaElement | null>(null);
    const colorPickerRef = ref<HTMLInputElement | null>(null);
    const hashPosition = ref(0);
    const { loading, error, generateTheme } = useAI();

    const handleInput = (event: Event) => {
      const target = event.target as HTMLTextAreaElement;
      const cursorPos = target.selectionStart;
      const text = target.value;

      // Check if the character before cursor is #
      if (cursorPos > 0 && text[cursorPos - 1] === '#') {
        showColorPicker.value = true;
        hashPosition.value = cursorPos - 1;

        // Calculate position for color picker
        nextTick(() => {
          if (textareaRef.value) {
            const rect = textareaRef.value.getBoundingClientRect();
            colorPickerPosition.value = {
              top: rect.top + 30,
              left: rect.left + 20
            };

            // Focus color picker
            if (colorPickerRef.value) {
              colorPickerRef.value.click();
            }
          }
        });
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      // Close color picker on Escape
      if (event.key === 'Escape' && showColorPicker.value) {
        showColorPicker.value = false;
      }
    };

    const insertColor = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const color = target.value;

      // Replace the # with the full color code
      const before = themeDescription.value.substring(0, hashPosition.value);
      const after = themeDescription.value.substring(hashPosition.value + 1);
      themeDescription.value = before + color + after;

      showColorPicker.value = false;

      // Refocus textarea
      nextTick(() => {
        if (textareaRef.value) {
          textareaRef.value.focus();
          const newPos = hashPosition.value + color.length;
          textareaRef.value.setSelectionRange(newPos, newPos);
        }
      });
    };

    const hideColorPicker = () => {
      setTimeout(() => {
        showColorPicker.value = false;
      }, 200);
    };

    const handleThemeGeneration = async () => {
      try {
        await generateTheme(themeDescription.value);
        // Navigate to generate page to show the theme
        await navigateTo('/generate');
      } catch (err) {
        // Error is already handled in useAI
        console.error('Theme generation error:', err);
      }
    };

    return {
      themeDescription,
      showColorPicker,
      colorPickerPosition,
      textareaRef,
      colorPickerRef,
      loading,
      error,
      handleInput,
      handleKeydown,
      insertColor,
      hideColorPicker,
      handleThemeGeneration,
    };
  },
};
</script>

