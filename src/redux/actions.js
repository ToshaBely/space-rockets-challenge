export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

export const UI_OPEN_FAVORITES_ASIDE = 'UI_OPEN_FAVORITES_ASIDE';
export const UI_CLOSE_FAVORITES_ASIDE = 'UI_CLOSE_FAVORITES_ASIDE';

/**
 * Creates an action to add element to favorites list
 * @param {{type: string, id: string}} payload - Params of adding element
 * @returns {{payload, type: string}}
 */
export function addToFavoritesAction(payload) {
    return {
        type: ADD_TO_FAVORITES,
        payload,
    };
}

/**
 * Creates an action to remove element from favorites list
 * @param {{type: string, id: string}} payload - Params of removing element
 * @returns {{payload, type: string}}
 */
export function removeFromFavoritesAction(payload) {
    return {
        type: REMOVE_FROM_FAVORITES,
        payload,
    };
}

/**
 * Creates an action to open favorites aside panel
 * @returns {{payload, type: string}}
 */
export function uiOpenFavoritesAsideAction() {
    return {
        type: UI_OPEN_FAVORITES_ASIDE,
    };
}

/**
 * Creates an action to close favorites aside panel
 * @returns {{payload, type: string}}
 */
export function uiCloseFavoritesAsideAction() {
    return {
        type: UI_CLOSE_FAVORITES_ASIDE,
    };
}
