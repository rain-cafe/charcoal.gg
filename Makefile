setup:
	docker compose up -d

setup-alpha:
	docker compose -f docker-compose.alpha.yml up -d

setup-live:
	docker compose -f docker-compose.live.yml up -d
