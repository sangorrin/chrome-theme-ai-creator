<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-90">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Theme Preview</h2>

    <!-- Chrome Browser Mockup -->
    <div class="chrome-browser rounded-lg overflow-hidden shadow-2xl border-2 border-gray-200">
      <!-- Chrome Header with Tabs -->
      <div class="chrome-header px-2 py-2 pb-0"
           :style="{ backgroundColor: theme.colors.ntpHeader }">
        <!-- Tabs -->
        <div class="flex items-end space-x-1 mb-2">
          <div class="px-3 py-2 bg-white bg-opacity-20 rounded-t-lg flex items-center space-x-2">
            <span class="text-sm" :style="{ color: theme.colors.toolbarText }">New Tab</span>
          </div>
          <div class="px-3 py-1 text-xs opacity-60 flex items-center">
            <span :style="{ color: theme.colors.toolbarText }">+</span>
          </div>
        </div>

        <!-- Address bar row -->
        <div class="flex items-center space-x-1 pb-3">
          <div class="flex space-x-1.5 flex-shrink-0">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <!-- Omnibox (Address Bar) -->
          <div class="flex-1 mx-2 px-3 py-2 rounded-full flex items-center space-x-2 min-w-0 overflow-hidden"
               :style="{
                 backgroundColor: theme.colors.omniboxBackground,
                 color: theme.colors.omniboxText
               }">
            <span class="flex-shrink-0">🔒</span>
            <span class="text-sm truncate">chrome://newtab</span>
          </div>

          <!-- Toolbar Icons -->
          <div class="flex items-center space-x-2 flex-shrink-0 text-lg"
               :style="{ color: theme.colors.toolbarButtonIcon }">
            <span>★</span>
            <span>⋮</span>
          </div>
        </div>
      </div>

      <!-- Bookmarks Bar -->
      <div class="bookmarks-bar px-4 py-2 flex items-center space-x-4 text-sm border-b"
           :style="{
             backgroundColor: theme.colors.ntpHeader,
             color: theme.colors.bookmarkText,
             borderColor: theme.colors.ntpHeader + '40'
           }">
        <span>📁 Apps</span>
        <span>🔖 Bookmark 1</span>
        <span>🔖 Bookmark 2</span>
      </div>

      <!-- New Tab Page Content -->
      <div class="ntp-content relative h-96 flex flex-col items-center justify-center p-4 sm:p-8"
           :style="{
             backgroundImage: theme.backgroundImage ? `url(${theme.backgroundImage})` : 'none',
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundColor: theme.colors.ntpHeader
           }">
        <div class="ntp-overlay absolute inset-0 bg-black bg-opacity-10"></div>
        <div class="relative z-10 text-center w-full max-w-2xl px-4">
          <h1 class="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 drop-shadow-lg"
              :style="{ color: theme.colors.ntpText }">
            New Tab
          </h1>

          <!-- Search Box -->
          <div class="mb-6 sm:mb-8 w-full max-w-xl mx-auto">
            <div class="bg-white bg-opacity-90 rounded-full px-4 sm:px-6 py-3 sm:py-4 flex items-center shadow-lg">
              <span class="text-gray-400 mr-3">🔍</span>
              <input
                type="text"
                placeholder="Search Google or type a URL"
                class="flex-1 bg-transparent outline-none text-gray-700 text-sm sm:text-base"
                disabled
              />
            </div>
          </div>

          <div class="flex flex-wrap justify-center gap-2 sm:gap-4">
            <a href="#" class="px-3 sm:px-4 py-2 rounded hover:underline text-sm sm:text-base"
               :style="{ color: theme.colors.ntpLink }">
              Most Visited
            </a>
            <a href="#" class="px-3 sm:px-4 py-2 rounded hover:underline text-sm sm:text-base"
               :style="{ color: theme.colors.ntpLink }">
              Apps
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Theme Info -->
    <div class="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 class="font-semibold text-gray-700 mb-2">Theme Details</h3>
      <div class="grid grid-cols-2 gap-2 text-sm">
        <div><span class="text-gray-600">Name:</span> {{ theme.themeName }}</div>
        <div><span class="text-gray-600">Description:</span> {{ theme.themeDescription }}</div>
      </div>
    </div>

    <!-- Export Button -->
    <div class="mt-4">
      <button
        @click="downloadTheme"
        :disabled="isDownloading"
        class="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {{ isDownloading ? '⏳ Creating Package...' : '📦 Download Theme Package' }}
      </button>
    </div>

    <!-- Installation Instructions -->
    <div v-if="showInstructions" class="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
      <h3 class="font-bold text-gray-900 mb-3 text-sm">Installation Instructions</h3>
      <ol class="list-decimal list-inside space-y-1 text-gray-700 text-sm">
        <li>Extract the ZIP file to a folder on your computer</li>
        <li>Open Chrome and go to <code class="px-2 py-1 bg-gray-100 rounded text-xs">chrome://extensions/</code></li>
        <li>Enable <strong>Developer mode</strong> in the top right corner</li>
        <li>Click <strong>Load unpacked</strong> and select the extracted theme folder</li>
        <li>Your theme will be applied immediately!</li>
      </ol>
      <button
        @click="closeInstructions"
        class="mt-3 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
      >
        Got it!
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JSZip from 'jszip';
import { hexToRgb } from '~/utils/colorUtils';
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
const isDownloading = ref(false);

const generateManifest = (useLocalPath: boolean = false) => {
  return {
    manifest_version: 3,
    name: props.theme.themeName,
    version: '1.0',
    description: props.theme.themeDescription,
    theme: {
      colors: {
        frame: hexToRgb(props.theme.colors.ntpHeader),
        toolbar: hexToRgb(props.theme.colors.ntpHeader),
        tab_text: hexToRgb(props.theme.colors.toolbarText),
        tab_background_text: hexToRgb(props.theme.colors.bookmarkText),
        bookmark_text: hexToRgb(props.theme.colors.bookmarkText),
        ntp_background: hexToRgb(props.theme.colors.ntpHeader),
        ntp_text: hexToRgb(props.theme.colors.ntpText),
        ntp_link: hexToRgb(props.theme.colors.ntpLink),
      },
      images: {
        theme_ntp_background: useLocalPath ? 'images/background.png' : props.theme.backgroundImage
      }
    }
  };
};

const downloadTheme = async () => {
  isDownloading.value = true;

  try {
    const zip = new JSZip();

    const manifest = generateManifest(true);
    zip.file('manifest.json', JSON.stringify(manifest, null, 2));

    const imageUrl = `/api/download-image?url=${encodeURIComponent(props.theme.backgroundImage)}`;
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch background image');
    }
    const imageBlob = await imageResponse.blob();

    const imagesFolder = zip.folder('images');
    if (imagesFolder) {
      imagesFolder.file('background.png', imageBlob);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });

    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${props.theme.themeName.replace(/\s+/g, '_')}_theme.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showInstructions.value = true;
  } catch (error) {
    console.error('Failed to create theme package:', error);
    alert('Failed to create theme package. Please try again.');
  } finally {
    isDownloading.value = false;
  }
};

const closeInstructions = () => {
  showInstructions.value = false;
};
</script>