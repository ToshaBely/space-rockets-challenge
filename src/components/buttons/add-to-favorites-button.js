import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { StarIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/core";

import { addToFavoritesAction, removeFromFavoritesAction } from "../../redux/actions";
import { isItemFavorite } from "../../redux/selectors";

const BASE_STAR_COLOR = 'gray.300';
const FAVORITE_STAR_COLOR = 'yellow.300';
const HOVER_STAR_COLOR = 'yellow.500';
const ACTIVE_STAR_COLOR = 'yellow.400';

const BIG_STAR_SIZE = 28;
const SMALL_STAR_SIZE = 16;

const SMALL_BUTTON_STYLES = {
  minWidth: 4,
  height: 6,
  marginRight: 2,
};

const BIG_BUTTON_STYLES = {
  minWidth: 8,
  height: 12,
  marginRight: 2,
};

export default function AddToFavoritesButton({ itemType, itemId, isBig, styles, withStroke }) {
  let dispatch = useDispatch();
  let isFavorite = useSelector((state) => isItemFavorite(state, itemType, itemId));

  let toggleFavorite = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isFavorite) {
      dispatch(removeFromFavoritesAction({ type: itemType, id: itemId }));
    } else {
      dispatch(addToFavoritesAction({ type: itemType, id: itemId }));
    }
  }, [isFavorite, dispatch, itemType, itemId]);

  return (
    <Button
      { ...isBig ? BIG_BUTTON_STYLES : SMALL_BUTTON_STYLES }
      { ...styles }
      stroke={withStroke ? '#aaa' : undefined}
      variant="unstyled"
      colorScheme="yellow"
      color={isFavorite ? FAVORITE_STAR_COLOR : BASE_STAR_COLOR}
      _hover={{ color: HOVER_STAR_COLOR }}
      _active={{ color: ACTIVE_STAR_COLOR }}
      _focus={{ outline: 'none' }}
      onClick={toggleFavorite}
    >
      <StarIcon boxSize={isBig ? BIG_STAR_SIZE : SMALL_STAR_SIZE} verticalAlign="top" overflow="visible" />
    </Button>
  );
}
