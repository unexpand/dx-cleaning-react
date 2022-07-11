import { combineReducers, configureStore, } from '@reduxjs/toolkit'
import getAllReducer from './reducers/getAllReducer'
import dxReducer from './reducers/dxReducer'
import productTagReducer from './reducers/productTagReducer'
import getIDCReducer from './reducers/getIDCReducer'

const combinedReducer = combineReducers({
  getAll: getAllReducer,
  dxsData: dxReducer,
  productTagsData: productTagReducer,
  fdaData: getIDCReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'clear/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});