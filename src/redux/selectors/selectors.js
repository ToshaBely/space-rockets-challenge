export function isUIFavoritesAsideOpen(state) {
  return state.ui.isFavoritesAsideOpen;
}

export function getFavorites(state) {
  return state.favorites;
}

export function isItemFavorite(state, itemType, itemId) {
  let favorites = getFavorites(state);

  return Boolean(favorites && favorites[itemType] && favorites[itemType].includes(itemId));
}

export function getNextLaunchData(state) {
  return state.nextLaunch && state.nextLaunch.data;
}

export function getNextLaunchError(state) {
  return state.nextLaunch && state.nextLaunch.error;
}
