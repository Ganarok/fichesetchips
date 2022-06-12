import { seeder } from "nestjs-seeder";
import { DatabaseModule } from "./database/database.module";
import { PreferencesSeeder } from "./utils/seeders/preferences.seeder";
import { UsersSeeder } from "./utils/seeders/users.seeder";
 
seeder({
  imports: [DatabaseModule],
}).run([PreferencesSeeder, UsersSeeder]);