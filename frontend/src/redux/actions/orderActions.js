import axios from "axios";
import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL
} from '../constants/orderConstants'
import { logout } from './customerActions'

export const getOrdersListForAdmin = () => async (
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
        dispatch({ type: ORDER_LIST_REQUEST })
        const { data } = await axios.get(
            `/api/orders/all`,
            config
        )

        dispatch({
            type: ORDER_LIST_SUCCESS,
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
            type: ORDER_LIST_FAIL,
            payload: message,
        })
    }
}

export const deleteOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELETE_REQUEST,
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

        await axios.delete(`/api/orders/${id}`, config)

        dispatch({ type: ORDER_DELETE_SUCCESS })
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
            type: ORDER_DELETE_FAIL,
            payload: message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
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
        console.log(config)
        const { data } = await axios.get(`/api/orders/customer/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
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
            type: ORDER_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const createOrder = (orderItems, paymentMethod) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
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
        const order = { orderItems }
        console.log(orderItems)
        const { data } = await axios.post(`/api/orders`, { orderItems, paymentMethod }, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })
        console.log(order)
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === "Only admin can access" || message === "Log in to see resource" || "Invalid token! try again!") {
            setTimeout(function () {
                //dispatch(logout())
            }, 1500)

        }
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message,
        })
    }
}

export const getMyOrders = () => async (
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
        dispatch({ type: MY_ORDERS_REQUEST })
        const { data } = await axios.get(
            `/api/orders/`,
            config
        )

        dispatch({
            type: MY_ORDERS_SUCCESS,
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
            type: MY_ORDERS_FAIL,
            payload: message,
        })
    }
}


export const updateOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_UPDATE_REQUEST,
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

        const { data } = await axios.put(`/api/orders/paid/${id}`, { isPaid: true }, config);

        dispatch({ type: ORDER_UPDATE_SUCCESS })
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
            type: ORDER_UPDATE_FAIL,
            payload: message,
        })
    }
}