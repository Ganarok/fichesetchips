import { PublicDataSource } from "../database/init/datasources/public-data-source"

export async function findAll() {
    const universes = [{id: "cem", name: "Caves Et Monstres", image: "https://jolstatic.fr/www/captures/5405/7/148557.jpg", description: "Pas du tout Dungeon et Dragon"}]
    return { data: universes }
}