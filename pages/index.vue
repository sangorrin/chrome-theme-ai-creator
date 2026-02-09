<template>
  <div class="container">
    <h1>Chrome Theme AI Creator</h1>
    <p>Create and customize your own Chrome themes effortlessly!</p>
    <ThemeGenerator @generate="handleGenerate" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ThemeGenerator from '@/components/ThemeGenerator.vue';

export default defineComponent({
  components: {
    ThemeGenerator,
  },
  methods: {
    handleGenerate(themeData: any) {
      // Logic to handle theme generation
      // This will typically involve navigating to the generate page
      // with the themeData passed as props or via a store
    },
  },
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
</style>