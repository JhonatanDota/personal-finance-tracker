build:
	docker-compose build --no-cache

up:
	docker-compose up

down:
	docker-compose down

setup:
	docker-compose exec backend bash -c "php artisan migrate:fresh"

sh:
	docker-compose exec frontend bash

sh-front:
	docker-compose exec frontend bash