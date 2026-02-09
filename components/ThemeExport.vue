<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-90">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Export Your Theme</h2>

    <div class="space-y-4">
      <button
        @click="downloadTheme"
        class="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg"
      >
        📦 Download Theme Package
      </button>

      <button
        @click="copyManifest"
        class="w-full px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl shadow-lg transition-colors text-lg"
      >
        📋 Copy Manifest JSON
      </button>
    </div>

    <div v-if="showInstructions" class="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
      <h3 class="text-xl font-bold text-gray-900 mb-4">Installation Instructions</h3>
      <ol class="list-decimal list-inside space-y-2 text-gray-700">
        <li>Open Chrome and go to <code class="px-2 py-1 bg-gray-100 rounded">chrome://extensions/</code></li>
        <li>Enable <strong>Developer mode</strong> in the top right corner</li>
        <li>Click <strong>Load unpacked</strong> and select the extracted theme folder</li>
        <li>Your theme will be applied immediately!</li>
      </ol>
      <button
        @click="closeInstructions"
        class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Got it!
      </button>
    </div>

    <div v-if="copied" class="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-green-700 text-center">
      ✅ Manifest JSON copied to clipboard!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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

const showInstructions = ref(false);
const copied = ref(false);

const generateManifest = () => {
  return {
    manifest_version: 3,
    name: props.theme.themeName,
    version: '1.0',
    description: props.theme.themeDescription,
    theme: {
      colors: {
        frame: props.theme.colors.ntpHeader,
        toolbar: props.theme.colors.ntpHeader,
        tab_text: props.theme.colors.toolbarText,
        tab_background_text: props.theme.colors.bookmarkText,
        bookmark_text: props.theme.colors.bookmarkText,
        ntp_background: props.theme.colors.ntpHeader,
        ntp_text: props.theme.colors.ntpText,
        ntp_link: props.theme.colors.ntpLink,
      },
      images: {
        theme_ntp_background: props.theme.backgroundImage
      }
    }
  };
};

const downloadTheme = () => {
  const manifest = generateManifest();
  const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${props.theme.themeName.replace(/\s+/g, '_')}_manifest.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showInstructions.value = true;
};

const copyManifest = async () => {
  const manifest = generateManifest();
  try {
    await navigator.clipboard.writeText(JSON.stringify(manifest, null, 2));
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 3000);
  } catch (err) {
    console.error('Failed to copy manifest:', err);
  }
};

const closeInstructions = () => {
  showInstructions.value = false;
};

</script>