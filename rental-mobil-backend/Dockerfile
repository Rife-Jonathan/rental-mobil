FROM serversideup/php:8.2-fpm-nginx

USER root

WORKDIR /var/www/html

COPY --chown=www-data:www-data composer.json composer.lock ./

RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

COPY --chown=www-data:www-data . .

RUN composer run-script post-autoload-dump || true

RUN chmod -R 775 storage bootstrap/cache && chown -R www-data:www-data storage bootstrap/cache

USER www-data
