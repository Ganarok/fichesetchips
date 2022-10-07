// BEGIN swaggerAutogen
import swaggerAutogen from "swagger-autogen";
import config from "./swaggerconfig"

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/routes"];

swaggerAutogen()(outputFile, endpointsFiles, config).then(async () => {
  await import('./server'); // Your express api project's root file where the server starts
});
// END swaggerAutogen