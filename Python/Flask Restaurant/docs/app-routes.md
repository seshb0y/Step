# app/routes.py - Регистрация маршрутов

## Описание файла

Файл `app/routes.py` отвечает за **регистрацию маршрутов** в нашем Flask приложении. Маршруты - это URL адреса, на которые отвечает наше API. Вместо того чтобы регистрировать все маршруты в одном файле, мы используем **Blueprint** - способ организации маршрутов по группам.

## Что такое маршруты?

**Маршруты** - это URL адреса, на которые отвечает веб-сервер. Когда пользователь переходит по адресу `http://localhost:5000/api/v1/menus/`, сервер выполняет определенную функцию и возвращает результат.

### Пример маршрута
```python
@app.route('/api/v1/menus/')
def get_menus():
    return {'data': 'список блюд'}
```

- **URL**: `/api/v1/menus/`
- **Функция**: `get_menus()`
- **Результат**: JSON с данными

## Что такое Blueprint?

**Blueprint** - это способ организации маршрутов в Flask. Представьте, что у вас есть большой сайт с разными разделами (меню, повара, заказы). Blueprint позволяет разделить маршруты по этим разделам.

### Преимущества Blueprint
1. **Организация**: Маршруты сгруппированы по функциональности
2. **Переиспользование**: Можно использовать в разных приложениях
3. **Модульность**: Легко добавлять и удалять группы маршрутов
4. **Читаемость**: Код легче понимать и поддерживать

## Подробный разбор кода

```python
"""Регистрация маршрутов."""

from app.api.menus import menus_bp
from app.api.chefs import chefs_bp


def register_blueprints(app):
    """Регистрация всех Blueprint в приложении."""
    app.register_blueprint(menus_bp, url_prefix='/api/v1')
    app.register_blueprint(chefs_bp, url_prefix='/api/v1')
```

### Строки 1-2: Документация
```python
"""Регистрация маршрутов."""
```
- **Docstring** - описание назначения файла
- **Зачем нужно**: Помогает понять, что делает этот файл

### Строки 3-4: Импорты Blueprint
```python
from app.api.menus import menus_bp
from app.api.chefs import chefs_bp
```

**`from app.api.menus import menus_bp`**
- **app.api.menus** - модуль с маршрутами для меню
- **menus_bp** - Blueprint для маршрутов меню
- **Blueprint** - объект, содержащий группу маршрутов

**`from app.api.chefs import chefs_bp`**
- **app.api.chefs** - модуль с маршрутами для поваров
- **chefs_bp** - Blueprint для маршрутов поваров
- **Blueprint** - объект, содержащий группу маршрутов

### Строки 7-10: Функция регистрации
```python
def register_blueprints(app):
    """Регистрация всех Blueprint в приложении."""
    app.register_blueprint(menus_bp, url_prefix='/api/v1')
    app.register_blueprint(chefs_bp, url_prefix='/api/v1')
```

**`def register_blueprints(app):`**
- **register_blueprints** - функция для регистрации всех Blueprint
- **app** - экземпляр Flask приложения
- **Зачем отдельная функция**: Централизованная регистрация всех маршрутов

**`app.register_blueprint(menus_bp, url_prefix='/api/v1')`**
- **register_blueprint()** - метод Flask для регистрации Blueprint
- **menus_bp** - Blueprint для меню
- **url_prefix='/api/v1'** - префикс для всех маршрутов этого Blueprint
- **Результат**: Все маршруты из menus_bp получат префикс `/api/v1`

## Структура маршрутов

### До регистрации Blueprint
```python
# В app/api/menus.py
@menus_bp.route('/')
def get_menus():
    return {'data': 'список блюд'}

@menus_bp.route('/<int:menu_id>')
def get_menu(menu_id):
    return {'data': f'блюдо {menu_id}'}
```

### После регистрации Blueprint
```python
# Регистрация с префиксом
app.register_blueprint(menus_bp, url_prefix='/api/v1')

# Результат - доступные маршруты:
# GET /api/v1/menus/ - список блюд
# GET /api/v1/menus/1 - конкретное блюдо
```

## Примеры маршрутов

### Маршруты для меню
```
GET    /api/v1/menus/           - Получить все блюда
POST   /api/v1/menus/           - Создать новое блюдо
GET    /api/v1/menus/1          - Получить блюдо по ID
PUT    /api/v1/menus/1          - Обновить блюдо полностью
PATCH  /api/v1/menus/1          - Обновить блюдо частично
DELETE /api/v1/menus/1          - Удалить блюдо
```

### Маршруты для поваров
```
GET    /api/v1/chefs/           - Получить всех поваров
POST   /api/v1/chefs/           - Создать нового повара
GET    /api/v1/chefs/1          - Получить повара по ID
PUT    /api/v1/chefs/1          - Обновить повара полностью
PATCH  /api/v1/chefs/1          - Обновить повара частично
DELETE /api/v1/chefs/1          - Удалить повара
```

## HTTP методы

### GET - Получение данных
```python
@menus_bp.route('/', methods=['GET'])
def get_menus():
    # Получить список блюд
    return {'data': menus}
```
- **Назначение**: Получить данные
- **Параметры**: В URL или query string
- **Тело запроса**: Пустое
- **Пример**: `GET /api/v1/menus/`

### POST - Создание данных
```python
@menus_bp.route('/', methods=['POST'])
def create_menu():
    # Создать новое блюдо
    data = request.json
    return {'data': new_menu}
```
- **Назначение**: Создать новый ресурс
- **Параметры**: В теле запроса (JSON)
- **Тело запроса**: JSON с данными
- **Пример**: `POST /api/v1/menus/` с JSON

### PUT - Полное обновление
```python
@menus_bp.route('/<int:menu_id>', methods=['PUT'])
def update_menu(menu_id):
    # Обновить блюдо полностью
    data = request.json
    return {'data': updated_menu}
```
- **Назначение**: Обновить ресурс полностью
- **Параметры**: ID в URL, данные в теле
- **Тело запроса**: JSON с полными данными
- **Пример**: `PUT /api/v1/menus/1` с JSON

### PATCH - Частичное обновление
```python
@menus_bp.route('/<int:menu_id>', methods=['PATCH'])
def patch_menu(menu_id):
    # Обновить блюдо частично
    data = request.json
    return {'data': updated_menu}
```
- **Назначение**: Обновить ресурс частично
- **Параметры**: ID в URL, данные в теле
- **Тело запроса**: JSON с изменяемыми полями
- **Пример**: `PATCH /api/v1/menus/1` с JSON

### DELETE - Удаление данных
```python
@menus_bp.route('/<int:menu_id>', methods=['DELETE'])
def delete_menu(menu_id):
    # Удалить блюдо
    return {'message': 'Блюдо удалено'}
```
- **Назначение**: Удалить ресурс
- **Параметры**: ID в URL
- **Тело запроса**: Пустое
- **Пример**: `DELETE /api/v1/menus/1`

## Параметры маршрутов

### Параметры в URL
```python
@menus_bp.route('/<int:menu_id>')
def get_menu(menu_id):
    # menu_id - параметр из URL
    return {'data': f'блюдо {menu_id}'}
```

**Типы параметров:**
- **`<int:menu_id>`** - целое число
- **`<string:name>`** - строка (по умолчанию)
- **`<float:price>`** - число с плавающей точкой
- **`<path:file_path>`** - путь к файлу

### Query параметры
```python
@menus_bp.route('/')
def get_menus():
    # Получить параметры из URL
    category = request.args.get('category')
    page = request.args.get('page', 1, type=int)
    return {'data': filtered_menus}
```

**Пример URL:**
```
GET /api/v1/menus/?category=main&page=2
```

## Обработка ошибок

### Ошибки маршрутов
```python
@menus_bp.route('/<int:menu_id>')
def get_menu(menu_id):
    menu = Menu.query.get(menu_id)
    if not menu:
        return {'error': 'Блюдо не найдено'}, 404
    return {'data': menu}
```

### Глобальные обработчики
```python
@app.errorhandler(404)
def not_found(error):
    return {'error': 'Страница не найдена'}, 404

@app.errorhandler(500)
def internal_error(error):
    return {'error': 'Внутренняя ошибка сервера'}, 500
```

## Тестирование маршрутов

### Тестовый клиент Flask
```python
def test_get_menus():
    response = client.get('/api/v1/menus/')
    assert response.status_code == 200
    assert 'data' in response.json
```

### Тестирование с параметрами
```python
def test_get_menu():
    response = client.get('/api/v1/menus/1')
    assert response.status_code == 200
    assert response.json['data']['id'] == 1
```

## Расширение маршрутов

### Добавление нового Blueprint
```python
# 1. Создать новый Blueprint
from app.api.orders import orders_bp

# 2. Зарегистрировать в routes.py
def register_blueprints(app):
    app.register_blueprint(menus_bp, url_prefix='/api/v1')
    app.register_blueprint(chefs_bp, url_prefix='/api/v1')
    app.register_blueprint(orders_bp, url_prefix='/api/v1')  # Новый
```

### Добавление middleware
```python
@menus_bp.before_request
def before_request():
    # Выполняется перед каждым запросом к меню
    print(f"Запрос к меню: {request.method} {request.url}")

@menus_bp.after_request
def after_request(response):
    # Выполняется после каждого запроса к меню
    print(f"Ответ: {response.status_code}")
    return response
```

## Версионирование API

### Префиксы версий
```python
# Версия 1
app.register_blueprint(menus_bp, url_prefix='/api/v1')

# Версия 2 (будущая)
app.register_blueprint(menus_v2_bp, url_prefix='/api/v2')
```

### Обратная совместимость
```python
# Старые маршруты остаются работать
GET /api/v1/menus/

# Новые маршруты добавляются
GET /api/v2/menus/
```

## Заключение

Файл `app/routes.py` - это **диспетчер** нашего приложения. Он:
- Регистрирует все маршруты API
- Использует Blueprint для организации
- Добавляет префиксы к URL
- Централизует управление маршрутами
- Обеспечивает модульность и читаемость

Без этого файла наши API endpoints не были бы доступны!


