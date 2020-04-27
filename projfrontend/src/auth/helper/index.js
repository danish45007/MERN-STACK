import {API} from "../../backend";


export const signup = user => {
    return fetch(`${API}/signup`, {
        methos : "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"

        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
};

export const signin = user => {
    return fetch(`${API}/signin`, {
        methos : "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"

        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
};

export const authenticate = (data, next) => {
    if (typeof window != "undefined") {
        localStorage.setItem("jwt",JSON.stringify(data))
        next();
    }
}

export const signout = next => {
    if (typeof window != "undefined") {
        localStorage.removeItem("jwt")
        next();
        next();
        return fetch(`${API}/signout`,{
            method: "Get"
        })
        .then(response => console.log("signout success"))
        .catch(err => console.log(err))
    }

};

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else {
        return false;
    }

};