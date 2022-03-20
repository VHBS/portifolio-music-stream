const FAVORITE_SONGS_KEY = 'favorite_songs';
const TIMEOUT = 500;
const SUCCESS_STATUS = 'OK';

if (!JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY))) {
  localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([]));
}
const readFavoriteSongs = () => JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY));

const saveFavoriteSongs = (favoriteSongs) => localStorage
  .setItem(FAVORITE_SONGS_KEY, JSON.stringify(favoriteSongs));

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getFavoriteSongs = () => new Promise((resolve) => {
  const favoriteSongs = readFavoriteSongs();
  simulateRequest(favoriteSongs)(resolve);
});

export const addSong = (song) => new Promise((resolve) => {
  if (song) {
    const favoriteSongs = readFavoriteSongs();
    saveFavoriteSongs([...favoriteSongs, song]);
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const removeSong = (song) => new Promise((resolve) => {
  const favoriteSongs = readFavoriteSongs();
  saveFavoriteSongs(favoriteSongs.filter((s) => s.trackId !== song.trackId));
  simulateRequest(SUCCESS_STATUS)(resolve);
});
