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
