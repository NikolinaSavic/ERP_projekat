import axios from 'axios'
import {
    CART_ADD_ITEM,
} from '../constants/cartConstants'

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/product/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            productId: data._id,
            productName: data.productName,
            images: data.images[0].path,
            price: data.price,
            quantity: data.quantity,
            quantity: quantity,
        },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}