import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1678958931722 implements MigrationInterface {
    name = 'Migrations1678958931722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "skill" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "characteristic_id" uuid NOT NULL,
                CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."characteristic_name_enum" AS ENUM(
                'STRENGTH',
                'DEXTERITY',
                'CONSTITUTION',
                'INTELLIGENCE',
                'WISDOM',
                'CHARISMA'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "characteristic" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" "public"."characteristic_name_enum" NOT NULL,
                CONSTRAINT "UQ_34f8a8cba6c9eaf5a5062adc67c" UNIQUE ("name"),
                CONSTRAINT "PK_88f998ec743440a5c758e08ece4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "character_characteristic" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "character_id" uuid NOT NULL,
                "characteristic_id" uuid NOT NULL,
                "value" integer NOT NULL,
                CONSTRAINT "PK_0905f8fa167b1486ea94f4cd25f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."item_stat_damage_type_enum" AS ENUM('BLUDGEONING', 'PIERCING', 'SLASHING', 'null')
        `);
        await queryRunner.query(`
            CREATE TABLE "item_stat" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "item_id" uuid NOT NULL,
                "armor_class_base" integer,
                "armor_class_mod" character varying,
                "min_strength" integer,
                "dexterity_disadvantage" boolean,
                "damage_dice" integer,
                "damage_type" "public"."item_stat_damage_type_enum",
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
            CREATE TYPE "public"."item_type_enum" AS ENUM(
                'ARMOR',
                'WEAPON',
                'TOOL',
                'OBJECT',
                'AMMUNITION',
                'ADVENTURING GEAR'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "item" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "french_name" character varying NOT NULL,
                "name" character varying NOT NULL,
                "type" "public"."item_type_enum" NOT NULL,
                "cost" integer NOT NULL,
                "piece" character varying NOT NULL,
                CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "equipment" (
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
            CREATE TYPE "public"."language_type_enum" AS ENUM('STANDARD', 'EXOTIC')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."language_name_enum" AS ENUM(
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
            CREATE TABLE "language" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "type" "public"."language_type_enum" NOT NULL,
                "name" "public"."language_name_enum" NOT NULL,
                CONSTRAINT "UQ_7df7d1e250ea2a416f078a631fb" UNIQUE ("name"),
                CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "level" (
                "id" SERIAL NOT NULL,
                "experience_points" integer NOT NULL,
                "proficiency_bonus" integer NOT NULL,
                CONSTRAINT "PK_d3f1a7a6f09f1c3144bacdc6bcc" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "money" (
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
            CREATE TABLE "race_characteristic" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "race_id" uuid NOT NULL,
                "characteristic_id" uuid NOT NULL,
                "racial_bonus" integer NOT NULL,
                CONSTRAINT "PK_2cecd196667860001136ab66dba" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."race_name_enum" AS ENUM(
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
            CREATE TYPE "public"."race_french_name_enum" AS ENUM(
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
            CREATE TYPE "public"."race_size_enum" AS ENUM(
                'TINY',
                'SMALL',
                'MEDIUM',
                'LARGE',
                'HUGE',
                'GARGANTUAN'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "race" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" "public"."race_name_enum" NOT NULL,
                "french_name" "public"."race_french_name_enum" NOT NULL,
                "size" "public"."race_size_enum" NOT NULL,
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
            CREATE TABLE "character" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "firstname" character varying NOT NULL,
                "lastname" character varying NOT NULL,
                "sex" character varying NOT NULL,
                "eye_color" character varying NOT NULL,
                "hair_color" character varying NOT NULL,
                "skin_color" character varying NOT NULL,
                "clothing_color_1" character varying NOT NULL,
                "clothing_color_2" character varying NOT NULL,
                "bio" text NOT NULL,
                "alignment" character varying NOT NULL,
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
            CREATE TYPE "public"."profile_name_enum" AS ENUM('ALL', 'STEALTHY', 'MELEE', 'VERSATILE', 'MAGIC')
        `);
        await queryRunner.query(`
            CREATE TABLE "profile" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" "public"."profile_name_enum" NOT NULL,
                CONSTRAINT "UQ_0046bf0859cceb5f1744df2a360" UNIQUE ("name"),
                CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."class_name_enum" AS ENUM(
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
            CREATE TYPE "public"."class_french_name_enum" AS ENUM(
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
            CREATE TABLE "class" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" "public"."class_name_enum" NOT NULL,
                "french_name" "public"."class_french_name_enum" NOT NULL,
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
            CREATE TYPE "public"."calculation_for_enum" AS ENUM('HEIGHT', 'WEIGHT', 'COINS')
        `);
        await queryRunner.query(`
            CREATE TABLE "calculation" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "base" double precision NOT NULL,
                "operator_1" character varying NOT NULL,
                "dice_repetition" integer NOT NULL,
                "dice_faces" integer NOT NULL,
                "operator_2" character varying NOT NULL,
                "modificator" double precision NOT NULL,
                "for" "public"."calculation_for_enum" NOT NULL,
                CONSTRAINT "PK_67320bae23a5bfa027f881c271b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "characteristic_modificator" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "characteristic_value" integer NOT NULL,
                "modificator_value" integer NOT NULL,
                CONSTRAINT "PK_3745277a9e384ccf3e6e3a5931b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "race_language" (
                "race_id" uuid NOT NULL,
                "language_id" uuid NOT NULL,
                CONSTRAINT "PK_26d73e9e250d45b93aadc963199" PRIMARY KEY ("race_id", "language_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9353fb5c056c3fe4b5cbfdc181" ON "race_language" ("race_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_995ff5d0c676e9e18ed8266a9e" ON "race_language" ("language_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "character_language" (
                "character_id" uuid NOT NULL,
                "language_id" uuid NOT NULL,
                CONSTRAINT "PK_1137b9b1bbe30f3d1b34f53f5b0" PRIMARY KEY ("character_id", "language_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_bf0fab994d0986fc7805efbfd9" ON "character_language" ("character_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_4a7de3d395d065097c1a3be60e" ON "character_language" ("language_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "character_skill" (
                "character_id" uuid NOT NULL,
                "skill_id" uuid NOT NULL,
                CONSTRAINT "PK_c9fc577d02c0aaecb4fdfd099ed" PRIMARY KEY ("character_id", "skill_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b5c53f2b1f18d9dcad12b1c5bc" ON "character_skill" ("character_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8064ba9f219d4c247d7e87943e" ON "character_skill" ("skill_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "profile_weapon" (
                "profile_id" uuid NOT NULL,
                "item_id" uuid NOT NULL,
                CONSTRAINT "PK_e5553290b0f1d8f20a0e43b7915" PRIMARY KEY ("profile_id", "item_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_bff7fbc027225208a48c412844" ON "profile_weapon" ("profile_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1f7b90d8fa1ca6830f782fbe9b" ON "profile_weapon" ("item_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "class_skill" (
                "class_id" uuid NOT NULL,
                "skill_id" uuid NOT NULL,
                CONSTRAINT "PK_b9352875e4933f18dd23729af10" PRIMARY KEY ("class_id", "skill_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3ddf9fd0f0b69191e3b0bc6647" ON "class_skill" ("class_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9f0c4b7e8432d28d1ecb3b68ea" ON "class_skill" ("skill_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "saving_thrown" (
                "class_id" uuid NOT NULL,
                "characteristic_id" uuid NOT NULL,
                CONSTRAINT "PK_9b410e12baae4338b40787bf86c" PRIMARY KEY ("class_id", "characteristic_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d173bb988d41d1d93d40781a67" ON "saving_thrown" ("class_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f7987bf31bdbc6e90e4371f313" ON "saving_thrown" ("characteristic_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "skill"
            ADD CONSTRAINT "FK_fd772c9fc42a548fec7976b6a5c" FOREIGN KEY ("characteristic_id") REFERENCES "characteristic"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "character_characteristic"
            ADD CONSTRAINT "FK_0fe7a41e23d6d13022512498806" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "character_characteristic"
            ADD CONSTRAINT "FK_02e3c78f2d40666394e40eb102a" FOREIGN KEY ("characteristic_id") REFERENCES "characteristic"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "item_stat"
            ADD CONSTRAINT "FK_7499672b4ba178ebd3f4c8a3374" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "equipment"
            ADD CONSTRAINT "FK_4e1de96b0bb547604b07ee5286c" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "equipment"
            ADD CONSTRAINT "FK_de5a103086914ba7d02fed47140" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "money"
            ADD CONSTRAINT "FK_3af0a11b1b48a22c948017de7dd" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "race_characteristic"
            ADD CONSTRAINT "FK_7d6f406459a3f8ef56ddb51e96c" FOREIGN KEY ("race_id") REFERENCES "race"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "race_characteristic"
            ADD CONSTRAINT "FK_df60a5732918e34ac986c4caaa2" FOREIGN KEY ("characteristic_id") REFERENCES "characteristic"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "race"
            ADD CONSTRAINT "FK_e090dd489c560c83c400f713242" FOREIGN KEY ("calculation_height") REFERENCES "calculation"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "race"
            ADD CONSTRAINT "FK_87eaa26b15ea6a398f94ca420ee" FOREIGN KEY ("calculation_weight") REFERENCES "calculation"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "character"
            ADD CONSTRAINT "FK_213c1fb65c9f528cc11393f2edb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "character"
            ADD CONSTRAINT "FK_f39b5b02ef34a68438549cec9de" FOREIGN KEY ("race_id") REFERENCES "race"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "character"
            ADD CONSTRAINT "FK_c7fb9523e8dab37d3bad51eefe2" FOREIGN KEY ("level_id") REFERENCES "level"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "character"
            ADD CONSTRAINT "FK_276ec655759722c21e834368f6c" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "class"
            ADD CONSTRAINT "FK_65dda79739b2e22c7f9214eeba6" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "class"
            ADD CONSTRAINT "FK_0aba2ebca60327d1d705fadcdac" FOREIGN KEY ("money_dice") REFERENCES "calculation"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "race_language"
            ADD CONSTRAINT "FK_9353fb5c056c3fe4b5cbfdc181c" FOREIGN KEY ("race_id") REFERENCES "race"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "race_language"
            ADD CONSTRAINT "FK_995ff5d0c676e9e18ed8266a9ea" FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "character_language"
            ADD CONSTRAINT "FK_bf0fab994d0986fc7805efbfd9b" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "character_language"
            ADD CONSTRAINT "FK_4a7de3d395d065097c1a3be60ef" FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "character_skill"
            ADD CONSTRAINT "FK_b5c53f2b1f18d9dcad12b1c5bcb" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "character_skill"
            ADD CONSTRAINT "FK_8064ba9f219d4c247d7e87943ef" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "profile_weapon"
            ADD CONSTRAINT "FK_bff7fbc027225208a48c4128449" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "profile_weapon"
            ADD CONSTRAINT "FK_1f7b90d8fa1ca6830f782fbe9bd" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "class_skill"
            ADD CONSTRAINT "FK_3ddf9fd0f0b69191e3b0bc66473" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "class_skill"
            ADD CONSTRAINT "FK_9f0c4b7e8432d28d1ecb3b68ea4" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "saving_thrown"
            ADD CONSTRAINT "FK_d173bb988d41d1d93d40781a675" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "saving_thrown"
            ADD CONSTRAINT "FK_f7987bf31bdbc6e90e4371f3134" FOREIGN KEY ("characteristic_id") REFERENCES "characteristic"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "saving_thrown" DROP CONSTRAINT "FK_f7987bf31bdbc6e90e4371f3134"
        `);
        await queryRunner.query(`
            ALTER TABLE "saving_thrown" DROP CONSTRAINT "FK_d173bb988d41d1d93d40781a675"
        `);
        await queryRunner.query(`
            ALTER TABLE "class_skill" DROP CONSTRAINT "FK_9f0c4b7e8432d28d1ecb3b68ea4"
        `);
        await queryRunner.query(`
            ALTER TABLE "class_skill" DROP CONSTRAINT "FK_3ddf9fd0f0b69191e3b0bc66473"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile_weapon" DROP CONSTRAINT "FK_1f7b90d8fa1ca6830f782fbe9bd"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile_weapon" DROP CONSTRAINT "FK_bff7fbc027225208a48c4128449"
        `);
        await queryRunner.query(`
            ALTER TABLE "character_skill" DROP CONSTRAINT "FK_8064ba9f219d4c247d7e87943ef"
        `);
        await queryRunner.query(`
            ALTER TABLE "character_skill" DROP CONSTRAINT "FK_b5c53f2b1f18d9dcad12b1c5bcb"
        `);
        await queryRunner.query(`
            ALTER TABLE "character_language" DROP CONSTRAINT "FK_4a7de3d395d065097c1a3be60ef"
        `);
        await queryRunner.query(`
            ALTER TABLE "character_language" DROP CONSTRAINT "FK_bf0fab994d0986fc7805efbfd9b"
        `);
        await queryRunner.query(`
            ALTER TABLE "race_language" DROP CONSTRAINT "FK_995ff5d0c676e9e18ed8266a9ea"
        `);
        await queryRunner.query(`
            ALTER TABLE "race_language" DROP CONSTRAINT "FK_9353fb5c056c3fe4b5cbfdc181c"
        `);
        await queryRunner.query(`
            ALTER TABLE "class" DROP CONSTRAINT "FK_0aba2ebca60327d1d705fadcdac"
        `);
        await queryRunner.query(`
            ALTER TABLE "class" DROP CONSTRAINT "FK_65dda79739b2e22c7f9214eeba6"
        `);
        await queryRunner.query(`
            ALTER TABLE "character" DROP CONSTRAINT "FK_276ec655759722c21e834368f6c"
        `);
        await queryRunner.query(`
            ALTER TABLE "character" DROP CONSTRAINT "FK_c7fb9523e8dab37d3bad51eefe2"
        `);
        await queryRunner.query(`
            ALTER TABLE "character" DROP CONSTRAINT "FK_f39b5b02ef34a68438549cec9de"
        `);
        await queryRunner.query(`
            ALTER TABLE "character" DROP CONSTRAINT "FK_213c1fb65c9f528cc11393f2edb"
        `);
        await queryRunner.query(`
            ALTER TABLE "race" DROP CONSTRAINT "FK_87eaa26b15ea6a398f94ca420ee"
        `);
        await queryRunner.query(`
            ALTER TABLE "race" DROP CONSTRAINT "FK_e090dd489c560c83c400f713242"
        `);
        await queryRunner.query(`
            ALTER TABLE "race_characteristic" DROP CONSTRAINT "FK_df60a5732918e34ac986c4caaa2"
        `);
        await queryRunner.query(`
            ALTER TABLE "race_characteristic" DROP CONSTRAINT "FK_7d6f406459a3f8ef56ddb51e96c"
        `);
        await queryRunner.query(`
            ALTER TABLE "money" DROP CONSTRAINT "FK_3af0a11b1b48a22c948017de7dd"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipment" DROP CONSTRAINT "FK_de5a103086914ba7d02fed47140"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipment" DROP CONSTRAINT "FK_4e1de96b0bb547604b07ee5286c"
        `);
        await queryRunner.query(`
            ALTER TABLE "item_stat" DROP CONSTRAINT "FK_7499672b4ba178ebd3f4c8a3374"
        `);
        await queryRunner.query(`
            ALTER TABLE "character_characteristic" DROP CONSTRAINT "FK_02e3c78f2d40666394e40eb102a"
        `);
        await queryRunner.query(`
            ALTER TABLE "character_characteristic" DROP CONSTRAINT "FK_0fe7a41e23d6d13022512498806"
        `);
        await queryRunner.query(`
            ALTER TABLE "skill" DROP CONSTRAINT "FK_fd772c9fc42a548fec7976b6a5c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_f7987bf31bdbc6e90e4371f313"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d173bb988d41d1d93d40781a67"
        `);
        await queryRunner.query(`
            DROP TABLE "saving_thrown"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_9f0c4b7e8432d28d1ecb3b68ea"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_3ddf9fd0f0b69191e3b0bc6647"
        `);
        await queryRunner.query(`
            DROP TABLE "class_skill"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_1f7b90d8fa1ca6830f782fbe9b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_bff7fbc027225208a48c412844"
        `);
        await queryRunner.query(`
            DROP TABLE "profile_weapon"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_8064ba9f219d4c247d7e87943e"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b5c53f2b1f18d9dcad12b1c5bc"
        `);
        await queryRunner.query(`
            DROP TABLE "character_skill"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_4a7de3d395d065097c1a3be60e"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_bf0fab994d0986fc7805efbfd9"
        `);
        await queryRunner.query(`
            DROP TABLE "character_language"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_995ff5d0c676e9e18ed8266a9e"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_9353fb5c056c3fe4b5cbfdc181"
        `);
        await queryRunner.query(`
            DROP TABLE "race_language"
        `);
        await queryRunner.query(`
            DROP TABLE "characteristic_modificator"
        `);
        await queryRunner.query(`
            DROP TABLE "calculation"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."calculation_for_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "class"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."class_french_name_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."class_name_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "profile"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."profile_name_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "character"
        `);
        await queryRunner.query(`
            DROP TABLE "race"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."race_size_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."race_french_name_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."race_name_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "race_characteristic"
        `);
        await queryRunner.query(`
            DROP TABLE "money"
        `);
        await queryRunner.query(`
            DROP TABLE "level"
        `);
        await queryRunner.query(`
            DROP TABLE "language"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."language_name_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."language_type_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "equipment"
        `);
        await queryRunner.query(`
            DROP TABLE "item"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."item_type_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "item_stat"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."item_stat_damage_type_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "character_characteristic"
        `);
        await queryRunner.query(`
            DROP TABLE "characteristic"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."characteristic_name_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "skill"
        `);
    }

}
