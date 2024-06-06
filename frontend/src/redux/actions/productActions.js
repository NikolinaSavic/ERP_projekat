import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_LIST_FOR_ADMIN_REQUEST,
    PRODUCT_LIST_FOR_ADMIN_SUCCESS,
    PRODUCT_LIST_FOR_ADMIN_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
} from '../constants/productConstants'

import { logout } from './customerActions'

export const listProducts = (price, pageNum, sortOption, searchQuery) => async (
    dispatch
) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        console.log("List Products Params - PageNum:", pageNum, "SortOption:", sortOption, "SearchQuery:", searchQuery);

        let categories = "";
        const { data } = await axios.get(
            `/api/products/?price=${price}&pageNum=${pageNum}&categories=${categories}&sort=${sortOption}&searchQuery=${searchQuery}`
        );
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listProductsBySearchQuery = (searchQuery) => async (
    dispatch
) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const { data } = await axios.get(`/api/products/search/${searchQuery}`);
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};



export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        console.log(id)
        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getProductsListForAdmin = () => async (
    dispatch, getState
) => {
    try {

        const {
            userLogin: { userInfo },
        } = getState()
        let token;
        if (userInfo) {
            token = userInfo.customer.token
        }
        else { token = "" }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        dispatch({ type: PRODUCT_LIST_FOR_ADMIN_REQUEST })
        const { data } = await axios.get(
            `/api/products/admin/pr`,
            config
        )

        dispatch({
            type: PRODUCT_LIST_FOR_ADMIN_SUCCESS,
            payload: data,
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === "Only admin can access" || message === "Log in to see resource" || "Invalid token! try again!") {
            setTimeout(function () {
                dispatch(logout())
            }, 1500)

        }
        dispatch({
            type: PRODUCT_LIST_FOR_ADMIN_FAIL,
            payload: message,
        })
    }
}

export const deleteProduct = (productName) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })
        const {
            userLogin: { userInfo },
        } = getState()
        let token;
        if (userInfo) {
            token = userInfo.customer.token
        }
        else { token = "" }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        await axios.delete(`/api/products/admin/${productName}`, config)

        dispatch({ type: PRODUCT_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === "Only admin can access" || message === "Log in to see resource" || "Invalid token! try again!") {
            setTimeout(function () {
                dispatch(logout())
            }, 1500)
        }
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: message,
        })
    }
}

export const createProduct = (id, productName, description, size, price, categoryName, quantity) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()
        let token;
        if (userInfo) {
            token = userInfo.customer.token
        }
        else { token = "" }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const { data } = await axios.post(`/api/products/admin`, { id, productName, description, size, price, categoryName, quantity }, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === "Only admin can access" || message === "Log in to see resource" || "Invalid token! try again!") {
            setTimeout(function () {
                dispatch(logout())
            }, 1500)
        }
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message,
        })
    }
}

export const updateProduct = (id, productName, description = "", size = "", price = "", categoryName = "", quantity = "") => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })
        const {
            userLogin: { userInfo },
        } = getState()
        let token;
        if (userInfo) {
            token = userInfo.customer.token
        }
        else { token = "" }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        console.log(categoryName)

        const { data } = await axios.put(
            `/api/products/admin/${id}`,
            { id, productName, description, size, price, categoryName, quantity },
            config
        )

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === "Only admin can access" || message === "Log in to see resource" || "Invalid token! try again!") {
            setTimeout(function () {
                dispatch(logout())
            }, 1500)
        }
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message,
        })
    }
}