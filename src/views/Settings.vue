
  <script setup>
  import { ref } from 'vue';
  import { useComicStore } from '../stores/comicStore';
  const comicStore = useComicStore();
  import { useRouter } from 'vue-router';
  const router = useRouter();
  
  // load years from 1975
  const initYear = 1975;
  const years = Array.from({ length: 150 }, (v, i) => ({
    value: `${initYear + i}`,
    label: `${initYear + i}`
  }));
  
  /**
   * Apply filters and navigate
   */
  const applyFilters = () => {
    comicStore.applyFilters();
    router.back();
  };
  </script>

<template>
  <div class="settings-container">
    <!-- Title -->
    <div class="title">SETTINGS</div>
    <div class="settings-grid">
      <div class="character-section">
        <label for="character">Character search:</label>
        <div class="search-group">
          <input type="text" v-model="comicStore.searchCharacter" placeholder="Type character name..." />
          <button class="button-search" @click="comicStore.fetchCharacters">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <label for="selectedCharacter">Selected character:</label>
        <select v-model="comicStore.selectedCharacter">
          <option v-for="char in comicStore.characters" :key="char.id" :value="char">
            {{ char.name }}
          </option>
        </select>
        <img 
          v-if="comicStore.selectedCharacter" 
          class="character-image" 
          :src="comicStore.selectedCharacter.image" 
          alt="Character Image" 
        />
      </div>
      <div class="date-section">
        <label for="startDate">Start year:</label>
        <select v-model="comicStore.filters.startDate">
          <option v-for="year in years" :key="year.value" :value="year.value">
            {{ year.label }}
          </option>
        </select>
        <label for="endDate">End year:</label>
        <select v-model="comicStore.filters.endDate">
          <option v-for="year in years" :key="year.value" :value="year.value">
            {{ year.label }}
          </option>
        </select>
      </div>
      <div class="limit-section">
        <label for="limit">Result number:</label>
        <input type="number" v-model="comicStore.filters.limit" min="1" />
      </div>
    </div>
    <div class="controls">
      <button class="apply-button" @click="applyFilters">
        <i class="fas fa-check"></i>
      </button>
    </div>
  </div>
</template>
