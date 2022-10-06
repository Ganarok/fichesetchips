// BEGIN swaggerAutogen
import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/routes"];
const config = {
    info: {
      title: "Fiches&Chips",
      description: "API REST du projet Fiches&Chips",
    }
  };
swaggerAutogen()(outputFile, endpointsFiles, config).then(async () => {
  await import('./server'); // Your express api project's root file where the server starts
});
// END swaggerAutogen