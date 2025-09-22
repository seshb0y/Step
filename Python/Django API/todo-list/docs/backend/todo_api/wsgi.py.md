# todo_api/wsgi.py

## Назначение
Файл `wsgi.py` содержит WSGI (Web Server Gateway Interface) конфигурацию для Django проекта. WSGI - это стандарт взаимодействия между веб-серверами и Python веб-приложениями. Этот файл позволяет Django работать с различными веб-серверами.

## Контекст и зависимости
- **Django** - основной фреймворк
- **os** - модуль для работы с операционной системой
- **django.core.wsgi** - модуль Django для WSGI

## Пошаговое объяснение кода

### 1. Импорты
```python
import os
from django.core.wsgi import get_wsgi_application
```
- `os` - для работы с переменными окружения
- `get_wsgi_application` - функция Django для создания WSGI приложения

### 2. Настройка переменной окружения
```python
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_api.settings')
```
- Устанавливает переменную окружения `DJANGO_SETTINGS_MODULE`
- Указывает Django, где находятся настройки проекта
- `setdefault()` - устанавливает значение только если переменная не была установлена ранее

### 3. Создание WSGI приложения
```python
application = get_wsgi_application()
```
- Создает WSGI приложение Django
- Это объект, который веб-сервер будет вызывать для обработки запросов

## Что такое WSGI?

### 1. Определение
WSGI (Web Server Gateway Interface) - это стандарт взаимодействия между:
- **Веб-сервером** (Apache, Nginx, Gunicorn)
- **Python приложением** (Django, Flask, FastAPI)

### 2. Как это работает
```
1. Пользователь отправляет HTTP запрос
2. Веб-сервер получает запрос
3. Веб-сервер вызывает WSGI приложение
4. WSGI приложение (Django) обрабатывает запрос
5. Django возвращает HTTP ответ
6. Веб-сервер отправляет ответ пользователю
```

### 3. Схема взаимодействия
```
[Браузер] → [Nginx] → [Gunicorn] → [WSGI] → [Django] → [База данных]
                ↑           ↑         ↑
            Веб-сервер   WSGI      Django
                        сервер    приложение
```

## Использование WSGI

### 1. Разработка
```bash
# Django development server (встроенный WSGI сервер)
python manage.py runserver
```

### 2. Продакшн с Gunicorn
```bash
# Установка Gunicorn
pip install gunicorn

# Запуск с WSGI
gunicorn todo_api.wsgi:application

# Запуск на определенном порту
gunicorn todo_api.wsgi:application --bind 0.0.0.0:8000
```

### 3. Продакшн с uWSGI
```bash
# Установка uWSGI
pip install uwsgi

# Запуск с WSGI
uwsgi --module todo_api.wsgi:application --http :8000
```

### 4. Продакшн с Apache
```apache
# В Apache конфигурации
WSGIScriptAlias / /path/to/todo_api/wsgi.py
WSGIPythonPath /path/to/todo_api
```

## Дополнительные возможности

### 1. Кастомная WSGI конфигурация
```python
import os
from django.core.wsgi import get_wsgi_application

# Настройка переменных окружения
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_api.settings')

# Создание приложения
application = get_wsgi_application()

# Дополнительная настройка для продакшна
if os.environ.get('DJANGO_ENV') == 'production':
    # Настройки для продакшна
    pass
```

### 2. Middleware для WSGI
```python
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_api.settings')

# Базовое приложение
django_app = get_wsgi_application()

# WSGI middleware
def application(environ, start_response):
    # Дополнительная обработка запроса
    return django_app(environ, start_response)
```

### 3. Логирование для WSGI
```python
import os
import logging
from django.core.wsgi import get_wsgi_application

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_api.settings')

def application(environ, start_response):
    logger.info(f"WSGI request: {environ.get('REQUEST_METHOD')} {environ.get('PATH_INFO')}")
    return get_wsgi_application()(environ, start_response)
```

## Частые ошибки и как их избежать

### 1. "ModuleNotFoundError: No module named 'todo_api'"
**Причина:** Неправильный путь к модулю
**Решение:**
- Убедитесь, что вы находитесь в правильной директории
- Проверьте, что файл `todo_api/wsgi.py` существует
- Используйте абсолютный путь: `gunicorn /full/path/to/todo_api.wsgi:application`

### 2. "DJANGO_SETTINGS_MODULE not set"
**Причина:** Переменная окружения не установлена
**Решение:**
- Убедитесь, что `os.environ.setdefault()` выполняется
- Установите переменную вручную: `export DJANGO_SETTINGS_MODULE=todo_api.settings`

### 3. "Application object must be callable"
**Причина:** Неправильный синтаксис вызова WSGI
**Решение:**
- Используйте правильный синтаксис: `gunicorn todo_api.wsgi:application`
- Убедитесь, что `application` определен в файле

## Почему выбрано именно так

### 1. Стандарт Django
- `wsgi.py` создается автоматически при создании проекта
- Следует официальным рекомендациям Django
- Совместим с большинством WSGI серверов

### 2. Простота
- Минимальная конфигурация
- Легко понять и модифицировать
- Не требует дополнительных зависимостей

### 3. Гибкость
- Легко добавить дополнительную логику
- Поддерживает различные WSGI серверы
- Совместим с облачными платформами

## Развертывание в продакшне

### 1. С Gunicorn
```bash
# Установка
pip install gunicorn

# Запуск
gunicorn todo_api.wsgi:application --bind 0.0.0.0:8000 --workers 3

# С конфигурационным файлом
gunicorn -c gunicorn.conf.py todo_api.wsgi:application
```

### 2. С Nginx
```nginx
# nginx.conf
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 3. С Docker
```dockerfile
# Dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["gunicorn", "todo_api.wsgi:application", "--bind", "0.0.0.0:8000"]
```

## Связанные файлы
- `todo_api/settings.py` - настройки Django
- `todo_api/asgi.py` - ASGI конфигурация (для асинхронных приложений)
- `manage.py` - скрипт управления проектом
- `requirements.txt` - зависимости проекта

## Отличия WSGI от ASGI

### WSGI (синхронный)
- Обрабатывает один запрос за раз
- Подходит для традиционных веб-приложений
- Используется с Gunicorn, uWSGI

### ASGI (асинхронный)
- Может обрабатывать несколько запросов одновременно
- Подходит для WebSocket, Server-Sent Events
- Используется с Uvicorn, Daphne

## Мониторинг и отладка

### 1. Логирование запросов
```python
import os
import logging
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_api.settings')

def application(environ, start_response):
    logging.info(f"Request: {environ.get('REQUEST_METHOD')} {environ.get('PATH_INFO')}")
    return get_wsgi_application()(environ, start_response)
```

### 2. Профилирование производительности
```python
import time
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_api.settings')

def application(environ, start_response):
    start_time = time.time()
    response = get_wsgi_application()(environ, start_response)
    end_time = time.time()
    print(f"Request took {end_time - start_time:.2f} seconds")
    return response
```

