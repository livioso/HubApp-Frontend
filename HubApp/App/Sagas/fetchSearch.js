import { takeLatest, delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { SEARCH, receiveSmartSearch } from '../Actions/memberListActions';
import { request, similarURL } from '../Services/api';

function* fetchSmartSearch(action) {
  // throttling: give the watcher some time
  // to cancel fetching in case we just
  // receive another search string
  yield call(delay, 200);

  const searchquery = action.searchText
    .toLowerCase()
    .split(' ')
    .map(word => encodeURIComponent(word))
    .join(',');

  // TODO (livioso 07.12.2016) This call is not working without debug flag?!
  // E.g. like this: const requestURL = `${similarURL}?q=${searchquery}`;
  const debugFlag = '&debug=true';
  const requestURL = `${similarURL}?q=${searchquery}${debugFlag}`;
  const response = yield call(request, requestURL);
  const isResponseOK = response.error === undefined || response.error === null;

  if (isResponseOK) {
    const suggestions = response.data;
    yield put(receiveSmartSearch(suggestions));
  } else {
    console.log(response.error); // eslint-disable-line no-console
  }
}

export function* watchSearch() {
  yield* takeLatest(SEARCH, fetchSmartSearch);
}
