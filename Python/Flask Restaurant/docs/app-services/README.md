# app/services/ - Бизнес-логика

## Описание папки

Папка `app/services/` содержит **бизнес-логику** нашего приложения. Сервисы - это классы, которые содержат основную логику работы с данными, валидацию бизнес-правил и координацию между разными компонентами.

## Что такое бизнес-логика?

**Бизнес-логика** - это правила и алгоритмы, которые определяют, как работает наше приложение с точки зрения предметной области (ресторан). Это не техническая логика (как работать с базой данных), а логика предметной области (как работает ресторан).

### Примеры бизнес-логики
- Повар не может готовить больше 10 блюд одновременно
- Цена блюда не может быть отрицательной
- Блюдо с одинаковым названием не может существовать в одной категории
- Повар должен иметь хотя бы одну специализацию

## Структура папки

```
app/services/
├── __init__.py          # Инициализация сервисов
├── menu_service.py      # Сервис для работы с блюдами
└── chef_service.py      # Сервис для работы с поварами
```

## Файлы в папке

- [__init__.py](services-init.md) - Инициализация сервисов
- [menu_service.py](menu-service.md) - Сервис для блюд
- [chef_service.py](chef-service.md) - Сервис для поваров

## Архитектурные принципы

### Слоистая архитектура
Наше приложение разделено на слои:

```
API Layer (app/api/)          ← HTTP запросы/ответы
    ↓
Service Layer (app/services/) ← Бизнес-логика
    ↓
Repository Layer (app/repositories/) ← Доступ к данным
    ↓
Model Layer (app/models/)     ← Структура данных
```

### Разделение ответственности
- **API Layer** - обработка HTTP запросов
- **Service Layer** - бизнес-логика и валидация
- **Repository Layer** - работа с базой данных
- **Model Layer** - структура данных

## Основные концепции

### Сервисы
**Сервисы** - это классы, которые содержат бизнес-логику. Они:
- Координируют работу между компонентами
- Применяют бизнес-правила
- Валидируют данные
- Обрабатывают исключения

### Репозитории
**Репозитории** - это классы для работы с данными. Они:
- Выполняют CRUD операции
- Строят запросы к базе данных
- Абстрагируют работу с данными

### Модели
**Модели** - это классы, представляющие данные. Они:
- Описывают структуру таблиц
- Содержат связи между данными
- Предоставляют методы для работы с данными

## Пример сервиса

### Базовая структура
```python
class MenuService:
    """Сервис для работы с блюдами меню."""
    
    def __init__(self):
        self.repository = MenuRepository()
    
    def create_menu_item(self, data):
        """Создание нового блюда с валидацией."""
        # 1. Валидация бизнес-правил
        self._validate_menu_item(data)
        
        # 2. Проверка уникальности
        self._check_uniqueness(data)
        
        # 3. Создание через репозиторий
        return self.repository.create(data)
    
    def _validate_menu_item(self, data):
        """Валидация бизнес-правил."""
        if data.price <= 0:
            raise ValidationError("Цена должна быть больше 0")
        
        if not data.name.strip():
            raise ValidationError("Название не может быть пустым")
    
    def _check_uniqueness(self, data):
        """Проверка уникальности."""
        if self.repository.exists_by_name_and_category(data.name, data.category):
            raise ConflictError("Блюдо с таким названием уже существует в категории")
```

## Валидация данных

### Валидация на уровне сервиса
```python
def create_chef(self, data):
    """Создание повара с валидацией."""
    # Валидация обязательных полей
    if not data.full_name:
        raise ValidationError("Имя повара обязательно")
    
    # Валидация специализаций
    if len(data.specialties) > 10:
        raise ValidationError("Максимум 10 специализаций")
    
    # Валидация уникальности
    if self.repository.exists_by_name(data.full_name):
        raise ConflictError("Повар с таким именем уже существует")
    
    return self.repository.create(data)
```

### Сложная валидация
```python
def update_menu_item(self, menu_id, data):
    """Обновление блюда с валидацией."""
    # Получить существующее блюдо
    existing_item = self.get_menu_item(menu_id)
    
    # Валидация цены
    if 'price' in data and data.price <= 0:
        raise ValidationError("Цена должна быть больше 0")
    
    # Валидация уникальности (только если изменились name или category)
    if 'name' in data or 'category' in data:
        name = data.get('name', existing_item.name)
        category = data.get('category', existing_item.category)
        
        if self.repository.exists_by_name_and_category(name, category, exclude_id=menu_id):
            raise ConflictError("Блюдо с таким названием уже существует в категории")
    
    return self.repository.update(menu_id, data)
```

## Обработка ошибок

### Типы ошибок
```python
from app.utils.errors import ValidationError, NotFoundError, ConflictError

def get_menu_item(self, menu_id):
    """Получить блюдо по ID."""
    menu_item = self.repository.get_by_id(menu_id)
    
    if not menu_item:
        raise NotFoundError(f"Блюдо с ID {menu_id} не найдено")
    
    return menu_item
```

### Кастомные исключения
```python
class BusinessRuleError(Exception):
    """Ошибка нарушения бизнес-правила."""
    pass

def create_menu_item(self, data):
    """Создание блюда с проверкой бизнес-правил."""
    # Проверка лимита блюд в категории
    if self._count_items_in_category(data.category) >= 100:
        raise BusinessRuleError("Превышен лимит блюд в категории")
    
    return self.repository.create(data)
```

## Кэширование

### Простое кэширование
```python
from functools import lru_cache

class MenuService:
    @lru_cache(maxsize=128)
    def get_menu_categories(self):
        """Получить список категорий (кэшируется)."""
        return self.repository.get_categories()
    
    def clear_cache(self):
        """Очистить кэш."""
        self.get_menu_categories.cache_clear()
```

### Кэширование с TTL
```python
import time

class MenuService:
    def __init__(self):
        self.repository = MenuRepository()
        self._cache = {}
        self._cache_ttl = 300  # 5 минут
    
    def get_popular_items(self):
        """Получить популярные блюда."""
        cache_key = 'popular_items'
        now = time.time()
        
        # Проверить кэш
        if cache_key in self._cache:
            data, timestamp = self._cache[cache_key]
            if now - timestamp < self._cache_ttl:
                return data
        
        # Получить данные
        data = self.repository.get_popular_items()
        
        # Сохранить в кэш
        self._cache[cache_key] = (data, now)
        
        return data
```

## Логирование

### Логирование операций
```python
import logging

logger = logging.getLogger(__name__)

class MenuService:
    def create_menu_item(self, data):
        """Создание блюда с логированием."""
        logger.info(f"Создание блюда: {data.name}")
        
        try:
            result = self.repository.create(data)
            logger.info(f"Блюдо создано с ID: {result.id}")
            return result
            
        except Exception as e:
            logger.error(f"Ошибка создания блюда: {e}")
            raise
```

### Структурированное логирование
```python
import json

def create_menu_item(self, data):
    """Создание блюда со структурированным логированием."""
    logger.info("Создание блюда", extra={
        'operation': 'create_menu_item',
        'data': {
            'name': data.name,
            'category': data.category,
            'price': float(data.price)
        }
    })
    
    try:
        result = self.repository.create(data)
        logger.info("Блюдо создано", extra={
            'operation': 'create_menu_item',
            'result': {'id': result.id}
        })
        return result
        
    except Exception as e:
        logger.error("Ошибка создания блюда", extra={
            'operation': 'create_menu_item',
            'error': str(e)
        })
        raise
```

## Тестирование сервисов

### Unit тесты
```python
import pytest
from unittest.mock import Mock, patch

class TestMenuService:
    def setup_method(self):
        self.service = MenuService()
        self.service.repository = Mock()
    
    def test_create_menu_item_success(self):
        """Тест успешного создания блюда."""
        # Подготовка
        data = MenuItemCreate(name="Тест", price=15.50, category="main")
        expected_result = MenuItem(id=1, name="Тест", price=15.50, category="main")
        self.service.repository.create.return_value = expected_result
        
        # Выполнение
        result = self.service.create_menu_item(data)
        
        # Проверка
        assert result == expected_result
        self.service.repository.create.assert_called_once_with(data)
    
    def test_create_menu_item_validation_error(self):
        """Тест ошибки валидации."""
        # Подготовка
        data = MenuItemCreate(name="", price=-5, category="main")
        
        # Выполнение и проверка
        with pytest.raises(ValidationError):
            self.service.create_menu_item(data)
```

### Интеграционные тесты
```python
def test_create_menu_item_integration(app, client):
    """Интеграционный тест создания блюда."""
    with app.app_context():
        # Подготовка
        data = {
            'name': 'Тестовое блюдо',
            'price': 15.50,
            'category': 'main'
        }
        
        # Выполнение
        response = client.post('/api/v1/menus/', json=data)
        
        # Проверка
        assert response.status_code == 201
        assert 'data' in response.json
        assert response.json['data']['name'] == 'Тестовое блюдо'
```

## Производительность

### Оптимизация запросов
```python
def get_menus_with_chefs(self, page=1, per_page=20):
    """Получить блюда с информацией о поварах."""
    # Использовать JOIN вместо отдельных запросов
    return self.repository.get_menus_with_chefs(page, per_page)
```

### Пагинация
```python
def get_menus_paginated(self, page=1, per_page=20):
    """Получить блюда с пагинацией."""
    offset = (page - 1) * per_page
    limit = per_page
    
    items = self.repository.get_menus(offset=offset, limit=limit)
    total = self.repository.count_menus()
    
    return {
        'items': items,
        'total': total,
        'page': page,
        'per_page': per_page,
        'pages': (total + per_page - 1) // per_page
    }
```

## Мониторинг

### Метрики
```python
import time

class MenuService:
    def create_menu_item(self, data):
        """Создание блюда с метриками."""
        start_time = time.time()
        
        try:
            result = self.repository.create(data)
            
            # Логировать метрики
            duration = time.time() - start_time
            logger.info("Метрика: создание блюда", extra={
                'operation': 'create_menu_item',
                'duration': duration,
                'success': True
            })
            
            return result
            
        except Exception as e:
            duration = time.time() - start_time
            logger.error("Метрика: ошибка создания блюда", extra={
                'operation': 'create_menu_item',
                'duration': duration,
                'success': False,
                'error': str(e)
            })
            raise
```

## Заключение

Папка `app/services/` - это **мозг** нашего приложения. Она:
- Содержит бизнес-логику
- Валидирует данные
- Координирует компоненты
- Обрабатывает ошибки
- Обеспечивает производительность
- Поддерживает мониторинг

Без сервисов наше приложение не смогло бы правильно работать с данными!


