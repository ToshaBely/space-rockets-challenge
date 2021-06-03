import { getLocalStorageFavorites, getLocalStorageData, setLocalStorageData } from "./storage";

let originalLocalStorage;

describe('storage utils', () => {
  beforeAll(() => {
    originalLocalStorage = window.localStorage;
  });

  afterAll(() => {
    Object.defineProperty(window, 'localStorage', { value: originalLocalStorage});
  });

  beforeEach(() => {
    let fakeLocalStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
    };

    Object.defineProperty(window, 'localStorage', { value: fakeLocalStorage});
  });

  describe('setLocalStorageData', () => {
    it('should call setItem', () => {
      setLocalStorageData('some_key', 'some_data');

      expect(localStorage.setItem).toHaveBeenCalledWith('some_key', JSON.stringify('some_data'));
    });
  });

  describe('getLocalStorageData', () => {
    it('should work with objects', () => {
      localStorage.getItem.mockReturnValue('{"mock": "value"}');

      let result = getLocalStorageData('some_key');

      expect(result).toEqual({ mock: 'value' });
      expect(localStorage.getItem).toHaveBeenCalledWith('some_key');
    });

    it('should remove data from LocalStorage if parse error occurred', () => {
      localStorage.getItem.mockReturnValue('wrong: "format"}');

      let result = getLocalStorageData('some_key');

      expect(result).toBeUndefined();
      expect(localStorage.getItem).toHaveBeenCalledWith('some_key');
      expect(localStorage.removeItem).toHaveBeenCalledWith('some_key');
    });

    it('should return undefined with empty data', () => {
      localStorage.getItem.mockReturnValue(undefined);

      let result = getLocalStorageData('some_key');

      expect(result).toBeUndefined();
      expect(localStorage.getItem).toHaveBeenCalledWith('some_key');
    });
  });

  describe('getLocalStorageFavorites', () => {
    it('should work with valid data format', () => {
      let favorites = {
        launches: [],
        launchPads: ['id_1', 'id_2'],
      };

      localStorage.getItem.mockReturnValue(JSON.stringify(favorites));

      let result = getLocalStorageFavorites();

      expect(result).toEqual({
        launches: [],
        launchPads: ['id_1', 'id_2'],
      });
      expect(localStorage.getItem).toHaveBeenCalledWith('favorites');
    });

    it('should return empty favorites when extra data is stored', () => {
      let favorites = {
        launches: [],
        launchPads: ['id_1', 'id_2'],
        extraField: [],
      };

      localStorage.getItem.mockReturnValue(JSON.stringify(favorites));

      let result = getLocalStorageFavorites();

      expect(result).toEqual({
        launches: [],
        launchPads: [],
      });

      expect(localStorage.getItem).toHaveBeenCalledWith('favorites');
      expect(localStorage.removeItem).toHaveBeenCalledWith('favorites');
    });

    it('should return empty favorites when data missed', () => {
      let favorites = {
        launches: [],
      };

      localStorage.getItem.mockReturnValue(JSON.stringify(favorites));

      let result = getLocalStorageFavorites();

      expect(result).toEqual({
        launches: [],
        launchPads: [],
      });

      expect(localStorage.getItem).toHaveBeenCalledWith('favorites');
      expect(localStorage.removeItem).toHaveBeenCalledWith('favorites');
    });

    it('should return empty favorites when data with invalid format', () => {
      let favorites = {
        launches: {},
        launchPads: 'text',
      };

      localStorage.getItem.mockReturnValue(JSON.stringify(favorites));

      let result = getLocalStorageFavorites();

      expect(result).toEqual({
        launches: [],
        launchPads: [],
      });

      expect(localStorage.getItem).toHaveBeenCalledWith('favorites');
      expect(localStorage.removeItem).toHaveBeenCalledWith('favorites');
    });

    it('should return empty favorites when data is absent', () => {
      localStorage.getItem.mockReturnValue(undefined);

      let result = getLocalStorageFavorites();

      expect(result).toEqual({
        launches: [],
        launchPads: [],
      });

      expect(localStorage.getItem).toHaveBeenCalledWith('favorites');
    });
  });
});
