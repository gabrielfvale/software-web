run:
	yarn start

docker-up:
	docker run --name filmit -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=filmit -p 5432:5432 -d postgres

docker-down:
	docker stop filmit
	docker rm filmit

create-db:
	docker cp ./data/tables.sql filmit:/docker-entrypoint-initdb.d/tables.sql
	docker exec -u postgres filmit psql filmit postgres -f docker-entrypoint-initdb.d/tables.sql

