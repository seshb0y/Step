# app/api/ - API Endpoints

## Описание папки

Папка `app/api/` содержит **API endpoints** (конечные точки) нашего веб-сервиса. Endpoints - это URL адреса, на которые клиенты могут отправлять HTTP запросы для получения или изменения данных.

## Что такое API Endpoints?

**API Endpoints** - это URL адреса, которые обрабатывают HTTP запросы. Каждый endpoint:
- Имеет определенный URL (например, `/api/v1/menus/`)
- Принимает определенный HTTP метод (GET, POST, PUT, DELETE)
- Обрабатывает входящие данные
- Возвращает результат в формате JSON

### Пример endpoint
```python
@menus_bp.route('/', methods=['GET'])
def get_menus():
    """Получить список всех блюд."""
    menus = menu_service.get_all_menus()
    return success_response(menus)
```

**Что происходит:**
- URL: `GET /api/v1/menus/`
- Функция: `get_menus()`
- Результат: JSON со списком блюд

## Структура папки

```
app/api/
├── __init__.py          # Инициализация API
├── menus.py             # Endpoints для блюд
└── chefs.py             # Endpoints для поваров
```

## Файлы в папке

- [__init__.py](api-init.md) - Инициализация API
- [menus.py](menus.md) - Endpoints для блюд
- [chefs.py](chefs.md) - Endpoints для поваров

## Основные концепции

### Blueprint
**Blueprint** - это способ организации маршрутов в Flask. Вместо регистрации всех маршрутов в одном файле, мы группируем их по функциональности.

```python
from flask import Blueprint

menus_bp = Blueprint('menus', __name__)

@menus_bp.route('/')
def get_menus():
    return {'data': 'список блюд'}
```

### HTTP методы
Разные HTTP методы используются для разных операций:

- **GET** - получение данных
- **POST** - создание новых данных
- **PUT** - полное обновление данных
- **PATCH** - частичное обновление данных
- **DELETE** - удаление данных

### REST API
**REST** (Representational State Transfer) - архитектурный стиль для веб-сервисов. Наш API следует принципам REST:

- Использует HTTP методы
- Возвращает JSON
- Имеет понятные URL
- Статус коды для разных ситуаций

## Структура endpoint

### Базовая структура
```python
@blueprint.route('/path', methods=['HTTP_METHOD'])
def function_name():
    """Описание функции."""
    try:
        # 1. Валидация входных данных
        # 2. Обработка запроса
        # 3. Возврат результата
    except Exception as e:
        # Обработка ошибок
```

### Пример полного endpoint
```python
@menus_bp.route('/', methods=['POST'])
def create_menu_item():
    """Создание нового блюда."""
    try:
        # Валидация входных данных
        menu_data = MenuItemCreate(**request.json)
        
        # Создание блюда
        menu_item = menu_service.create_menu_item(menu_data)
        
        # Возврат результата
        result = MenuItemOut.model_validate(menu_item).model_dump()
        return created_response(result, "Блюдо успешно создано")
        
    except ValidationError as e:
        return {'error': {'code': 'VALIDATION_ERROR', 'message': str(e)}}, 422
    except Exception as e:
        return {'error': {'code': 'INTERNAL_ERROR', 'message': 'Внутренняя ошибка'}}, 500
```

## Обработка запросов

### Получение данных из запроса
```python
# JSON данные
data = request.json

# Query параметры
category = request.args.get('category')
page = request.args.get('page', 1, type=int)

# Параметры URL
menu_id = request.view_args['menu_id']

# Заголовки
content_type = request.headers.get('Content-Type')
```

### Валидация данных
```python
try:
    # Валидация с помощью Pydantic
    menu_data = MenuItemCreate(**request.json)
except ValidationError as e:
    return {'error': {'code': 'VALIDATION_ERROR', 'details': e.errors()}}, 422
```

## Обработка ответов

### Успешные ответы
```python
# Простой ответ
return {'data': result}

# Ответ с сообщением
return success_response(result, "Операция выполнена успешно")

# Ответ с пагинацией
return paginated_response(items, total, page, per_page)
```

### Ошибки
```python
# Ошибка валидации
return {'error': {'code': 'VALIDATION_ERROR', 'message': 'Ошибка валидации'}}, 422

# Ресурс не найден
return {'error': {'code': 'NOT_FOUND', 'message': 'Ресурс не найден'}}, 404

# Внутренняя ошибка
return {'error': {'code': 'INTERNAL_ERROR', 'message': 'Внутренняя ошибка'}}, 500
```

## HTTP статус коды

### Успешные ответы (2xx)
- **200 OK** - запрос выполнен успешно
- **201 Created** - ресурс создан
- **204 No Content** - запрос выполнен, но нет содержимого

### Ошибки клиента (4xx)
- **400 Bad Request** - некорректный запрос
- **401 Unauthorized** - не авторизован
- **403 Forbidden** - доступ запрещен
- **404 Not Found** - ресурс не найден
- **422 Unprocessable Entity** - ошибка валидации

### Ошибки сервера (5xx)
- **500 Internal Server Error** - внутренняя ошибка сервера
- **502 Bad Gateway** - ошибка шлюза
- **503 Service Unavailable** - сервис недоступен

## Фильтрация и поиск

### Query параметры
```python
@menus_bp.route('/')
def get_menus():
    # Получить параметры фильтрации
    category = request.args.get('category')
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    is_available = request.args.get('is_available', type=bool)
    search = request.args.get('q')
    
    # Получить параметры сортировки
    sort = request.args.get('sort')
    
    # Получить параметры пагинации
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    # Применить фильтры
    menus = menu_service.get_menus(
        category=category,
        min_price=min_price,
        max_price=max_price,
        is_available=is_available,
        search=search,
        sort=sort,
        page=page,
        per_page=per_page
    )
    
    return paginated_response(menus, total, page, per_page)
```

### Примеры запросов
```
GET /api/v1/menus/?category=main&min_price=10&max_price=50
GET /api/v1/menus/?q=борщ&sort=price&page=1&per_page=10
GET /api/v1/chefs/?specialty=Азиатская&is_active=true
```

## Пагинация

### Параметры пагинации
```python
page = request.args.get('page', 1, type=int)  # Номер страницы
per_page = request.args.get('per_page', 20, type=int)  # Элементов на странице
```

### Ограничения
```python
# Ограничить максимальное количество элементов на странице
per_page = min(per_page, 100)

# Проверить валидность номера страницы
if page < 1:
    page = 1
```

### Ответ с пагинацией
```python
return {
    'data': items,
    'meta': {
        'total': total_count,
        'page': page,
        'per_page': per_page,
        'pages': total_pages
    }
}
```

## Обработка ошибок

### Глобальные обработчики
```python
@menus_bp.errorhandler(ValidationError)
def handle_validation_error(error):
    return {'error': {'code': 'VALIDATION_ERROR', 'message': str(error)}}, 422

@menus_bp.errorhandler(NotFoundError)
def handle_not_found_error(error):
    return {'error': {'code': 'NOT_FOUND', 'message': str(error)}}, 404
```

### Локальная обработка
```python
try:
    # Код, который может вызвать ошибку
    result = some_operation()
except SpecificError as e:
    return {'error': {'code': 'SPECIFIC_ERROR', 'message': str(e)}}, 400
except Exception as e:
    return {'error': {'code': 'INTERNAL_ERROR', 'message': 'Внутренняя ошибка'}}, 500
```

## Логирование

### Логирование запросов
```python
import logging

logger = logging.getLogger(__name__)

@menus_bp.route('/', methods=['POST'])
def create_menu_item():
    logger.info(f"Создание блюда: {request.json}")
    
    try:
        # Создание блюда
        result = menu_service.create_menu_item(menu_data)
        logger.info(f"Блюдо создано с ID: {result.id}")
        return created_response(result)
        
    except Exception as e:
        logger.error(f"Ошибка создания блюда: {e}")
        raise
```

## Тестирование endpoints

### Тестовый клиент Flask
```python
def test_create_menu_item():
    data = {
        'name': 'Тестовое блюдо',
        'price': 15.50,
        'category': 'main'
    }
    
    response = client.post('/api/v1/menus/', json=data)
    
    assert response.status_code == 201
    assert 'data' in response.json
    assert response.json['data']['name'] == 'Тестовое блюдо'
```

### Тестирование ошибок
```python
def test_create_menu_item_validation_error():
    data = {
        'name': '',  # Пустое имя
        'price': -5,  # Отрицательная цена
        'category': 'invalid'  # Неверная категория
    }
    
    response = client.post('/api/v1/menus/', json=data)
    
    assert response.status_code == 422
    assert 'error' in response.json
    assert response.json['error']['code'] == 'VALIDATION_ERROR'
```

## Документация API

### Swagger/OpenAPI
```python
from flask_restx import Api, Resource

api = Api(app, doc='/docs/')

@api.route('/menus')
class MenuList(Resource):
    @api.doc('get_menus')
    @api.marshal_with(menu_schema)
    def get(self):
        """Получить список блюд."""
        return menu_service.get_all_menus()
```

### Автоматическая документация
- Swagger UI для интерактивного тестирования
- JSON схема для валидации
- Описания полей и параметров

## Безопасность

### Валидация входных данных
```python
# Всегда валидируйте входные данные
menu_data = MenuItemCreate(**request.json)
```

### Ограничение размера запроса
```python
from flask import Flask

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB
```

### CORS
```python
from flask_cors import CORS

CORS(app, origins=['http://localhost:3000'])
```

## Производительность

### Кэширование
```python
from flask_caching import Cache

cache = Cache(app)

@menus_bp.route('/')
@cache.cached(timeout=300)  # Кэш на 5 минут
def get_menus():
    return menu_service.get_all_menus()
```

### Асинхронная обработка
```python
import asyncio

@menus_bp.route('/heavy-operation')
async def heavy_operation():
    result = await some_async_operation()
    return {'data': result}
```

## Заключение

Папка `app/api/` - это **лицо** нашего приложения. Она:
- Обрабатывает HTTP запросы
- Валидирует входящие данные
- Возвращает структурированные ответы
- Обрабатывает ошибки
- Предоставляет документацию
- Обеспечивает безопасность

Без endpoints наше API не было бы доступно клиентам!


