import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { counterReducer } from "./reducers/cartReducers";
import { categoryListReducer } from './reducers/categoryReducers'
import {
    productDetailsReducer,
    productListReducer,
} from './reducers/productReducers'


const reducer = combineReducers({
    categories: categoryListReducer,
    productList: productListReducer,
    product: productDetailsReducer,
    cart: counterReducer,
})

const initialState = {
    cart: {
        //cartItems: cartItemsFromStorage, paymentMethod: paymentMethodFromStorage,
        //shippingAddress: shippingAddressFromStorage,
    },
    //userLogin: { userInfo: userInfoFromStorage },

}



const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware)))


export default store;