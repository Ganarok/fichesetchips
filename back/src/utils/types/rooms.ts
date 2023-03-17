export type CreateRoom = {
    title: string,
    description: string,
    requirements: string,
    vocal_url: string,
    is_private: boolean,
    password?: string,
    players_nb_max: number,
}

export type UpdateRoom = {
    title?: string,
    description?: string,
    requirements?: string,
    vocal_url?: string,
    is_private?: boolean,
    password?: string,
    players_nb_max?: number,
}