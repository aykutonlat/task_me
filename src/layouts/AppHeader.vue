<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const lang = ref('en')
const isOpen = ref(false)
const langContainerRef = ref<HTMLElement | null>(null)
const categories = ['Kategori 1', 'Kategori 2', 'Kategori 3', 'Kategori 4']

const langOptions = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
]

const current = computed(() => langOptions.find((o) => o.code === lang.value) ?? langOptions[1])

function selectLang(code: string) {
  lang.value = code
  isOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (langContainerRef.value && !langContainerRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <div class="logo-area">
        <a href="#" class="brand" @click.prevent>
          <span class="brand-text">Logo</span>
        </a>
      </div>

      <nav class="categories" aria-label="Main navigation">
        <!-- Task requirement: links are intentionally non-functional placeholders -->
        <a
          v-for="category in categories"
          :key="category"
          href="#"
          class="category-item"
          @click.prevent
          >{{ category }}</a
        >
      </nav>

      <div class="user-actions">
        <button type="button" class="wishlist-btn">
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path
              d="M12 20.55c-.3 0-.59-.11-.82-.31l-6.64-5.98a4.8 4.8 0 0 1 6.55-7l.91.82.91-.82a4.8 4.8 0 0 1 6.55 7l-6.64 5.98c-.23.2-.52.31-.82.31Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            />
          </svg>
          <span>Wishlist</span>
        </button>

        <div ref="langContainerRef" class="lang-container">
          <button
            type="button"
            class="lang-trigger"
            @click="isOpen = !isOpen"
            aria-haspopup="listbox"
            :aria-expanded="isOpen"
          >
            <span class="lang-flag" :class="`lang-flag--${lang}`" aria-hidden="true" />
            <span class="lang-code">{{ current?.code?.toUpperCase() ?? 'EN' }}</span>
            <svg class="lang-chevron" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M5.25 7.5 10 12.25 14.75 7.5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              />
            </svg>
          </button>
          <ul v-show="isOpen" class="lang-dropdown" role="listbox">
            <li
              v-for="opt in langOptions"
              :key="opt.code"
              role="option"
              :aria-selected="lang === opt.code"
              class="lang-option"
              @click="selectLang(opt.code)"
            >
              <span class="lang-flag" :class="`lang-flag--${opt.code}`" />
              <span>{{ opt.label }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  width: 100%;
  height: 72px;
  background: #fff;
  border-bottom: 1px solid #f1ede8;
  padding: 0 30px;
  box-shadow:
    0 0 2px 0 #4f5e711f,
    0 2px 4px 0 #4f5e711c,
    0 4px 8px 0 #4f5e711a;
}

.header-inner {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  height: 72px;
}

.logo-area {
  width: 510.5px;
  height: 72px;
  display: flex;
  align-items: center;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.brand-mark {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #d7d9de;
  position: relative;
}

.brand-mark::after {
  content: '';
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  background: #fff;
}

.brand-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  right: 5px;
  top: 11px;
  background: #251f00;
  z-index: 1;
}

.brand-text {
  color: #5f6778;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 33px;
  line-height: 1;
  letter-spacing: 0;
}

.categories {
  min-width: 339px;
  width: auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.category-item {
  width: 90px;
  flex-shrink: 0;
  min-height: 17px;
  color: #251f00;
  text-decoration: none;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;
  transition: color 0.2s ease;
}

.category-item:hover {
  color: #2563eb;
}

.user-actions {
  width: 510.5px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.wishlist-btn {
  border: 1px solid #f1ede8;
  border-radius: 50px;
  background: #fff;
  color: #251f00;
  display: inline-flex;
  align-items: center;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;
  cursor: pointer;
}

.wishlist-btn {
  width: 86px;
  height: 34px;
  padding: 8px 10px;
  gap: 4px;
}

.wishlist-btn svg {
  width: 28px;
  height: 28px;
}

.lang-container {
  position: relative;
}

.lang-trigger {
  width: 85px;
  height: 34px;
  padding: 8px 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #f1ede8;
  border-radius: 50px;
  background: #fff;
  color: #251f00;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;
  cursor: pointer;
}

.lang-flag {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
}

.lang-flag--tr {
  background:
    radial-gradient(circle at 22% 45%, #fff 0%, #fff 20%, transparent 20%),
    radial-gradient(circle at 28% 42%, transparent 0%, transparent 35%, #e30a17 35%), #e30a17;
}

.lang-flag--en {
  background:
    linear-gradient(90deg, transparent 40%, #cf142b 40%, #cf142b 60%, transparent 60%),
    linear-gradient(0deg, transparent 40%, #cf142b 40%, #cf142b 60%, transparent 60%),
    linear-gradient(-26deg, transparent 42%, #fff 42%, #fff 58%, transparent 58%),
    linear-gradient(26deg, transparent 42%, #fff 42%, #fff 58%, transparent 58%), #012169;
}

.lang-flag--de {
  background: linear-gradient(
    180deg,
    #000 0%,
    #000 33.33%,
    #dd0000 33.33%,
    #dd0000 66.66%,
    #ffce00 66.66%,
    #ffce00 100%
  );
}

.lang-code {
  min-width: 18px;
}

.lang-chevron {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 120px;
  margin: 0;
  padding: 4px 0;
  list-style: none;
  background: #fff;
  border: 1px solid #f1ede8;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #251f00;
}

.lang-option:hover {
  background: #f8fafc;
}

@media (max-width: 1100px) {
  .logo-area,
  .user-actions {
    width: auto;
    flex: 1;
  }

  .categories {
    width: auto;
    gap: 16px;
  }
}

@media (max-width: 900px) {
  .app-header {
    height: 64px;
    padding: 0 12px;
  }

  .header-inner {
    height: 64px;
    gap: 8px;
  }

  .categories {
    display: none;
  }

  .logo-area {
    min-width: 0;
  }

  .brand-text {
    font-size: 24px;
  }

  .user-actions {
    gap: 6px;
  }

  .wishlist-btn {
    width: auto;
    padding: 6px 10px;
  }

  .wishlist-btn span {
    display: none;
  }

  .lang-trigger {
    width: 74px;
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .app-header {
    height: 58px;
    padding: 0 10px;
  }

  .header-inner {
    height: 58px;
  }

  .brand-text {
    font-size: 20px;
  }

  .wishlist-btn {
    height: 32px;
    padding: 6px 8px;
  }

  .lang-trigger {
    width: 64px;
    height: 32px;
    padding: 6px 8px;
  }

  .lang-code {
    min-width: 16px;
    font-size: 12px;
  }
}
</style>
