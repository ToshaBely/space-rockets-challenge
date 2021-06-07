import React from "react";
import { Routes, Route } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/core";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from 'redux-thunk'

import Launches from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";
import FavoritesAside from "./favorites/favorites-aside";
import NextLaunchTimer from "./launch/next-launch-timer";
import OpenFavoritesButton from "./buttons/open-favorites-button";
import { appReducer } from "../redux/reducer/reducer";

const store = createStore(appReducer, applyMiddleware(thunkMiddleware));

export default function App() {
  return (
    <Provider store={store}>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:launchId" element={<Launch />} />
        <Route path="/launch-pads" element={<LaunchPads />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
      </Routes>

      <FavoritesAside />
    </Provider>
  );
}

function NavBar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
      >
        ¡SPACE·R0CKETS!
      </Text>

      <NextLaunchTimer />

      <OpenFavoritesButton />
    </Flex>
  );
}
