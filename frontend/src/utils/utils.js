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

export const uploadImages = (images, id) => async (
    dispatch, getState
) => {
    const formData = new FormData();
    Array.from(images).forEach((image) => {
        formData.append("images", image);
    });

    console.log('Uploading images for product ID:', id);  // Log za proveru

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
    const { data } = await axios.post("/api/products/admin/upload?id=" + id, formData, config);
    return data;
};