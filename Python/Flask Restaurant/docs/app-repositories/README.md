# app/repositories/ - Слой доступа к данным

## Описание папки

Папка `app/repositories/` содержит **репозитории** - классы, которые отвечают за работу с данными в базе данных. Репозитории абстрагируют работу с базой данных и предоставляют простой интерфейс для выполнения CRUD операций.

## Что такое репозиторий?

**Репозиторий** - это паттерн проектирования, который инкапсулирует логику доступа к данным. Он:
- Скрывает детали работы с базой данных
- Предоставляет единый интерфейс для работы с данными
- Упрощает тестирование
- Позволяет легко менять источник данных

### Пример репозитория
```python
class MenuRepository:
    def create(self, data):
        """Создать новую запись."""
        menu_item = MenuItem(**data)
        db.session.add(menu_item)
        db.session.commit()
        return menu_item
    
    def get_by_id(self, item_id):
        """Получить запись по ID."""
        return MenuItem.query.get(item_id)
```

## Структура папки

```
app/repositories/
├── __init__.py          # Инициализация репозиториев
├── menu_repo.py         # Репозиторий для блюд
└── chef_repo.py         # Репозиторий для поваров
```

## Файлы в папке

- [__init__.py](repositories-init.md) - Инициализация репозиториев
- [menu_repo.py](menu-repo.md) - Репозиторий для блюд
- [chef_repo.py](chef-repo.md) - Репозиторий для поваров

## Основные концепции

### CRUD операции
**CRUD** - это базовые операции с данными:
- **Create** - создание новых записей
- **Read** - чтение существующих записей
- **Update** - обновление записей
- **Delete** - удаление записей

### Абстракция данных
Репозиторий скрывает детали работы с базой данных:
- SQL запросы
- Типы баз данных
- Соединения с базой
- Транзакции

### Единый интерфейс
Все репозитории предоставляют похожий интерфейс:
- `create(data)` - создание
- `get_by_id(id)` - получение по ID
- `get_all()` - получение всех записей
- `update(id, data)` - обновление
- `delete(id)` - удаление

## Пример репозитория

### Базовая структура
```python
class MenuRepository:
    """Репозиторий для работы с блюдами меню."""
    
    def create(self, data):
        """Создание нового блюда."""
        menu_item = MenuItem(**data)
        db.session.add(menu_item)
        db.session.commit()
        return menu_item
    
    def get_by_id(self, item_id):
        """Получение блюда по ID."""
        return MenuItem.query.get(item_id)
    
    def get_all(self):
        """Получение всех блюд."""
        return MenuItem.query.all()
    
    def update(self, item_id, data):
        """Обновление блюда."""
        menu_item = MenuItem.query.get(item_id)
        if menu_item:
            for key, value in data.items():
                setattr(menu_item, key, value)
            db.session.commit()
        return menu_item
    
    def delete(self, item_id):
        """Удаление блюда."""
        menu_item = MenuItem.query.get(item_id)
        if menu_item:
            db.session.delete(menu_item)
            db.session.commit()
        return menu_item
```

## Фильтрация и поиск

### Простые фильтры
```python
def get_by_category(self, category):
    """Получить блюда по категории."""
    return MenuItem.query.filter_by(category=category).all()

def get_available(self):
    """Получить доступные блюда."""
    return MenuItem.query.filter_by(is_available=True).all()

def get_by_price_range(self, min_price, max_price):
    """Получить блюда по диапазону цен."""
    return MenuItem.query.filter(
        MenuItem.price >= min_price,
        MenuItem.price <= max_price
    ).all()
```

### Сложные фильтры
```python
def get_filtered(self, filters):
    """Получить блюда с фильтрами."""
    query = MenuItem.query
    
    if filters.get('category'):
        query = query.filter_by(category=filters['category'])
    
    if filters.get('min_price'):
        query = query.filter(MenuItem.price >= filters['min_price'])
    
    if filters.get('max_price'):
        query = query.filter(MenuItem.price <= filters['max_price'])
    
    if filters.get('is_available') is not None:
        query = query.filter_by(is_available=filters['is_available'])
    
    if filters.get('search'):
        search_term = f"%{filters['search']}%"
        query = query.filter(
            or_(
                MenuItem.name.ilike(search_term),
                MenuItem.description.ilike(search_term)
            )
        )
    
    return query.all()
```

### Сортировка
```python
def get_sorted(self, sort_by='name', sort_order='asc'):
    """Получить блюда с сортировкой."""
    query = MenuItem.query
    
    if sort_by == 'name':
        if sort_order == 'desc':
            query = query.order_by(MenuItem.name.desc())
        else:
            query = query.order_by(MenuItem.name.asc())
    
    elif sort_by == 'price':
        if sort_order == 'desc':
            query = query.order_by(MenuItem.price.desc())
        else:
            query = query.order_by(MenuItem.price.asc())
    
    return query.all()
```

## Пагинация

### Простая пагинация
```python
def get_paginated(self, page=1, per_page=20):
    """Получить блюда с пагинацией."""
    offset = (page - 1) * per_page
    return MenuItem.query.offset(offset).limit(per_page).all()

def count(self):
    """Получить общее количество блюд."""
    return MenuItem.query.count()
```

### Продвинутая пагинация
```python
def get_paginated_with_filters(self, filters, page=1, per_page=20):
    """Получить блюда с фильтрами и пагинацией."""
    query = self._build_query(filters)
    
    # Получить общее количество
    total = query.count()
    
    # Применить пагинацию
    offset = (page - 1) * per_page
    items = query.offset(offset).limit(per_page).all()
    
    return {
        'items': items,
        'total': total,
        'page': page,
        'per_page': per_page,
        'pages': (total + per_page - 1) // per_page
    }
```

## Связи между таблицами

### Загрузка связанных данных
```python
def get_with_chef(self, item_id):
    """Получить блюдо с информацией о поваре."""
    return MenuItem.query.options(
        db.joinedload(MenuItem.chef)
    ).get(item_id)

def get_all_with_chefs(self):
    """Получить все блюда с поварами."""
    return MenuItem.query.options(
        db.joinedload(MenuItem.chef)
    ).all()
```

### Запросы с JOIN
```python
def get_by_chef_specialty(self, specialty):
    """Получить блюда по специализации повара."""
    return MenuItem.query.join(Chef).filter(
        Chef.specialty == specialty
    ).all()
```

## Агрегатные функции

### Подсчет записей
```python
def count_by_category(self, category):
    """Подсчитать блюда по категории."""
    return MenuItem.query.filter_by(category=category).count()

def count_available(self):
    """Подсчитать доступные блюда."""
    return MenuItem.query.filter_by(is_available=True).count()
```

### Статистика
```python
def get_price_stats(self):
    """Получить статистику по ценам."""
    from sqlalchemy import func
    
    stats = db.session.query(
        func.min(MenuItem.price).label('min_price'),
        func.max(MenuItem.price).label('max_price'),
        func.avg(MenuItem.price).label('avg_price'),
        func.count(MenuItem.id).label('total_items')
    ).first()
    
    return {
        'min_price': float(stats.min_price) if stats.min_price else 0,
        'max_price': float(stats.max_price) if stats.max_price else 0,
        'avg_price': float(stats.avg_price) if stats.avg_price else 0,
        'total_items': stats.total_items
    }
```

## Транзакции

### Управление транзакциями
```python
def create_with_chef(self, menu_data, chef_data):
    """Создать блюдо и повара в одной транзакции."""
    try:
        # Создать повара
        chef = Chef(**chef_data)
        db.session.add(chef)
        db.session.flush()  # Получить ID повара
        
        # Создать блюдо
        menu_data['chef_id'] = chef.id
        menu_item = MenuItem(**menu_data)
        db.session.add(menu_item)
        
        # Сохранить все изменения
        db.session.commit()
        
        return menu_item
        
    except Exception as e:
        # Откатить транзакцию при ошибке
        db.session.rollback()
        raise
```

### Batch операции
```python
def create_batch(self, items_data):
    """Создать несколько блюд за один раз."""
    try:
        items = []
        for data in items_data:
            item = MenuItem(**data)
            db.session.add(item)
            items.append(item)
        
        db.session.commit()
        return items
        
    except Exception as e:
        db.session.rollback()
        raise
```

## Кэширование

### Простое кэширование
```python
from functools import lru_cache

class MenuRepository:
    @lru_cache(maxsize=128)
    def get_categories(self):
        """Получить список категорий (кэшируется)."""
        return db.session.query(MenuItem.category).distinct().all()
    
    def clear_cache(self):
        """Очистить кэш."""
        self.get_categories.cache_clear()
```

### Кэширование с TTL
```python
import time

class MenuRepository:
    def __init__(self):
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
        data = MenuItem.query.filter_by(is_available=True).order_by(
            MenuItem.created_at.desc()
        ).limit(10).all()
        
        # Сохранить в кэш
        self._cache[cache_key] = (data, now)
        
        return data
```

## Обработка ошибок

### Обработка ошибок базы данных
```python
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

def create(self, data):
    """Создание с обработкой ошибок."""
    try:
        menu_item = MenuItem(**data)
        db.session.add(menu_item)
        db.session.commit()
        return menu_item
        
    except IntegrityError as e:
        db.session.rollback()
        if 'UNIQUE constraint failed' in str(e):
            raise ConflictError("Блюдо с таким названием уже существует")
        else:
            raise ValidationError("Ошибка целостности данных")
            
    except SQLAlchemyError as e:
        db.session.rollback()
        raise DatabaseError(f"Ошибка базы данных: {e}")
```

### Логирование ошибок
```python
import logging

logger = logging.getLogger(__name__)

def create(self, data):
    """Создание с логированием."""
    try:
        menu_item = MenuItem(**data)
        db.session.add(menu_item)
        db.session.commit()
        
        logger.info(f"Блюдо создано: {menu_item.name}")
        return menu_item
        
    except Exception as e:
        logger.error(f"Ошибка создания блюда: {e}")
        db.session.rollback()
        raise
```

## Тестирование репозиториев

### Unit тесты
```python
import pytest
from unittest.mock import Mock, patch

class TestMenuRepository:
    def setup_method(self):
        self.repo = MenuRepository()
    
    @patch('app.extensions.db')
    def test_create_success(self, mock_db):
        """Тест успешного создания."""
        # Подготовка
        data = {'name': 'Тест', 'price': 15.50, 'category': 'main'}
        mock_item = Mock()
        mock_db.session.add.return_value = None
        mock_db.session.commit.return_value = None
        
        # Выполнение
        result = self.repo.create(data)
        
        # Проверка
        mock_db.session.add.assert_called_once()
        mock_db.session.commit.assert_called_once()
```

### Интеграционные тесты
```python
def test_create_integration(app):
    """Интеграционный тест создания."""
    with app.app_context():
        # Подготовка
        data = {
            'name': 'Тестовое блюдо',
            'price': 15.50,
            'category': 'main'
        }
        
        # Выполнение
        result = self.repo.create(data)
        
        # Проверка
        assert result.id is not None
        assert result.name == 'Тестовое блюдо'
        
        # Проверить в базе данных
        saved_item = MenuItem.query.get(result.id)
        assert saved_item is not None
        assert saved_item.name == 'Тестовое блюдо'
```

## Производительность

### Оптимизация запросов
```python
def get_menus_optimized(self):
    """Оптимизированный запрос для получения блюд."""
    # Использовать select_related для избежания N+1 запросов
    return MenuItem.query.options(
        db.joinedload(MenuItem.chef)
    ).all()
```

### Индексы
```python
# В модели добавить индексы
class MenuItem(db.Model):
    # ... поля ...
    
    __table_args__ = (
        db.Index('idx_category', 'category'),
        db.Index('idx_price', 'price'),
        db.Index('idx_available', 'is_available'),
    )
```

## Заключение

Папка `app/repositories/` - это **мост** между приложением и базой данных. Она:
- Абстрагирует работу с данными
- Предоставляет единый интерфейс
- Упрощает тестирование
- Обеспечивает производительность
- Обрабатывает ошибки
- Поддерживает кэширование

Без репозиториев мы не смогли бы эффективно работать с данными!


