import { defineStore } from 'pinia';
import { ref, onBeforeUnmount } from 'vue';
import axios from 'axios';
import md5 from 'md5';


// API Marvel Keys
const publicKey = import.meta.env.VITE_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;

/**
 * Generate marvel API params
 * @param {*} publicKey 
 * @param {*} privateKey 
 * @returns 
 */
const generateMarvelAuthParams = (publicKey, privateKey) => {
  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + publicKey);
  return { ts, apikey: publicKey, hash };
};

/**
 * Store definition
 */
export const useComicStore = defineStore('comicStore', () => {
  const comicData = ref([]);
  const isAnimated = ref(false);
  const currentIndex = ref(0);
  const changeInterval = 5000;
  const currentTime = ref('');
  const isFullScreen = ref(false);
  const isLoading = ref(false);

  const isPopupOpen = ref(false);
  const characters = ref([]);
  const selectedCharacter = ref(null);
  const currentYear = new Date().getFullYear();
  const searchCharacter = ref('');

  // Default filters
  const filters = ref({
    selectedCharacterName: '',
    startDate: `${currentYear}`,
    endDate: `${currentYear}`,
    limit: 20,
  });

  // Load filters from storage
  const loadFiltersFromStorage = () => {
    const savedFilters = localStorage.getItem('comicFilters');
    const savedCharacter = localStorage.getItem('comicCharacter');
    if (savedFilters) {
      filters.value = JSON.parse(savedFilters);
      selectedCharacter.value = JSON.parse(savedCharacter);
    }
  };

  // Save filters to storage
  const saveFiltersToStorage = () => {
    const filterString = JSON.stringify(filters.value);
    const characterString = JSON.stringify(selectedCharacter.value);
    localStorage.setItem('comicFilters', filterString);
    localStorage.setItem('comicCharacter', characterString);    
    return true;
  };

  // Update real time
  const updateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Fetch Marvel Comics from API
  const fetchMarvelComics = async () => {
    isLoading.value = true;
    try {
      const { ts, apikey, hash } = generateMarvelAuthParams(publicKey, privateKey);
      const dateRange = `${filters.value.startDate}-01-01%2C${filters.value.endDate}-12-31`;
      const params = { ts, apikey, hash, limit: filters.value.limit };

      const response = selectedCharacter.value
        ? await axios.get(`https://gateway.marvel.com/v1/public/characters/${selectedCharacter.value.id}/comics?dateRange=${dateRange}`, { params })
        : await axios.get(`https://gateway.marvel.com/v1/public/comics?dateRange=${dateRange}`, { params });

      if (response.data.data.results.length === 0) return;

      comicData.value = response.data.data.results.map((comic) => ({
        title: comic.title,
        image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      }));

      currentIndex.value = 0;
      setTimeout(() => (isAnimated.value = true), 100);
    } catch (error) {
      console.error('Error obtaining data from Marvel API:', error);
    } finally {
      isLoading.value = false;
    }
  };

  // Fetch Marvel Characters from API
  const fetchCharacters = async () => {
    isLoading.value = true;
    try {
      const { ts, apikey, hash } = generateMarvelAuthParams(publicKey, privateKey);
      const params = { ts, apikey, hash, limit: 5, orderBy: '-modified', nameStartsWith: searchCharacter.value };
      const response = await axios.get(`https://gateway.marvel.com/v1/public/characters`, { params });
      
      if (response.data.data.results.length === 0) return;
      
      characters.value = response.data.data.results.map((char) => ({
        id: char.id,
        name: char.name,
        image: `${char.thumbnail.path}.${char.thumbnail.extension}`
      }));
    } catch (error) {
      console.error('Error obtaining characters from Marvel API:', error);
    } finally {
      isLoading.value = false;
    }
  };

  //cycle covers
  const cycleComics = () => {
    currentIndex.value = (currentIndex.value + 1) % comicData.value.length;
  };

  //toogle FullScreen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      isFullScreen.value = true;
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      isFullScreen.value = false;
    }
  };

  //Apply filters
  const applyFilters = async () => {
    if (saveFiltersToStorage()) {
     fetchMarvelComics();
    }
  };

  //Load data on init
  const initApp = () => {
    loadFiltersFromStorage(); // load filters from storage
    fetchMarvelComics();      // Fetch API covers
    updateTime();             // Update time

    setInterval(cycleComics, changeInterval); // Change cover on interval
    setInterval(updateTime, 60000);           // Change time each minute
  };

  onBeforeUnmount(() => {
    clearInterval(updateTime);
    clearInterval(cycleComics);
  });

  return {
    comicData,
    isAnimated,
    currentIndex,
    currentTime,
    isFullScreen,
    isLoading,
    isPopupOpen,
    characters,
    searchCharacter,
    selectedCharacter,
    filters,
    initApp,
    fetchMarvelComics,
    fetchCharacters,
    cycleComics,
    toggleFullScreen,
    applyFilters,
  };
});
