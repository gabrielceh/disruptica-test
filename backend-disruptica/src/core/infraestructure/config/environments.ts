import 'dotenv/config';

const requiredEnvVars = [
  'PORT',
  'JWT_SECRET_KEY',
  'CORS_WHITELIST',
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

};

export {environments};