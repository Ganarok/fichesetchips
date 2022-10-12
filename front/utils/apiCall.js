export async function apiCall({
    route,
    method = 'GET',
    headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body,
}) {
    const res = body
        ? await fetch(
              `${process.env.HOST || 'http://localhost:3000'}${route}`,
              {
                  method,
                  headers,
                  body,
              }
          )
        : await fetch(
              `${process.env.HOST || 'http://localhost:3000'}${route}`,
              {
                  method,
                  headers,
              }
          )

    // if (!res.ok) throw new Error(res.statusText)

    return await res.json()
}
