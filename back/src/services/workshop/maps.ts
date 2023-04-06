import { PublicDataSource } from "../../database/init/datasources/public-data-source";
import { Payload } from "../../utils/types/auth";
import * as jwt from "jsonwebtoken"
import { CMap } from "../../database/entities/public/workshop/CMap";
import { User } from "../../database/entities/public/User";
import { GetMaps } from "../../utils/types/maps";
import { Asset } from "../../database/entities/public/workshop/Asset";

const AssetRepository = PublicDataSource.getRepository(Asset)
const CMapRepository = PublicDataSource.getRepository(CMap)
const UserRepository = PublicDataSource.getRepository(User)

export async function createAsset(username: string, image: Buffer, info: {map_id: string, name: string}) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const cmap = await CMapRepository.findOneByOrFail({ creatorId: user.id, id: info.map_id })
    const asset = await AssetRepository.save({ cmapId: info.map_id, image: image, name: info.name })
    cmap.assets.push(asset)
    await CMapRepository.save(cmap)
    const map = await CMapRepository.findOneByOrFail({ creatorId: user.id, id: cmap.id })
    return map
}

export async function create(username: string, body: object) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const cmap = await CMapRepository.save({ creatorId: user.id, ...body })
    const map = await CMapRepository.findOneByOrFail({ creatorId: user.id, id: cmap.id })
    return map
}

export async function find(username: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const maps = await CMapRepository.findBy({ creatorId: user.id })
    const get_maps = maps.map(map => new GetMaps(map))
    return get_maps
}

export async function findOne(username: string, map_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const cmap = await CMapRepository.findOneByOrFail({ creatorId: user.id, id: map_id })
    return cmap
}

export async function update(username: string, body: object, map_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const cmap = await CMapRepository.findOneByOrFail({ creatorId: user.id, id: map_id })
    await CMapRepository.save({ id: cmap.id, ...body })
    const new_map = await CMapRepository.findOneByOrFail({ creatorId: user.id, id: map_id })
    return new_map
}

export async function destroy(username: string, map_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const cmap = await CMapRepository.findOneByOrFail({ creatorId: user.id, id: map_id })
    await CMapRepository.remove(cmap)
    return cmap
}


