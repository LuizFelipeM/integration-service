up:
	docker-compose -f docker-compose.dev.yml up -d

up-build:
	docker-compose -f docker-compose.dev.yml up -d --build

up-prod:
	docker-compose -f docker-compose.yml up --build

down: 
	docker-compose down
