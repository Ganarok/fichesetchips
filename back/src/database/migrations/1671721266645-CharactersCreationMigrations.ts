import { MigrationInterface, QueryRunner } from "typeorm";

export class CharactersCreationMigrations1671721266645 implements MigrationInterface {
    name = 'CharactersCreationMigrations1671721266645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "cem"."skill" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "characteristic_id" uuid NOT NULL,
                CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."characteristic_name_enum" AS ENUM(
                'STRENGTH',
                'DEXTERITY',
                'CONSTITUTION',
                'INTELLIGENCE',
                'WISDOM',
                'CHARISMA'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."characteristic" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" "cem"."characteristic_name_enum" NOT NULL,
                CONSTRAINT "UQ_34f8a8cba6c9eaf5a5062adc67c" UNIQUE ("name"),
                CONSTRAINT "PK_88f998ec743440a5c758e08ece4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."character_characteristic" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "character_id" uuid NOT NULL,
                "characteristic_id" uuid NOT NULL,
                "value" integer NOT NULL,
                CONSTRAINT "PK_0905f8fa167b1486ea94f4cd25f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."language_type_enum" AS ENUM('STANDARD', 'EXOTIC')
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."language_name_enum" AS ENUM(
                'COMMON',
                'DWARVISH',
                'ELVISH',
                'GIANT',
                'GNOMISH',
                'GOBLIN',
                'HALFLING',
                'ORC',
                'ABYSSAL',
                'CELESTIAL',
                'DRACONIC',
                'DEEP SPEECH',
                'INFERNAL',
                'PRIMORDIAL',
                'SYLVAN',
                'UNDERCOMMON'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."language" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "type" "cem"."language_type_enum" NOT NULL,
                "name" "cem"."language_name_enum" NOT NULL,
                CONSTRAINT "UQ_7df7d1e250ea2a416f078a631fb" UNIQUE ("name"),
                CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."race_characteristic" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "race_id" uuid NOT NULL,
                "characteristic_id" uuid NOT NULL,
                "racial_bonus" integer NOT NULL,
                CONSTRAINT "PK_2cecd196667860001136ab66dba" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."race_name_enum" AS ENUM(
                'DWARF',
                'ELF',
                'HALFLING',
                'HUMAN',
                'GNOME',
                'HALF-ELF',
                'HALF-ORC',
                'TIEFLING'
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."race_french_name_enum" AS ENUM(
                'ELFE',
                'HALFELIN',
                'HUMAIN',
                'NAIN',
                'DEMI-ELFE',
                'DEMI-ORC',
                'GNOME',
                'TIEFFELIN'
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."race_size_enum" AS ENUM(
                'TINY',
                'SMALL',
                'MEDIUM',
                'LARGE',
                'HUGE',
                'GARGANTUAN'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."race" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" "cem"."race_name_enum" NOT NULL,
                "french_name" "cem"."race_french_name_enum" NOT NULL,
                "size" "cem"."race_size_enum" NOT NULL,
                "speed" integer NOT NULL,
                "adult_age" integer NOT NULL,
                "max_age" integer NOT NULL,
                "calculation_height" uuid NOT NULL,
                "calculation_weight" uuid NOT NULL,
                "nb_free_standard_language" integer NOT NULL,
                CONSTRAINT "UQ_0da77d4ac727f9c13e67166fa88" UNIQUE ("name"),
                CONSTRAINT "UQ_8f302ac39c5c371815ad86b6ef8" UNIQUE ("french_name"),
                CONSTRAINT "PK_a3068b184130d87a20e516045bb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."calculation_for_enum" AS ENUM('HEIGHT', 'WEIGHT', 'COINS')
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."calculation" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "base" double precision NOT NULL,
                "operator_1" character varying NOT NULL,
                "dice_repetition" integer NOT NULL,
                "dice_faces" integer NOT NULL,
                "operator_2" character varying NOT NULL,
                "modificator" double precision NOT NULL,
                "for" "cem"."calculation_for_enum" NOT NULL,
                CONSTRAINT "PK_67320bae23a5bfa027f881c271b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."item_stat_damage_type_enum" AS ENUM('BLUDGEONING', 'PIERCING', 'SLASHING', 'null')
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."item_stat" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "item_id" uuid NOT NULL,
                "armor_class_base" integer,
                "armor_class_mod" character varying,
                "min_strength" integer,
                "dexterity_disadvantage" boolean,
                "damage_dice" integer,
                "damage_type" "cem"."item_stat_damage_type_enum",
                "melee" boolean,
                "ranged" boolean,
                "one_handed" boolean,
                "two_handed" boolean,
                "light" boolean,
                "heavy" boolean,
                "thrownd" boolean,
                "ammunition" boolean,
                CONSTRAINT "REL_7499672b4ba178ebd3f4c8a337" UNIQUE ("item_id"),
                CONSTRAINT "PK_d6993147a5b1ef3f82bd1488e00" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."item_type_enum" AS ENUM(
                'ARMOR',
                'WEAPON',
                'TOOL',
                'OBJECT',
                'AMMUNITION',
                'ADVENTURING GEAR'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."item" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "french_name" character varying NOT NULL,
                "name" character varying NOT NULL,
                "type" "cem"."item_type_enum" NOT NULL,
                "cost" integer NOT NULL,
                "piece" character varying NOT NULL,
                CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."profile_name_enum" AS ENUM('ALL', 'STEALTHY', 'MELEE', 'VERSATILE', 'MAGIC')
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."profile" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" "cem"."profile_name_enum" NOT NULL,
                CONSTRAINT "UQ_0046bf0859cceb5f1744df2a360" UNIQUE ("name"),
                CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."class_name_enum" AS ENUM(
                'BARBARIAN',
                'BARD',
                'CLERIC',
                'DRUID',
                'FIGHTER',
                'MONK',
                'PALADIN',
                'RANGER',
                'ROGUE',
                'SORCERER',
                'WARLOCK',
                'WIZARD'
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."class_french_name_enum" AS ENUM(
                'BARBARE',
                'BARDE',
                'CLERC',
                'DRUIDE',
                'GUERRIER',
                'MOINE',
                'PALADIN',
                'RÔDEUR',
                'ROUBLARD',
                'ENSORCELEUR',
                'OCCULTISTE',
                'MAGICIEN'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."class" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" "cem"."class_name_enum" NOT NULL,
                "french_name" "cem"."class_french_name_enum" NOT NULL,
                "hit_dice" integer NOT NULL,
                "light_armor" boolean NOT NULL,
                "medium_armor" boolean NOT NULL,
                "heavy_armor" boolean NOT NULL,
                "shield" boolean NOT NULL,
                "profile_id" uuid NOT NULL,
                "money_dice" uuid NOT NULL,
                "skill_nb" integer NOT NULL,
                CONSTRAINT "UQ_574dd394846fb85d495d0f77dfd" UNIQUE ("name"),
                CONSTRAINT "UQ_05b45b296ac7d340df3123a9ebb" UNIQUE ("french_name"),
                CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."equipment" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "item_id" uuid NOT NULL,
                "character_id" uuid NOT NULL,
                "equiped" boolean NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_0722e1b9d6eb19f5874c1678740" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."level" (
                "id" SERIAL NOT NULL,
                "experience_points" integer NOT NULL,
                "proficiency_bonus" integer NOT NULL,
                CONSTRAINT "PK_d3f1a7a6f09f1c3144bacdc6bcc" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."money" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "gold" integer NOT NULL,
                "silver" integer NOT NULL,
                "copper" integer NOT NULL,
                "character_id" uuid NOT NULL,
                CONSTRAINT "REL_3af0a11b1b48a22c948017de7d" UNIQUE ("character_id"),
                CONSTRAINT "PK_532685f389ab66b70115668bf09" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."character_sex_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."character_alignment_enum" AS ENUM(
                'LAWFUL GOOD',
                'LAWFUL NEUTRAL',
                'LAWFUL EVIL',
                'NEUTRAL GOOD',
                'NEUTRAL',
                'NEUTRAL EVIL',
                'CHAOTIC GOOD',
                'CHAOTIC NEUTRAL',
                'CHAOTIC EVIL'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."character" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "firstname" character varying NOT NULL,
                "lastname" character varying NOT NULL,
                "sex" "cem"."character_sex_enum" NOT NULL,
                "eye_color" character varying NOT NULL,
                "hair_color" character varying NOT NULL,
                "skin_color" character varying NOT NULL,
                "clothing_color_1" character varying NOT NULL,
                "clothing_color_2" character varying NOT NULL,
                "bio" text NOT NULL,
                "alignment" "cem"."character_alignment_enum" NOT NULL,
                "ideals" text NOT NULL,
                "flaws" text NOT NULL,
                "age" integer NOT NULL,
                "weight" integer NOT NULL,
                "height" integer NOT NULL,
                "hp" integer NOT NULL,
                "race_id" uuid NOT NULL,
                "class_id" uuid NOT NULL,
                "level_id" integer NOT NULL,
                "experience_points" integer NOT NULL,
                "next_level_experience_points" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_6c4aec48c564968be15078b8ae5" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."characteristic_modificator" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "characteristic_value" integer NOT NULL,
                "modificator_value" integer NOT NULL,
                CONSTRAINT "PK_3745277a9e384ccf3e6e3a5931b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."race_language" (
                "race_id" uuid NOT NULL,
                "language_id" uuid NOT NULL,
                CONSTRAINT "PK_26d73e9e250d45b93aadc963199" PRIMARY KEY ("race_id", "language_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9353fb5c056c3fe4b5cbfdc181" ON "cem"."race_language" ("race_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_995ff5d0c676e9e18ed8266a9e" ON "cem"."race_language" ("language_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."profile_weapon" (
                "profile_id" uuid NOT NULL,
                "item_id" uuid NOT NULL,
                CONSTRAINT "PK_e5553290b0f1d8f20a0e43b7915" PRIMARY KEY ("profile_id", "item_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_bff7fbc027225208a48c412844" ON "cem"."profile_weapon" ("profile_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1f7b90d8fa1ca6830f782fbe9b" ON "cem"."profile_weapon" ("item_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."class_skill" (
                "class_id" uuid NOT NULL,
                "skill_id" uuid NOT NULL,
                CONSTRAINT "PK_b9352875e4933f18dd23729af10" PRIMARY KEY ("class_id", "skill_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3ddf9fd0f0b69191e3b0bc6647" ON "cem"."class_skill" ("class_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9f0c4b7e8432d28d1ecb3b68ea" ON "cem"."class_skill" ("skill_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."saving_thrown" (
                "class_id" uuid NOT NULL,
                "characteristic_id" uuid NOT NULL,
                CONSTRAINT "PK_9b410e12baae4338b40787bf86c" PRIMARY KEY ("class_id", "characteristic_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d173bb988d41d1d93d40781a67" ON "cem"."saving_thrown" ("class_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f7987bf31bdbc6e90e4371f313" ON "cem"."saving_thrown" ("characteristic_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."character_language" (
                "character_id" uuid NOT NULL,
                "language_id" uuid NOT NULL,
                CONSTRAINT "PK_1137b9b1bbe30f3d1b34f53f5b0" PRIMARY KEY ("character_id", "language_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_bf0fab994d0986fc7805efbfd9" ON "cem"."character_language" ("character_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_4a7de3d395d065097c1a3be60e" ON "cem"."character_language" ("language_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "cem"."character_skill" (
                "character_id" uuid NOT NULL,
                "skill_id" uuid NOT NULL,
                CONSTRAINT "PK_c9fc577d02c0aaecb4fdfd099ed" PRIMARY KEY ("character_id", "skill_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b5c53f2b1f18d9dcad12b1c5bc" ON "cem"."character_skill" ("character_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8064ba9f219d4c247d7e87943e" ON "cem"."character_skill" ("skill_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."skill"
            ADD CONSTRAINT "FK_fd772c9fc42a548fec7976b6a5c" FOREIGN KEY ("characteristic_id") REFERENCES "cem"."characteristic"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character_characteristic"
            ADD CONSTRAINT "FK_0fe7a41e23d6d13022512498806" FOREIGN KEY ("character_id") REFERENCES "cem"."character"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character_characteristic"
            ADD CONSTRAINT "FK_02e3c78f2d40666394e40eb102a" FOREIGN KEY ("characteristic_id") REFERENCES "cem"."characteristic"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."race_characteristic"
            ADD CONSTRAINT "FK_7d6f406459a3f8ef56ddb51e96c" FOREIGN KEY ("race_id") REFERENCES "cem"."race"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."race_characteristic"
            ADD CONSTRAINT "FK_df60a5732918e34ac986c4caaa2" FOREIGN KEY ("characteristic_id") REFERENCES "cem"."characteristic"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."race"
            ADD CONSTRAINT "FK_e090dd489c560c83c400f713242" FOREIGN KEY ("calculation_height") REFERENCES "cem"."calculation"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."race"
            ADD CONSTRAINT "FK_87eaa26b15ea6a398f94ca420ee" FOREIGN KEY ("calculation_weight") REFERENCES "cem"."calculation"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."item_stat"
            ADD CONSTRAINT "FK_7499672b4ba178ebd3f4c8a3374" FOREIGN KEY ("item_id") REFERENCES "cem"."item"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."class"
            ADD CONSTRAINT "FK_65dda79739b2e22c7f9214eeba6" FOREIGN KEY ("profile_id") REFERENCES "cem"."profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."class"
            ADD CONSTRAINT "FK_0aba2ebca60327d1d705fadcdac" FOREIGN KEY ("money_dice") REFERENCES "cem"."calculation"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."equipment"
            ADD CONSTRAINT "FK_4e1de96b0bb547604b07ee5286c" FOREIGN KEY ("item_id") REFERENCES "cem"."item"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."equipment"
            ADD CONSTRAINT "FK_de5a103086914ba7d02fed47140" FOREIGN KEY ("character_id") REFERENCES "cem"."character"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."money"
            ADD CONSTRAINT "FK_3af0a11b1b48a22c948017de7dd" FOREIGN KEY ("character_id") REFERENCES "cem"."character"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character"
            ADD CONSTRAINT "FK_f39b5b02ef34a68438549cec9de" FOREIGN KEY ("race_id") REFERENCES "cem"."race"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character"
            ADD CONSTRAINT "FK_c7fb9523e8dab37d3bad51eefe2" FOREIGN KEY ("level_id") REFERENCES "cem"."level"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character"
            ADD CONSTRAINT "FK_276ec655759722c21e834368f6c" FOREIGN KEY ("class_id") REFERENCES "cem"."class"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."race_language"
            ADD CONSTRAINT "FK_9353fb5c056c3fe4b5cbfdc181c" FOREIGN KEY ("race_id") REFERENCES "cem"."race"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."race_language"
            ADD CONSTRAINT "FK_995ff5d0c676e9e18ed8266a9ea" FOREIGN KEY ("language_id") REFERENCES "cem"."language"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."profile_weapon"
            ADD CONSTRAINT "FK_bff7fbc027225208a48c4128449" FOREIGN KEY ("profile_id") REFERENCES "cem"."profile"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."profile_weapon"
            ADD CONSTRAINT "FK_1f7b90d8fa1ca6830f782fbe9bd" FOREIGN KEY ("item_id") REFERENCES "cem"."item"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."class_skill"
            ADD CONSTRAINT "FK_3ddf9fd0f0b69191e3b0bc66473" FOREIGN KEY ("class_id") REFERENCES "cem"."class"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."class_skill"
            ADD CONSTRAINT "FK_9f0c4b7e8432d28d1ecb3b68ea4" FOREIGN KEY ("skill_id") REFERENCES "cem"."skill"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."saving_thrown"
            ADD CONSTRAINT "FK_d173bb988d41d1d93d40781a675" FOREIGN KEY ("class_id") REFERENCES "cem"."class"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."saving_thrown"
            ADD CONSTRAINT "FK_f7987bf31bdbc6e90e4371f3134" FOREIGN KEY ("characteristic_id") REFERENCES "cem"."characteristic"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character_language"
            ADD CONSTRAINT "FK_bf0fab994d0986fc7805efbfd9b" FOREIGN KEY ("character_id") REFERENCES "cem"."character"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character_language"
            ADD CONSTRAINT "FK_4a7de3d395d065097c1a3be60ef" FOREIGN KEY ("language_id") REFERENCES "cem"."language"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character_skill"
            ADD CONSTRAINT "FK_b5c53f2b1f18d9dcad12b1c5bcb" FOREIGN KEY ("character_id") REFERENCES "cem"."character"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character_skill"
            ADD CONSTRAINT "FK_8064ba9f219d4c247d7e87943ef" FOREIGN KEY ("skill_id") REFERENCES "cem"."skill"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cem"."character_skill" DROP CONSTRAINT "FK_8064ba9f219d4c247d7e87943ef"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character_skill" DROP CONSTRAINT "FK_b5c53f2b1f18d9dcad12b1c5bcb"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character_language" DROP CONSTRAINT "FK_4a7de3d395d065097c1a3be60ef"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character_language" DROP CONSTRAINT "FK_bf0fab994d0986fc7805efbfd9b"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."saving_thrown" DROP CONSTRAINT "FK_f7987bf31bdbc6e90e4371f3134"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."saving_thrown" DROP CONSTRAINT "FK_d173bb988d41d1d93d40781a675"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."class_skill" DROP CONSTRAINT "FK_9f0c4b7e8432d28d1ecb3b68ea4"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."class_skill" DROP CONSTRAINT "FK_3ddf9fd0f0b69191e3b0bc66473"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."profile_weapon" DROP CONSTRAINT "FK_1f7b90d8fa1ca6830f782fbe9bd"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."profile_weapon" DROP CONSTRAINT "FK_bff7fbc027225208a48c4128449"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."race_language" DROP CONSTRAINT "FK_995ff5d0c676e9e18ed8266a9ea"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."race_language" DROP CONSTRAINT "FK_9353fb5c056c3fe4b5cbfdc181c"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character" DROP CONSTRAINT "FK_276ec655759722c21e834368f6c"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character" DROP CONSTRAINT "FK_c7fb9523e8dab37d3bad51eefe2"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character" DROP CONSTRAINT "FK_f39b5b02ef34a68438549cec9de"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."money" DROP CONSTRAINT "FK_3af0a11b1b48a22c948017de7dd"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."equipment" DROP CONSTRAINT "FK_de5a103086914ba7d02fed47140"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."equipment" DROP CONSTRAINT "FK_4e1de96b0bb547604b07ee5286c"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."class" DROP CONSTRAINT "FK_0aba2ebca60327d1d705fadcdac"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."class" DROP CONSTRAINT "FK_65dda79739b2e22c7f9214eeba6"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."item_stat" DROP CONSTRAINT "FK_7499672b4ba178ebd3f4c8a3374"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."race" DROP CONSTRAINT "FK_87eaa26b15ea6a398f94ca420ee"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."race" DROP CONSTRAINT "FK_e090dd489c560c83c400f713242"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."race_characteristic" DROP CONSTRAINT "FK_df60a5732918e34ac986c4caaa2"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."race_characteristic" DROP CONSTRAINT "FK_7d6f406459a3f8ef56ddb51e96c"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character_characteristic" DROP CONSTRAINT "FK_02e3c78f2d40666394e40eb102a"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character_characteristic" DROP CONSTRAINT "FK_0fe7a41e23d6d13022512498806"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."skill" DROP CONSTRAINT "FK_fd772c9fc42a548fec7976b6a5c"
        `);
        await queryRunner.query(`
            DROP INDEX "cem"."IDX_8064ba9f219d4c247d7e87943e"
        `);
        await queryRunner.query(`
            DROP INDEX "cem"."IDX_b5c53f2b1f18d9dcad12b1c5bc"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."character_skill"
        `);
        await queryRunner.query(`
            DROP INDEX "cem"."IDX_4a7de3d395d065097c1a3be60e"
        `);
        await queryRunner.query(`
            DROP INDEX "cem"."IDX_bf0fab994d0986fc7805efbfd9"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."character_language"
        `);
        await queryRunner.query(`
            DROP INDEX "cem"."IDX_f7987bf31bdbc6e90e4371f313"
        `);
        await queryRunner.query(`
            DROP INDEX "cem"."IDX_d173bb988d41d1d93d40781a67"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."saving_thrown"
        `);
        await queryRunner.query(`
            DROP INDEX "cem"."IDX_9f0c4b7e8432d28d1ecb3b68ea"
        `);
        await queryRunner.query(`
            DROP INDEX "cem"."IDX_3ddf9fd0f0b69191e3b0bc6647"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."class_skill"
        `);
        await queryRunner.query(`
            DROP INDEX "cem"."IDX_1f7b90d8fa1ca6830f782fbe9b"
        `);
        await queryRunner.query(`
            DROP INDEX "cem"."IDX_bff7fbc027225208a48c412844"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."profile_weapon"
        `);
        await queryRunner.query(`
            DROP INDEX "cem"."IDX_995ff5d0c676e9e18ed8266a9e"
        `);
        await queryRunner.query(`
            DROP INDEX "cem"."IDX_9353fb5c056c3fe4b5cbfdc181"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."race_language"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."characteristic_modificator"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."character"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."character_alignment_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."character_sex_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."money"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."level"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."equipment"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."class"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."class_french_name_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."class_name_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."profile"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."profile_name_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."item"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."item_type_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."item_stat"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."item_stat_damage_type_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."calculation"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."calculation_for_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."race"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."race_size_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."race_french_name_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."race_name_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."race_characteristic"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."language"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."language_name_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."language_type_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."character_characteristic"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."characteristic"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."characteristic_name_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "cem"."skill"
        `);
    }

}
