import instance from "./interceptors";
import client from "../config/client";

export function login() {
    window.location.href = `${client.endpoint}/authorize/login`;
};

export function logout(authorization: string | undefined) {
    window.location.href = `${client.endpoint}/logout?authorization=${authorization}`;
}

export function register(data: any, props: any) {
    const qs = require("qs");
    instance
        .post(`${client.endpoint}/register`,
            JSON.stringify(data),
            {timeout: 86400000, headers: {
                    'Content-type': "application/json",
                    "dataType": "json",

                }}).then((res: any) => {
        if (res && res.status === 200 && res.data) {
            props.registerSuccess(res)
        } else {
            props.registerFailure(res)
        }
    })
        .catch((err: any) => {
            console.log(err)
        })
}
