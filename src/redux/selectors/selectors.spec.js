import { getFavorites, isItemFavorite, isUIFavoritesAsideOpen } from "./selectors";

describe('selectors', () => {
  describe('getFavorites', () => {
    it('should work with filled state', () => {
      let favorites = {
        launches: ['id_1'],
        launchPads: ['id_1', 'id_2'],
      };

      expect(getFavorites({ favorites })).toEqual({
        launches: ['id_1'],
        launchPads: ['id_1', 'id_2'],
      });
    });
  });

  describe('isUIFavoritesAsideOpen', () => {
    it('should work', () => {
      let state = { ui: { isFavoritesAsideOpen: true } };

      expect(isUIFavoritesAsideOpen(state)).toBeTruthy();
    });
  });

  describe('isItemFavorite', () => {
    it('should work with correct type and filled data', () => {
      let favorites = {
        launches: ['id_1'],
        launchPads: ['id_1', 'id_2'],
      };

      expect(isItemFavorite({ favorites }, 'launchPads', 'id_2')).toBeTruthy();
      expect(isItemFavorite({ favorites }, 'launches', 'id_100')).toBeFalsy();
    });

    it('should work with wrong type and filled data', () => {
      let favorites = {
        launches: ['id_1'],
        launchPads: ['id_1', 'id_2'],
      };

      expect(isItemFavorite({ favorites }, 'non_existing_type', 'id_2')).toBeFalsy();
    });

    it('should work with correct type and empty data', () => {
      let favorites = {
        launches: ['id_1'],
        launchPads: [],
      };

      expect(isItemFavorite({ favorites }, 'launchPads', 'id_2')).toBeFalsy();
    });

    it('should work without data', () => {
      let favorites = {};

      expect(isItemFavorite({ favorites }, 'launchPads', 'id_2')).toBeFalsy();
    });
  });
});
