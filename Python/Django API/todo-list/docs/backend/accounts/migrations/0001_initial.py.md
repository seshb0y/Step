# accounts/migrations/0001_initial.py

## Назначение
Файл `0001_initial.py` - это первая миграция для приложения `accounts`. Миграция создает таблицу пользователей в базе данных на основе модели `User`. Это автоматически сгенерированный файл, который Django создает при выполнении команды `makemigrations`.

## Контекст и зависимости
- **Django** - основной фреймворк
- **django.db.migrations** - модуль для работы с миграциями
- **accounts.models** - модель User

## Пошаговое объяснение кода

### 1. Импорты
```python
from django.conf import settings
from django.db import migrations, models
import django.contrib.auth.models
import django.contrib.auth.validators
import django.utils.timezone
```

#### Разбор импортов:
- **`settings`** - настройки Django
- **`migrations`** - модуль для создания миграций
- **`models`** - модуль для работы с моделями
- **`django.contrib.auth.models`** - встроенные модели аутентификации
- **`django.contrib.auth.validators`** - валидаторы для аутентификации
- **`django.utils.timezone`** - утилиты для работы с временем

### 2. Класс миграции
```python
class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = []
```

#### Разбор атрибутов:

##### `initial = True`
- **Назначение:** Указывает, что это первая миграция приложения
- **Функция:** Django знает, что не нужно искать предыдущие миграции

##### `dependencies = []`
- **Назначение:** Список зависимостей от других миграций
- **Пустой список:** Первая миграция не зависит ни от чего

##### `operations = []`
- **Назначение:** Список операций для выполнения
- **Содержимое:** Создание таблицы, индексов, ограничений

### 3. Операция создания таблицы
```python
migrations.CreateModel(
    name='User',
    fields=[
        ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
        ('password', models.CharField(max_length=128, verbose_name='password')),
        ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
        ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
        ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
        ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
        ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
        ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
        ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
        ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
        ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
        ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
        ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updated at')),
    ],
    options={
        'verbose_name': 'user',
        'verbose_name_plural': 'users',
        'abstract': False,
    },
    managers=[
        ('objects', django.contrib.auth.models.UserManager()),
    ],
)
```

#### Разбор полей таблицы:

##### Системные поля Django:
- **`id`** - первичный ключ (BigAutoField)
- **`password`** - хешированный пароль
- **`last_login`** - время последнего входа
- **`is_superuser`** - флаг суперпользователя
- **`is_staff`** - флаг сотрудника
- **`is_active`** - флаг активности
- **`date_joined`** - дата регистрации

##### Поля пользователя:
- **`username`** - имя пользователя (уникальное)
- **`first_name`** - имя
- **`last_name`** - фамилия
- **`email`** - email адрес (уникальный)

##### Наши кастомные поля:
- **`created_at`** - дата создания (auto_now_add=True)
- **`updated_at`** - дата обновления (auto_now=True)

### 4. Опции таблицы
```python
options={
    'verbose_name': 'user',
    'verbose_name_plural': 'users',
    'abstract': False,
}
```

#### Разбор опций:
- **`verbose_name`** - название в единственном числе
- **`verbose_name_plural`** - название во множественном числе
- **`abstract`** - не абстрактная модель (создает таблицу)

### 5. Менеджер модели
```python
managers=[
    ('objects', django.contrib.auth.models.UserManager()),
]
```
- **Назначение:** Указывает, какой менеджер использовать для работы с моделью
- **UserManager:** Стандартный менеджер Django для пользователей

## Что такое миграции Django?

### 1. Определение
Миграции - это файлы, которые описывают изменения в структуре базы данных:
- **Создание таблиц** - на основе моделей
- **Изменение полей** - добавление, удаление, изменение
- **Создание индексов** - для оптимизации запросов
- **Создание ограничений** - уникальность, внешние ключи

### 2. Как работают миграции
```
1. Изменяем модель в models.py
2. Выполняем python manage.py makemigrations
3. Django создает файл миграции
4. Выполняем python manage.py migrate
5. Django применяет изменения к БД
```

### 3. Преимущества миграций
- **Версионность** - отслеживание изменений БД
- **Откат** - возможность вернуться к предыдущему состоянию
- **Совместная работа** - команда может синхронизировать БД
- **Автоматизация** - Django сам генерирует SQL

## Как использовать миграции

### 1. Создание миграций
```bash
# Создание миграций для всех приложений
python manage.py makemigrations

# Создание миграций для конкретного приложения
python manage.py makemigrations accounts

# Создание пустой миграции
python manage.py makemigrations --empty accounts
```

### 2. Применение миграций
```bash
# Применение всех миграций
python manage.py migrate

# Применение миграций для конкретного приложения
python manage.py migrate accounts

# Применение конкретной миграции
python manage.py migrate accounts 0001
```

### 3. Откат миграций
```bash
# Откат к предыдущей миграции
python manage.py migrate accounts 0000

# Откат всех миграций приложения
python manage.py migrate accounts zero
```

### 4. Просмотр статуса миграций
```bash
# Показать все миграции
python manage.py showmigrations

# Показать SQL миграции
python manage.py sqlmigrate accounts 0001
```

## SQL код миграции

### 1. Создание таблицы
```sql
CREATE TABLE accounts_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    password VARCHAR(128) NOT NULL,
    last_login DATETIME,
    is_superuser BOOLEAN NOT NULL DEFAULT 0,
    username VARCHAR(150) NOT NULL UNIQUE,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(254) NOT NULL UNIQUE,
    is_staff BOOLEAN NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT 1,
    date_joined DATETIME NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);
```

### 2. Создание индексов
```sql
CREATE UNIQUE INDEX accounts_user_username ON accounts_user (username);
CREATE UNIQUE INDEX accounts_user_email ON accounts_user (email);
```

## Частые ошибки и как их избежать

### 1. "Migration already applied"
**Причина:** Миграция уже применена
**Решение:** Проверьте статус миграций командой `showmigrations`

### 2. "Table already exists"
**Причина:** Таблица уже существует в БД
**Решение:** Удалите таблицу вручную или используйте `--fake` флаг

### 3. "Circular dependency"
**Причина:** Циклическая зависимость между миграциями
**Решение:** Пересоздайте миграции или используйте `--merge`

## Почему выбрано именно так

### 1. Наследование от AbstractUser
- **Готовые поля** - получаем все стандартные поля Django
- **Совместимость** - работает с Django auth из коробки
- **Расширяемость** - можем добавить свои поля

### 2. BigAutoField для ID
- **Большой диапазон** - поддерживает больше записей
- **Современность** - рекомендуется для новых проектов
- **Совместимость** - работает с различными БД

### 3. Уникальные поля
- **username** - уникальное имя пользователя
- **email** - уникальный email адрес
- **Безопасность** - предотвращает дублирование

## Тестирование миграций

### 1. Тест применения миграции
```python
from django.test import TestCase
from django.db import connection

class MigrationTest(TestCase):
    def test_migration_applied(self):
        # Проверяем, что таблица создана
        with connection.cursor() as cursor:
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='accounts_user'")
            result = cursor.fetchone()
            self.assertIsNotNone(result)
```

### 2. Тест структуры таблицы
```python
def test_table_structure(self):
    with connection.cursor() as cursor:
        cursor.execute("PRAGMA table_info(accounts_user)")
        columns = cursor.fetchall()
        
        # Проверяем наличие ключевых полей
        column_names = [col[1] for col in columns]
        self.assertIn('username', column_names)
        self.assertIn('email', column_names)
        self.assertIn('created_at', column_names)
```

## Связанные файлы
- `accounts/models.py` - модель User
- `accounts/apps.py` - конфигурация приложения
- `todo_api/settings.py` - настройки AUTH_USER_MODEL

## Расширение миграций

### 1. Добавление новых полей
```python
# В models.py
class User(AbstractUser):
    # ... существующие поля
    phone = models.CharField(max_length=20, blank=True)

# Создание миграции
python manage.py makemigrations accounts
```

### 2. Изменение существующих полей
```python
# В models.py
class User(AbstractUser):
    # ... существующие поля
    email = models.EmailField(unique=True, max_length=100)  # Изменили max_length

# Создание миграции
python manage.py makemigrations accounts
```

### 3. Удаление полей
```python
# В models.py
class User(AbstractUser):
    # ... существующие поля
    # Удалили поле phone

# Создание миграции
python manage.py makemigrations accounts
```

## Лучшие практики

### 1. Именование
- Используйте понятные имена для миграций
- Группируйте связанные изменения
- Избегайте слишком больших миграций

### 2. Безопасность
- Всегда тестируйте миграции на копии БД
- Создавайте резервные копии перед применением
- Используйте транзакции для критических изменений

### 3. Производительность
- Применяйте миграции в нерабочее время
- Используйте индексы для больших таблиц
- Избегайте блокирующих операций

