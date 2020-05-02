import { API } from "../../backend";

export const createOrdr = (userId, tpken, orderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authentication: `Bearer ${token}` 
        },
        body: JSON.stringify({order: orderData})
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
};