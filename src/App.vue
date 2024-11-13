<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useComicStore } from './stores/comicStore';
const comicStore = useComicStore();

/**
 * Init app
 */
 onMounted(async () => {
    await comicStore.initApp();
});

</script>

<template>
  <div class="app-container">        
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  width: 100vw;         
  height: 100vh;        
  margin: 0;            
  padding: 0;           
  box-sizing: border-box;  
  overflow: hidden;     
}

/* Smallest device like Echo Show */
@media (max-width: 480px) {
  .app-container {
    width: 100vw;         
    height: 100vh;        
    overflow: hidden;     
  }
}
</style>
