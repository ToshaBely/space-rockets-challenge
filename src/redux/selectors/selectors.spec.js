import {
  getFavorites,
  getNextLaunchData,
  getNextLaunchError,
  isItemFavorite,
  isUIFavoritesAsideOpen
} from "./selectors";

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

  describe('next launch', () => {
    it('getNextLaunchData should work', () => {
      let state = {
        nextLaunch: {
          data: { id: 'launch_1' },
        },
      };

      expect(getNextLaunchData(state)).toEqual({ id: 'launch_1' });
    });

    it('getNextLaunchError should work', () => {
      let state = {
        nextLaunch: {
          error: { message: 'test error' },
        },
      };

      expect(getNextLaunchError(state)).toEqual({ message: 'test error' });
    });

    it('should work with empty object', () => {
      let state = {
        nextLaunch: {},
      };

      expect(getNextLaunchData(state)).toBeUndefined();
      expect(getNextLaunchError(state)).toBeUndefined();
    });

    it('should work with empty state', () => {
      let state = {};

      expect(getNextLaunchData(state)).toBeUndefined();
      expect(getNextLaunchError(state)).toBeUndefined();
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
