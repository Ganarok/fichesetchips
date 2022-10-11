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

    console.log(res)

    if (!res.ok) throw new Error(res.statusText)
    this.$toast.show('Error when requesting the data.', {
        theme: 'toasted-primary',
        position: 'top-right',
        duration: 4000,
    })

    return await res.json()
}
