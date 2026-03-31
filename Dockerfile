# Stage 1: Build React Frontend
FROM node:20-alpine AS frontend-build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY src/ ./src/
COPY index.html ./
COPY vite.config.ts ./
COPY tsconfig.json* ./
COPY tsconfig.app.json* ./
COPY tailwind.config.* ./
COPY postcss.config.* ./

RUN npm run build

# Stage 2: Laravel Backend
FROM serversideup/php:8.2-fpm-nginx

USER root

WORKDIR /var/www/html

COPY rental-mobil-backend/composer.json rental-mobil-backend/composer.lock ./

RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

COPY rental-mobil-backend/ .

# Copy built frontend assets from Stage 1
COPY --from=frontend-build /app/rental-mobil-backend/public/ /var/www/html/public/

RUN composer run-script post-autoload-dump || true

RUN chmod -R 775 storage bootstrap/cache && chown -R www-data:www-data storage bootstrap/cache

USER www-data
