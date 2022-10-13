// BEGIN swaggerAutogen
import swaggerAutogen from "swagger-autogen";
import { definitions } from "./definitions";
import * as generatedSwagger from "./generatedSwagger.json"
import { SwaggerConfig } from "../types/swagger";
import fs from "fs"
import config from "./config";
const outputFile = "./generatedSwagger.json";
const endpointsFiles = ["../../routes/routes"];

swaggerAutogen()(outputFile, endpointsFiles, config).then(async () => {
  
  const swaggerConfig: SwaggerConfig = {
    ...generatedSwagger,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          description: 'Enter JWT token',
          name: 'JWT',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          value: "Bearer <JWT token here>"
        }
      },
    }
  }

  delete swaggerConfig.swagger

  swaggerConfig["definitions"] = definitions

  fs.writeFile("src/utils/swagger/swagger.json", JSON.stringify(swaggerConfig), function (err) {
    if (err) throw err;
    console.log('swagger.json created');
  })

  await new Promise((resolve, reject) => setTimeout(() => resolve(true), 1000));

});