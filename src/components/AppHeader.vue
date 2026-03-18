<script setup lang="ts">
import { ref } from 'vue'
import BaseSelect from './ui/select/BaseSelect.vue'

const lang = ref('tr')

const links = [
  { text: 'Ana Sayfa', href: '#' },
  { text: 'Hakkimizda', href: '#' },
  { text: 'Hizmetler', href: '#' },
  { text: 'Iletisim', href: '#' },
]

const langOptions = [
  { label: 'Türkçe', value: 'tr' },
  { label: 'English', value: 'en' },
  { label: 'Deutsch', value: 'de' },
]
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <a href="#" class="logo">
        <span class="logo-text">Logo</span>
      </a>

      <nav class="nav-links">
        <a v-for="link in links" :key="link.href" :href="link.href" class="nav-link">{{
          link.text
        }}</a>
      </nav>

      <div class="lang-select">
        <BaseSelect
          v-model="lang"
          :options="langOptions"
          placeholder="Dil"
          size="sm"
          :full-width="false"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 1.5rem;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  text-decoration: none;
  color: #0f172a;
  font-weight: 700;
  font-size: 1.25rem;
}

.logo-text {
  display: inline-block;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.nav-link {
  color: #475569;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #2563eb;
}

.lang-select {
  display: flex;
  align-items: center;
}

.lang-select :deep(.select-wrapper) {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.lang-select :deep(.base-select) {
  min-width: 100px;
}
</style>
