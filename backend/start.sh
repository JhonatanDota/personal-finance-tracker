#!/bin/sh
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php-fpm