# todo_api/settings.py

## Назначение
Файл `settings.py` содержит все настройки Django проекта. Это центральный файл конфигурации, который определяет, как Django должен работать: база данных, приложения, middleware, безопасность, API и многое другое.

## Контекст и зависимости
- **Django** - основной фреймворк
- **Django REST Framework** - для создания API
- **JWT** - для аутентификации
- **CORS** - для работы с фронтендом
- **База данных** - SQLite для разработки

## Пошаговое объяснение кода

### 1. Базовые настройки Django
```python
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'django-insecure-your-secret-key-here'
DEBUG = True
ALLOWED_HOSTS = []
```

#### Разбор базовых настроек:

##### `BASE_DIR = Path(__file__).resolve().parent.parent`
- **Назначение:** Путь к корневой папке проекта
- **Использование:** Для построения абсолютных путей к файлам
- **Пример:** `/path/to/todo-list/`

##### `SECRET_KEY = 'django-insecure-your-secret-key-here'`
- **Назначение:** Секретный ключ для криптографических операций
- **Безопасность:** НИКОГДА не коммитьте в Git!
- **Использование:** Подписание сессий, CSRF токенов, JWT

##### `DEBUG = True`
- **Назначение:** Режим отладки
- **Разработка:** Показывает подробные ошибки
- **Продакшн:** Должно быть False!

##### `ALLOWED_HOSTS = []`
- **Назначение:** Список разрешенных хостов
- **Безопасность:** Защита от Host header атак
- **Разработка:** Пустой список разрешает localhost

### 2. Установленные приложения
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'accounts',
    'tasks',
]
```

#### Разбор приложений:

##### Django встроенные приложения:
- **admin** - админ-панель Django
- **auth** - система аутентификации
- **contenttypes** - система типов контента
- **sessions** - управление сессиями
- **messages** - система сообщений
- **staticfiles** - обслуживание статических файлов

##### Сторонние приложения:
- **rest_framework** - Django REST Framework для API
- **rest_framework_simplejwt** - JWT аутентификация
- **corsheaders** - CORS для работы с фронтендом

##### Наши приложения:
- **accounts** - аутентификация пользователей
- **tasks** - управление задачами

### 3. Middleware
```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

#### Разбор middleware (порядок важен!):

##### `CorsMiddleware`
- **Порядок:** Должен быть первым!
- **Назначение:** Обрабатывает CORS заголовки
- **Использование:** Позволяет фронтенду делать запросы к API

##### `SecurityMiddleware`
- **Назначение:** Безопасность (HTTPS, HSTS, XSS защита)
- **Функции:** Автоматически добавляет заголовки безопасности

##### `SessionMiddleware`
- **Назначение:** Управление сессиями
- **Функции:** Создает и управляет сессиями пользователей

##### `CommonMiddleware`
- **Назначение:** Общие функции (APPEND_SLASH, etc.)
- **Функции:** Автоматически добавляет слэш к URL

##### `CsrfViewMiddleware`
- **Назначение:** CSRF защита
- **Функции:** Проверяет CSRF токены в формах

##### `AuthenticationMiddleware`
- **Назначение:** Аутентификация пользователей
- **Функции:** Добавляет `request.user` к каждому запросу

##### `MessageMiddleware`
- **Назначение:** Система сообщений
- **Функции:** Показывает сообщения пользователю

##### `XFrameOptionsMiddleware`
- **Назначение:** Защита от clickjacking
- **Функции:** Добавляет X-Frame-Options заголовок

### 4. URL конфигурация
```python
ROOT_URLCONF = 'todo_api.urls'
```
- **Назначение:** Главный файл URL-маршрутов
- **Значение:** `todo_api.urls` - путь к главному urls.py

### 5. Настройки базы данных
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

#### Разбор настроек БД:

##### `ENGINE = 'django.db.backends.sqlite3'`
- **Тип БД:** SQLite (встроенная в Python)
- **Преимущества:** Не требует установки сервера БД
- **Недостатки:** Не подходит для продакшна с высокой нагрузкой

##### `NAME = BASE_DIR / 'db.sqlite3'`
- **Путь к БД:** `todo-list/db.sqlite3`
- **Автоматическое создание:** Django создаст файл при первой миграции

### 6. Настройки аутентификации
```python
AUTH_USER_MODEL = 'accounts.User'
```
- **Назначение:** Указывает Django, какую модель использовать для пользователей
- **Значение:** `accounts.User` - наша кастомная модель пользователя
- **Важно:** Должно быть установлено до создания миграций!

### 7. Настройки паролей
```python
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
```

#### Разбор валидаторов паролей:

##### `UserAttributeSimilarityValidator`
- **Проверка:** Пароль не должен быть похож на данные пользователя
- **Пример:** Пароль "john123" для пользователя "john" будет отклонен

##### `MinimumLengthValidator`
- **Проверка:** Минимальная длина пароля
- **По умолчанию:** 8 символов

##### `CommonPasswordValidator`
- **Проверка:** Пароль не должен быть в списке популярных паролей
- **Безопасность:** Защита от атак по словарю

##### `NumericPasswordValidator`
- **Проверка:** Пароль не должен состоять только из цифр
- **Пример:** "12345678" будет отклонен

### 8. Настройки интернационализации
```python
LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_TZ = True
```

#### Разбор настроек:

##### `LANGUAGE_CODE = 'ru-ru'`
- **Язык:** Русский
- **Использование:** Форматирование дат, чисел, сообщений

##### `TIME_ZONE = 'Europe/Moscow'`
- **Часовой пояс:** Москва
- **Использование:** Хранение и отображение времени

##### `USE_I18N = True`
- **Интернационализация:** Включена
- **Функции:** Поддержка множественных языков

##### `USE_TZ = True`
- **Часовые пояса:** Включены
- **Функции:** Автоматическое преобразование времени

### 9. Настройки статических файлов
```python
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
```

#### Разбор настроек:

##### `STATIC_URL = '/static/'`
- **URL:** `http://localhost:8000/static/`
- **Использование:** CSS, JavaScript, изображения

##### `STATIC_ROOT = BASE_DIR / 'staticfiles'`
- **Папка:** `todo-list/staticfiles/`
- **Использование:** Сборка статических файлов для продакшна

### 10. Настройки медиа файлов
```python
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

#### Разбор настроек:

##### `MEDIA_URL = '/media/'`
- **URL:** `http://localhost:8000/media/`
- **Использование:** Загруженные пользователями файлы

##### `MEDIA_ROOT = BASE_DIR / 'media'`
- **Папка:** `todo-list/media/`
- **Использование:** Хранение загруженных файлов

### 11. Настройки Django REST Framework
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}
```

#### Разбор настроек DRF:

##### `DEFAULT_AUTHENTICATION_CLASSES`
- **JWT аутентификация:** Используем JWT токены
- **Безопасность:** Токены содержат информацию о пользователе

##### `DEFAULT_PERMISSION_CLASSES`
- **Требуется аутентификация:** По умолчанию все API требуют входа
- **Переопределение:** Можно изменить в отдельных views

##### `DEFAULT_PAGINATION_CLASS`
- **Пагинация:** Автоматическое разбиение больших списков
- **Размер страницы:** 20 элементов на страницу

### 12. Настройки JWT
```python
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}
```

#### Разбор настроек JWT:

##### `ACCESS_TOKEN_LIFETIME = timedelta(minutes=60)`
- **Время жизни access токена:** 60 минут
- **Безопасность:** Короткое время жизни для безопасности

##### `REFRESH_TOKEN_LIFETIME = timedelta(days=7)`
- **Время жизни refresh токена:** 7 дней
- **Функция:** Для получения новых access токенов

##### `ROTATE_REFRESH_TOKENS = True`
- **Ротация токенов:** При обновлении создается новый refresh токен
- **Безопасность:** Старый refresh токен становится недействительным

##### `BLACKLIST_AFTER_ROTATION = True`
- **Черный список:** Старые refresh токены добавляются в черный список
- **Безопасность:** Предотвращает повторное использование токенов

### 13. Настройки CORS
```python
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
```

#### Разбор настроек CORS:

##### `CORS_ALLOW_ALL_ORIGINS = True`
- **Разрешить все домены:** Для разработки
- **Продакшн:** Должно быть False с указанием конкретных доменов

##### `CORS_ALLOW_CREDENTIALS = True`
- **Разрешить cookies:** Для аутентификации
- **Использование:** Отправка JWT токенов в заголовках

## Частые ошибки и как их избежать

### 1. "SECRET_KEY not set"
**Причина:** Отсутствует SECRET_KEY
**Решение:** Установите SECRET_KEY в settings.py

### 2. "Database connection failed"
**Причина:** Неправильные настройки БД
**Решение:** Проверьте DATABASES настройки

### 3. "CORS error"
**Причина:** Неправильные настройки CORS
**Решение:** Проверьте CORS_ALLOW_ALL_ORIGINS

### 4. "Module not found"
**Причина:** Приложение не в INSTALLED_APPS
**Решение:** Добавьте приложение в INSTALLED_APPS

## Почему выбрано именно так

### 1. Безопасность
- **JWT аутентификация** - современный и безопасный подход
- **CORS настройки** - защита от межсайтовых атак
- **Валидация паролей** - защита от слабых паролей

### 2. Производительность
- **SQLite для разработки** - простота настройки
- **Пагинация** - предотвращение загрузки больших списков
- **Кэширование** - можно добавить Redis для продакшна

### 3. Гибкость
- **Кастомная модель пользователя** - расширяемость
- **Модульная структура** - легко добавлять новые приложения
- **Настройки окружения** - разные настройки для разных сред

## Расширение функциональности

### 1. Добавление Redis для кэширования
```python
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}
```

### 2. Добавление логирования
```python
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

### 3. Настройки для продакшна
```python
import os

DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'
SECRET_KEY = os.environ.get('SECRET_KEY')
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')

# Настройки БД для продакшна
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

## Связанные файлы
- `manage.py` - скрипт управления проектом
- `todo_api/urls.py` - главный файл URL-маршрутов
- `accounts/models.py` - модель пользователя
- `tasks/models.py` - модель задач

## Тестирование настроек

### 1. Проверка настроек
```python
# В Django shell
python manage.py shell
>>> from django.conf import settings
>>> print(settings.DEBUG)
>>> print(settings.INSTALLED_APPS)
```

### 2. Проверка БД
```python
>>> from django.db import connection
>>> connection.ensure_connection()
```

### 3. Проверка CORS
```bash
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     http://localhost:8000/api/tasks/
```

## Лучшие практики

### 1. Безопасность
- Никогда не коммитьте SECRET_KEY в Git
- Используйте переменные окружения для продакшна
- Регулярно обновляйте зависимости

### 2. Производительность
- Используйте кэширование для часто запрашиваемых данных
- Оптимизируйте запросы к базе данных
- Используйте CDN для статических файлов

### 3. Поддерживаемость
- Группируйте связанные настройки
- Добавляйте комментарии к сложным настройкам
- Используйте разные файлы настроек для разных сред