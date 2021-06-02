import React from "react";
import { Link } from "react-router-dom";

import { Badge, Box, PseudoBox, Spinner, Text } from "@chakra-ui/core";

import AddToFavoritesButton from "../buttons/add-to-favorites-button";
import { formatDate } from "../../utils/format-date";

export default function FavoriteLaunchItem({ item }) {
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
      to={`/launches/${item.flight_number.toString()}`}
      overflow="hidden"
      position="relative"
    >
      <PseudoBox paddingX="4" paddingY="2" borderRadius="lg" marginBottom="1" _hover={{ backgroundColor: "#cccccc33" }} >
        <Box display="flex" alignItems="center" marginBottom="1">
          <AddToFavoritesButton itemType="launches" itemId={item.flight_number} styles={{ paddingTop: 1 }} />

          <Box
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="sm"
            textTransform="uppercase"
          >
            {item.mission_name}
          </Box>
        </Box>

        <Box display="flex">
          {item.launch_success ? (
            <Badge px="2" variant="solid" variantColor="green">
              Succ
            </Badge>
          ) : (
            <Badge px="2" variant="solid" variantColor="red">
              Fail
            </Badge>
          )}

          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            marginLeft="2"
            isTruncated
          >
            {item.rocket.rocket_name} &bull; {item.launch_site.site_name}
          </Box>
        </Box>

        <Box display="flex">
          <Text fontSize="sm">{formatDate(item.launch_date_utc)}</Text>
        </Box>
      </PseudoBox>
    </Box>
  );
}
