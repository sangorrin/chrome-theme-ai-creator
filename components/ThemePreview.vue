<template>
  <div class="theme-preview">
    <div class="chrome-simulation">
      <div class="header" :style="{ backgroundColor: themeColors.header }"></div>
      <div class="body" :style="{ backgroundColor: themeColors.body }">
        <img :src="backgroundImage" alt="Background Image" class="background-image" />
      </div>
      <div class="footer" :style="{ backgroundColor: themeColors.footer }"></div>
    </div>
    <div class="controls">
      <h3>Customize Your Theme</h3>
      <div>
        <label for="headerColor">Header Color:</label>
        <input type="color" id="headerColor" v-model="themeColors.header" @input="updateTheme" />
      </div>
      <div>
        <label for="bodyColor">Body Color:</label>
        <input type="color" id="bodyColor" v-model="themeColors.body" @input="updateTheme" />
      </div>
      <div>
        <label for="footerColor">Footer Color:</label>
        <input type="color" id="footerColor" v-model="themeColors.footer" @input="updateTheme" />
      </div>
      <button @click="regenerateBackground">Regenerate Background</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    themeColors: {
      type: Object,
      required: true
    },
    backgroundImage: {
      type: String,
      required: true
    }
  },
  methods: {
    updateTheme() {
      this.$emit('update:themeColors', this.themeColors);
    },
    regenerateBackground() {
      this.$emit('regenerate-background');
    }
  }
});
</script>

<style scoped>
.theme-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chrome-simulation {
  width: 800px;
  height: 600px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.header, .footer {
  height: 50px;
}

.body {
  flex: 1;
  position: relative;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.controls {
  margin-top: 20px;
}
</style>