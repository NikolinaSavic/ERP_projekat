import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { categoryListReducer } from './reducers/categoryReducers'
import {
    productDetailsReducer,
    productListReducer,
    productListBySearchQueryReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer } from "./reducers/customerReducers";


const reducer = combineReducers({
    categories: categoryListReducer,
    productList: productListReducer,
    productListBySearchQueryReducer: productListBySearchQueryReducer,
    product: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
})


//novo
const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

//user info
const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        //shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
}



const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware)))


export default store;