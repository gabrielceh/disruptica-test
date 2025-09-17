# -------- Stage 1: Build --------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lock file first (mejor caché)
COPY package*.json ./
COPY pnpm-lock.yaml* ./
COPY yarn.lock* ./
COPY bun.lockb* ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Build de producción
RUN npm run build

# -------- Stage 2: Nginx --------
FROM nginx:1.27-alpine

# Elimina configuración por defecto y copia la nuestra
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
