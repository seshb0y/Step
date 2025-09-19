# app/models/menu_item.py - Модель блюда меню

## Описание файла

Файл `app/models/menu_item.py` содержит **модель блюда меню** - это Python класс, который представляет таблицу `menu_items` в базе данных. Каждый экземпляр этого класса соответствует одной записи в таблице.

## Что такое модель блюда?

**Модель блюда** - это описание структуры таблицы с блюдами в базе данных. Она определяет:
- Какие колонки есть в таблице
- Какие типы данных в каждой колонке
- Какие ограничения и правила
- Как блюда связаны с другими таблицами

## Подробный разбор кода

```python
"""Модель блюда меню."""

from datetime import datetime
from app.extensions import db


class MenuItem(db.Model):
    """Модель блюда меню."""
    
    __tablename__ = 'menu_items'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    is_available = db.Column(db.Boolean, default=True)
    chef_id = db.Column(db.Integer, db.ForeignKey('chefs.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<MenuItem {self.name}>'
```

### Строки 1-4: Импорты
```python
"""Модель блюда меню."""

from datetime import datetime
from app.extensions import db
```

**`from datetime import datetime`**
- **datetime** - класс для работы с датами и временем
- **Зачем нужен**: Для полей created_at и updated_at

**`from app.extensions import db`**
- **db** - объект SQLAlchemy для работы с базой данных
- **Зачем нужен**: Для создания колонок и таблицы

### Строки 7-9: Определение класса
```python
class MenuItem(db.Model):
    """Модель блюда меню."""
    
    __tablename__ = 'menu_items'
```

**`class MenuItem(db.Model):`**
- **MenuItem** - название нашего класса
- **db.Model** - базовый класс SQLAlchemy для всех моделей
- **Наследование**: MenuItem наследует функциональность от db.Model

**`__tablename__ = 'menu_items'`**
- **__tablename__** - специальный атрибут SQLAlchemy
- **'menu_items'** - имя таблицы в базе данных
- **Зачем нужно**: SQLAlchemy создаст таблицу с этим именем

### Строка 11: Первичный ключ
```python
id = db.Column(db.Integer, primary_key=True)
```

**`id`** - название колонки
**`db.Column()`** - создает колонку в таблице
**`db.Integer`** - тип данных (целое число)
**`primary_key=True`** - это первичный ключ

**Что такое первичный ключ:**
- Уникальный идентификатор каждой записи
- Автоматически увеличивается (1, 2, 3, ...)
- Не может быть пустым
- Используется для связи с другими таблицами

### Строка 12: Название блюда
```python
name = db.Column(db.String(100), nullable=False)
```

**`name`** - название колонки
**`db.String(100)`** - строка длиной до 100 символов
**`nullable=False`** - поле обязательно для заполнения

**Примеры значений:**
- "Борщ украинский"
- "Стейк Рибай"
- "Тирамису"

### Строка 13: Описание блюда
```python
description = db.Column(db.Text)
```

**`description`** - название колонки
**`db.Text`** - текст неограниченной длины
**`nullable=True`** - поле необязательное (по умолчанию)

**Примеры значений:**
- "Классический украинский борщ с мясом и сметаной"
- "Сочный стейк из говядины с картофелем"
- "Итальянский десерт с кофе и маскарпоне"

### Строка 14: Цена блюда
```python
price = db.Column(db.Numeric(10, 2), nullable=False)
```

**`price`** - название колонки
**`db.Numeric(10, 2)`** - число с фиксированной точностью
- **10** - общее количество цифр
- **2** - количество цифр после запятой
- **Максимальное значение**: 99999999.99
**`nullable=False`** - поле обязательно

**Примеры значений:**
- 15.50 (15 рублей 50 копеек)
- 250.00 (250 рублей)
- 0.99 (99 копеек)

### Строка 15: Категория блюда
```python
category = db.Column(db.String(50), nullable=False)
```

**`category`** - название колонки
**`db.String(50)`** - строка до 50 символов
**`nullable=False`** - поле обязательно

**Возможные значения:**
- "starter" (закуска)
- "main" (основное блюдо)
- "dessert" (десерт)
- "drink" (напиток)

### Строка 16: Доступность блюда
```python
is_available = db.Column(db.Boolean, default=True)
```

**`is_available`** - название колонки
**`db.Boolean`** - логический тип (True/False)
**`default=True`** - значение по умолчанию True

**Значения:**
- **True** - блюдо доступно для заказа
- **False** - блюдо временно недоступно

**Примеры использования:**
- Временно закончились ингредиенты
- Блюдо снято с меню
- Повар в отпуске

### Строка 17: Связь с поваром
```python
chef_id = db.Column(db.Integer, db.ForeignKey('chefs.id'))
```

**`chef_id`** - название колонки
**`db.Integer`** - целое число
**`db.ForeignKey('chefs.id')`** - внешний ключ

**Что такое внешний ключ:**
- Связывает эту таблицу с другой таблицей
- **'chefs.id'** - ссылается на колонку id в таблице chefs
- **Связь**: Один повар может готовить много блюд

**Примеры значений:**
- 1 (повар с ID 1)
- 5 (повар с ID 5)
- NULL (блюдо не привязано к повару)

### Строки 18-19: Временные метки
```python
created_at = db.Column(db.DateTime, default=datetime.utcnow)
updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```

**`created_at`** - дата создания записи
**`db.DateTime`** - тип данных дата и время
**`default=datetime.utcnow`** - значение по умолчанию (текущее время)

**`updated_at`** - дата последнего обновления
**`onupdate=datetime.utcnow`** - автоматически обновляется при изменении записи

**Примеры значений:**
- created_at: 2023-12-01 10:30:00
- updated_at: 2023-12-01 15:45:00

### Строки 21-22: Строковое представление
```python
def __repr__(self):
    return f'<MenuItem {self.name}>'
```

**`__repr__`** - магический метод Python
**Назначение**: Возвращает строковое представление объекта
**Использование**: Для отладки и логирования

**Примеры вывода:**
- `<MenuItem Борщ украинский>`
- `<MenuItem Стейк Рибай>`

## Создание таблицы в базе данных

### Автоматическое создание
```python
# Создать все таблицы
db.create_all()

# Результат: создается таблица menu_items со всеми колонками
```

### Структура таблицы
```sql
CREATE TABLE menu_items (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    chef_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chef_id) REFERENCES chefs(id)
);
```

## Работа с моделью

### Создание нового блюда
```python
# Создать объект
menu_item = MenuItem(
    name="Борщ украинский",
    description="Классический украинский борщ",
    price=15.50,
    category="main",
    is_available=True,
    chef_id=1
)

# Сохранить в базу данных
db.session.add(menu_item)
db.session.commit()
```

### Получение блюд
```python
# Получить все блюда
all_items = MenuItem.query.all()

# Получить блюдо по ID
item = MenuItem.query.get(1)

# Получить блюда по категории
main_dishes = MenuItem.query.filter_by(category='main').all()

# Получить доступные блюда
available_items = MenuItem.query.filter_by(is_available=True).all()
```

### Обновление блюда
```python
# Найти блюдо
item = MenuItem.query.get(1)

# Изменить цену
item.price = 18.00

# Сохранить изменения
db.session.commit()
```

### Удаление блюда
```python
# Найти блюдо
item = MenuItem.query.get(1)

# Удалить
db.session.delete(item)
db.session.commit()
```

## Связи с другими моделями

### Связь с поваром
```python
# Получить повара блюда
item = MenuItem.query.get(1)
chef = item.chef  # Если chef_id не NULL

# Получить все блюда повара
chef = Chef.query.get(1)
chef_dishes = chef.menu_items  # Если настроена связь
```

## Валидация данных

### Проверка обязательных полей
```python
def validate_menu_item(item):
    if not item.name:
        raise ValueError("Название блюда обязательно")
    if not item.price or item.price <= 0:
        raise ValueError("Цена должна быть больше 0")
    if not item.category:
        raise ValueError("Категория обязательна")
```

### Проверка уникальности
```python
def check_unique_name(name, category):
    existing = MenuItem.query.filter_by(name=name, category=category).first()
    if existing:
        raise ValueError("Блюдо с таким названием уже существует в категории")
```

## Индексы для производительности

### Добавление индексов
```python
class MenuItem(db.Model):
    # ... существующие поля ...
    
    __table_args__ = (
        db.Index('idx_category', 'category'),
        db.Index('idx_available', 'is_available'),
        db.Index('idx_price', 'price'),
    )
```

**Зачем нужны индексы:**
- Ускоряют поиск по колонкам
- Улучшают производительность запросов
- Особенно важны для часто используемых полей

## Заключение

Модель `MenuItem` - это **основа** для работы с блюдами в нашем API. Она:
- Определяет структуру таблицы menu_items
- Обеспечивает типизацию данных
- Устанавливает связи с другими таблицами
- Предоставляет методы для работы с данными
- Поддерживает валидацию и ограничения

Без этой модели мы не смогли бы хранить и обрабатывать информацию о блюдах!


