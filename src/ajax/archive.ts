import instance from "./interceptors";
import Cookies from "js-cookie";
import client from "../config/client";


export function getUserArticleList(query: any, props: any) {
    instance
        .post(`${client.endpoint}/user/articles`,
             query,
            {timeout: 86400000, headers: {
                    'Content-type': "application/json",
                    "dataType": "json",
                    "authorization": Cookies.get("authorization")
                }}).then((res: any) => {
        if (res.status === 200 && res.data) {
            props.listSuccess(res)
        } else {
            props.listFailure(res)
        }
    })
        .catch((err: any) => {
            console.log(err)
        })
};
