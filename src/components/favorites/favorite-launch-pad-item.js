import React from "react";
import { Link } from "react-router-dom";

import { Badge, Box, PseudoBox, Spinner } from "@chakra-ui/core";

import AddToFavoritesButton from "../buttons/add-to-favorites-button";

export default function FavoriteLaunchPadItem({ item }) {
  if (!item) {
    return (
      <Box padding="4" marginBottom="1">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box
      as={Link}
      to={`/launch-pads/${item.site_id}`}
      overflow="hidden"
      position="relative"
    >
      <PseudoBox paddingX="4" paddingY="2" borderRadius="lg" marginBottom="1" _hover={{ backgroundColor: "#cccccc33" }} >
        <Box display="flex" alignItems="center">
          <AddToFavoritesButton itemType="launchPads" itemId={item.site_id} styles={{ paddingTop: 1 }} />

          {item.status === "active" ? (
            <Badge px="2" variant="solid" variantColor="green">
              Active
            </Badge>
          ) : (
            <Badge px="2" variant="solid" variantColor="red">
              Retired
            </Badge>
          )}
        </Box>

        <Box fontWeight="semibold">
          {item.name}
        </Box>
      </PseudoBox>
    </Box>
  );
}
