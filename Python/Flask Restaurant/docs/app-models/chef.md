# app/models/chef.py - Модель повара

## Описание файла

Файл `app/models/chef.py` содержит **модель повара** - это Python класс, который представляет таблицу `chefs` в базе данных. Каждый экземпляр этого класса соответствует одному повару в ресторане.

## Что такое модель повара?

**Модель повара** - это описание структуры таблицы с поварами в базе данных. Она определяет:
- Какие данные хранятся о каждом поваре
- Какие типы данных используются
- Какие ограничения и правила применяются
- Как повары связаны с блюдами

## Подробный разбор кода

```python
"""Модель повара."""

from datetime import datetime
from app.extensions import db


class Chef(db.Model):
    """Модель повара."""
    
    __tablename__ = 'chefs'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    specialty = db.Column(db.String(100))
    hire_date = db.Column(db.Date)
    bio = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Chef {self.name}>'
```

### Строки 1-4: Импорты
```python
"""Модель повара."""

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
class Chef(db.Model):
    """Модель повара."""
    
    __tablename__ = 'chefs'
```

**`class Chef(db.Model):`**
- **Chef** - название нашего класса
- **db.Model** - базовый класс SQLAlchemy для всех моделей
- **Наследование**: Chef наследует функциональность от db.Model

**`__tablename__ = 'chefs'`**
- **__tablename__** - специальный атрибут SQLAlchemy
- **'chefs'** - имя таблицы в базе данных
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
- Уникальный идентификатор каждого повара
- Автоматически увеличивается (1, 2, 3, ...)
- Не может быть пустым
- Используется для связи с блюдами

### Строка 12: Имя повара
```python
name = db.Column(db.String(100), nullable=False)
```

**`name`** - название колонки
**`db.String(100)`** - строка длиной до 100 символов
**`nullable=False`** - поле обязательно для заполнения

**Примеры значений:**
- "Иван Петров"
- "Мария Сидорова"
- "Александр Козлов"

### Строка 13: Специализация повара
```python
specialty = db.Column(db.String(100))
```

**`specialty`** - название колонки
**`db.String(100)`** - строка до 100 символов
**`nullable=True`** - поле необязательное (по умолчанию)

**Примеры значений:**
- "Азиатская кухня"
- "Итальянская кухня"
- "Французская кухня"
- "Вегетарианская кухня"

### Строка 14: Дата найма
```python
hire_date = db.Column(db.Date)
```

**`hire_date`** - название колонки
**`db.Date`** - тип данных дата (без времени)
**`nullable=True`** - поле необязательное

**Примеры значений:**
- 2023-01-15
- 2022-06-01
- 2021-03-10

**Зачем нужно:**
- Отслеживание стажа работы
- Расчет зарплаты
- Планирование отпусков

### Строка 15: Биография повара
```python
bio = db.Column(db.Text)
```

**`bio`** - название колонки (сокращение от biography)
**`db.Text`** - текст неограниченной длины
**`nullable=True`** - поле необязательное

**Примеры значений:**
- "Опытный повар с 10-летним стажем работы в ресторанах Москвы. Специализируется на итальянской кухне."
- "Выпускник кулинарной школы Le Cordon Bleu. Работал в ресторанах Парижа и Лондона."

### Строки 16-17: Временные метки
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

### Строки 19-20: Строковое представление
```python
def __repr__(self):
    return f'<Chef {self.name}>'
```

**`__repr__`** - магический метод Python
**Назначение**: Возвращает строковое представление объекта
**Использование**: Для отладки и логирования

**Примеры вывода:**
- `<Chef Иван Петров>`
- `<Chef Мария Сидорова>`

## Создание таблицы в базе данных

### Автоматическое создание
```python
# Создать все таблицы
db.create_all()

# Результат: создается таблица chefs со всеми колонками
```

### Структура таблицы
```sql
CREATE TABLE chefs (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100),
    hire_date DATE,
    bio TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Работа с моделью

### Создание нового повара
```python
# Создать объект
chef = Chef(
    name="Иван Петров",
    specialty="Азиатская кухня",
    hire_date=date(2023, 1, 15),
    bio="Опытный повар с 5-летним стажем"
)

# Сохранить в базу данных
db.session.add(chef)
db.session.commit()
```

### Получение поваров
```python
# Получить всех поваров
all_chefs = Chef.query.all()

# Получить повара по ID
chef = Chef.query.get(1)

# Получить поваров по специализации
asian_chefs = Chef.query.filter_by(specialty='Азиатская кухня').all()

# Поиск по имени
chef = Chef.query.filter(Chef.name.like('%Иван%')).first()
```

### Обновление повара
```python
# Найти повара
chef = Chef.query.get(1)

# Изменить специализацию
chef.specialty = "Итальянская кухня"

# Сохранить изменения
db.session.commit()
```

### Удаление повара
```python
# Найти повара
chef = Chef.query.get(1)

# Удалить
db.session.delete(chef)
db.session.commit()
```

## Связи с другими моделями

### Связь с блюдами (One-to-Many)
```python
# В модели Chef добавить связь
class Chef(db.Model):
    # ... существующие поля ...
    
    # Связь с блюдами
    menu_items = db.relationship('MenuItem', backref='chef')

# Использование
chef = Chef.query.get(1)
chef_dishes = chef.menu_items  # Все блюда этого повара

menu_item = MenuItem.query.get(1)
chef = menu_item.chef  # Повар этого блюда
```

## Дополнительные методы

### Вычисляемые поля
```python
class Chef(db.Model):
    # ... существующие поля ...
    
    @property
    def experience_years(self):
        """Стаж работы в годах."""
        if self.hire_date:
            today = date.today()
            return (today - self.hire_date).days // 365
        return 0
    
    @property
    def dishes_count(self):
        """Количество блюд повара."""
        return len(self.menu_items) if hasattr(self, 'menu_items') else 0
```

### Методы поиска
```python
class Chef(db.Model):
    # ... существующие поля ...
    
    @classmethod
    def find_by_specialty(cls, specialty):
        """Найти поваров по специализации."""
        return cls.query.filter_by(specialty=specialty).all()
    
    @classmethod
    def find_experienced(cls, min_years=5):
        """Найти опытных поваров."""
        cutoff_date = date.today() - timedelta(days=min_years * 365)
        return cls.query.filter(cls.hire_date <= cutoff_date).all()
```

## Валидация данных

### Проверка обязательных полей
```python
def validate_chef(chef):
    if not chef.name:
        raise ValueError("Имя повара обязательно")
    if chef.hire_date and chef.hire_date > date.today():
        raise ValueError("Дата найма не может быть в будущем")
```

### Проверка уникальности имени
```python
def check_unique_name(name, exclude_id=None):
    query = Chef.query.filter_by(name=name)
    if exclude_id:
        query = query.filter(Chef.id != exclude_id)
    existing = query.first()
    if existing:
        raise ValueError("Повар с таким именем уже существует")
```

## Индексы для производительности

### Добавление индексов
```python
class Chef(db.Model):
    # ... существующие поля ...
    
    __table_args__ = (
        db.Index('idx_specialty', 'specialty'),
        db.Index('idx_hire_date', 'hire_date'),
        db.Index('idx_name', 'name'),
    )
```

**Зачем нужны индексы:**
- Ускоряют поиск по колонкам
- Улучшают производительность запросов
- Особенно важны для часто используемых полей

## Расширение модели

### Добавление новых полей
```python
class Chef(db.Model):
    # ... существующие поля ...
    
    # Новые поля
    phone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    salary = db.Column(db.Numeric(10, 2))
    is_active = db.Column(db.Boolean, default=True)
```

### Добавление связей
```python
class Chef(db.Model):
    # ... существующие поля ...
    
    # Связь с заказами
    orders = db.relationship('Order', backref='chef')
    
    # Связь с сменами
    shifts = db.relationship('Shift', backref='chef')
```

## Заключение

Модель `Chef` - это **основа** для работы с поварами в нашем API. Она:
- Определяет структуру таблицы chefs
- Обеспечивает типизацию данных
- Предоставляет методы для работы с данными
- Поддерживает валидацию и ограничения
- Может быть расширена дополнительными полями и связями

Без этой модели мы не смогли бы хранить и обрабатывать информацию о поварах!


