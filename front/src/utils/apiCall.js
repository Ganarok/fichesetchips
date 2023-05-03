import store from "../store/index"

export async function apiCall({
    route,
    method = "GET",
    headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body,
    isBuffer = false
}) {
    let baseUrl = "https://localhost:3000"
    if (process.env.NODE_ENV === "production") {
        baseUrl = `https://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}`
    }

    if (store.state.user.access_token != "") {
        headers["Authorization"] = `Bearer ${store.state.user.access_token}`
    }
    let res
    if(isBuffer) {
        res = await fetch(`${baseUrl}${route}`, {
            method,
            headers,
            body: body,
        })
    } else {
        res = body ?
            await fetch(`${baseUrl}${route}`, {
                method,
                headers,
                body: JSON.stringify(body),
            }) :
            await fetch(`${baseUrl}${route}`, {
                method,
                headers,
            })
    }

    if(!res.ok) throw new Error(res.statusText)

    return await res.json()
}