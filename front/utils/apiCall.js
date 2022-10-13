export async function apiCall({
    route,
    method = 'GET',
    headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body,
}) {
    const baseUrl =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : `${process.env.BACK_HOST}:${process.env.BACK_PORT}`

    const res = body
        ? await fetch(`${baseUrl}${route}`, {
              method,
              headers,
              body,
          })
        : await fetch(`${baseUrl}${route}`, {
              method,
              headers,
          })

    // if (!res.ok) throw new Error(res.statusText)

    return await res.json()
}
