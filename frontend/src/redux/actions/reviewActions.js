import axios from "axios";
import {
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
    REVIEW_LIST_FAIL,
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_REQUEST
} from '../constants/reviewConstants'

//import { logout } from './userActions'

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

