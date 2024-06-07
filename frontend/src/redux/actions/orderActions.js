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