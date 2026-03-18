<script setup lang="ts">
import AppHeader from '@/layouts/AppHeader.vue'
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main class="app-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  height: 100vh;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-content {
  width: 100%;
  flex: 1;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

@media (max-width: 1024px) {
  .app-shell {
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }

  .app-content {
    display: block;
    min-height: auto;
    overflow: visible;
  }
}
</style>
