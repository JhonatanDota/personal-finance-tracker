build:
	docker-compose build --no-cache

up:
	docker-compose up

down:
	docker-compose down

setup:
	docker-compose exec backend bash -c "php artisan migrate:fresh"

load:
	docker-compose exec backend bash -c "php artisan db:seed"

sh:
	docker-compose exec backend bash

sh-front:
	docker-compose exec frontend bash

test-back:
	docker-compose exec backend bash -c "php artisan test"

start-worker:
	docker-compose exec backend bash -c "php artisan queue:work"

restart-worker:
	docker-compose exec backend bash -c "php artisan queue:restart"

tinker:
	docker-compose exec backend bash -c "php artisan tinker"