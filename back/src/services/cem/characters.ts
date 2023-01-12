import { JwtPayload } from "jsonwebtoken";
import * as jwt from "jsonwebtoken"
import { CEMDataSource } from "../../database/init/datasources/cem-data-source";
import { alignmentEnum, Character, sexEnum } from "../../database/entities/workshop/characters/Character";
import { Race } from "../../database/entities/workshop/characters/Race";
import { Language } from "../../database/entities/workshop/characters/Language";
import { Characteristic } from "../../database/entities/workshop/characters/Characteristic";
import { Class } from "../../database/entities/workshop/characters/Class";
import { CharacteristicModificator } from "../../database/entities/workshop/characters/CharacteristicModificator";
import { Level } from "../../database/entities/workshop/characters/Level";
import { Profile } from "../../database/entities/workshop/characters/Profile";
import { Item } from "../../database/entities/workshop/characters/Item";

const CharacterRepository = CEMDataSource.getRepository(Character)
const RaceRepository = CEMDataSource.getRepository(Race)
const LanguageRepository = CEMDataSource.getRepository(Language)
const CharacteristicRepository = CEMDataSource.getRepository(Characteristic)
const ClassRepository = CEMDataSource.getRepository(Class)
const CharacModRepository = CEMDataSource.getRepository(CharacteristicModificator)
const LevelRepository = CEMDataSource.getRepository(Level)
const ProfileRepository = CEMDataSource.getRepository(Profile)
const ItemRepository = CEMDataSource.getRepository(Item)

export async function findAll(user_id: string) {
    const characters = await CharacterRepository
        .createQueryBuilder("character")
        .leftJoinAndSelect('character.race', 'race')
        .leftJoinAndSelect('character.class', 'class')
        .leftJoinAndSelect('character.level', 'level')
        .leftJoinAndSelect('character.skills', 'skills')
        .leftJoinAndSelect('skills.characteristic', 'skill_characteristic')
        .leftJoinAndSelect('class.profile', 'profile')
        .leftJoinAndSelect('class.saving_throws', 'class_characteristics')
        .leftJoinAndSelect('character.languages', 'languages')
        .leftJoinAndSelect('character.character_characteristic', 'character_characteristic')
        .leftJoinAndSelect('character_characteristic.characteristic', 'characteristic')
        .leftJoinAndSelect('character.equipment', 'equipment')
        .leftJoinAndSelect('equipment.item', 'item')
        .leftJoinAndSelect('character.money', 'money')
        .select(['character', 'race', 'class', 'level', 'class_characteristics', 'skills', 'skill_characteristic', 'profile', 'languages', 'character_characteristic', 'characteristic', 'equipment', 'item', 'money'])
        .where({ user_id: user_id })
        .getMany()

    return characters
}

export async function findById(user_id: string, character_id: string) {
    const characters = await CharacterRepository
        .createQueryBuilder("character")
        .leftJoinAndSelect('character.race', 'race')
        .leftJoinAndSelect('character.class', 'class')
        .leftJoinAndSelect('character.level', 'level')
        .leftJoinAndSelect('character.skills', 'skills')
        .leftJoinAndSelect('skills.characteristic', 'skill_characteristic')
        .leftJoinAndSelect('class.profile', 'profile')
        .leftJoinAndSelect('class.saving_throws', 'class_characteristics')
        .leftJoinAndSelect('character.languages', 'languages')
        .leftJoinAndSelect('character.character_characteristic', 'character_characteristic')
        .leftJoinAndSelect('character_characteristic.characteristic', 'characteristic')
        .leftJoinAndSelect('character.equipment', 'equipment')
        .leftJoinAndSelect('equipment.item', 'item')
        .leftJoinAndSelect('character.money', 'money')
        .select(['character', 'race', 'class', 'level', 'class_characteristics', 'skills', 'skill_characteristic', 'profile', 'languages', 'character_characteristic', 'characteristic', 'equipment', 'item', 'money'])
        .where({ user_id: user_id })
        .andWhere({ id: character_id })
        .getOneOrFail()

    return characters
}

export async function characterCreation() {
    const races = await RaceRepository.find({ relations: { height: true, weight: true, languages: true, racial_bonus: true } })
    const languages = await LanguageRepository.find()
    const characteristics = await CharacteristicRepository.find()
    const classes = await ClassRepository
        .createQueryBuilder("class")
        .leftJoinAndSelect('class.saving_throws', 'saving_throws')
        .leftJoinAndSelect('class.skills', 'skills')
        .leftJoinAndSelect('skills.characteristic', 'characteristics')
        .leftJoinAndSelect('class.profile', 'profile')
        .leftJoinAndSelect('class.money', 'money')
        .getMany()
    const mods = await CharacModRepository.find()
    const levels = await LevelRepository.find()
    const profiles = await ProfileRepository
        .createQueryBuilder("profile")
        .leftJoinAndSelect('profile.items', 'items')
        .leftJoinAndSelect('items.item_stat', 'item_stat')
        .getMany()//find({ relations: { items: true, items.itemStats: true } })
    const armors = await ItemRepository.find({ where: { type: "ARMOR" } })
    const ammunitions = await ItemRepository.find({ where: { type: "AMMUNITION" } })
    const gears = await ItemRepository.find({ where: { type: "ADVENTURING GEAR" } })
    const object = {
        step11: {
            message: "Choose your Race, calculate your weight and height, choose your age between min and max age of the race",
            data: races
        },
        step12: {
            message: "If you have free language with your race, choose your language",
            data: languages
        },
        step2: {
            message: "Choose your class, skills depends on the number of possible skill your class can have. A skill represents a specific aspect of a characteristic value. Proficiency in a skill means that an individual can add their proficiency bonus to ability checks that involve that skill. and calculate your initial money",
            data: classes
        },
        step3: {
            message: "Calculate the six characteristics values. You generate your character’s six ability scores randomly. Roll four 6-sided dice and record the total of the highest three dice on a piece of scratch paper. Do this five more times, so that you have six numbers.",
            data: characteristics
        },
        step4: {
            message: "Describe your character",
            data: {
                "firstname": "",
                "lastname": "",
                "sex": sexEnum,
                "eye_color": "",
                "hair_color": "",
                "clothing_color_1": "",
                "clothing_color_2": "",
                "skin_color": "",
                "bio": "",
                "alignment": alignmentEnum,
                "ideals": "",
                "flaws": ""
            },
        },
        step5: {
            message: "Calculate your hit points : HP level 1 = max dice + constitution mod. HP following levels = 1dv at each level + constitution mod. Each time you level up, you add one Hit Die to your total. Roll this die, add your Constitution bonus to it, and add the total rolled (minimum 1) to your maximum hit points. When your Constitution modifier increases by 1, your hit point maximum increases by 1 for each level you have reached.",
            data: mods
        },
        step6: {
            message: "Choose your equipment : buy your weapons, armors and or shield if your class allows you to use them. Choose which weapon and armor you want to equip. If you need ammunitions for your weapon, buy some too with the good adventuring gear",
            data: { weapons: profiles, armors: armors, ammunitions: ammunitions, gears: gears }
        }
    }
    return object
}

export async function create(user_id: string, data: any) {
    const insert = await CEMDataSource
        .createQueryBuilder()
        .insert()
        .into(Character)
        .values({ user_id: user_id, ...data.character })
        .execute()
    const character_id = insert.identifiers[0].id
    await CEMDataSource
        .createQueryBuilder()
        .insert()
        .into("character_skill")
        .values(data.skills.map((skill_id: string) => {
            return {
                skill_id: skill_id,
                character_id: character_id
            }
        }))
        .execute()
    await CEMDataSource
        .createQueryBuilder()
        .insert()
        .into("character_language")
        .values(data.languages.map((language_id: string) => {
            return {
                language_id: language_id,
                character_id: character_id
            }
        }))
        .execute()
    console.log("ok")
    await CEMDataSource
        .createQueryBuilder()
        .insert()
        .into("character_characteristic")
        .values(data.character_characteristic.map((object: any) => {
            return {
                characteristic_id: object.characteristic_id,
                value: object.value,
                character_id: character_id
            }
        }))
        .execute()
    console.log("ok")
    await CEMDataSource
        .createQueryBuilder()
        .insert()
        .into("equipment")
        .values(data.equipment.map((object: any) => {
            return {
                item_id: object.item_id,
                equiped: object.equiped,
                character_id: character_id
            }
        }))
        .execute()
    console.log("ok")
    await CEMDataSource
        .createQueryBuilder()
        .insert()
        .into("money")
        .values({
            character_id: character_id, ...data.money
        })
        .execute()
    console.log("ok")
    const character = await findById(user_id, character_id)
    console.log("ok")
    return character
}

