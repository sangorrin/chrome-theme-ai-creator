<template>
  <div class="theme-customizer">
    <h2>Customize Your Theme</h2>
    <div class="color-options">
      <div class="color-option">
        <label for="backgroundColor">Background Color:</label>
        <input type="color" id="backgroundColor" v-model="theme.backgroundColor" @input="updateTheme" />
      </div>
      <div class="color-option">
        <label for="textColor">Text Color:</label>
        <input type="color" id="textColor" v-model="theme.textColor" @input="updateTheme" />
      </div>
      <div class="color-option">
        <label for="buttonColor">Button Color:</label>
        <input type="color" id="buttonColor" v-model="theme.buttonColor" @input="updateTheme" />
      </div>
      <div class="color-option">
        <label for="linkColor">Link Color:</label>
        <input type="color" id="linkColor" v-model="theme.linkColor" @input="updateTheme" />
      </div>
    </div>
    <div class="current-colors">
      <h3>Current Selections:</h3>
      <p>Background: {{ theme.backgroundColor }}</p>
      <p>Text: {{ theme.textColor }}</p>
      <p>Button: {{ theme.buttonColor }}</p>
      <p>Link: {{ theme.linkColor }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTheme } from '@/composables/useTheme';

export default defineComponent({
  setup() {
    const { theme, updateTheme } = useTheme();

    return {
      theme,
      updateTheme,
    };
  },
});
</script>

<style scoped>
.theme-customizer {
  padding: 20px;
}

.color-options {
  display: flex;
  flex-direction: column;
}

.color-option {
  margin-bottom: 10px;
}

.current-colors {
  margin-top: 20px;
}
</style>