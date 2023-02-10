import {
  applyMiddleware,
  combineReducers,
  createStore,
  replaceReducer,
} from "redux";
import thunk from "redux-thunk";

const defaultReducer = (state = "", action) => {
  switch (action.type) {
    default:
      return state;
  }
};

let reducers = { dummy: defaultReducer };

const globalReducer = combineReducers(reducers);

const store = createStore(globalReducer, applyMiddleware(thunk));

export const addSlice = (sliceName, reducer) => {
  reducers[sliceName] = reducer;
  const newGlobalReducer = combineReducers(reducers);
  store.replaceReducer(newGlobalReducer);
};

export const getSliceState = (sliceName) => {
  return store.getState()[sliceName];
};

export default store;
