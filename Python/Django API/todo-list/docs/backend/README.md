# Документация Django Backend

## Обзор проекта
Этот проект представляет собой Django REST API для управления задачами (todo-list) с аутентификацией пользователей. API предоставляет полный набор функций для создания, редактирования, удаления и сортировки задач.

## Структура проекта
```
todo-list/
├── todo_api/                 # Главное приложение Django
│   ├── __init__.py          # Инициализация пакета
│   ├── settings.py          # Настройки проекта
│   ├── urls.py              # Главные URL маршруты
│   ├── wsgi.py              # WSGI конфигурация
│   └── asgi.py              # ASGI конфигурация
├── accounts/                 # Приложение аутентификации
│   ├── models.py            # Модель пользователя
│   ├── views.py             # API представления
│   ├── serializers.py       # Сериализаторы
│   ├── urls.py              # URL маршруты
│   ├── admin.py             # Настройки админки
│   └── migrations/          # Миграции БД
├── tasks/                    # Приложение задач
│   ├── models.py            # Модель задач
│   ├── views.py             # API представления
│   ├── serializers.py       # Сериализаторы
│   ├── urls.py              # URL маршруты
│   ├── admin.py             # Настройки админки
│   └── migrations/          # Миграции БД
├── manage.py                # Скрипт управления
└── requirements.txt         # Зависимости
```

## Основные компоненты

### 1. Модели данных
- **User** - кастомная модель пользователя с дополнительными полями
- **Task** - модель задач с поддержкой сортировки и статусов

### 2. API Endpoints
- **Аутентификация:** `/api/auth/register/`, `/api/auth/login/`, `/api/auth/refresh/`
- **Задачи:** `/api/tasks/`, `/api/tasks/{id}/`, `/api/tasks/reorder/`

### 3. Аутентификация
- **JWT токены** - для безопасной аутентификации
- **Refresh токены** - для продления сессии
- **Права доступа** - только свои задачи

## Технологии
- **Django 4.2+** - основной фреймворк
- **Django REST Framework** - для создания API
- **JWT** - для аутентификации
- **SQLite** - база данных (для разработки)
- **CORS** - для работы с фронтендом

## Быстрый старт

### 1. Установка зависимостей
```bash
pip install -r requirements.txt
```

### 2. Применение миграций
```bash
python manage.py migrate
```

### 3. Создание суперпользователя
```bash
python manage.py createsuperuser
```

### 4. Запуск сервера
```bash
python manage.py runserver
```

### 5. Доступ к API
- **API:** http://localhost:8000/api/
- **Админка:** http://localhost:8000/admin/

## Документация файлов

### Основные файлы
- [manage.py](manage.py.md) - скрипт управления проектом
- [todo_api/__init__.py](todo_api/__init__.py.md) - инициализация пакета
- [todo_api/settings.py](todo_api/settings.py.md) - настройки проекта
- [todo_api/urls.py](todo_api/urls.py.md) - главные URL маршруты
- [todo_api/wsgi.py](todo_api/wsgi.py.md) - WSGI конфигурация
- [todo_api/asgi.py](todo_api/asgi.py.md) - ASGI конфигурация

### Приложение accounts
- [accounts/__init__.py](accounts/__init__.py.md) - инициализация приложения
- [accounts/apps.py](accounts/apps.py.md) - конфигурация приложения
- [accounts/models.py](accounts/models.py.md) - модель пользователя
- [accounts/views.py](accounts/views.py.md) - API представления
- [accounts/serializers.py](accounts/serializers.py.md) - сериализаторы
- [accounts/urls.py](accounts/urls.py.md) - URL маршруты
- [accounts/admin.py](accounts/admin.py.md) - настройки админки
- [accounts/migrations/0001_initial.py](accounts/migrations/0001_initial.py.md) - первая миграция

### Приложение tasks
- [tasks/__init__.py](tasks/__init__.py.md) - инициализация приложения
- [tasks/models.py](tasks/models.py.md) - модель задач
- [tasks/views.py](tasks/views.py.md) - API представления
- [tasks/serializers.py](tasks/serializers.py.md) - сериализаторы
- [tasks/urls.py](tasks/urls.py.md) - URL маршруты

## API Документация

### Аутентификация
```bash
# Регистрация
POST /api/auth/register/
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "password_confirm": "testpass123"
}

# Вход
POST /api/auth/login/
{
    "username": "testuser",
    "password": "testpass123"
}

# Обновление токена
POST /api/auth/refresh/
{
    "refresh": "your_refresh_token"
}
```

### Задачи
```bash
# Список задач
GET /api/tasks/
GET /api/tasks/?status=done
GET /api/tasks/?status=todo

# Создание задачи
POST /api/tasks/
{
    "title": "Новая задача"
}

# Обновление задачи
PATCH /api/tasks/1/
{
    "title": "Обновленная задача",
    "is_completed": true
}

# Изменение порядка
PATCH /api/tasks/reorder/
[
    {"id": 1, "order": 0},
    {"id": 2, "order": 1}
]

# Удаление задачи
DELETE /api/tasks/1/
```

## Тестирование

### 1. Запуск тестов
```bash
python manage.py test
```

### 2. Тестирование API
```bash
# Создание пользователя
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"testpass123","password_confirm":"testpass123"}'

# Вход
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'

# Создание задачи
curl -X POST http://localhost:8000/api/tasks/ \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Тестовая задача"}'
```

## Развертывание

### 1. Настройки для продакшна
```python
# В settings.py
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com']
SECRET_KEY = os.environ.get('SECRET_KEY')
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT'),
    }
}
```

### 2. Сборка статических файлов
```bash
python manage.py collectstatic
```

### 3. Запуск с Gunicorn
```bash
gunicorn todo_api.wsgi:application --bind 0.0.0.0:8000
```

## Безопасность

### 1. JWT токены
- Access токены живут 60 минут
- Refresh токены живут 7 дней
- Автоматическая ротация refresh токенов

### 2. CORS
- Настроен для работы с фронтендом
- В продакшне нужно ограничить домены

### 3. Валидация паролей
- Минимальная длина 8 символов
- Проверка на популярные пароли
- Проверка на схожесть с данными пользователя

## Мониторинг и отладка

### 1. Логирование
```python
# В settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
```

### 2. Отладка
```bash
# Django shell
python manage.py shell

# Проверка миграций
python manage.py showmigrations

# Проверка URL
python manage.py show_urls
```

## Поддержка и развитие

### 1. Добавление новых функций
- Создайте новое приложение: `python manage.py startapp new_app`
- Добавьте в `INSTALLED_APPS`
- Создайте модели, views, serializers
- Добавьте URL маршруты

### 2. Расширение API
- Добавьте новые endpoints в views.py
- Создайте сериализаторы для новых данных
- Обновите URL маршруты

### 3. Оптимизация
- Добавьте индексы для часто используемых полей
- Используйте `select_related()` для связанных объектов
- Настройте кэширование

## Заключение

Этот Django проект предоставляет полнофункциональный API для управления задачами с современной аутентификацией JWT. Код хорошо структурирован, документирован и готов к расширению. Все файлы имеют подробную документацию, которая поможет понять архитектуру и принципы работы проекта.

