// BEGIN swaggerAutogen
import swaggerAutogen from "swagger-autogen";
import { definitions } from "./definitions";
import * as config from "./generatedSwagger.json"
import { SwaggerConfig } from "../types/swagger";
import fs from "fs"
const outputFile = "./generatedSwagger.json";
const endpointsFiles = ["../../routes/routes"];

swaggerAutogen()(outputFile, endpointsFiles, {}).then(async () => {
  await import('../../server');
});

const swaggerConfig: SwaggerConfig = { ...config }

swaggerConfig["definitions"] = definitions

fs.writeFile("src/utils/swagger/swagger.json", JSON.stringify(swaggerConfig), function (err) {
  if (err) throw err;
  console.log('complete');
}
);