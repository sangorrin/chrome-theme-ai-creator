<template>
  <div class="theme-generator">
    <h2>Chrome Theme AI Creator</h2>
    <form @submit.prevent="generateTheme">
      <div>
        <label for="description">Theme Description:</label>
        <input type="text" v-model="themeDescription" id="description" required />
      </div>
      <div>
        <label for="color">Choose a Color:</label>
        <input type="color" v-model="themeColor" id="color" required />
      </div>
      <button type="submit">Generate Theme</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useAI } from '@/composables/useAI';

export default {
  setup() {
    const themeDescription = ref('');
    const themeColor = ref('#ffffff');
    const { generateTheme } = useAI();

    const handleThemeGeneration = async () => {
      await generateTheme(themeDescription.value, themeColor.value);
    };

    return {
      themeDescription,
      themeColor,
      generateTheme: handleThemeGeneration,
    };
  },
};
</script>

<style scoped>
.theme-generator {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.theme-generator h2 {
  margin-bottom: 15px;
}
.theme-generator form {
  display: flex;
  flex-direction: column;
}
.theme-generator label {
  margin-bottom: 5px;
}
.theme-generator input[type="text"],
.theme-generator input[type="color"] {
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.theme-generator button {
  padding: 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.theme-generator button:hover {
  background-color: #005bb5;
}
</style>