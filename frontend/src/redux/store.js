import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { categoryListReducer, categoryCreateReducer, categoryDeleteReducer } from './reducers/categoryReducers'
import {
    productDetailsReducer,
    productListReducer,
    productListBySearchQueryReducer,
    productListForAdminReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userListReducer, userDetailsForAdminReducer, userUpdateByAdminReducer, userDeleteReducer, userUpdateProfileReducer, userDetailsReducer } from "./reducers/customerReducers";
import { orderDeleteReducer, ordersListForAdminReducer, orderDetailsReducer, orderCreateReducer, myOrdersList, orderUpdateReducer } from './reducers/orderReducers'


const reducer = combineReducers({
    categories: categoryListReducer,
    categoryCreate: categoryCreateReducer,
    categoryDelete: categoryCreateReducer,
    productList: productListReducer,
    productListBySearchQueryReducer: productListBySearchQueryReducer,
    product: productDetailsReducer,
    productListForAdmin: productListForAdminReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    users: userListReducer,
    userUpdate: userUpdateByAdminReducer,
    userDetailsForAdmin: userDetailsForAdminReducer,
    userDelete: userDeleteReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDetails: userDetailsReducer,
    ordersList: ordersListForAdminReducer,
    orderDelete: orderDeleteReducer,
    orderDetails: orderDetailsReducer,
    createOrder: orderCreateReducer,
    myOrders: myOrdersList,
    orderUpdate: orderUpdateReducer
})


const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

//user info
const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        paymentMethod: paymentMethodFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
}



const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware)))


export default store;