import app from "./app";
import 'dotenv/config';
import { environments } from "./core/infraestructure/config"; 
import { AppDataSource } from "@src/core/infraestructure/config/datasource";

const PORT = environments.port;


AppDataSource.initialize()
  .then(() => {
    console.log("📦 DataSource initialized");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error initializing datasource", err);
  });

