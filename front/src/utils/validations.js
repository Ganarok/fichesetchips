export const isEmailValid = (email) => {
    if (!email || typeof email !== "string") return

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    return email.match(regex) !== null
}

export const isPasswordValid = (password) => {
    if (!password || typeof password !== "string") return

    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

    return password.match(regex) !== null
}
