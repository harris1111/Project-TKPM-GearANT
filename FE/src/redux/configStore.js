import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { CarouselReducer } from './reducers/CarouselReducer';
import { ProductManageReducer } from './reducers/ProductManageReducer';
import { UserManageReducer } from './reducers/UserManageReducer';

const rootReducer = combineReducers({
    // state ứng dụng
    CarouselReducer,
    ProductManageReducer,
    UserManageReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));