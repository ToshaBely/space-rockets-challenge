import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, UI_CLOSE_FAVORITES_ASIDE, UI_OPEN_FAVORITES_ASIDE } from "./actions";

const AVAILABLE_FAVORITE_TYPES = ["launches", "launchPads"];

const initialState = {
    favorites: {
        launches: [],
        launchPads: [],
    },
    ui: {
        isFavoritesAsideOpen: false,
    },
};

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_FAVORITES: {
            let { type, id } = action.payload;

            if (!AVAILABLE_FAVORITE_TYPES.includes(type)) {
                console.warn(`[Action ADD_TO_FAVORITES]: Provided type "${type}" is not supported.`);
                return state;
            }

            let favList = [ ...state.favorites[type] ];

            if (!favList.includes(id)) {
                favList.push(id);
            }

            return {
                ...state,
                favorites: {
                    ...state.favorites,
                    [type]: favList,
                },
            };
        }

        case REMOVE_FROM_FAVORITES: {
            let { type, id } = action.payload;

            if (!AVAILABLE_FAVORITE_TYPES.includes(type)) {
                console.warn(`[Action REMOVE_FROM_FAVORITES]: Provided type "${type}" is not supported.`);
                return state;
            }

            let favList = state.favorites[type].filter((itemId) => itemId !== id);

            return {
                ...state,
                favorites: {
                    ...state.favorites,
                    [type]: favList,
                },
            };
        }

        case UI_OPEN_FAVORITES_ASIDE: {
            return {
                ...state,
                ui: {
                    ...state.ui,
                    isFavoritesAsideOpen: true,
                },
            };
        }

        case UI_CLOSE_FAVORITES_ASIDE: {
            return {
                ...state,
                ui: {
                    ...state.ui,
                    isFavoritesAsideOpen: false,
                },
            };
        }

        default: {
            return state;
        }
    }
}
