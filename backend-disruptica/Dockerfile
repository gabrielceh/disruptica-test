# Base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Set environment variable for the port
ENV PORT=3000

# Expose port
EXPOSE 3000

# Command to run
CMD ["node", "dist/index.js"]
