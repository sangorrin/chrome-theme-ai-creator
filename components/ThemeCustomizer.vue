<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-90">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Customize Colors</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Bookmark Text -->
      <div class="color-option">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Bookmark Text
        </label>
        <div class="flex items-center space-x-3">
          <input
            type="color"
            v-model="localTheme.colors.bookmarkText"
            @input="updateTheme"
            class="w-20 h-12 rounded cursor-pointer flex-shrink-0"
          />
          <input
            type="text"
            v-model="localTheme.colors.bookmarkText"
            @input="updateTheme"
            class="w-28 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
          />
        </div>
      </div>

      <!-- NTP Text -->
      <div class="color-option">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          New Tab Text
        </label>
        <div class="flex items-center space-x-3">
          <input
            type="color"
            v-model="localTheme.colors.ntpText"
            @input="updateTheme"
            class="w-20 h-12 rounded cursor-pointer flex-shrink-0"
          />
          <input
            type="text"
            v-model="localTheme.colors.ntpText"
            @input="updateTheme"
            class="w-28 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
          />
        </div>
      </div>

      <!-- NTP Link -->
      <div class="color-option">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          New Tab Links
        </label>
        <div class="flex items-center space-x-3">
          <input
            type="color"
            v-model="localTheme.colors.ntpLink"
            @input="updateTheme"
            class="w-20 h-12 rounded cursor-pointer flex-shrink-0"
          />
          <input
            type="text"
            v-model="localTheme.colors.ntpLink"
            @input="updateTheme"
            class="w-28 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
          />
        </div>
      </div>

      <!-- NTP Header -->
      <div class="color-option">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Header Background
        </label>
        <div class="flex items-center space-x-3">
          <input
            type="color"
            v-model="localTheme.colors.ntpHeader"
            @input="updateTheme"
            class="w-20 h-12 rounded cursor-pointer flex-shrink-0"
          />
          <input
            type="text"
            v-model="localTheme.colors.ntpHeader"
            @input="updateTheme"
            class="w-28 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
          />
        </div>
      </div>

      <!-- Omnibox Background -->
      <div class="color-option">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Address Bar Background
        </label>
        <div class="flex items-center space-x-3">
          <input
            type="color"
            v-model="localTheme.colors.omniboxBackground"
            @input="updateTheme"
            class="w-20 h-12 rounded cursor-pointer flex-shrink-0"
          />
          <input
            type="text"
            v-model="localTheme.colors.omniboxBackground"
            @input="updateTheme"
            class="w-28 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
          />
        </div>
      </div>

      <!-- Omnibox Text -->
      <div class="color-option">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Address Bar Text
        </label>
        <div class="flex items-center space-x-3">
          <input
            type="color"
            v-model="localTheme.colors.omniboxText"
            @input="updateTheme"
            class="w-20 h-12 rounded cursor-pointer flex-shrink-0"
          />
          <input
            type="text"
            v-model="localTheme.colors.omniboxText"
            @input="updateTheme"
            class="w-28 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
          />
        </div>
      </div>

      <!-- Toolbar Text -->
      <div class="color-option">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Toolbar Text
        </label>
        <div class="flex items-center space-x-3">
          <input
            type="color"
            v-model="localTheme.colors.toolbarText"
            @input="updateTheme"
            class="w-20 h-12 rounded cursor-pointer flex-shrink-0"
          />
          <input
            type="text"
            v-model="localTheme.colors.toolbarText"
            @input="updateTheme"
            class="w-28 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
          />
        </div>
      </div>

      <!-- Toolbar Button Icon -->
      <div class="color-option">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Toolbar Icons
        </label>
        <div class="flex items-center space-x-3">
          <input
            type="color"
            v-model="localTheme.colors.toolbarButtonIcon"
            @input="updateTheme"
            class="w-20 h-12 rounded cursor-pointer flex-shrink-0"
          />
          <input
            type="text"
            v-model="localTheme.colors.toolbarButtonIcon"
            @input="updateTheme"
            class="w-28 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
          />
        </div>
      </div>
    </div>

    <!-- Regenerate Background Button -->
    <div class="mt-6 pt-6 border-t border-gray-200">
      <button
        @click="$emit('regenerate-background')"
        :disabled="isRegenerating"
        class="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {{ isRegenerating ? '🎨 Generating New Background...' : '🎨 Regenerate Background Image' }}
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface ThemeData {
  themeName: string;
  themeDescription: string;
  colors: {
    bookmarkText: string;
    ntpText: string;
    ntpLink: string;
    ntpHeader: string;
    omniboxBackground: string;
    omniboxText: string;
    toolbarText: string;
    toolbarButtonIcon: string;
  };
  backgroundImage: string;
}

const props = defineProps<{
  theme: ThemeData;
  isRegenerating?: boolean;
}>();

const emit = defineEmits<{
  'update-theme': [theme: ThemeData];
  'regenerate-background': [];
}>();

const localTheme = ref(JSON.parse(JSON.stringify(props.theme)));

watch(() => props.theme, (newTheme) => {
  localTheme.value = JSON.parse(JSON.stringify(newTheme));
}, { deep: true });

const updateTheme = () => {
  emit('update-theme', localTheme.value);
};

</script>