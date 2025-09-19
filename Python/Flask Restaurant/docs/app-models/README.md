# app/models/ - Модели базы данных

## Описание папки

Папка `app/models/` содержит **модели базы данных** нашего приложения. Модели - это Python классы, которые представляют таблицы в базе данных. Каждый класс модели соответствует одной таблице, а каждый атрибут - одной колонке.

## Что такое модели базы данных?

**Модели базы данных** - это Python классы, которые описывают структуру таблиц в базе данных. Они позволяют работать с данными как с обычными Python объектами, не писать SQL запросы вручную.

### Пример модели
```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True)
```

**Что происходит:**
- Создается таблица `users` в базе данных
- Колонка `id` - целое число, первичный ключ
- Колонка `name` - строка до 50 символов, обязательная
- Колонка `email` - строка до 100 символов, уникальная

## Структура папки

```
app/models/
├── __init__.py          # Инициализация моделей
├── menu_item.py         # Модель блюда
└── chef.py              # Модель повара
```

## Файлы в папке

- [__init__.py](models-init.md) - Инициализация моделей
- [menu_item.py](menu-item.md) - Модель блюда меню
- [chef.py](chef.md) - Модель повара

## Основные концепции

### ORM (Object-Relational Mapping)
**ORM** - это технология, которая позволяет работать с базой данных как с Python объектами. Вместо написания SQL запросов, мы работаем с классами и атрибутами.

### SQLAlchemy
**SQLAlchemy** - это ORM для Python. Он:
- Преобразует Python код в SQL запросы
- Управляет подключением к базе данных
- Обеспечивает безопасность (защита от SQL инъекций)
- Поддерживает разные типы баз данных

### Связи между таблицами
Модели могут быть связаны между собой:
- **One-to-Many** (один ко многим) - один повар может готовить много блюд
- **Many-to-Many** (многие ко многим) - повар может готовить разные блюда
- **One-to-One** (один к одному) - один повар имеет один профиль

## Типы данных

### Основные типы
```python
# Целые числа
id = db.Column(db.Integer, primary_key=True)
age = db.Column(db.Integer, nullable=False)

# Строки
name = db.Column(db.String(50), nullable=False)
description = db.Column(db.Text)

# Числа с плавающей точкой
price = db.Column(db.Float)
rating = db.Column(db.Numeric(3, 2))  # 3 цифры, 2 после запятой

# Булевы значения
is_active = db.Column(db.Boolean, default=True)

# Даты и время
created_at = db.Column(db.DateTime, default=datetime.utcnow)
updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```

### Специальные типы
```python
# JSON данные
metadata = db.Column(db.JSON)

# Перечисления
status = db.Column(db.Enum('active', 'inactive'))

# Большие тексты
content = db.Column(db.Text)

# Двоичные данные
image = db.Column(db.LargeBinary)
```

## Ограничения и индексы

### Ограничения
```python
# Первичный ключ
id = db.Column(db.Integer, primary_key=True)

# Уникальность
email = db.Column(db.String(100), unique=True)

# Обязательность
name = db.Column(db.String(50), nullable=False)

# Значение по умолчанию
is_active = db.Column(db.Boolean, default=True)

# Проверка значений
age = db.Column(db.Integer, db.CheckConstraint('age >= 0'))
```

### Индексы
```python
# Обычный индекс
name = db.Column(db.String(50), index=True)

# Уникальный индекс
email = db.Column(db.String(100), unique=True)

# Составной индекс
__table_args__ = (
    db.Index('idx_name_email', 'name', 'email'),
)
```

## Связи между моделями

### One-to-Many (один ко многим)
```python
class Chef(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    # Связь с блюдами
    menu_items = db.relationship('MenuItem', backref='chef')

class MenuItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    chef_id = db.Column(db.Integer, db.ForeignKey('chef.id'))
```

### Many-to-Many (многие ко многим)
```python
# Промежуточная таблица
chef_menu_items = db.Table('chef_menu_items',
    db.Column('chef_id', db.Integer, db.ForeignKey('chef.id')),
    db.Column('menu_item_id', db.Integer, db.ForeignKey('menu_item.id'))
)

class Chef(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    menu_items = db.relationship('MenuItem', secondary=chef_menu_items, backref='chefs')

class MenuItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
```

## Методы моделей

### Магические методы
```python
def __repr__(self):
    """Строковое представление объекта."""
    return f'<User {self.name}>'

def __str__(self):
    """Человекочитаемое представление."""
    return self.name
```

### Пользовательские методы
```python
def is_adult(self):
    """Проверка, является ли пользователь взрослым."""
    return self.age >= 18

def get_full_name(self):
    """Получить полное имя."""
    return f"{self.first_name} {self.last_name}"
```

### Методы для работы с данными
```python
@classmethod
def find_by_email(cls, email):
    """Найти пользователя по email."""
    return cls.query.filter_by(email=email).first()

@classmethod
def get_active_users(cls):
    """Получить всех активных пользователей."""
    return cls.query.filter_by(is_active=True).all()
```

## Валидация данных

### Валидация на уровне модели
```python
from sqlalchemy.orm import validates

class User(db.Model):
    email = db.Column(db.String(100), unique=True)
    
    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError('Некорректный email')
        return email.lower()
```

### Валидация с помощью Pydantic
```python
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    age: int
```

## Миграции

### Создание миграции
```bash
# Создать миграцию
flask db migrate -m "Add users table"

# Применить миграцию
flask db upgrade
```

### Откат миграции
```bash
# Откатить последнюю миграцию
flask db downgrade

# Откатить до конкретной миграции
flask db downgrade abc123
```

## Тестирование моделей

### Создание тестовых данных
```python
def test_create_user():
    user = User(name='John', email='john@example.com')
    db.session.add(user)
    db.session.commit()
    
    assert user.id is not None
    assert user.name == 'John'
```

### Тестирование связей
```python
def test_chef_menu_relationship():
    chef = Chef(name='Иван')
    menu_item = MenuItem(name='Борщ', chef=chef)
    
    assert menu_item.chef == chef
    assert menu_item in chef.menu_items
```

## Производительность

### Ленивая загрузка
```python
# По умолчанию - ленивая загрузка
chef = Chef.query.get(1)
menu_items = chef.menu_items  # Запрос выполняется здесь
```

### Жадная загрузка
```python
# Загрузить сразу со связанными данными
chef = Chef.query.options(db.joinedload(Chef.menu_items)).get(1)
menu_items = chef.menu_items  # Запрос уже выполнен
```

### Пагинация
```python
# Получить пользователей по страницам
users = User.query.paginate(page=1, per_page=10)
```

## Заключение

Папка `app/models/` - это **основа данных** нашего приложения. Она:
- Определяет структуру базы данных
- Обеспечивает работу с данными через ORM
- Устанавливает связи между таблицами
- Предоставляет методы для работы с данными
- Поддерживает валидацию и ограничения

Без моделей мы не смогли бы работать с данными!


