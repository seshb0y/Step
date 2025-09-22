# accounts/models.py

## Назначение
Файл `models.py` содержит модели данных для приложения `accounts`. Модели определяют структуру данных пользователей, их поля, связи и поведение. В Django модели автоматически создают таблицы в базе данных.

## Контекст и зависимости
- **Django** - основной фреймворк
- **django.contrib.auth.models** - базовые модели аутентификации Django
- **django.db.models** - модуль для работы с моделями базы данных
- **AbstractUser** - базовый класс для пользователей

## Пошаговое объяснение кода

### 1. Импорты
```python
from django.contrib.auth.models import AbstractUser
from django.db import models
```
- `AbstractUser` - базовый класс Django для пользователей
- `models` - модуль Django для создания моделей данных

### 2. Определение модели User
```python
class User(AbstractUser):
    """Расширенная модель пользователя"""
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'accounts_user'

    def __str__(self):
        return self.email
```

#### Разбор каждого элемента:

##### `class User(AbstractUser):`
- **Наследование:** Наследуется от `AbstractUser` Django
- **Преимущества:** Получаем все стандартные поля пользователя
- **Кастомизация:** Можем добавить свои поля и методы

##### `email = models.EmailField(unique=True)`
- **Тип поля:** EmailField - поле для email адресов
- **unique=True:** Email должен быть уникальным в базе данных
- **Валидация:** Django автоматически проверяет формат email
- **Индексы:** Django создает уникальный индекс для быстрого поиска

##### `created_at = models.DateTimeField(auto_now_add=True)`
- **Тип поля:** DateTimeField - поле для даты и времени
- **auto_now_add=True:** Автоматически устанавливает текущее время при создании записи
- **Неизменяемость:** Поле не изменяется при обновлении записи
- **Использование:** Для отслеживания времени регистрации

##### `updated_at = models.DateTimeField(auto_now=True)`
- **Тип поля:** DateTimeField - поле для даты и времени
- **auto_now=True:** Автоматически обновляет время при каждом изменении записи
- **Изменяемость:** Поле обновляется при каждом save()
- **Использование:** Для отслеживания последнего изменения

##### `USERNAME_FIELD = 'email'`
- **Назначение:** Указывает Django, какое поле использовать для входа
- **Значение:** 'email' - пользователи входят по email, а не по username
- **Влияние:** Изменяет поведение форм входа и регистрации
- **Безопасность:** Email обычно уникален и легко запоминается

##### `REQUIRED_FIELDS = ['username']`
- **Назначение:** Поля, обязательные при создании пользователя через команду createsuperuser
- **Значение:** ['username'] - username обязателен при создании суперпользователя
- **Исключение:** USERNAME_FIELD автоматически исключается из REQUIRED_FIELDS
- **Использование:** Для командной строки и админки

##### `class Meta:`
- **Назначение:** Мета-класс для дополнительных настроек модели
- **db_table = 'accounts_user':** Имя таблицы в базе данных
- **Преимущества:** Избегает конфликтов с встроенной моделью User Django

##### `def __str__(self):`
- **Назначение:** Строковое представление объекта
- **Возврат:** self.email - что показывать при выводе объекта
- **Использование:** В админке, shell, отладке

## Что такое модель Django?

### 1. Определение
Модель Django - это класс Python, который:
- Описывает структуру таблицы в базе данных
- Автоматически создает SQL для работы с данными
- Предоставляет API для работы с данными
- Включает валидацию и ограничения

### 2. Связь с базой данных
```
Python модель → Django ORM → SQL → База данных
     ↓              ↓         ↓
class User    →   ORM    →  CREATE TABLE
```

### 3. Автоматические возможности
- **Создание таблиц** - автоматически создает SQL CREATE TABLE
- **Валидация** - проверяет данные перед сохранением
- **Связи** - ForeignKey, OneToOneField, ManyToManyField
- **Индексы** - автоматически создает индексы для уникальных полей

## Наследование от AbstractUser

### 1. Что получаем от AbstractUser
```python
# Стандартные поля Django User:
username        # Имя пользователя
first_name      # Имя
last_name       # Фамилия
email           # Email
is_staff        # Сотрудник
is_active       # Активен
is_superuser    # Суперпользователь
date_joined     # Дата регистрации
last_login      # Последний вход
password        # Пароль (хешированный)
groups          # Группы пользователей
user_permissions # Права доступа
```

### 2. Преимущества наследования
- **Готовые поля** - не нужно создавать базовые поля
- **Встроенная аутентификация** - работает с Django auth
- **Админка** - автоматическая поддержка админки
- **Права доступа** - встроенная система разрешений

### 3. Кастомизация
- **Дополнительные поля** - добавляем свои поля
- **Изменение поведения** - переопределяем методы
- **Валидация** - добавляем свою валидацию

## Типы полей Django

### 1. Строковые поля
```python
# CharField - короткие строки
username = models.CharField(max_length=150, unique=True)

# TextField - длинные тексты
bio = models.TextField(blank=True)

# EmailField - email адреса
email = models.EmailField(unique=True)

# URLField - веб-адреса
website = models.URLField(blank=True)
```

### 2. Числовые поля
```python
# IntegerField - целые числа
age = models.IntegerField()

# PositiveIntegerField - положительные целые
score = models.PositiveIntegerField()

# DecimalField - десятичные числа
price = models.DecimalField(max_digits=10, decimal_places=2)

# FloatField - числа с плавающей точкой
rating = models.FloatField()
```

### 3. Поля даты и времени
```python
# DateTimeField - дата и время
created_at = models.DateTimeField(auto_now_add=True)

# DateField - только дата
birth_date = models.DateField()

# TimeField - только время
login_time = models.TimeField()
```

### 4. Логические поля
```python
# BooleanField - да/нет
is_active = models.BooleanField(default=True)

# NullBooleanField - да/нет/неизвестно
is_verified = models.NullBooleanField()
```

## Параметры полей

### 1. Обязательность
```python
# Обязательное поле
email = models.EmailField()  # NOT NULL

# Необязательное поле
bio = models.TextField(blank=True)  # Может быть пустым

# Поле с NULL
phone = models.CharField(null=True, blank=True)  # Может быть NULL
```

### 2. Уникальность
```python
# Уникальное поле
email = models.EmailField(unique=True)

# Уникальное в рамках группы
username = models.CharField(unique=True)

# Составной уникальный ключ
class Meta:
    unique_together = ['email', 'username']
```

### 3. Значения по умолчанию
```python
# Статическое значение по умолчанию
is_active = models.BooleanField(default=True)

# Функция по умолчанию
def default_username():
    return f"user_{uuid.uuid4().hex[:8]}"

username = models.CharField(default=default_username)
```

## Частые ошибки и как их избежать

### 1. "Field 'id' does not have a default value"
**Причина:** Неправильная настройка первичного ключа
**Решение:**
```python
class User(AbstractUser):
    # Django автоматически создает id поле
    # Не нужно определять его вручную
    pass
```

### 2. "UNIQUE constraint failed"
**Причина:** Попытка создать пользователя с существующим email
**Решение:**
```python
# Проверка перед созданием
if not User.objects.filter(email=email).exists():
    User.objects.create_user(email=email, username=username)
```

### 3. "Cannot assign to 'id'"
**Причина:** Попытка изменить автоматически создаваемое поле
**Решение:**
```python
# НЕ ДЕЛАЙТЕ ТАК:
user.id = 123

# ДЕЛАЙТЕ ТАК:
user = User.objects.create_user(email=email)
# id будет создан автоматически
```

## Почему выбрано именно так

### 1. Расширение стандартной модели
- **AbstractUser** - получаем все стандартные поля Django
- **Дополнительные поля** - добавляем нужную функциональность
- **Совместимость** - работает с Django auth из коробки

### 2. Email как username
- **Уникальность** - email обычно уникален
- **Удобство** - пользователи помнят свой email
- **Безопасность** - email сложнее подделать

### 3. Временные метки
- **created_at** - отслеживание времени регистрации
- **updated_at** - отслеживание изменений
- **Аудит** - возможность отследить историю изменений

## Миграции модели

### 1. Создание миграций
```bash
# Создание миграций для модели
python manage.py makemigrations accounts

# Применение миграций
python manage.py migrate accounts
```

### 2. SQL миграции
```sql
-- Django создает примерно такой SQL:
CREATE TABLE accounts_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(150) UNIQUE NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    is_active BOOLEAN NOT NULL DEFAULT 1,
    is_staff BOOLEAN NOT NULL DEFAULT 0,
    is_superuser BOOLEAN NOT NULL DEFAULT 0,
    date_joined DATETIME NOT NULL,
    last_login DATETIME,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);
```

## Использование модели

### 1. Создание пользователя
```python
# Создание обычного пользователя
user = User.objects.create_user(
    username='john',
    email='john@example.com',
    password='secret123'
)

# Создание суперпользователя
admin = User.objects.create_superuser(
    username='admin',
    email='admin@example.com',
    password='admin123'
)
```

### 2. Поиск пользователей
```python
# Поиск по email
user = User.objects.get(email='john@example.com')

# Поиск по username
user = User.objects.get(username='john')

# Поиск активных пользователей
active_users = User.objects.filter(is_active=True)

# Поиск по дате создания
recent_users = User.objects.filter(created_at__gte=timezone.now() - timedelta(days=7))
```

### 3. Обновление пользователя
```python
# Обновление полей
user.first_name = 'John'
user.last_name = 'Doe'
user.save()

# Обновление пароля
user.set_password('new_password')
user.save()
```

## Связанные файлы
- `accounts/views.py` - представления для работы с пользователями
- `accounts/serializers.py` - сериализаторы для API
- `accounts/admin.py` - настройки админки
- `todo_api/settings.py` - настройки AUTH_USER_MODEL
- `migrations/` - файлы миграций

## Тестирование модели

### 1. Тест создания пользователя
```python
# accounts/tests.py
from django.test import TestCase
from accounts.models import User

class UserModelTest(TestCase):
    def test_user_creation(self):
        user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.check_password('testpass123'))
```

### 2. Тест уникальности email
```python
def test_email_uniqueness(self):
    User.objects.create_user(
        username='user1',
        email='test@example.com',
        password='pass123'
    )
    
    with self.assertRaises(Exception):
        User.objects.create_user(
            username='user2',
            email='test@example.com',
            password='pass123'
        )
```

## Лучшие практики

### 1. Именование
- Используйте понятные имена полей
- `created_at` лучше чем `created`
- `is_active` лучше чем `active`

### 2. Валидация
- Добавляйте валидацию на уровне модели
- Используйте `clean()` метод для сложной валидации
- Проверяйте данные перед сохранением

### 3. Производительность
- Используйте `select_related()` для связанных объектов
- Добавляйте индексы для часто используемых полей
- Избегайте N+1 запросов

