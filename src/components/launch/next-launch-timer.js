import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/core";

import CountdownTimer from "../countdown-timer";
import { getNextLaunchData, getNextLaunchError } from "../../redux/selectors/selectors";
import { fetchNextLaunchAction } from "../../redux/asyncActions/fetchNextLaunchAction"
import { formatDateTime } from "../../utils/format-date/format-date";

export default function NextLaunchTimer() {
  let dispatch = useDispatch();
  let toast = useToast();

  let nextLaunch = useSelector(getNextLaunchData);
  let error = useSelector(getNextLaunchError);

  React.useEffect(() => {
    dispatch(fetchNextLaunchAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // on mount only

  let onFinishLaunchTimer = React.useCallback(() => {
    toast({
      title: 'Next launch just started!',
      position: 'top',
      isClosable: true,
    });

    dispatch(fetchNextLaunchAction());
  }, [dispatch, toast]);

  if (error || !nextLaunch) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Box cursor="pointer" paddingX="4">
          <CountdownTimer date={new Date(nextLaunch.date_utc)} onFinish={onFinishLaunchTimer} />
        </Box>
      </PopoverTrigger>

      <PopoverContent color="black" zIndex="5" _focus={{ outline: 'none' }}>
        <PopoverArrow />
        <PopoverCloseButton />

        <PopoverBody>
          <Box
            marginBottom="1"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="sm"
            textTransform="uppercase"
          >
            <Text
              display="inline"
              fontSize="xs"
              fontWeight="normal"
              letterSpacing="normal"
              textTransform="none"
            >
              Next launch:&nbsp;
            </Text>

            {nextLaunch.name}
          </Box>

          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            isTruncated
          >
            {nextLaunch.rocket.name} &bull; {nextLaunch.launchpad.name}
          </Box>

          <Box fontSize="sm">
            {formatDateTime(nextLaunch.date_utc)}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
