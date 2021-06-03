import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/core";
import { WarningIcon } from "@chakra-ui/icons";

import FavoriteLaunchItem from "./favorite-launch-item";
import FavoriteLaunchPadItem from "./favorite-launch-pad-item";
import Error from "../error";
import { useSpaceX } from "../../utils/use-space-x";
import { getFavorites, isUIFavoritesAsideOpen } from "../../redux/selectors";
import { uiCloseFavoritesAsideAction } from "../../redux/actions";

const LAUNCH_FIELDS_FILTER_STRING = [
  'flight_number',
  'launch_success',
  'mission_name',
  'launch_date_utc',
  'rocket/rocket_name',
  'launch_site/site_name'
].join(',');

const LAUNCH_PAD_FIELDS_FILTER_STRING = [
  'site_id',
  'status',
  'name',
].join(',');

const TAB_LABELS = {
  launches: 'Launches',
  launchPads: 'Launch pads',
};

const ITEM_COMPONENT = {
  launches: FavoriteLaunchItem,
  launchPads: FavoriteLaunchPadItem,
};

export default function FavoritesAside() {
  let dispatch = useDispatch();

  let isFavoritesAsideOpen = useSelector(isUIFavoritesAsideOpen);
  let favorites = useSelector(getFavorites);

  // TODO: change API endpoints to fetch only necessary items by id list, when BE will be ready

  // use 'filter' query-params to make HTTP response smaller
  let { data: launches, error: launchesError } = useSpaceX(`/launches`, { filter: LAUNCH_FIELDS_FILTER_STRING });
  let { data: launchPads, error: launchPadsError } = useSpaceX(`/launchpads`, { filter: LAUNCH_PAD_FIELDS_FILTER_STRING });

  let errorMap = React.useMemo(() => {
    return {
      launches: launchesError,
      launchPads: launchPadsError,
    };
  }, [launchesError, launchPadsError]);

  let favoritesMap = React.useMemo(() => {
    let launchesResult = launches
      ? launches
        .filter((launch) => favorites.launches.includes(launch.flight_number))
        .reduce((acc, launch) => {
          acc[launch.flight_number] = launch;
          return acc;
        }, {})
      : null;

    let launchPadsResult = launchPads
      ? launchPads
        .filter((launchPad) => favorites.launchPads.includes(launchPad.site_id))
        .reduce((acc, launchPad) => {
          acc[launchPad.site_id] = launchPad;
          return acc;
        }, {})
      : null;

    return {
      launches: launchesResult,
      launchPads: launchPadsResult,
    };

  }, [favorites, launches, launchPads]);

  let renderItem = React.useCallback((type, id) => {
    let Component = ITEM_COMPONENT[type];

    if (!Component) {
      return null;
    }

    return (
      <Component key={id} item={favoritesMap && favoritesMap[type] && favoritesMap[type][id]} />
    );
  }, [favoritesMap]);

  let onClose = React.useCallback(() => {
    dispatch(uiCloseFavoritesAsideAction());
  }, [dispatch]);

  return (
    <Drawer
      isOpen={isFavoritesAsideOpen}
      onClose={onClose}
      placement="right"
      size="sm"
    >
      <DrawerOverlay/>
      <DrawerContent>
        <DrawerCloseButton/>
        <DrawerHeader>My favorites</DrawerHeader>

        <DrawerBody>
          <Tabs>
            <TabList>
              {Object.keys(favorites).map((type) => (
                <Tab key={type} _focus={{ outline: 'none' }}>
                  {errorMap[type] && (
                    <WarningIcon size="4" marginRight="4" color="#d00" />
                  )}

                  {TAB_LABELS[type]} ({favorites[type].length})
                </Tab>
              ))}
            </TabList>

            <TabPanels marginTop="2">
              {Object.keys(favorites).map((type) => (
                <TabPanel key={type}>
                  {errorMap[type] ? (
                    <Error />
                  ) : (
                    favorites[type].map((id) => renderItem(type, id))
                  )}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
