.PHONY: help run install test lint fmt db.up db.migrate db.downgrade clean

help: ## Показать справку
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Установить зависимости
	pip install -r requirements.txt

run: ## Запустить dev-сервер
	flask --app app run --debug

test: ## Запуск тестов
	pytest -q --maxfail=1 --disable-warnings

test-cov: ## Запуск тестов с покрытием
	pytest --cov=app --cov-report=html --cov-report=term-missing

lint: ## Линтеры
	ruff check . && isort . --check-only && black . --check

fmt: ## Форматирование кода
	isort . && black .

db.up: ## Применить миграции
	alembic upgrade head

db.migrate: ## Создать миграцию
	alembic revision --autogenerate -m "$(msg)"

db.downgrade: ## Откатить миграцию
	alembic downgrade -1

db.history: ## Показать историю миграций
	alembic history

db.current: ## Показать текущую версию
	alembic current

clean: ## Очистить временные файлы
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete
	rm -rf .pytest_cache
	rm -rf htmlcov
	rm -rf .coverage

