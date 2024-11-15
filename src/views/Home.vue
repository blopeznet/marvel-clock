<script setup>
import { onMounted,onUnmounted } from 'vue';
import { useComicStore } from '../stores/comicStore';
import { useRouter } from 'vue-router';
const router = useRouter();
const comicStore = useComicStore();
let intervalId;

/**
 * Load data
 */
onMounted(async () => {
  await comicStore.fetchMarvelComics();
  intervalId = setInterval(() => {
    comicStore.currentIndex = (comicStore.currentIndex + 1) % comicStore.comicData.length;
  }, 10000); // Cambia cada 10 segundos, ajusta si es necesario
});

onUnmounted(() => {
  clearInterval(intervalId);
});

/**
 * Execute change full screen from store
 */
const toggleFullScreen = () => {
  comicStore.toggleFullScreen();
};

/**
 * Navigate to settings
 */
const navigateToSettings = () => {
  router.push('/settings');
}

</script>

<template>
  <div class="home">


    <div class="attributed">Data provided by Marvel. © 2014 Marvel</div>

    <!-- Loading ring -->
    <div v-if="comicStore.isLoading" class="loading-ring-container">
      <div class="loading-ring-spinner"></div>
    </div>

    <!-- Clock -->
    <div class="clock">
      {{ comicStore.currentTime }}
    </div>

    <div class="calendar" v-if=false>
      <p>{{ comicStore.currentDate }}</p>
    </div>

    <!-- Marvel video-->
    <video autoplay muted loop="true">
      <source src="/video/marvel.mp4" type="video/mp4">
    </video>

    <!-- Comic Background and Foreground Images -->
    <div v-if="comicStore.comicData.length" class="comic-background">
      <!-- Background Image -->
      <img v-for="(comic, index) in comicStore.comicData" :key="`background-${index}`" :src="comic.image"
        alt="Background Comic Image" class="comic-background-image"
        :class="{ fadeIn: comicStore.isAnimated && comicStore.currentIndex === index }" />

      <!-- Main Comic Image in the Foreground -->
      <div v-for="(comic, index) in comicStore.comicData" :key="index" class="comic-foreground"
        :class="{ visible: comicStore.currentIndex === index }">
        <img :src="comic.image" :alt="comic.title" class="comic-img-foreground" />
      </div>
    </div>

    <!-- Comic Info (Title) -->
    <div v-if="comicStore.comicData.length" class="comic-info">
      {{ comicStore.comicData[comicStore.currentIndex].title }}
    </div>

    <!-- Control Buttons -->
    <div class="controls">
      <button class="apply-button" @click="comicStore.fetchMarvelComics" aria-label="Recargar imágenes">
        <i class="fas fa-redo"></i>
      </button>
      <button class="apply-button" @click="toggleFullScreen">
        <i :class="comicStore.isFullScreen ? 'fas fa-compress' : 'fas fa-expand'"></i>
      </button>
      <button class="apply-button" @click="navigateToSettings">
        <i class="fas fa-gear"></i>
      </button>
    </div>



  </div>
</template>
