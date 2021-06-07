import { setNextLaunchAction } from "../actions";

const POST_QUERY_PARAMS = {
  query: { upcoming: true },
  options: {
    limit: 1,
    select: 'date_utc name',
    populate: [
      { path: 'rocket', select: 'name' },
      { path: 'launchpad', select: 'name' },
    ],
    sort: { flight_number: 'asc' },
  },
};

export function fetchNextLaunchAction() {
  return function fetchNextLaunchThunk(dispatch) {
    let data, error;

    return fetch(`${process.env.REACT_APP_SPACEX_API_V4_URL}/launches/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(POST_QUERY_PARAMS),
    })
      .then((response) => response.json())
      .then((res) => {
        data = res.docs && res.docs[0];
      })
      .catch((err) => {
        error = err;
      })
      .then(() => {
        dispatch(setNextLaunchAction({ data, error }));
      });
  };
}
