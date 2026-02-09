<template>
  <div class="theme-export">
    <h2>Export Your Chrome Theme</h2>
    <button @click="downloadTheme">Download Theme</button>
    <div v-if="showInstructions" class="installation-instructions">
      <h3>Installation Instructions</h3>
      <p>To install your theme, follow these steps:</p>
      <ol>
        <li>Open Chrome and go to <strong>chrome://extensions/</strong>.</li>
        <li>Enable <strong>Developer mode</strong> in the top right corner.</li>
        <li>Click on <strong>Load unpacked</strong> and select the folder containing your theme.</li>
      </ol>
      <button @click="closeInstructions">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      showInstructions: false,
    };
  },
  methods: {
    downloadTheme() {
      // Logic to create and download the theme zip package
      this.showInstructions = true;
    },
    closeInstructions() {
      this.showInstructions = false;
    },
  },
});
</script>

<style scoped>
.theme-export {
  text-align: center;
  margin: 20px;
}

.installation-instructions {
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>