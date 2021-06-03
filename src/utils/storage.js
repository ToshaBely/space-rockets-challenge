import { AVAILABLE_FAVORITE_TYPES, EMPTY_FAVORITES_OBJECT, FAVORITES_KEY } from "./constants";

export function setLocalStorageData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorageData(key) {
  let data = localStorage.getItem(key);

  if (!data) {
    return;
  }

  try {
    return JSON.parse(data);
  } catch (err) {
    console.warn(`[getLocalStorageData]: Can not parse data from localStorage by key "${key}" with data: "${data}"`);
    localStorage.removeItem(key);
  }
}

export function getLocalStorageFavorites() {
  let favorites = getLocalStorageData(FAVORITES_KEY);

  if (!favorites) {
    return EMPTY_FAVORITES_OBJECT;
  }

  // check data format
  if (
    Object.keys(favorites).length === AVAILABLE_FAVORITE_TYPES.length &&
    AVAILABLE_FAVORITE_TYPES.every(
      (type) => favorites[type] && Array.isArray(favorites[type])
    )
  ) {
    return favorites;
  }

  // bad format
  localStorage.removeItem(FAVORITES_KEY);

  return EMPTY_FAVORITES_OBJECT;
}
