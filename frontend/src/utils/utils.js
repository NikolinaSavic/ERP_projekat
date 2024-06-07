import axios from "axios";

export const markOrderAsDelivered = (id) => async (
    dispatch, getState
) => {
    const {
        userLogin: { userInfo },
    } = getState()
    let token;
    if (userInfo) {
        token = userInfo.customer.token
    }
    else { token = "" }
    console.log(token)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    console.log(config)

    const { data } = await axios.put(`/api/orders/delivered/${id}`, {}, config);
    return data;
};