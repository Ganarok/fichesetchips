import { seeder } from "nestjs-seeder";
import { DatabaseModule } from "./database/database.module";
import { PreferencesSeeder } from "./utils/seeders/preferences/preferences.seeder";
import { UsersSeeder } from "./utils/seeders/users/users.seeder";
 
seeder({
  imports: [DatabaseModule],
}).run([PreferencesSeeder, UsersSeeder]);