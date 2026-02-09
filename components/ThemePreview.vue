<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-90">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Theme Preview</h2>

    <!-- Chrome Browser Mockup -->
    <div class="chrome-browser rounded-lg overflow-hidden shadow-2xl border-2 border-gray-200">
      <!-- Chrome Header -->
      <div class="chrome-header px-2 py-3 flex items-center space-x-1"
           :style="{ backgroundColor: theme.colors.ntpHeader }">
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
        <div class="flex items-center space-x-2 flex-shrink-0"
             :style="{ color: theme.colors.toolbarButtonIcon }">
          <span>⚙️</span>
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
  </div>
</template>

<script setup lang="ts">
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

defineProps<{
  theme: ThemeData;
}>();
</script>