run:
	yarn start

docker-up:
	docker run --name filmit-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=filmit -p 5432:5432 -d postgres
	docker run --name filmit-redis -d -p 6379:6379 redis

docker-down:
	docker stop filmit-postgres filmit-redis
	docker rm filmit-postgres filmit-redis

create-db:
	docker cp ./data/tables.sql filmit-postgres:/docker-entrypoint-initdb.d/tables.sql
	docker exec -u postgres filmit-postgres psql filmit postgres -f docker-entrypoint-initdb.d/tables.sql
