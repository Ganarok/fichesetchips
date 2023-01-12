import { LoginRequest, RegisterRequest } from "../types/auth";
import { UpdateUser } from "../types/users";
import defaultPreferences from "../../database/fixtures/preferences"

export const loginRequest: LoginRequest = {
    username: "user",
    password: "password",
}

export const registerRequest: RegisterRequest = {
    username: "user",
    email: "user@email.com",
    password: "password"
}

export const updateRequest: UpdateUser = {
    username: "user",
    email: "user@email.com",
    password: "password",
    avatar: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
    preference_id: defaultPreferences.darkPreference.id
}

export const characterWorkshopCreationResponse = {
    "step1": {
        "message": "Choose your Race, calculate your weight and height, choose your age between min and max age of the race",
        "data": [
            {
                "id": "db655917-f60d-417a-ac94-6f017e6436a3",
                "name": "ELF",
                "french_name": "ELFE",
                "size": "MEDIUM",
                "speed": 9,
                "adult_age": 100,
                "max_age": 750,
                "calculation_height": "53a5d83b-fb24-4b88-83de-47898eac8697",
                "calculation_weight": "cd15d79a-bc5c-4eab-af80-c555be33a75d",
                "nb_free_standard_language": 0,
                "height": {
                    "id": "53a5d83b-fb24-4b88-83de-47898eac8697",
                    "base": 135,
                    "operator_1": "+",
                    "dice_repetition": 2,
                    "dice_faces": 10,
                    "operator_2": "x",
                    "modificator": 44683,
                    "for": "HEIGHT"
                },
                "weight": {
                    "id": "cd15d79a-bc5c-4eab-af80-c555be33a75d",
                    "base": 50,
                    "operator_1": "x",
                    "dice_repetition": 1,
                    "dice_faces": 4,
                    "operator_2": "/",
                    "modificator": 2,
                    "for": "WEIGHT"
                },
                "languages": [
                    {
                        "id": "cbd6d175-1e1e-45bc-af19-af9fcb069188",
                        "type": "STANDARD",
                        "name": "COMMON"
                    },
                    {
                        "id": "a75bd88f-e499-46ab-bb56-6349294169c0",
                        "type": "STANDARD",
                        "name": "ELVISH"
                    }
                ]
            },
            {
                "id": "e24f0fef-02c5-42f0-a90d-e6a0459aea30",
                "name": "HALFLING",
                "french_name": "HALFELIN",
                "size": "SMALL",
                "speed": 44688,
                "adult_age": 20,
                "max_age": 150,
                "calculation_height": "f4a16168-8c2e-45e0-b66f-95ec1ef72b15",
                "calculation_weight": "efe633a3-d30c-47b8-ba9d-ec2418257f4e",
                "nb_free_standard_language": 0,
                "height": {
                    "id": "f4a16168-8c2e-45e0-b66f-95ec1ef72b15",
                    "base": 80,
                    "operator_1": "+",
                    "dice_repetition": 2,
                    "dice_faces": 4,
                    "operator_2": "x",
                    "modificator": 44683,
                    "for": "HEIGHT"
                },
                "weight": {
                    "id": "efe633a3-d30c-47b8-ba9d-ec2418257f4e",
                    "base": 44698,
                    "operator_1": "x",
                    "dice_repetition": 1,
                    "dice_faces": 1,
                    "operator_2": "/",
                    "modificator": 2,
                    "for": "WEIGHT"
                },
                "languages": [
                    {
                        "id": "cbd6d175-1e1e-45bc-af19-af9fcb069188",
                        "type": "STANDARD",
                        "name": "COMMON"
                    },
                    {
                        "id": "d3748c07-831c-404b-aa99-aa9dcd3f6b18",
                        "type": "STANDARD",
                        "name": "HALFLING"
                    }
                ]
            },
            {
                "id": "4d6889bb-bfd7-4934-9625-7c250c7fcafc",
                "name": "HUMAN",
                "french_name": "HUMAIN",
                "size": "MEDIUM",
                "speed": 9,
                "adult_age": 20,
                "max_age": 99,
                "calculation_height": "71d210e6-6be4-4009-b3e0-df91705395c9",
                "calculation_weight": "0d6279bf-ee4c-4f7f-8112-4b54532fcfaf",
                "nb_free_standard_language": 1,
                "height": {
                    "id": "71d210e6-6be4-4009-b3e0-df91705395c9",
                    "base": 140,
                    "operator_1": "+",
                    "dice_repetition": 2,
                    "dice_faces": 10,
                    "operator_2": "x",
                    "modificator": 44683,
                    "for": "HEIGHT"
                },
                "weight": {
                    "id": "0d6279bf-ee4c-4f7f-8112-4b54532fcfaf",
                    "base": 55,
                    "operator_1": "x",
                    "dice_repetition": 2,
                    "dice_faces": 4,
                    "operator_2": "/",
                    "modificator": 2,
                    "for": "WEIGHT"
                },
                "languages": [
                    {
                        "id": "cbd6d175-1e1e-45bc-af19-af9fcb069188",
                        "type": "STANDARD",
                        "name": "COMMON"
                    }
                ]
            },
            {
                "id": "6041c69f-c53c-40e3-85c7-f7812cd69ad0",
                "name": "DWARF",
                "french_name": "NAIN",
                "size": "MEDIUM",
                "speed": 44688,
                "adult_age": 50,
                "max_age": 350,
                "calculation_height": "7593db01-3903-4dca-b64c-a7612a8312c9",
                "calculation_weight": "810d3b53-f6b3-4f4f-aea6-310bda689b11",
                "nb_free_standard_language": 0,
                "height": {
                    "id": "7593db01-3903-4dca-b64c-a7612a8312c9",
                    "base": 120,
                    "operator_1": "+",
                    "dice_repetition": 2,
                    "dice_faces": 4,
                    "operator_2": "x",
                    "modificator": 44683,
                    "for": "HEIGHT"
                },
                "weight": {
                    "id": "810d3b53-f6b3-4f4f-aea6-310bda689b11",
                    "base": 60,
                    "operator_1": "x",
                    "dice_repetition": 2,
                    "dice_faces": 6,
                    "operator_2": "/",
                    "modificator": 2,
                    "for": "WEIGHT"
                },
                "languages": [
                    {
                        "id": "cbd6d175-1e1e-45bc-af19-af9fcb069188",
                        "type": "STANDARD",
                        "name": "COMMON"
                    },
                    {
                        "id": "eaa80e1d-616d-4286-86eb-55237b2d0810",
                        "type": "STANDARD",
                        "name": "DWARVISH"
                    }
                ]
            },
            {
                "id": "03c7610e-5e23-4f4d-8500-e8b2f666451c",
                "name": "HALF-ELF",
                "french_name": "DEMI-ELFE",
                "size": "MEDIUM",
                "speed": 9,
                "adult_age": 20,
                "max_age": 180,
                "calculation_height": "f83d37c7-7647-4efb-817e-14f14591504a",
                "calculation_weight": "0d6279bf-ee4c-4f7f-8112-4b54532fcfaf",
                "nb_free_standard_language": 1,
                "height": {
                    "id": "f83d37c7-7647-4efb-817e-14f14591504a",
                    "base": 145,
                    "operator_1": "+",
                    "dice_repetition": 2,
                    "dice_faces": 8,
                    "operator_2": "x",
                    "modificator": 44683,
                    "for": "HEIGHT"
                },
                "weight": {
                    "id": "0d6279bf-ee4c-4f7f-8112-4b54532fcfaf",
                    "base": 55,
                    "operator_1": "x",
                    "dice_repetition": 2,
                    "dice_faces": 4,
                    "operator_2": "/",
                    "modificator": 2,
                    "for": "WEIGHT"
                },
                "languages": [
                    {
                        "id": "cbd6d175-1e1e-45bc-af19-af9fcb069188",
                        "type": "STANDARD",
                        "name": "COMMON"
                    },
                    {
                        "id": "a75bd88f-e499-46ab-bb56-6349294169c0",
                        "type": "STANDARD",
                        "name": "ELVISH"
                    }
                ]
            },
            {
                "id": "02e948cb-548b-4181-8b15-9ec72d675d98",
                "name": "HALF-ORC",
                "french_name": "DEMI-ORC",
                "size": "MEDIUM",
                "speed": 9,
                "adult_age": 14,
                "max_age": 75,
                "calculation_height": "9b3bc32b-168e-47c0-a43a-f2985ab074cb",
                "calculation_weight": "d7906676-f6c3-480c-8cd8-c54461b74ffb",
                "nb_free_standard_language": 0,
                "height": {
                    "id": "9b3bc32b-168e-47c0-a43a-f2985ab074cb",
                    "base": 150,
                    "operator_1": "+",
                    "dice_repetition": 2,
                    "dice_faces": 10,
                    "operator_2": "x",
                    "modificator": 44683,
                    "for": "HEIGHT"
                },
                "weight": {
                    "id": "d7906676-f6c3-480c-8cd8-c54461b74ffb",
                    "base": 70,
                    "operator_1": "x",
                    "dice_repetition": 2,
                    "dice_faces": 6,
                    "operator_2": "/",
                    "modificator": 2,
                    "for": "WEIGHT"
                },
                "languages": [
                    {
                        "id": "cbd6d175-1e1e-45bc-af19-af9fcb069188",
                        "type": "STANDARD",
                        "name": "COMMON"
                    },
                    {
                        "id": "818b3532-7827-4618-b3c0-beaaf7316c89",
                        "type": "STANDARD",
                        "name": "ORC"
                    }
                ]
            },
            {
                "id": "d0b22a83-8459-44f1-99aa-8d80501f33ba",
                "name": "GNOME",
                "french_name": "GNOME",
                "size": "SMALL",
                "speed": 44688,
                "adult_age": 40,
                "max_age": 500,
                "calculation_height": "ee411b3f-a8c1-4d30-911b-c11c61adeaec",
                "calculation_weight": "efe633a3-d30c-47b8-ba9d-ec2418257f4e",
                "nb_free_standard_language": 0,
                "height": {
                    "id": "ee411b3f-a8c1-4d30-911b-c11c61adeaec",
                    "base": 90,
                    "operator_1": "+",
                    "dice_repetition": 2,
                    "dice_faces": 4,
                    "operator_2": "x",
                    "modificator": 44683,
                    "for": "HEIGHT"
                },
                "weight": {
                    "id": "efe633a3-d30c-47b8-ba9d-ec2418257f4e",
                    "base": 44698,
                    "operator_1": "x",
                    "dice_repetition": 1,
                    "dice_faces": 1,
                    "operator_2": "/",
                    "modificator": 2,
                    "for": "WEIGHT"
                },
                "languages": [
                    {
                        "id": "cbd6d175-1e1e-45bc-af19-af9fcb069188",
                        "type": "STANDARD",
                        "name": "COMMON"
                    },
                    {
                        "id": "c56f939f-979f-4038-a5b6-e4cb0c8b5287",
                        "type": "STANDARD",
                        "name": "GNOMISH"
                    }
                ]
            },
            {
                "id": "0bd0842b-1c1b-4bd8-badd-c072e1437638",
                "name": "TIEFLING",
                "french_name": "TIEFFELIN",
                "size": "MEDIUM",
                "speed": 9,
                "adult_age": 20,
                "max_age": 105,
                "calculation_height": "c14861a4-723c-43fe-8cc8-8fae4ac6a1f5",
                "calculation_weight": "0d6279bf-ee4c-4f7f-8112-4b54532fcfaf",
                "nb_free_standard_language": 0,
                "height": {
                    "id": "c14861a4-723c-43fe-8cc8-8fae4ac6a1f5",
                    "base": 145,
                    "operator_1": "+",
                    "dice_repetition": 2,
                    "dice_faces": 8,
                    "operator_2": "x",
                    "modificator": 44683,
                    "for": "HEIGHT"
                },
                "weight": {
                    "id": "0d6279bf-ee4c-4f7f-8112-4b54532fcfaf",
                    "base": 55,
                    "operator_1": "x",
                    "dice_repetition": 2,
                    "dice_faces": 4,
                    "operator_2": "/",
                    "modificator": 2,
                    "for": "WEIGHT"
                },
                "languages": [
                    {
                        "id": "cbd6d175-1e1e-45bc-af19-af9fcb069188",
                        "type": "STANDARD",
                        "name": "COMMON"
                    },
                    {
                        "id": "c67d75bd-8a77-4a60-9067-352ba5ce4453",
                        "type": "EXOTIC",
                        "name": "INFERNAL"
                    }
                ]
            }
        ]
    },
    "step12": {
        "message": "If you have free language with your race, choose your language",
        "data": [
            {
                "id": "cbd6d175-1e1e-45bc-af19-af9fcb069188",
                "type": "STANDARD",
                "name": "COMMON"
            },
            {
                "id": "eaa80e1d-616d-4286-86eb-55237b2d0810",
                "type": "STANDARD",
                "name": "DWARVISH"
            },
            {
                "id": "a75bd88f-e499-46ab-bb56-6349294169c0",
                "type": "STANDARD",
                "name": "ELVISH"
            },
            {
                "id": "536ec7ec-b3a3-4873-b0f0-d4dae19c6222",
                "type": "STANDARD",
                "name": "GIANT"
            },
            {
                "id": "c56f939f-979f-4038-a5b6-e4cb0c8b5287",
                "type": "STANDARD",
                "name": "GNOMISH"
            },
            {
                "id": "a4eef4db-99c8-4688-aac6-2c2e3b8fda4f",
                "type": "STANDARD",
                "name": "GOBLIN"
            },
            {
                "id": "d3748c07-831c-404b-aa99-aa9dcd3f6b18",
                "type": "STANDARD",
                "name": "HALFLING"
            },
            {
                "id": "818b3532-7827-4618-b3c0-beaaf7316c89",
                "type": "STANDARD",
                "name": "ORC"
            },
            {
                "id": "ce6a4b9f-6a1c-4376-836b-0c48b2d9f1b0",
                "type": "EXOTIC",
                "name": "ABYSSAL"
            },
            {
                "id": "84d82939-f344-4237-9100-1bf21592cc74",
                "type": "EXOTIC",
                "name": "CELESTIAL"
            },
            {
                "id": "97a5ab9d-596a-40c1-9d6a-d2ca6821afa6",
                "type": "EXOTIC",
                "name": "DRACONIC"
            },
            {
                "id": "5e87dcf3-2c45-45cf-ad34-cdc4beef6539",
                "type": "EXOTIC",
                "name": "DEEP SPEECH"
            },
            {
                "id": "c67d75bd-8a77-4a60-9067-352ba5ce4453",
                "type": "EXOTIC",
                "name": "INFERNAL"
            },
            {
                "id": "62ba0eb1-9494-453f-a386-ee00af5529eb",
                "type": "EXOTIC",
                "name": "PRIMORDIAL"
            },
            {
                "id": "a9286245-f9db-47c2-83c9-6d6245f8fb95",
                "type": "EXOTIC",
                "name": "SYLVAN"
            },
            {
                "id": "f77cee1d-ded1-49aa-9879-63488e44109d",
                "type": "EXOTIC",
                "name": "UNDERCOMMON"
            }
        ]
    },
    "step2": {
        "message": "Choose your class, skills depends on the number of possible skill your class can have. A skill represents a specific aspect of a characteristic value. Proficiency in a skill means that an individual can add their proficiency bonus to ability checks that involve that skill. and calculate your initial moner",
        "data": [
            {
                "id": "fcfd78b9-161c-4ac4-9035-7a8189242d24",
                "name": "BARBARIAN",
                "french_name": "BARBARE",
                "hit_dice": 12,
                "light_armor": true,
                "medium_armor": true,
                "heavy_armor": false,
                "shield": true,
                "profile_id": "7816ee90-0e9e-97e1-1836-218460b79b53",
                "money_dice": "361bf64f-e887-e99f-705d-75be9bc2e6a6",
                "skill_nb": 2,
                "characteristics": [
                    {
                        "id": "28b7a4ec-71c4-4ac7-a462-27030fca2ecb",
                        "name": "CONSTITUTION"
                    },
                    {
                        "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                        "name": "STRENGTH"
                    }
                ],
                "skills": [
                    {
                        "id": "ff9e11ff-cc57-9e6b-1937-04cae9a988d4",
                        "name": "Athletics",
                        "characteristic_id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                        "characteristic": {
                            "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                            "name": "STRENGTH"
                        }
                    },
                    {
                        "id": "1c5d3061-6849-db00-53f4-de0dcbcbbc28",
                        "name": "Nature",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "f8d14187-9434-2347-d95c-722077f95ab4",
                        "name": "Animal Handling",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "2815d102-15a6-a91c-692f-73c1cf77e191",
                        "name": "Perception",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "c50073b9-9931-4940-7991-b2d4cfd28cd3",
                        "name": "Survival",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "91e3005d-9333-442c-1cfe-42e26f6eeb5e",
                        "name": "Intimidation",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    }
                ],
                "profile": {
                    "id": "7816ee90-0e9e-97e1-1836-218460b79b53",
                    "name": "ALL"
                }
            },
            {
                "id": "ceed685d-6a9d-441b-9986-c3b7ac3cdb65",
                "name": "BARD",
                "french_name": "BARDE",
                "hit_dice": 8,
                "light_armor": true,
                "medium_armor": false,
                "heavy_armor": false,
                "shield": false,
                "profile_id": "aeb29efd-89b3-5c36-dbd9-d088078a1a3f",
                "money_dice": "6794d745-2139-51b2-38e5-3b089fc72d50",
                "skill_nb": 3,
                "characteristics": [
                    {
                        "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "name": "CHARISMA"
                    },
                    {
                        "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                        "name": "DEXTERITY"
                    }
                ],
                "skills": [
                    {
                        "id": "ff9e11ff-cc57-9e6b-1937-04cae9a988d4",
                        "name": "Athletics",
                        "characteristic_id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                        "characteristic": {
                            "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                            "name": "STRENGTH"
                        }
                    },
                    {
                        "id": "9556ecf3-fd2a-9947-f905-5136940c2434",
                        "name": "Acrobatics",
                        "characteristic_id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                        "characteristic": {
                            "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                            "name": "DEXTERITY"
                        }
                    },
                    {
                        "id": "e0d8f6b9-1d61-9cc6-57d0-74d0be1445fb",
                        "name": "Sleight of Hand",
                        "characteristic_id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                        "characteristic": {
                            "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                            "name": "DEXTERITY"
                        }
                    },
                    {
                        "id": "b45fdb18-05dc-93bc-8501-63ab90d8205c",
                        "name": "Stealth",
                        "characteristic_id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                        "characteristic": {
                            "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                            "name": "DEXTERITY"
                        }
                    },
                    {
                        "id": "c4c36bf6-08d6-8f83-7f5e-d5d1c8a7c49a",
                        "name": "Arcana",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "c9cdf2a9-4bcb-eb66-6f18-02571bf27069",
                        "name": "History",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "c7cf1ba9-b621-bd03-581f-c190ad158d6f",
                        "name": "Investigation",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "1c5d3061-6849-db00-53f4-de0dcbcbbc28",
                        "name": "Nature",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "c146834a-8715-4816-c226-0c315250c1c1",
                        "name": "Religion",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "f8d14187-9434-2347-d95c-722077f95ab4",
                        "name": "Animal Handling",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "4fd0112c-475c-cd71-8bf7-e75bcae40a2e",
                        "name": "Insight",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "130628e5-2801-daae-4b76-1303b3864090",
                        "name": "Medicine",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "2815d102-15a6-a91c-692f-73c1cf77e191",
                        "name": "Perception",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "c50073b9-9931-4940-7991-b2d4cfd28cd3",
                        "name": "Survival",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "0657abd9-ac89-6444-9dad-a70cd56251f2",
                        "name": "Deception",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    },
                    {
                        "id": "91e3005d-9333-442c-1cfe-42e26f6eeb5e",
                        "name": "Intimidation",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    },
                    {
                        "id": "a3ee32bc-270f-4816-83f9-a47aa2077986",
                        "name": "Performance",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    },
                    {
                        "id": "5ef05299-6be0-44c5-12dc-5d9eb0fb4226",
                        "name": "Persuasion",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    }
                ],
                "profile": {
                    "id": "aeb29efd-89b3-5c36-dbd9-d088078a1a3f",
                    "name": "STEALTHY"
                }
            },
            {
                "id": "32be3f37-3e10-4650-b81e-1a43e3ec3a48",
                "name": "CLERIC",
                "french_name": "CLERC",
                "hit_dice": 8,
                "light_armor": true,
                "medium_armor": true,
                "heavy_armor": false,
                "shield": true,
                "profile_id": "c668da1e-49b0-218e-3a80-a113a08d954a",
                "money_dice": "6794d745-2139-51b2-38e5-3b089fc72d50",
                "skill_nb": 2,
                "characteristics": [
                    {
                        "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "name": "CHARISMA"
                    },
                    {
                        "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "name": "WISDOM"
                    }
                ],
                "skills": [
                    {
                        "id": "c9cdf2a9-4bcb-eb66-6f18-02571bf27069",
                        "name": "History",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "c146834a-8715-4816-c226-0c315250c1c1",
                        "name": "Religion",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "4fd0112c-475c-cd71-8bf7-e75bcae40a2e",
                        "name": "Insight",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "130628e5-2801-daae-4b76-1303b3864090",
                        "name": "Medicine",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "5ef05299-6be0-44c5-12dc-5d9eb0fb4226",
                        "name": "Persuasion",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    }
                ],
                "profile": {
                    "id": "c668da1e-49b0-218e-3a80-a113a08d954a",
                    "name": "MELEE"
                }
            },
            {
                "id": "9d49274d-3a07-4b13-8133-e2ab017312b7",
                "name": "DRUID",
                "french_name": "DRUIDE",
                "hit_dice": 8,
                "light_armor": true,
                "medium_armor": true,
                "heavy_armor": false,
                "shield": true,
                "profile_id": "92bf2459-f636-23b6-21a8-ca8ce144df0e",
                "money_dice": "361bf64f-e887-e99f-705d-75be9bc2e6a6",
                "skill_nb": 2,
                "characteristics": [
                    {
                        "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "name": "WISDOM"
                    },
                    {
                        "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "name": "INTELLIGENCE"
                    }
                ],
                "skills": [
                    {
                        "id": "c4c36bf6-08d6-8f83-7f5e-d5d1c8a7c49a",
                        "name": "Arcana",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "1c5d3061-6849-db00-53f4-de0dcbcbbc28",
                        "name": "Nature",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "c146834a-8715-4816-c226-0c315250c1c1",
                        "name": "Religion",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "f8d14187-9434-2347-d95c-722077f95ab4",
                        "name": "Animal Handling",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "4fd0112c-475c-cd71-8bf7-e75bcae40a2e",
                        "name": "Insight",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "130628e5-2801-daae-4b76-1303b3864090",
                        "name": "Medicine",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "2815d102-15a6-a91c-692f-73c1cf77e191",
                        "name": "Perception",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "c50073b9-9931-4940-7991-b2d4cfd28cd3",
                        "name": "Survival",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    }
                ],
                "profile": {
                    "id": "92bf2459-f636-23b6-21a8-ca8ce144df0e",
                    "name": "VERSATILE"
                }
            },
            {
                "id": "55d26d1a-a521-420a-8a25-80c6c2292b06",
                "name": "FIGHTER",
                "french_name": "GUERRIER",
                "hit_dice": 10,
                "light_armor": true,
                "medium_armor": true,
                "heavy_armor": true,
                "shield": true,
                "profile_id": "7816ee90-0e9e-97e1-1836-218460b79b53",
                "money_dice": "6794d745-2139-51b2-38e5-3b089fc72d50",
                "skill_nb": 2,
                "characteristics": [
                    {
                        "id": "28b7a4ec-71c4-4ac7-a462-27030fca2ecb",
                        "name": "CONSTITUTION"
                    },
                    {
                        "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                        "name": "STRENGTH"
                    }
                ],
                "skills": [
                    {
                        "id": "ff9e11ff-cc57-9e6b-1937-04cae9a988d4",
                        "name": "Athletics",
                        "characteristic_id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                        "characteristic": {
                            "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                            "name": "STRENGTH"
                        }
                    },
                    {
                        "id": "9556ecf3-fd2a-9947-f905-5136940c2434",
                        "name": "Acrobatics",
                        "characteristic_id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                        "characteristic": {
                            "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                            "name": "DEXTERITY"
                        }
                    },
                    {
                        "id": "c9cdf2a9-4bcb-eb66-6f18-02571bf27069",
                        "name": "History",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "f8d14187-9434-2347-d95c-722077f95ab4",
                        "name": "Animal Handling",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "4fd0112c-475c-cd71-8bf7-e75bcae40a2e",
                        "name": "Insight",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "2815d102-15a6-a91c-692f-73c1cf77e191",
                        "name": "Perception",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "c50073b9-9931-4940-7991-b2d4cfd28cd3",
                        "name": "Survival",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "91e3005d-9333-442c-1cfe-42e26f6eeb5e",
                        "name": "Intimidation",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    }
                ],
                "profile": {
                    "id": "7816ee90-0e9e-97e1-1836-218460b79b53",
                    "name": "ALL"
                }
            },
            {
                "id": "54d6a455-fe5e-46a7-9f17-aad86a44b115",
                "name": "MONK",
                "french_name": "MOINE",
                "hit_dice": 8,
                "light_armor": false,
                "medium_armor": false,
                "heavy_armor": false,
                "shield": false,
                "profile_id": "c668da1e-49b0-218e-3a80-a113a08d954a",
                "money_dice": "4e19521a-9a96-a8d9-0f07-16b67e4fd581",
                "skill_nb": 2,
                "characteristics": [
                    {
                        "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                        "name": "DEXTERITY"
                    },
                    {
                        "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                        "name": "STRENGTH"
                    }
                ],
                "skills": [
                    {
                        "id": "ff9e11ff-cc57-9e6b-1937-04cae9a988d4",
                        "name": "Athletics",
                        "characteristic_id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                        "characteristic": {
                            "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                            "name": "STRENGTH"
                        }
                    },
                    {
                        "id": "9556ecf3-fd2a-9947-f905-5136940c2434",
                        "name": "Acrobatics",
                        "characteristic_id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                        "characteristic": {
                            "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                            "name": "DEXTERITY"
                        }
                    },
                    {
                        "id": "b45fdb18-05dc-93bc-8501-63ab90d8205c",
                        "name": "Stealth",
                        "characteristic_id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                        "characteristic": {
                            "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                            "name": "DEXTERITY"
                        }
                    },
                    {
                        "id": "c9cdf2a9-4bcb-eb66-6f18-02571bf27069",
                        "name": "History",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "c146834a-8715-4816-c226-0c315250c1c1",
                        "name": "Religion",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "4fd0112c-475c-cd71-8bf7-e75bcae40a2e",
                        "name": "Insight",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    }
                ],
                "profile": {
                    "id": "c668da1e-49b0-218e-3a80-a113a08d954a",
                    "name": "MELEE"
                }
            },
            {
                "id": "c9ebfd67-df69-4205-9160-1e38c3f8f710",
                "name": "PALADIN",
                "french_name": "PALADIN",
                "hit_dice": 10,
                "light_armor": true,
                "medium_armor": true,
                "heavy_armor": true,
                "shield": true,
                "profile_id": "7816ee90-0e9e-97e1-1836-218460b79b53",
                "money_dice": "6794d745-2139-51b2-38e5-3b089fc72d50",
                "skill_nb": 2,
                "characteristics": [
                    {
                        "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "name": "CHARISMA"
                    },
                    {
                        "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "name": "WISDOM"
                    }
                ],
                "skills": [
                    {
                        "id": "ff9e11ff-cc57-9e6b-1937-04cae9a988d4",
                        "name": "Athletics",
                        "characteristic_id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                        "characteristic": {
                            "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                            "name": "STRENGTH"
                        }
                    },
                    {
                        "id": "c146834a-8715-4816-c226-0c315250c1c1",
                        "name": "Religion",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "4fd0112c-475c-cd71-8bf7-e75bcae40a2e",
                        "name": "Insight",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "130628e5-2801-daae-4b76-1303b3864090",
                        "name": "Medicine",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "91e3005d-9333-442c-1cfe-42e26f6eeb5e",
                        "name": "Intimidation",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    },
                    {
                        "id": "5ef05299-6be0-44c5-12dc-5d9eb0fb4226",
                        "name": "Persuasion",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    }
                ],
                "profile": {
                    "id": "7816ee90-0e9e-97e1-1836-218460b79b53",
                    "name": "ALL"
                }
            },
            {
                "id": "ddc8e233-3e2f-4696-82ba-6044f52f2c41",
                "name": "RANGER",
                "french_name": "RÔDEUR",
                "hit_dice": 10,
                "light_armor": true,
                "medium_armor": true,
                "heavy_armor": false,
                "shield": true,
                "profile_id": "7816ee90-0e9e-97e1-1836-218460b79b53",
                "money_dice": "6794d745-2139-51b2-38e5-3b089fc72d50",
                "skill_nb": 3,
                "characteristics": [
                    {
                        "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                        "name": "DEXTERITY"
                    },
                    {
                        "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                        "name": "STRENGTH"
                    }
                ],
                "skills": [
                    {
                        "id": "ff9e11ff-cc57-9e6b-1937-04cae9a988d4",
                        "name": "Athletics",
                        "characteristic_id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                        "characteristic": {
                            "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                            "name": "STRENGTH"
                        }
                    },
                    {
                        "id": "b45fdb18-05dc-93bc-8501-63ab90d8205c",
                        "name": "Stealth",
                        "characteristic_id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                        "characteristic": {
                            "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                            "name": "DEXTERITY"
                        }
                    },
                    {
                        "id": "c7cf1ba9-b621-bd03-581f-c190ad158d6f",
                        "name": "Investigation",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "1c5d3061-6849-db00-53f4-de0dcbcbbc28",
                        "name": "Nature",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "f8d14187-9434-2347-d95c-722077f95ab4",
                        "name": "Animal Handling",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "4fd0112c-475c-cd71-8bf7-e75bcae40a2e",
                        "name": "Insight",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "2815d102-15a6-a91c-692f-73c1cf77e191",
                        "name": "Perception",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "c50073b9-9931-4940-7991-b2d4cfd28cd3",
                        "name": "Survival",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    }
                ],
                "profile": {
                    "id": "7816ee90-0e9e-97e1-1836-218460b79b53",
                    "name": "ALL"
                }
            },
            {
                "id": "b57f14ee-65dd-479a-a644-eca42c73223e",
                "name": "ROGUE",
                "french_name": "ROUBLARD",
                "hit_dice": 8,
                "light_armor": true,
                "medium_armor": false,
                "heavy_armor": false,
                "shield": false,
                "profile_id": "aeb29efd-89b3-5c36-dbd9-d088078a1a3f",
                "money_dice": "3b585e9b-aaab-3712-ff11-4a650c21c3c6",
                "skill_nb": 4,
                "characteristics": [
                    {
                        "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "name": "INTELLIGENCE"
                    },
                    {
                        "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                        "name": "DEXTERITY"
                    }
                ],
                "skills": [
                    {
                        "id": "ff9e11ff-cc57-9e6b-1937-04cae9a988d4",
                        "name": "Athletics",
                        "characteristic_id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                        "characteristic": {
                            "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                            "name": "STRENGTH"
                        }
                    },
                    {
                        "id": "9556ecf3-fd2a-9947-f905-5136940c2434",
                        "name": "Acrobatics",
                        "characteristic_id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                        "characteristic": {
                            "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                            "name": "DEXTERITY"
                        }
                    },
                    {
                        "id": "e0d8f6b9-1d61-9cc6-57d0-74d0be1445fb",
                        "name": "Sleight of Hand",
                        "characteristic_id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                        "characteristic": {
                            "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                            "name": "DEXTERITY"
                        }
                    },
                    {
                        "id": "b45fdb18-05dc-93bc-8501-63ab90d8205c",
                        "name": "Stealth",
                        "characteristic_id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                        "characteristic": {
                            "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                            "name": "DEXTERITY"
                        }
                    },
                    {
                        "id": "c7cf1ba9-b621-bd03-581f-c190ad158d6f",
                        "name": "Investigation",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "4fd0112c-475c-cd71-8bf7-e75bcae40a2e",
                        "name": "Insight",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "2815d102-15a6-a91c-692f-73c1cf77e191",
                        "name": "Perception",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "0657abd9-ac89-6444-9dad-a70cd56251f2",
                        "name": "Deception",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    },
                    {
                        "id": "91e3005d-9333-442c-1cfe-42e26f6eeb5e",
                        "name": "Intimidation",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    },
                    {
                        "id": "a3ee32bc-270f-4816-83f9-a47aa2077986",
                        "name": "Performance",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    },
                    {
                        "id": "5ef05299-6be0-44c5-12dc-5d9eb0fb4226",
                        "name": "Persuasion",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    }
                ],
                "profile": {
                    "id": "aeb29efd-89b3-5c36-dbd9-d088078a1a3f",
                    "name": "STEALTHY"
                }
            },
            {
                "id": "f5738b28-5caf-436e-a318-6efc640d2e02",
                "name": "SORCERER",
                "french_name": "ENSORCELEUR",
                "hit_dice": 6,
                "light_armor": false,
                "medium_armor": false,
                "heavy_armor": false,
                "shield": false,
                "profile_id": "f136ea27-05d2-4891-4158-2bc64e049d9d",
                "money_dice": "3a18ee97-8628-2c5e-0d5c-79da457a281c",
                "skill_nb": 2,
                "characteristics": [
                    {
                        "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "name": "CHARISMA"
                    },
                    {
                        "id": "28b7a4ec-71c4-4ac7-a462-27030fca2ecb",
                        "name": "CONSTITUTION"
                    }
                ],
                "skills": [
                    {
                        "id": "c4c36bf6-08d6-8f83-7f5e-d5d1c8a7c49a",
                        "name": "Arcana",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "c146834a-8715-4816-c226-0c315250c1c1",
                        "name": "Religion",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "4fd0112c-475c-cd71-8bf7-e75bcae40a2e",
                        "name": "Insight",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "0657abd9-ac89-6444-9dad-a70cd56251f2",
                        "name": "Deception",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    },
                    {
                        "id": "91e3005d-9333-442c-1cfe-42e26f6eeb5e",
                        "name": "Intimidation",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    },
                    {
                        "id": "5ef05299-6be0-44c5-12dc-5d9eb0fb4226",
                        "name": "Persuasion",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    }
                ],
                "profile": {
                    "id": "f136ea27-05d2-4891-4158-2bc64e049d9d",
                    "name": "MAGIC"
                }
            },
            {
                "id": "20ec5d48-778b-486d-a045-c0e42e840414",
                "name": "WARLOCK",
                "french_name": "OCCULTISTE",
                "hit_dice": 8,
                "light_armor": true,
                "medium_armor": false,
                "heavy_armor": false,
                "shield": false,
                "profile_id": "c668da1e-49b0-218e-3a80-a113a08d954a",
                "money_dice": "3b585e9b-aaab-3712-ff11-4a650c21c3c6",
                "skill_nb": 2,
                "characteristics": [
                    {
                        "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "name": "CHARISMA"
                    },
                    {
                        "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "name": "WISDOM"
                    }
                ],
                "skills": [
                    {
                        "id": "c4c36bf6-08d6-8f83-7f5e-d5d1c8a7c49a",
                        "name": "Arcana",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "c9cdf2a9-4bcb-eb66-6f18-02571bf27069",
                        "name": "History",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "c7cf1ba9-b621-bd03-581f-c190ad158d6f",
                        "name": "Investigation",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "1c5d3061-6849-db00-53f4-de0dcbcbbc28",
                        "name": "Nature",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "c146834a-8715-4816-c226-0c315250c1c1",
                        "name": "Religion",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "0657abd9-ac89-6444-9dad-a70cd56251f2",
                        "name": "Deception",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    },
                    {
                        "id": "91e3005d-9333-442c-1cfe-42e26f6eeb5e",
                        "name": "Intimidation",
                        "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                        "characteristic": {
                            "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                            "name": "CHARISMA"
                        }
                    }
                ],
                "profile": {
                    "id": "c668da1e-49b0-218e-3a80-a113a08d954a",
                    "name": "MELEE"
                }
            },
            {
                "id": "8a0ae06f-5283-4843-a3b2-a525e70c28b1",
                "name": "WIZARD",
                "french_name": "MAGICIEN",
                "hit_dice": 6,
                "light_armor": false,
                "medium_armor": false,
                "heavy_armor": false,
                "shield": false,
                "profile_id": "f136ea27-05d2-4891-4158-2bc64e049d9d",
                "money_dice": "3b585e9b-aaab-3712-ff11-4a650c21c3c6",
                "skill_nb": 2,
                "characteristics": [
                    {
                        "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "name": "WISDOM"
                    },
                    {
                        "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "name": "INTELLIGENCE"
                    }
                ],
                "skills": [
                    {
                        "id": "c4c36bf6-08d6-8f83-7f5e-d5d1c8a7c49a",
                        "name": "Arcana",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "c9cdf2a9-4bcb-eb66-6f18-02571bf27069",
                        "name": "History",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "c7cf1ba9-b621-bd03-581f-c190ad158d6f",
                        "name": "Investigation",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "c146834a-8715-4816-c226-0c315250c1c1",
                        "name": "Religion",
                        "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                        "characteristic": {
                            "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                            "name": "INTELLIGENCE"
                        }
                    },
                    {
                        "id": "4fd0112c-475c-cd71-8bf7-e75bcae40a2e",
                        "name": "Insight",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    },
                    {
                        "id": "130628e5-2801-daae-4b76-1303b3864090",
                        "name": "Medicine",
                        "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                        "characteristic": {
                            "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                            "name": "WISDOM"
                        }
                    }
                ],
                "profile": {
                    "id": "f136ea27-05d2-4891-4158-2bc64e049d9d",
                    "name": "MAGIC"
                }
            }
        ]
    },
    "step3": {
        "message": "Calculate the six characteristics values. You generate your character’s six ability scores randomly. Roll four 6-sided dice and record the total of the highest three dice on a piece of scratch paper. Do this five more times, so that you have six numbers.",
        "data": [
            {
                "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                "name": "STRENGTH"
            },
            {
                "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                "name": "DEXTERITY"
            },
            {
                "id": "28b7a4ec-71c4-4ac7-a462-27030fca2ecb",
                "name": "CONSTITUTION"
            },
            {
                "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                "name": "INTELLIGENCE"
            },
            {
                "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                "name": "WISDOM"
            },
            {
                "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                "name": "CHARISMA"
            }
        ]
    },
    "step4": {
        "message": "Describe your character",
        "data": {
            "firstname": "",
            "lastname": "",
            "sex": [
                "MALE",
                "FEMALE",
                "OTHER"
            ],
            "eye_color": "",
            "hair_color": "",
            "clothing_color_1": "",
            "clothing_color_2": "",
            "skin_color": "",
            "bio": "",
            "alignment": [
                "LAWFUL GOOD",
                "LAWFUL NEUTRAL",
                "LAWFUL EVIL",
                "NEUTRAL GOOD",
                "NEUTRAL",
                "NEUTRAL EVIL",
                "CHAOTIC GOOD",
                "CHAOTIC NEUTRAL",
                "CHAOTIC EVIL"
            ],
            "ideals": "",
            "flaws": ""
        }
    },
    "step51": {
        "message": "Choose your level",
        "data": [
            {
                "id": 1,
                "experience_points": 0,
                "proficiency_bonus": 2
            },
            {
                "id": 2,
                "experience_points": 300,
                "proficiency_bonus": 2
            },
            {
                "id": 3,
                "experience_points": 900,
                "proficiency_bonus": 2
            },
            {
                "id": 4,
                "experience_points": 2700,
                "proficiency_bonus": 2
            },
            {
                "id": 5,
                "experience_points": 6500,
                "proficiency_bonus": 3
            },
            {
                "id": 6,
                "experience_points": 14000,
                "proficiency_bonus": 3
            },
            {
                "id": 7,
                "experience_points": 23000,
                "proficiency_bonus": 3
            },
            {
                "id": 8,
                "experience_points": 34000,
                "proficiency_bonus": 3
            },
            {
                "id": 9,
                "experience_points": 48000,
                "proficiency_bonus": 4
            },
            {
                "id": 10,
                "experience_points": 64000,
                "proficiency_bonus": 4
            },
            {
                "id": 11,
                "experience_points": 85000,
                "proficiency_bonus": 4
            },
            {
                "id": 12,
                "experience_points": 100000,
                "proficiency_bonus": 4
            },
            {
                "id": 13,
                "experience_points": 120000,
                "proficiency_bonus": 5
            },
            {
                "id": 14,
                "experience_points": 140000,
                "proficiency_bonus": 5
            },
            {
                "id": 15,
                "experience_points": 165000,
                "proficiency_bonus": 5
            },
            {
                "id": 16,
                "experience_points": 195000,
                "proficiency_bonus": 5
            },
            {
                "id": 17,
                "experience_points": 225000,
                "proficiency_bonus": 6
            },
            {
                "id": 18,
                "experience_points": 265000,
                "proficiency_bonus": 6
            },
            {
                "id": 19,
                "experience_points": 305000,
                "proficiency_bonus": 6
            },
            {
                "id": 20,
                "experience_points": 355000,
                "proficiency_bonus": 6
            }
        ]
    },
    "step52": {
        "message": "Calculation your hit points : HP level 1 = max dice + constitution mod. HP following levels = 1dv at each level + constitution mod. Each time you level up, you add one Hit Die to your total. Roll this die, add your Constitution bonus to it, and add the total rolled (minimum 1) to your maximum hit points. When your Constitution modifier increases by 1, your hit point maximum increases by 1 for each level you have reached.",
        "data": [
            {
                "id": "21df8c8e-02fb-a0a4-ac23-1ae11c6704b5",
                "characteristic_value": 1,
                "modificator_value": -5
            },
            {
                "id": "9226208b-d94b-a4ab-9420-b6df295eb120",
                "characteristic_value": 2,
                "modificator_value": -4
            },
            {
                "id": "de033735-9375-8202-f86f-13a087e86be4",
                "characteristic_value": 3,
                "modificator_value": -4
            },
            {
                "id": "a0cb8ab8-8476-8287-b182-528ee5c9b8ea",
                "characteristic_value": 4,
                "modificator_value": -3
            },
            {
                "id": "b0810990-a888-a0e7-3700-c52d7ebd3c3e",
                "characteristic_value": 5,
                "modificator_value": -3
            },
            {
                "id": "4f501f78-cb1f-ff81-3e39-1326bfa6de87",
                "characteristic_value": 6,
                "modificator_value": -2
            },
            {
                "id": "aa798b6a-d5d4-a1cd-197a-2cbf080f9052",
                "characteristic_value": 7,
                "modificator_value": -2
            },
            {
                "id": "43c7410f-470a-b6c3-3d6d-b0e79c9817c5",
                "characteristic_value": 8,
                "modificator_value": -1
            },
            {
                "id": "3d220cfa-3a4f-9027-fdf0-d5fbe28541a7",
                "characteristic_value": 9,
                "modificator_value": -1
            },
            {
                "id": "b2b0fbbf-3bf8-5cd2-9cbf-26de834b37c9",
                "characteristic_value": 10,
                "modificator_value": 0
            },
            {
                "id": "105abe1a-d3e7-000a-346b-4cf324e8e435",
                "characteristic_value": 11,
                "modificator_value": 0
            },
            {
                "id": "88cc85a7-a479-86fd-0918-2f94a82a69b8",
                "characteristic_value": 12,
                "modificator_value": 1
            },
            {
                "id": "ef911738-a162-1d05-d95a-6c67405a17af",
                "characteristic_value": 13,
                "modificator_value": 1
            },
            {
                "id": "5a860ebf-1204-4856-0be7-4e80cd2d1824",
                "characteristic_value": 14,
                "modificator_value": 2
            },
            {
                "id": "3a5c8f4a-3ab9-38a4-0536-2e19409baca3",
                "characteristic_value": 15,
                "modificator_value": 2
            },
            {
                "id": "6b0ddf09-f41c-115f-a2c5-7c87f7f75f58",
                "characteristic_value": 16,
                "modificator_value": 3
            },
            {
                "id": "ed83a4a7-8d72-1e7e-430f-a20264b35b61",
                "characteristic_value": 17,
                "modificator_value": 3
            },
            {
                "id": "2066c8a1-dbaa-8ed7-f0bb-691b648f6863",
                "characteristic_value": 18,
                "modificator_value": 4
            },
            {
                "id": "f8573302-a7b2-9ed3-28d7-a8aa0ae40abc",
                "characteristic_value": 19,
                "modificator_value": 4
            },
            {
                "id": "b4f9e3b1-08e9-8b59-4dad-94c1e3c14b01",
                "characteristic_value": 20,
                "modificator_value": 5
            },
            {
                "id": "29921c82-f208-6405-8d7d-fc05df18e48e",
                "characteristic_value": 21,
                "modificator_value": 5
            }
        ]
    },
    "step6": {
        "message": "Choose your equipment : buy your weapons, armors and or shield if your class allow you to use them. Choose which weapon and armor you want to equip",
        "data": {
            "weapons": [
                {
                    "id": "f136ea27-05d2-4891-4158-2bc64e049d9d",
                    "name": "MAGIC",
                    "items": [
                        {
                            "id": "acc6af81-7949-b133-b880-3902941c3ca1",
                            "french_name": "BÂTON",
                            "name": "QUARTERSTAFF",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "sp"
                        },
                        {
                            "id": "c84816ab-4d73-ed24-c604-07d8f5933e19",
                            "french_name": "DAGUE",
                            "name": "DAGGER",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "gp"
                        },
                        {
                            "id": "258d1837-fcb4-5d6b-b01b-44057923f69e",
                            "french_name": "ARBALÈTE LÉGÈRE",
                            "name": "LIGHT CROSSBOW",
                            "type": "WEAPON",
                            "cost": 25,
                            "piece": "gp"
                        },
                        {
                            "id": "ca2e6668-1be6-229c-1226-c9a79a9b927e",
                            "french_name": "FLÉCHETTE",
                            "name": "DART",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "cp"
                        },
                        {
                            "id": "9fa87857-28ca-531a-a7f6-220a3cd680f2",
                            "french_name": "FRONDE",
                            "name": "SLING",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "sp"
                        }
                    ]
                },
                {
                    "id": "92bf2459-f636-23b6-21a8-ca8ce144df0e",
                    "name": "VERSATILE",
                    "items": [
                        {
                            "id": "acc6af81-7949-b133-b880-3902941c3ca1",
                            "french_name": "BÂTON",
                            "name": "QUARTERSTAFF",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "sp"
                        },
                        {
                            "id": "c84816ab-4d73-ed24-c604-07d8f5933e19",
                            "french_name": "DAGUE",
                            "name": "DAGGER",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "gp"
                        },
                        {
                            "id": "9ba5db89-cee5-bdb4-4514-2cbef031e5b5",
                            "french_name": "GOURDIN",
                            "name": "CLUB",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "sp"
                        },
                        {
                            "id": "aa58c51b-8170-cd37-d394-55b29bccf8d6",
                            "french_name": "JAVELINE",
                            "name": "JAVELIN",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "sp"
                        },
                        {
                            "id": "9718f0f0-b57f-e2f5-edf0-1fc9142a2c30",
                            "french_name": "LANCE",
                            "name": "SPEAR",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "gp"
                        },
                        {
                            "id": "41b76cf1-fee9-8064-783d-8114864270c9",
                            "french_name": "MASSE D'ARMES",
                            "name": "MACE",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "gp"
                        },
                        {
                            "id": "aafe90da-3405-a024-2358-3ca1e6d5b3ef",
                            "french_name": "SERPE",
                            "name": "SICKLE",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "gp"
                        },
                        {
                            "id": "ca2e6668-1be6-229c-1226-c9a79a9b927e",
                            "french_name": "FLÉCHETTE",
                            "name": "DART",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "cp"
                        },
                        {
                            "id": "9fa87857-28ca-531a-a7f6-220a3cd680f2",
                            "french_name": "FRONDE",
                            "name": "SLING",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "sp"
                        },
                        {
                            "id": "645b27d2-8e8f-8e70-d8bf-fd982abaade1",
                            "french_name": "CIMETERRE",
                            "name": "SCIMITAR",
                            "type": "WEAPON",
                            "cost": 25,
                            "piece": "gp"
                        }
                    ]
                },
                {
                    "id": "c668da1e-49b0-218e-3a80-a113a08d954a",
                    "name": "MELEE",
                    "items": [
                        {
                            "id": "acc6af81-7949-b133-b880-3902941c3ca1",
                            "french_name": "BÂTON",
                            "name": "QUARTERSTAFF",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "sp"
                        },
                        {
                            "id": "c84816ab-4d73-ed24-c604-07d8f5933e19",
                            "french_name": "DAGUE",
                            "name": "DAGGER",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "gp"
                        },
                        {
                            "id": "9ba5db89-cee5-bdb4-4514-2cbef031e5b5",
                            "french_name": "GOURDIN",
                            "name": "CLUB",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "sp"
                        },
                        {
                            "id": "359fa9ce-592d-fd08-d281-6c389e88c8ed",
                            "french_name": "HACHETTE",
                            "name": "HANDAXE",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "gp"
                        },
                        {
                            "id": "aa58c51b-8170-cd37-d394-55b29bccf8d6",
                            "french_name": "JAVELINE",
                            "name": "JAVELIN",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "sp"
                        },
                        {
                            "id": "9718f0f0-b57f-e2f5-edf0-1fc9142a2c30",
                            "french_name": "LANCE",
                            "name": "SPEAR",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "gp"
                        },
                        {
                            "id": "724895b7-da54-6a96-dbc5-8eb7bc3e6dbb",
                            "french_name": "MARTEAU LÉGER",
                            "name": "LIGHT HAMMER",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "gp"
                        },
                        {
                            "id": "41b76cf1-fee9-8064-783d-8114864270c9",
                            "french_name": "MASSE D'ARMES",
                            "name": "MACE",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "gp"
                        },
                        {
                            "id": "41db414c-8dd2-946d-8378-1b0d3227ca2a",
                            "french_name": "MASSUE",
                            "name": "GREATCLUB",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "sp"
                        },
                        {
                            "id": "aafe90da-3405-a024-2358-3ca1e6d5b3ef",
                            "french_name": "SERPE",
                            "name": "SICKLE",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "gp"
                        },
                        {
                            "id": "258d1837-fcb4-5d6b-b01b-44057923f69e",
                            "french_name": "ARBALÈTE LÉGÈRE",
                            "name": "LIGHT CROSSBOW",
                            "type": "WEAPON",
                            "cost": 25,
                            "piece": "gp"
                        },
                        {
                            "id": "c10e9991-1a6c-8b85-787a-e6a61d6c52d7",
                            "french_name": "ARC COURT",
                            "name": "SHORTBOW",
                            "type": "WEAPON",
                            "cost": 25,
                            "piece": "gp"
                        },
                        {
                            "id": "ca2e6668-1be6-229c-1226-c9a79a9b927e",
                            "french_name": "FLÉCHETTE",
                            "name": "DART",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "cp"
                        },
                        {
                            "id": "9fa87857-28ca-531a-a7f6-220a3cd680f2",
                            "french_name": "FRONDE",
                            "name": "SLING",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "sp"
                        }
                    ]
                },
                {
                    "id": "aeb29efd-89b3-5c36-dbd9-d088078a1a3f",
                    "name": "STEALTHY",
                    "items": [
                        {
                            "id": "acc6af81-7949-b133-b880-3902941c3ca1",
                            "french_name": "BÂTON",
                            "name": "QUARTERSTAFF",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "sp"
                        },
                        {
                            "id": "c84816ab-4d73-ed24-c604-07d8f5933e19",
                            "french_name": "DAGUE",
                            "name": "DAGGER",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "gp"
                        },
                        {
                            "id": "9ba5db89-cee5-bdb4-4514-2cbef031e5b5",
                            "french_name": "GOURDIN",
                            "name": "CLUB",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "sp"
                        },
                        {
                            "id": "359fa9ce-592d-fd08-d281-6c389e88c8ed",
                            "french_name": "HACHETTE",
                            "name": "HANDAXE",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "gp"
                        },
                        {
                            "id": "aa58c51b-8170-cd37-d394-55b29bccf8d6",
                            "french_name": "JAVELINE",
                            "name": "JAVELIN",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "sp"
                        },
                        {
                            "id": "9718f0f0-b57f-e2f5-edf0-1fc9142a2c30",
                            "french_name": "LANCE",
                            "name": "SPEAR",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "gp"
                        },
                        {
                            "id": "724895b7-da54-6a96-dbc5-8eb7bc3e6dbb",
                            "french_name": "MARTEAU LÉGER",
                            "name": "LIGHT HAMMER",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "gp"
                        },
                        {
                            "id": "41b76cf1-fee9-8064-783d-8114864270c9",
                            "french_name": "MASSE D'ARMES",
                            "name": "MACE",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "gp"
                        },
                        {
                            "id": "41db414c-8dd2-946d-8378-1b0d3227ca2a",
                            "french_name": "MASSUE",
                            "name": "GREATCLUB",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "sp"
                        },
                        {
                            "id": "aafe90da-3405-a024-2358-3ca1e6d5b3ef",
                            "french_name": "SERPE",
                            "name": "SICKLE",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "gp"
                        },
                        {
                            "id": "258d1837-fcb4-5d6b-b01b-44057923f69e",
                            "french_name": "ARBALÈTE LÉGÈRE",
                            "name": "LIGHT CROSSBOW",
                            "type": "WEAPON",
                            "cost": 25,
                            "piece": "gp"
                        },
                        {
                            "id": "c10e9991-1a6c-8b85-787a-e6a61d6c52d7",
                            "french_name": "ARC COURT",
                            "name": "SHORTBOW",
                            "type": "WEAPON",
                            "cost": 25,
                            "piece": "gp"
                        },
                        {
                            "id": "ca2e6668-1be6-229c-1226-c9a79a9b927e",
                            "french_name": "FLÉCHETTE",
                            "name": "DART",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "cp"
                        },
                        {
                            "id": "9fa87857-28ca-531a-a7f6-220a3cd680f2",
                            "french_name": "FRONDE",
                            "name": "SLING",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "sp"
                        },
                        {
                            "id": "0df9e763-ac71-97ef-fa8c-57841e8e6714",
                            "french_name": "ÉPÉE COURTE",
                            "name": "SHORTSWORD",
                            "type": "WEAPON",
                            "cost": 10,
                            "piece": "gp"
                        },
                        {
                            "id": "fd15f401-93e5-fbf1-7509-e36935126890",
                            "french_name": "ÉPÉE LONGUE",
                            "name": "LONGSWORD",
                            "type": "WEAPON",
                            "cost": 15,
                            "piece": "gp"
                        },
                        {
                            "id": "883ac304-c1d2-e51a-71e5-f1fc0c63fa0a",
                            "french_name": "RAPIÈRE",
                            "name": "RAPIER",
                            "type": "WEAPON",
                            "cost": 25,
                            "piece": "gp"
                        },
                        {
                            "id": "8229f97f-d045-aefa-d5ed-f48def1a94b0",
                            "french_name": "ARBALÈTE DE POING",
                            "name": "HAND CROSSBOW",
                            "type": "WEAPON",
                            "cost": 75,
                            "piece": "gp"
                        }
                    ]
                },
                {
                    "id": "7816ee90-0e9e-97e1-1836-218460b79b53",
                    "name": "ALL",
                    "items": [
                        {
                            "id": "acc6af81-7949-b133-b880-3902941c3ca1",
                            "french_name": "BÂTON",
                            "name": "QUARTERSTAFF",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "sp"
                        },
                        {
                            "id": "c84816ab-4d73-ed24-c604-07d8f5933e19",
                            "french_name": "DAGUE",
                            "name": "DAGGER",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "gp"
                        },
                        {
                            "id": "9ba5db89-cee5-bdb4-4514-2cbef031e5b5",
                            "french_name": "GOURDIN",
                            "name": "CLUB",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "sp"
                        },
                        {
                            "id": "359fa9ce-592d-fd08-d281-6c389e88c8ed",
                            "french_name": "HACHETTE",
                            "name": "HANDAXE",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "gp"
                        },
                        {
                            "id": "aa58c51b-8170-cd37-d394-55b29bccf8d6",
                            "french_name": "JAVELINE",
                            "name": "JAVELIN",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "sp"
                        },
                        {
                            "id": "9718f0f0-b57f-e2f5-edf0-1fc9142a2c30",
                            "french_name": "LANCE",
                            "name": "SPEAR",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "gp"
                        },
                        {
                            "id": "724895b7-da54-6a96-dbc5-8eb7bc3e6dbb",
                            "french_name": "MARTEAU LÉGER",
                            "name": "LIGHT HAMMER",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "gp"
                        },
                        {
                            "id": "41b76cf1-fee9-8064-783d-8114864270c9",
                            "french_name": "MASSE D'ARMES",
                            "name": "MACE",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "gp"
                        },
                        {
                            "id": "41db414c-8dd2-946d-8378-1b0d3227ca2a",
                            "french_name": "MASSUE",
                            "name": "GREATCLUB",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "sp"
                        },
                        {
                            "id": "aafe90da-3405-a024-2358-3ca1e6d5b3ef",
                            "french_name": "SERPE",
                            "name": "SICKLE",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "gp"
                        },
                        {
                            "id": "258d1837-fcb4-5d6b-b01b-44057923f69e",
                            "french_name": "ARBALÈTE LÉGÈRE",
                            "name": "LIGHT CROSSBOW",
                            "type": "WEAPON",
                            "cost": 25,
                            "piece": "gp"
                        },
                        {
                            "id": "c10e9991-1a6c-8b85-787a-e6a61d6c52d7",
                            "french_name": "ARC COURT",
                            "name": "SHORTBOW",
                            "type": "WEAPON",
                            "cost": 25,
                            "piece": "gp"
                        },
                        {
                            "id": "ca2e6668-1be6-229c-1226-c9a79a9b927e",
                            "french_name": "FLÉCHETTE",
                            "name": "DART",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "cp"
                        },
                        {
                            "id": "9fa87857-28ca-531a-a7f6-220a3cd680f2",
                            "french_name": "FRONDE",
                            "name": "SLING",
                            "type": "WEAPON",
                            "cost": 1,
                            "piece": "sp"
                        },
                        {
                            "id": "645b27d2-8e8f-8e70-d8bf-fd982abaade1",
                            "french_name": "CIMETERRE",
                            "name": "SCIMITAR",
                            "type": "WEAPON",
                            "cost": 25,
                            "piece": "gp"
                        },
                        {
                            "id": "f24ecb1d-c1dd-23df-deeb-6c3ccb594ebb",
                            "french_name": "COUTILLE",
                            "name": "GLAIVE",
                            "type": "WEAPON",
                            "cost": 20,
                            "piece": "gp"
                        },
                        {
                            "id": "d782c827-d39d-4975-4c0c-e5e0618a0ee4",
                            "french_name": "ÉPÉE À DEUX MAINS",
                            "name": "GREATSWORD",
                            "type": "WEAPON",
                            "cost": 50,
                            "piece": "gp"
                        },
                        {
                            "id": "0df9e763-ac71-97ef-fa8c-57841e8e6714",
                            "french_name": "ÉPÉE COURTE",
                            "name": "SHORTSWORD",
                            "type": "WEAPON",
                            "cost": 10,
                            "piece": "gp"
                        },
                        {
                            "id": "fd15f401-93e5-fbf1-7509-e36935126890",
                            "french_name": "ÉPÉE LONGUE",
                            "name": "LONGSWORD",
                            "type": "WEAPON",
                            "cost": 15,
                            "piece": "gp"
                        },
                        {
                            "id": "9f14f2b7-2c9e-2008-e4db-c7c7c3f00931",
                            "french_name": "FLÉAU D'ARMES",
                            "name": "FLAIL",
                            "type": "WEAPON",
                            "cost": 10,
                            "piece": "gp"
                        },
                        {
                            "id": "2ab07c48-2238-1dda-39ce-0e40902c294f",
                            "french_name": "FOUET",
                            "name": "WHIP",
                            "type": "WEAPON",
                            "cost": 2,
                            "piece": "gp"
                        },
                        {
                            "id": "b2ba0c04-f2c2-697b-32ff-a806f9130519",
                            "french_name": "HACHE À DEUX MAINS",
                            "name": "GREATAXE",
                            "type": "WEAPON",
                            "cost": 30,
                            "piece": "gp"
                        },
                        {
                            "id": "ec5545e6-1b1b-04da-edb1-c7fe9032c6f0",
                            "french_name": "HACHE D'ARMES",
                            "name": "BATTLEAXE",
                            "type": "WEAPON",
                            "cost": 10,
                            "piece": "gp"
                        },
                        {
                            "id": "e463873f-3d0a-026e-c19f-88f239f0c0b4",
                            "french_name": "HALLEBARDE",
                            "name": "HALBERD",
                            "type": "WEAPON",
                            "cost": 20,
                            "piece": "gp"
                        },
                        {
                            "id": "56124be6-c604-aa65-44a0-eae0d83eae40",
                            "french_name": "LANCE D’ARÇON",
                            "name": "LANCE",
                            "type": "WEAPON",
                            "cost": 10,
                            "piece": "gp"
                        },
                        {
                            "id": "93883366-0892-7463-07de-ab5dd15b8b65",
                            "french_name": "MAILLET",
                            "name": "MAUL",
                            "type": "WEAPON",
                            "cost": 10,
                            "piece": "gp"
                        },
                        {
                            "id": "56a2b12f-6643-c5fc-e19f-7a71f3cd3c2c",
                            "french_name": "MARTEAU DE GUERRE",
                            "name": "WARHAMMER",
                            "type": "WEAPON",
                            "cost": 15,
                            "piece": "gp"
                        },
                        {
                            "id": "36d8b684-074f-9b87-adeb-23838ec7c638",
                            "french_name": "MORGENSTERN",
                            "name": "MORNINGSTAR",
                            "type": "WEAPON",
                            "cost": 15,
                            "piece": "gp"
                        },
                        {
                            "id": "12e4e102-0dfb-1234-5851-d0d2c5da667a",
                            "french_name": "PIC DE GUERRE",
                            "name": "WAR PICK",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "gp"
                        },
                        {
                            "id": "2d13f774-405d-2730-a043-044971fca6a4",
                            "french_name": "PIQUE",
                            "name": "PIKE",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "gp"
                        },
                        {
                            "id": "883ac304-c1d2-e51a-71e5-f1fc0c63fa0a",
                            "french_name": "RAPIÈRE",
                            "name": "RAPIER",
                            "type": "WEAPON",
                            "cost": 25,
                            "piece": "gp"
                        },
                        {
                            "id": "cda894e7-c871-ee8a-5d08-dc0381ff99d3",
                            "french_name": "TRIDENT",
                            "name": "TRIDENT",
                            "type": "WEAPON",
                            "cost": 5,
                            "piece": "gp"
                        },
                        {
                            "id": "8229f97f-d045-aefa-d5ed-f48def1a94b0",
                            "french_name": "ARBALÈTE DE POING",
                            "name": "HAND CROSSBOW",
                            "type": "WEAPON",
                            "cost": 75,
                            "piece": "gp"
                        },
                        {
                            "id": "f599716f-e071-1a69-951f-3e669aa58e82",
                            "french_name": "ARBALÈTE LOURDE",
                            "name": "HEAVY CROSSBOW",
                            "type": "WEAPON",
                            "cost": 50,
                            "piece": "gp"
                        },
                        {
                            "id": "55d2342d-2bb4-74be-dfd5-4e03a6a8c096",
                            "french_name": "ARC LONG",
                            "name": "LONGBOW",
                            "type": "WEAPON",
                            "cost": 50,
                            "piece": "gp"
                        }
                    ]
                }
            ],
            "armors": [
                {
                    "id": "57af8a24-1ed3-4b2d-a956-7d0e0ba887fc",
                    "french_name": "LEGERE",
                    "name": "LIGHT",
                    "type": "ARMOR",
                    "cost": 10,
                    "piece": "gp"
                },
                {
                    "id": "ca1093d1-a1d9-4b0a-a556-76d6e92cabfe",
                    "french_name": "MOYENNE",
                    "name": "MEDIUM",
                    "type": "ARMOR",
                    "cost": 50,
                    "piece": "gp"
                },
                {
                    "id": "4057558b-dcb8-49cd-a5bd-f4ed6d93316b",
                    "french_name": "LOURDE",
                    "name": "HEAVY",
                    "type": "ARMOR",
                    "cost": 100,
                    "piece": "gp"
                },
                {
                    "id": "84604dd6-5388-4103-9615-b2bf5f9d2a60",
                    "french_name": "BOUCLIER",
                    "name": "SHIELD",
                    "type": "ARMOR",
                    "cost": 10,
                    "piece": "gp"
                }
            ]
        }
    }
}

export const GetCharacterResponse =
{
    "id": "c565b74d-eace-4d66-b995-13d748845427",
    "user_id": "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
    "firstname": "firstname",
    "lastname": "lastname",
    "sex": "FEMALE",
    "eye_color": "BLUE",
    "hair_color": "BLACK",
    "skin_color": "BROWN",
    "age": 25,
    "weight": 80,
    "height": 170,
    "hp": 20,
    "race_id": "4d6889bb-bfd7-4934-9625-7c250c7fcafc",
    "class_id": "fcfd78b9-161c-4ac4-9035-7a8189242d24",
    "level_id": 1,
    "experience_points": 0,
    "next_level_experience_points": 300,
    "created_at": "2022-12-16T12:43:46.290Z",
    "updated_at": "2022-12-16T12:43:46.290Z",
    "race": {
        "id": "4d6889bb-bfd7-4934-9625-7c250c7fcafc",
        "name": "HUMAN",
        "french_name": "HUMAIN",
        "size": "MEDIUM",
        "speed": 9,
        "adult_age": 20,
        "max_age": 99,
        "calculation_height": "71d210e6-6be4-4009-b3e0-df91705395c9",
        "calculation_weight": "0d6279bf-ee4c-4f7f-8112-4b54532fcfaf",
        "nb_free_standard_language": 1
    },
    "class": {
        "id": "fcfd78b9-161c-4ac4-9035-7a8189242d24",
        "name": "BARBARIAN",
        "french_name": "BARBARE",
        "hit_dice": 12,
        "light_armor": true,
        "medium_armor": true,
        "heavy_armor": false,
        "shield": true,
        "profile_id": "7816ee90-0e9e-97e1-1836-218460b79b53",
        "money_dice": "361bf64f-e887-e99f-705d-75be9bc2e6a6",
        "skill_nb": 2,
        "profile": {
            "id": "7816ee90-0e9e-97e1-1836-218460b79b53",
            "name": "ALL"
        },
        "characteristics": [
            {
                "id": "28b7a4ec-71c4-4ac7-a462-27030fca2ecb",
                "name": "CONSTITUTION"
            },
            {
                "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                "name": "STRENGTH"
            }
        ]
    },
    "level": {
        "id": 1,
        "experience_points": 0,
        "proficiency_bonus": 2
    },
    "skills": [
        {
            "id": "2815d102-15a6-a91c-692f-73c1cf77e191",
            "name": "Perception",
            "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
            "characteristic": {
                "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                "name": "WISDOM"
            }
        },
        {
            "id": "ff9e11ff-cc57-9e6b-1937-04cae9a988d4",
            "name": "Athletics",
            "characteristic_id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
            "characteristic": {
                "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                "name": "STRENGTH"
            }
        }
    ],
    "languages": [
        {
            "id": "cbd6d175-1e1e-45bc-af19-af9fcb069188",
            "type": "STANDARD",
            "name": "COMMON"
        },
        {
            "id": "a75bd88f-e499-46ab-bb56-6349294169c0",
            "type": "STANDARD",
            "name": "ELVISH"
        }
    ],
    "character_characteristic": [
        {
            "id": "f72830cd-7175-e667-faee-f3311c9928a5",
            "character_id": "c565b74d-eace-4d66-b995-13d748845427",
            "characteristic_id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
            "value": 15,
            "characteristic": {
                "id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
                "name": "STRENGTH"
            }
        },
        {
            "id": "78d9d3e3-5d31-8191-7ff6-1b898a9b83cb",
            "character_id": "c565b74d-eace-4d66-b995-13d748845427",
            "characteristic_id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
            "value": 14,
            "characteristic": {
                "id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
                "name": "DEXTERITY"
            }
        },
        {
            "id": "68b06681-9eb7-cc93-cc98-2d5b64c1ab4d",
            "character_id": "c565b74d-eace-4d66-b995-13d748845427",
            "characteristic_id": "28b7a4ec-71c4-4ac7-a462-27030fca2ecb",
            "value": 13,
            "characteristic": {
                "id": "28b7a4ec-71c4-4ac7-a462-27030fca2ecb",
                "name": "CONSTITUTION"
            }
        },
        {
            "id": "36eb0b5f-8206-64a4-906b-8131f6cd241f",
            "character_id": "c565b74d-eace-4d66-b995-13d748845427",
            "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
            "value": 12,
            "characteristic": {
                "id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
                "name": "INTELLIGENCE"
            }
        },
        {
            "id": "d5a254ca-786f-b3ea-c16d-d27c50e6ff66",
            "character_id": "c565b74d-eace-4d66-b995-13d748845427",
            "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
            "value": 8,
            "characteristic": {
                "id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
                "name": "WISDOM"
            }
        },
        {
            "id": "933b062d-74b3-a889-f744-b8efa2b91b31",
            "character_id": "c565b74d-eace-4d66-b995-13d748845427",
            "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
            "value": 10,
            "characteristic": {
                "id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
                "name": "CHARISMA"
            }
        }
    ],
    "equipment": [
        {
            "id": "aebc22eb-6dfb-0105-7290-5f8f6a519150",
            "item_id": "9ba5db89-cee5-bdb4-4514-2cbef031e5b5",
            "character_id": "c565b74d-eace-4d66-b995-13d748845427",
            "equiped": true,
            "created_at": "2022-12-16T12:43:46.307Z",
            "updated_at": "2022-12-16T12:43:46.307Z",
            "item": {
                "id": "9ba5db89-cee5-bdb4-4514-2cbef031e5b5",
                "french_name": "GOURDIN",
                "name": "CLUB",
                "type": "WEAPON",
                "cost": 1,
                "piece": "sp"
            }
        },
        {
            "id": "45ef99f0-67db-6caa-36c8-4b1424bdc9a0",
            "item_id": "84604dd6-5388-4103-9615-b2bf5f9d2a60",
            "character_id": "c565b74d-eace-4d66-b995-13d748845427",
            "equiped": true,
            "created_at": "2022-12-16T12:43:46.307Z",
            "updated_at": "2022-12-16T12:43:46.307Z",
            "item": {
                "id": "84604dd6-5388-4103-9615-b2bf5f9d2a60",
                "french_name": "BOUCLIER",
                "name": "SHIELD",
                "type": "ARMOR",
                "cost": 10,
                "piece": "gp"
            }
        },
        {
            "id": "0c5deff8-4f1e-4861-a9f0-29372f6a8581",
            "item_id": "ca1093d1-a1d9-4b0a-a556-76d6e92cabfe",
            "character_id": "c565b74d-eace-4d66-b995-13d748845427",
            "equiped": true,
            "created_at": "2022-12-16T12:43:46.307Z",
            "updated_at": "2022-12-16T12:43:46.307Z",
            "item": {
                "id": "ca1093d1-a1d9-4b0a-a556-76d6e92cabfe",
                "french_name": "MOYENNE",
                "name": "MEDIUM",
                "type": "ARMOR",
                "cost": 50,
                "piece": "gp"
            }
        }
    ],
    "money": {
        "id": "25f3a3ad-8437-717b-f6ff-4452fbb7c31a",
        "gold": 50,
        "silver": 0,
        "copper": 0,
        "character_id": "c565b74d-eace-4d66-b995-13d748845427"
    }
}


export const createCharacterRequest = {
    "character": {
        "firstname": "firstname",
        "lastname": "lastname",
        "sex": "FEMALE",
        "eye_color": "BLUE",
        "hair_color": "BLACK",
        "skin_color": "BROWN",
        "clothing_color_1": "RED",
        "clothing_color_2": "BLACK",
        "bio": "Here describe your biography",
        "alignment": "LAWFUL GOOD",
        "ideals": "Here describe your ideals",
        "flaws": "Here describe your flaws",
        "age": 25,
        "weight": 80,
        "height": 170,
        "hp": 20,
        "race_id": "4d6889bb-bfd7-4934-9625-7c250c7fcafc",
        "class_id": "fcfd78b9-161c-4ac4-9035-7a8189242d24",
        "level_id": 1
    },
    "skills": ["2815d102-15a6-a91c-692f-73c1cf77e191", "ff9e11ff-cc57-9e6b-1937-04cae9a988d4"],
    "languages": ["cbd6d175-1e1e-45bc-af19-af9fcb069188", "a75bd88f-e499-46ab-bb56-6349294169c0"],
    "character_characteristic": [
        {
            "characteristic_id": "50b45739-7fa1-42be-b724-0ba393d27ecb",
            "value": 15
        },
        {
            "characteristic_id": "a1f55d3a-31cc-4363-aa77-e4570baef0db",
            "value": 14
        },
        {
            "characteristic_id": "28b7a4ec-71c4-4ac7-a462-27030fca2ecb",
            "value": 13
        },
        {
            "characteristic_id": "72f58fac-5d27-4a99-85d0-3615ce3f8cb1",
            "value": 12
        },
        {
            "characteristic_id": "1114e70f-da29-4f03-86bb-0a4cfbe168e8",
            "value": 8
        },
        {
            "characteristic_id": "cc26aaee-d4ed-4a21-b053-857b60f5be99",
            "value": 10
        }
    ],
    "equipment": [
        {
            "item_id": "9ba5db89-cee5-bdb4-4514-2cbef031e5b5",
            "equiped": true
        },
        {
            "item_id": "84604dd6-5388-4103-9615-b2bf5f9d2a60",
            "equiped": true
        },
        {
            "item_id": "ca1093d1-a1d9-4b0a-a556-76d6e92cabfe",
            "equiped": true
        }
    ],
    "money": {
        "gold": 50,
        "silver": 0,
        "copper": 0
    }
}
