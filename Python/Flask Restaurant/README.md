# Flask Restaurant API

REST API для управления меню ресторана и поварами с полным набором CRUD операций.

## 📚 Документация

**Подробная документация доступна в папке [docs/](docs/):**

- **[Обзор проекта](docs/PROJECT_OVERVIEW.md)** - Полное описание архитектуры и технологий
- **[Как использовать документацию](docs/HOW_TO_USE_DOCS.md)** - Руководство по изучению проекта
- **[Документация по файлам](docs/README.md)** - Подробное описание каждого файла

**Для начинающих:** Начните с [обзора проекта](docs/PROJECT_OVERVIEW.md) и [инструкций по использованию](docs/HOW_TO_USE_DOCS.md).

## 🚀 Возможности

- **CRUD операции** для блюд меню и поваров
- **Фильтрация и поиск** по различным параметрам
- **Пагинация** результатов
- **Сортировка** по различным полям
- **Связь поваров и блюд** (многие ко многим)
- **Валидация данных** с помощью Pydantic
- **Обработка ошибок** с единым форматом ответов
- **CORS поддержка**
- **Тесты** с покрытием кода

## 🛠 Технологии

- **Python 3.11+**
- **Flask 3.0** - веб-фреймворк
- **SQLAlchemy 2.0** - ORM
- **Alembic** - миграции БД
- **Pydantic v2** - валидация данных
- **pytest** - тестирование
- **Flask-CORS** - поддержка CORS

## 📦 Установка

1. **Клонируйте репозиторий:**
```bash
git clone <repository-url>
cd flask-restaurant-api
```

2. **Создайте виртуальное окружение:**
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

3. **Установите зависимости:**
```bash
make install
# или
pip install -r requirements.txt
```

4. **Настройте переменные окружения:**
```bash
cp env.example .env
# Отредактируйте .env файл при необходимости
```

5. **Инициализируйте базу данных:**
```bash
make db.up
# или
alembic upgrade head
```

## 🚀 Запуск

### Режим разработки
```bash
make run
# или
python run.py
# или
flask --app app run --debug
```

### Продакшн
```bash
export FLASK_ENV=production
python run.py
```

API будет доступен по адресу: `http://localhost:5000`

## 📚 API Документация

### Базовый URL
```
http://localhost:5000/api/v1
```

### Health Check
```http
GET /health
```

**Ответ:**
```json
{
  "status": "ok"
}
```

## 🍽 API Меню

### Получить список блюд
```http
GET /api/v1/menus/
```

**Параметры запроса:**
- `page` (int) - номер страницы (по умолчанию: 1)
- `per_page` (int) - элементов на странице (по умолчанию: 20, максимум: 100)
- `category` (string) - фильтр по категории (`starter`, `main`, `dessert`, `drink`)
- `min_price` (float) - минимальная цена
- `max_price` (float) - максимальная цена
- `is_available` (boolean) - фильтр по доступности
- `q` (string) - поиск по названию и описанию
- `sort` (string) - сортировка (`price`, `-price`, `name`, `-name`)

**Пример:**
```bash
curl "http://localhost:5000/api/v1/menus/?category=main&min_price=10&sort=-price&page=1&per_page=20"
```

**Ответ:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Том Ям",
      "description": "Острый суп с креветками",
      "category": "main",
      "price": 14.90,
      "is_available": true,
      "created_at": "2024-01-01T12:00:00",
      "updated_at": "2024-01-01T12:00:00"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "per_page": 20,
    "pages": 1
  },
  "message": "Успешно"
}
```

### Создать блюдо
```http
POST /api/v1/menus/
```

**Тело запроса:**
```json
{
  "name": "Том Ям",
  "description": "Острый суп с креветками",
  "category": "main",
  "price": 14.90,
  "is_available": true
}
```

**Ответ:** `201 Created`
```json
{
  "data": {
    "id": 1,
    "name": "Том Ям",
    "description": "Острый суп с креветками",
    "category": "main",
    "price": 14.90,
    "is_available": true,
    "created_at": "2024-01-01T12:00:00",
    "updated_at": "2024-01-01T12:00:00"
  },
  "message": "Блюдо успешно создано"
}
```

### Получить блюдо по ID
```http
GET /api/v1/menus/{id}
```

### Обновить блюдо (полное)
```http
PUT /api/v1/menus/{id}
```

### Обновить блюдо (частичное)
```http
PATCH /api/v1/menus/{id}
```

### Удалить блюдо
```http
DELETE /api/v1/menus/{id}
```

## 👨‍🍳 API Поваров

### Получить список поваров
```http
GET /api/v1/chefs/
```

**Параметры запроса:**
- `page` (int) - номер страницы
- `per_page` (int) - элементов на странице
- `rank` (string) - фильтр по рангу (`junior`, `middle`, `senior`, `chef-de-cuisine`)
- `is_active` (boolean) - фильтр по активности
- `specialty` (string) - фильтр по специализации (содержит)
- `q` (string) - поиск по имени
- `sort` (string) - сортировка (`name`, `-name`, `rank`, `-rank`)

**Пример:**
```bash
curl "http://localhost:5000/api/v1/chefs/?rank=senior&is_active=true&specialty=asian"
```

### Создать повара
```http
POST /api/v1/chefs/
```

**Тело запроса:**
```json
{
  "full_name": "Иван Петров",
  "rank": "senior",
  "specialties": ["asian", "soup"],
  "is_active": true
}
```

### Назначить блюдо повару
```http
POST /api/v1/chefs/{chef_id}/menu-items/{menu_item_id}
```

### Снять назначение блюда повару
```http
DELETE /api/v1/chefs/{chef_id}/menu-items/{menu_item_id}
```

## 📊 Модель данных

### MenuItem (Блюдо)
- `id` (int) - уникальный идентификатор
- `name` (string) - название блюда
- `description` (string, optional) - описание
- `category` (enum) - категория (`starter`, `main`, `dessert`, `drink`)
- `price` (decimal) - цена (больше 0)
- `is_available` (boolean) - доступность
- `created_at` (datetime) - дата создания
- `updated_at` (datetime) - дата обновления

### Chef (Повар)
- `id` (int) - уникальный идентификатор
- `full_name` (string) - полное имя
- `rank` (enum) - ранг (`junior`, `middle`, `senior`, `chef-de-cuisine`)
- `specialties` (array) - специализации (максимум 10)
- `is_active` (boolean) - активность
- `created_at` (datetime) - дата создания
- `updated_at` (datetime) - дата обновления

## 🔧 Команды разработки

```bash
# Установка зависимостей
make install

# Запуск в режиме разработки
make run

# Запуск тестов
make test

# Запуск тестов с покрытием
make test-cov

# Линтинг кода
make lint

# Форматирование кода
make fmt

# Применить миграции
make db.up

# Создать миграцию
make db.migrate msg="Описание изменений"

# Откатить миграцию
make db.downgrade

# Показать историю миграций
make db.history

# Очистить временные файлы
make clean
```

## 🧪 Тестирование

```bash
# Запуск всех тестов
pytest

# Запуск с покрытием
pytest --cov=app --cov-report=html

# Запуск конкретного теста
pytest tests/test_menus.py::TestMenuAPI::test_create_menu_item
```

## 📝 Формат ошибок

Все ошибки возвращаются в едином формате:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Описание ошибки",
    "details": {}
  }
}
```

**Коды ошибок:**
- `VALIDATION_ERROR` (422) - ошибка валидации данных
- `NOT_FOUND` (404) - ресурс не найден
- `CONFLICT` (409) - конфликт ресурсов
- `BAD_REQUEST` (400) - некорректный запрос
- `INTERNAL_ERROR` (500) - внутренняя ошибка сервера

## 🗄 Миграции базы данных

```bash
# Создать миграцию
alembic revision --autogenerate -m "Описание изменений"

# Применить миграции
alembic upgrade head

# Откатить миграцию
alembic downgrade -1

# Показать текущую версию
alembic current

# Показать историю
alembic history
```

## 🚀 Развертывание

1. **Настройте переменные окружения:**
```bash
export FLASK_ENV=production
export DATABASE_URL=postgresql://user:password@localhost/restaurant_db
export SECRET_KEY=your-secret-key
```

2. **Примените миграции:**
```bash
alembic upgrade head
```

3. **Запустите приложение:**
```bash
python run.py
```

## 📄 Лицензия

MIT License

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📞 Поддержка

Если у вас есть вопросы или предложения, создайте issue в репозитории.
