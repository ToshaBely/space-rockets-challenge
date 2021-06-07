## Task 1 - Bug with timezone

### SRC-1
[Link to PR](https://github.com/ToshaBely/space-rockets-challenge/pull/1) with detailed description.

## Task 2 - Favorites list feature

### SRC-2
[Link to PR](https://github.com/ToshaBely/space-rockets-challenge/pull/2) with detailed description and possible improvements.

## Task 3 - Impress us

- I have added **Redux** to work with data across components fast and easy;
  - Enhanced store with **Redux-thunk** for asynchronous actions;
- Implemented **Unit tests** for main logic: Redux reducer, selectors, date utils;
- Development flow was improved with **GitHub Actions** (I also checked them with test Pull Request with fake test which always fails);
- Added countdown timer to the next launch with short info about this launch after click;
  - New API version (v4) was used for this feature;
  - Show notification & fetch next launch data when timer reaches zero;
- Improved visual aspect of favorites lists slider:
  - Added display of message when list is empty;
  - Made container scrollable;

## Further improvements
- Handle wrong route with separate "Not found" page (404);
- Add Typescript;
- Group components by entity types;
- Think about moving to the new version of API (v4):
  - v3 has old data (even for next-launch endpoint I always receive data for 2020 year);
  - v4 supports convenient feature like `/query` endpoint to filter and search necessary items elegantly;
- If we were talking about real application, it would be better to fix vulnerabilities after audit (`yarn audit`), especially high vulnerabilities;
