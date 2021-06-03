import React from "react";
import { useDispatch } from "react-redux";

import { Button } from "@chakra-ui/core";

import { uiOpenFavoritesAsideAction } from "../../redux/actions";

export default function OpenFavoritesButton() {
  let dispatch = useDispatch();

  let onOpen = React.useCallback(() => {
    dispatch(uiOpenFavoritesAsideAction());
  }, [dispatch]);

  return (
    <Button color="black" onClick={onOpen}>
      Favorites
    </Button>
  );
}
