import axios from "axios";
import {
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
    REVIEW_LIST_FAIL,
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_REQUEST
} from '../constants/reviewConstants'

import { logout } from './customerActions'

export const getReviews = (id) => async (
    dispatch
) => {
    try {
        dispatch({ type: REVIEW_LIST_REQUEST })
        const { data } = await axios.get(
            `/api/reviews/product/${id}`
        )

        dispatch({
            type: REVIEW_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: REVIEW_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createReview = (productId, description, rating) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: CREATE_REVIEW_REQUEST,
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

        await axios.post(`/api/reviews/product/${productId}`, { description, rating }, config)

        dispatch({
            type: CREATE_REVIEW_SUCCESS,
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
            type: CREATE_REVIEW_FAIL,
            payload: message,
        })
    }
}