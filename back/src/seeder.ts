import { seeder } from "nestjs-seeder";
import { DatabaseModule } from "./database/database.module";
import { PreferencesSeeder } from "./seeders/preferences.seeder";
import { UsersSeeder } from "./seeders/users.seeder";
 
seeder({
  imports: [DatabaseModule],
}).run([PreferencesSeeder, UsersSeeder]);