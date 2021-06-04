import { appReducer } from "./reducer";
import { addToFavoritesAction, removeFromFavoritesAction, SET_NEXT_LAUNCH } from "../actions";
import { setLocalStorageData } from "../../utils/storage/storage";

jest.mock('../../utils/storage/storage');

describe('reducer', () => {
  it('should return prev state with unknown action', () => {
    let state = { field: 10 };

    expect(appReducer(state, { type: 'MOCK_UNKNOWN_TYPE' })).toBe(state);
  });

  describe('ui', () => {
    it('should set ui.isFavoritesAsideOpen to false with action UI_CLOSE_FAVORITES_ASIDE', () => {
      let state = {
        ui: {
          isFavoritesAsideOpen: true,
        },
      };

      expect(appReducer(state, { type: 'UI_CLOSE_FAVORITES_ASIDE' })).toEqual({
        ui: {
          isFavoritesAsideOpen: false,
        },
      });
    });

    it('should set ui.isFavoritesAsideOpen to true with action UI_OPEN_FAVORITES_ASIDE', () => {
      let state = {
        ui: {
          isFavoritesAsideOpen: false,
        },
      };

      expect(appReducer(state, { type: 'UI_OPEN_FAVORITES_ASIDE' })).toEqual({
        ui: {
          isFavoritesAsideOpen: true,
        },
      });
    });
  });

  describe('next launch', () => {
    it('should set provided data & error params', () => {
      let state = {};

      let action = {
        type: SET_NEXT_LAUNCH,
        payload: {
          data: { id: 'launch_1' },
          error: { message: 'test error' },
        },
      };

      expect(appReducer(state, action)).toEqual({
        nextLaunch: {
          data: { id: 'launch_1' },
          error: { message: 'test error' },
        },
      });
    });
  });

  describe('favorites', () => {
    it('should add item to favorites list', () => {
      let state = {
        favorites: {
          launches: [],
          launchPads: ['pad_1'],
        },
      };

      let addLaunchAction = addToFavoritesAction({ type: 'launches', id: 'launch_1' });

      expect(appReducer(state, addLaunchAction)).toEqual({
        favorites: {
          launches: ['launch_1'],
          launchPads: ['pad_1'],
        },
      });

      let addLaunchPadAction = addToFavoritesAction({ type: 'launchPads', id: 'pad_2' });

      expect(appReducer(state, addLaunchPadAction)).toEqual({
        favorites: {
          launches: [],
          launchPads: ['pad_1', 'pad_2'],
        },
      });
    });

    it('should not add existing item to favorites list', () => {
      let state = {
        favorites: {
          launches: [],
          launchPads: ['pad_1'],
        },
      };

      let addAction = addToFavoritesAction({ type: 'launchPads', id: 'pad_1' });

      expect(appReducer(state, addAction)).toEqual({
        favorites: {
          launches: [],
          launchPads: ['pad_1'],
        },
      });
    });

    it('should remove item from favorites list', () => {
      let state = {
        favorites: {
          launches: ['launch_1'],
          launchPads: ['pad_1', 'pad_2'],
        },
      };

      let removeLaunchAction = removeFromFavoritesAction({ type: 'launches', id: 'launch_1' });

      expect(appReducer(state, removeLaunchAction)).toEqual({
        favorites: {
          launches: [],
          launchPads: ['pad_1', 'pad_2'],
        },
      });

      let removeLaunchPadAction = removeFromFavoritesAction({ type: 'launchPads', id: 'pad_2' });

      expect(appReducer(state, removeLaunchPadAction)).toEqual({
        favorites: {
          launches: ['launch_1'],
          launchPads: ['pad_1'],
        },
      });
    });

    it('should not remove absence item from favorites list', () => {
      let state = {
        favorites: {
          launches: [],
          launchPads: ['pad_1'],
        },
      };

      let removeAction = removeFromFavoritesAction({ type: 'launchPads', id: 'pad_100' });

      expect(appReducer(state, removeAction)).toEqual({
        favorites: {
          launches: [],
          launchPads: ['pad_1'],
        },
      });
    });

    it('should update localStorage data', () => {
      let state = {
        favorites: {
          launches: [],
          launchPads: [],
        },
      };

      setLocalStorageData.mockClear();
      let addAction = addToFavoritesAction({ type: 'launchPads', id: 'pad_1' });
      let removeAction = removeFromFavoritesAction({ type: 'launchPads', id: 'pad_1' });

      let newState = appReducer(state, addAction);

      expect(newState).toEqual({
        favorites: {
          launches: [],
          launchPads: ['pad_1'],
        },
      });
      expect(setLocalStorageData).toHaveBeenCalledWith('favorites', {
        launches: [],
        launchPads: ['pad_1'],
      });

      expect(appReducer(newState, removeAction)).toEqual({
        favorites: {
          launches: [],
          launchPads: [],
        },
      });
      expect(setLocalStorageData).toHaveBeenCalledWith('favorites', {
        launches: [],
        launchPads: [],
      });
    });

    it('should do nothing for wrong type', () => {
      let state = {
        favorites: {
          launches: [],
          launchPads: ['pad_1'],
        },
      };

      setLocalStorageData.mockClear();
      let addWrongTypeAction = addToFavoritesAction({ type: 'wrongPads', id: 'pad_2' });
      let removeWrongTypeAction = removeFromFavoritesAction({ type: 'wrongPads', id: 'pad_1' });

      expect(appReducer(state, addWrongTypeAction)).toBe(state);
      expect(appReducer(state, removeWrongTypeAction)).toBe(state);
      expect(setLocalStorageData).not.toHaveBeenCalled();
    });
  });
});
