import 'dotenv/config';

const requiredEnvVars = [
  'PORT',
  'JWT_SECRET_KEY',
  'JWT_EXPIRES_IN',
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
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",

};

export {environments};