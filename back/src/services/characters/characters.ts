import { PublicDataSource } from "../../database/init/datasources/public-data-source";
import { Character } from "../../database/entities/public/characters/Character";
import { Race } from "../../database/entities/public/characters/Race";
import { Language } from "../../database/entities/public/characters/Language";
import { Characteristic } from "../../database/entities/public/characters/Characteristic";
import { Class } from "../../database/entities/public/characters/Class";
import { CharacteristicModificator } from "../../database/entities/public/characters/CharacteristicModificator";
import { Level } from "../../database/entities/public/characters/Level";
import { Profile } from "../../database/entities/public/characters/Profile";
import { Item } from "../../database/entities/public/characters/Item";
import { User } from "../../database/entities/public/User";


const UserRepository = PublicDataSource.getRepository(User)
const CharacterRepository = PublicDataSource.getRepository(Character)
const RaceRepository = PublicDataSource.getRepository(Race)
const LanguageRepository = PublicDataSource.getRepository(Language)
const CharacteristicRepository = PublicDataSource.getRepository(Characteristic)
const ClassRepository = PublicDataSource.getRepository(Class)
const CharacModRepository = PublicDataSource.getRepository(CharacteristicModificator)
const LevelRepository = PublicDataSource.getRepository(Level)
const ProfileRepository = PublicDataSource.getRepository(Profile)
const ItemRepository = PublicDataSource.getRepository(Item)

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

export async function findAllPublic(username: string) {
    const user = await UserRepository.findOneByOrFail({username: username})
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
        .where({ user_id: user.id })
        .getMany()

    return characters
}

export async function findById(character_id: string) {
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
        .where({ id: character_id })
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
        "Universe": {
            title: "Choix de l'Univers",
            message: null,
            message_english: null,
            data: "cem"
        },
        "Race": {
            title: "Choix de la Race",
            message: "Choisissez votre race, calculez votre poids et votre taille, choisissez votre âge entre l'âge min et max de la race",
            message_english: "Choose your race, calculate your weight and height, choose your age between min and max age of the race",
            data: races
        },
        "Language": {
            title: "Choix de la Langue de Race",
            message: "Vous avez une langue au choix avec votre race ! Choisissez votre langue",
            message_english: "You have free language with your race ! Choose your language",
            data: languages
        },
        "Class": {
            title: "Choix de la Classe",
            message: "Choisissez votre classe, les compétences dépendent du nombre de compétences possibles que votre classe peut avoir. Une compétence représente un aspect spécifique d'une valeur de caractéristique. La maîtrise d'une compétence signifie qu'un individu peut ajouter son bonus de compétence aux tests de capacité qui impliquent cette compétence. Calculez également votre argent initial",
            message_english: "Choose your class, skills depends on the number of possible skill your class can have. A skill represents a specific aspect of a characteristic value. Proficiency in a skill means that an individual can add their proficiency bonus to ability checks that involve that skill. Calculate also your initial money",
            data: classes
        },
        "Characteristics": {
            title: "Calcul des Caractéristiques",
            message: "Calculez les six valeurs de caractéristiques. Vous générez aléatoirement les six scores de capacité de votre personnage. Lancez quatre dés à 6 faces et notez le total des trois dés les plus élevés sur une feuille de papier brouillon. Faites cela cinq fois de plus, de sorte que vous ayez six numéros.",
            message_english: "Calculate the six characteristics values. You generate your character’s six ability scores randomly. Roll four 6-sided dice and record the total of the highest three dice on a piece of scratch paper. Do this five more times, so that you have six numbers.",
            data: characteristics
        },
        "Description": {
            title: "Description du Personnage",
            message: "Décrivez votre personnage !",
            message_english: "Describe your character",
            data: {
                "firstname": "",
                "lastname": "",
                "sex": "",
                "eye_color": "",
                "hair_color": "",
                "clothing_color_1": "",
                "clothing_color_2": "",
                "skin_color": "",
                "bio": "",
                "alignment": "",
                "ideals": "",
                "flaws": ""
            },
        },
        "HP": {
            title: "Calcul des points de vie",
            message: "Calculez vos points de vie : HP niveau 1 = max dés + mod constitution. HP niveaux suivants = 1dv à chaque niveau + mod de constitution. Chaque fois que vous montez de niveau, vous ajoutez un dé de vie à votre total. Lancez ce dé, ajoutez-y votre bonus de Constitution et ajoutez le total obtenu (minimum 1) à vos points de vie maximum. Lorsque votre modificateur de Constitution augmente de 1, votre maximum de points de vie augmente de 1 pour chaque niveau que vous avez atteint.",
            message_english: "Calculate your hit points : HP level 1 = max dice + constitution mod. HP following levels = 1dv at each level + constitution mod. Each time you level up, you add one Hit Die to your total. Roll this die, add your Constitution bonus to it, and add the total rolled (minimum 1) to your maximum hit points. When your Constitution modifier increases by 1, your hit point maximum increases by 1 for each level you have reached.",
            data: mods
        },
        "Equipment": {
            title: "Choix de l'équipement",
            message: "Choisissez votre équipement : achetez vos armes, armures et/ou bouclier si votre classe vous permet de les utiliser. Choisissez l'arme et l'armure que vous souhaitez équiper. Si vous avez besoin de munitions pour votre arme, achetez-en aussi avec le bon équipement d'aventurier",
            message_english: "Choose your equipment : buy your weapons, armors and/or shield if your class allows you to use them. Choose which weapon and armor you want to equip. If you need ammunitions for your weapon, buy some too with the good adventuring gear",
            data: { weapons: profiles, armors: armors, ammunitions: ammunitions, gears: gears }
        }
    }
    return object
}

export async function create(user_id: string, data: any) {
    const insert = await PublicDataSource
        .createQueryBuilder()
        .insert()
        .into(Character)
        .values({ user_id: user_id, experience_points: 0, next_level_experience_points: 300, ...data.character })
        .execute()
    const character_id = insert.identifiers[0].id
    await PublicDataSource
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
    await PublicDataSource
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
    await PublicDataSource
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
    await PublicDataSource
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
    await PublicDataSource
        .createQueryBuilder()
        .insert()
        .into("money")
        .values({
            character_id: character_id, ...data.money
        })
        .execute()
    const character = await findById(character_id)
    return character
}

