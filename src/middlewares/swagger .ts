import { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//Metadata information about the Api
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Kiwibot API", version: "1.0.0" },
  },
  apis: [
    "src/routes/index.ts",
    "src/routes/bots.ts",
    "src/routes/deliveries.ts",
  ],
};

// Docs in JSON format
const swaggerSpect = swaggerJSDoc(options);

//Funtion to setup documentation
const swaggerDocs = (app: Application, port: string) => {
  app.use("/document", swaggerUi.serve, swaggerUi.setup(swaggerSpect));
  app.get("/document", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpect);
  });

  console.log(`Documentation available on http://localhost:4000/document/`);
};

export default swaggerDocs;
