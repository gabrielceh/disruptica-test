import 'dotenv/config';

const requiredEnvVars = [
  'PORT',
  'JWT_SECRET_KEY',
  'CORS_WHITELIST',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB',
];

for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    console.error(`Error: The environment variable "${varName}" is not defined`);
    process.exit(1); 
  }
}


const environments = {
  port: parseInt(process.env.PORT || '3000', 10),
  jwtSecretKey: process.env.JWT_SECRET_KEY || "",
  corsWhitelist: process.env.CORS_WHITELIST || "http://localhost:3000",
  postgresUser: process.env.POSTGRES_USER || "",
  postgresPassword: process.env.POSTGRES_PASSWORD || "",
  postgresDb: process.env.POSTGRES_DB || "",

};

export {environments};