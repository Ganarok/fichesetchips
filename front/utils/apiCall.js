export async function apiCall({
    route,
    method = 'GET',
    headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body,
}) {
    try {
        const res = body
            ? await fetch(`${process.env.HOST || 'localhost:3000/'}${route}`, {
                  method,
                  headers,
                  body,
              })
            : await fetch(`${process.env.HOST || 'localhost:3000/'}${route}`, {
                  method,
                  headers,
              })

        if (!res.ok) throw new Error({ message: res.status })

        return res
    } catch (error) {
        console.log(error)
        return { message: error }
    }
}
