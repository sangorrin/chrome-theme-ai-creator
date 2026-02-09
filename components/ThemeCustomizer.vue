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
            class="w-16 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            v-model="localTheme.colors.bookmarkText"
            @input="updateTheme"
            class="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
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
            class="w-16 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            v-model="localTheme.colors.ntpText"
            @input="updateTheme"
            class="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
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
            class="w-16 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            v-model="localTheme.colors.ntpLink"
            @input="updateTheme"
            class="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
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
            class="w-16 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            v-model="localTheme.colors.ntpHeader"
            @input="updateTheme"
            class="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
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
            class="w-16 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            v-model="localTheme.colors.omniboxBackground"
            @input="updateTheme"
            class="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
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
            class="w-16 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            v-model="localTheme.colors.omniboxText"
            @input="updateTheme"
            class="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
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
            class="w-16 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            v-model="localTheme.colors.toolbarText"
            @input="updateTheme"
            class="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
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
            class="w-16 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            v-model="localTheme.colors.toolbarButtonIcon"
            @input="updateTheme"
            class="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-sm"
          />
        </div>
      </div>
    </div>

    <div class="mt-6 flex space-x-4">
      <button
        @click="regenerateImage"
        class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-lg transition-colors"
      >
        🎨 Regenerate Background Image
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
}>();

const emit = defineEmits<{
  'update-theme': [theme: ThemeData];
  'regenerate-image': [];
}>();

const localTheme = ref(JSON.parse(JSON.stringify(props.theme)));

watch(() => props.theme, (newTheme) => {
  localTheme.value = JSON.parse(JSON.stringify(newTheme));
}, { deep: true });

const updateTheme = () => {
  emit('update-theme', localTheme.value);
};

const regenerateImage = () => {
  emit('regenerate-image');
};

</script>