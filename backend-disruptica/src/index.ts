import app from "./app";
import 'dotenv/config';
import { environments } from "./core/infraestructure/config"; 

const PORT = environments.port;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});