# todo_api/asgi.py

## Назначение
Файл `asgi.py` содержит ASGI (Asynchronous Server Gateway Interface) конфигурацию для Django проекта. ASGI - это современный стандарт для асинхронных веб-приложений, который поддерживает WebSocket, Server-Sent Events и другие асинхронные функции.

## Контекст и зависимости
- **Django** - основной фреймворк
- **os** - модуль для работы с операционной системой
- **django.core.asgi** - модуль Django для ASGI

## Пошаговое объяснение кода

### 1. Импорты
```python
import os
from django.core.asgi import get_asgi_application
```
- `os` - для работы с переменными окружения
- `get_asgi_application` - функция Django для создания ASGI приложения

### 2. Настройка переменной окружения
```python
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_api.settings')
```
- Устанавливает переменную окружения `DJANGO_SETTINGS_MODULE`
- Указывает Django, где находятся настройки проекта
- `setdefault()` - устанавливает значение только если переменная не была установлена ранее

### 3. Создание ASGI приложения
```python
application = get_asgi_application()
```
- Создает ASGI приложение Django
- Это объект, который ASGI сервер будет вызывать для обработки запросов

## Что такое ASGI?

### 1. Определение
ASGI (Asynchronous Server Gateway Interface) - это современный стандарт для:
- **Асинхронных веб-приложений** (Django, FastAPI, Starlette)
- **WebSocket соединений**
- **Server-Sent Events**
- **HTTP/2 и HTTP/3**

### 2. Отличия от WSGI
```
WSGI (синхронный):
[Запрос 1] → [Обработка] → [Ответ 1] → [Запрос 2] → [Обработка] → [Ответ 2]

ASGI (асинхронный):
[Запрос 1] ──┐
[Запрос 2] ──┼→ [Параллельная обработка] → [Ответ 1, Ответ 2]
[Запрос 3] ──┘
```

### 3. Преимущества ASGI
- **Параллельная обработка** запросов
- **Поддержка WebSocket** для реального времени
- **Лучшая производительность** для I/O операций
- **Современные протоколы** (HTTP/2, HTTP/3)

## Использование ASGI

### 1. Разработка с Uvicorn
```bash
# Установка Uvicorn
pip install uvicorn

# Запуск с ASGI
uvicorn todo_api.asgi:application

# Запуск с перезагрузкой
uvicorn todo_api.asgi:application --reload

# Запуск на определенном порту
uvicorn todo_api.asgi:application --host 0.0.0.0 --port 8000
```

### 2. Продакшн с Gunicorn + Uvicorn
```bash
# Установка
pip install gunicorn uvicorn

# Запуск с Gunicorn
gunicorn todo_api.asgi:application -w 4 -k uvicorn.workers.UvicornWorker

# С конфигурационным файлом
gunicorn -c gunicorn.conf.py todo_api.asgi:application
```

### 3. Продакшн с Daphne
```bash
# Установка Daphne
pip install daphne

# Запуск
daphne -b 0.0.0.0 -p 8000 todo_api.asgi:application

# С настройками
daphne -b 0.0.0.0 -p 8000 --access-log - todo_api.asgi:application
```

## Дополнительные возможности

### 1. WebSocket поддержка
```python
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import tasks.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_api.settings')

# ASGI приложение с поддержкой WebSocket
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            tasks.routing.websocket_urlpatterns
        )
    ),
})
```

### 2. Кастомная ASGI конфигурация
```python
import os
from django.core.asgi import get_asgi_application

# Настройка переменных окружения
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_api.settings')

# Создание приложения
django_asgi_app = get_asgi_application()

# ASGI middleware
async def application(scope, receive, send):
    if scope["type"] == "http":
        # HTTP запросы
        await django_asgi_app(scope, receive, send)
    elif scope["type"] == "websocket":
        # WebSocket соединения
        await handle_websocket(scope, receive, send)
```

### 3. Логирование для ASGI
```python
import os
import logging
from django.core.asgi import get_asgi_application

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_api.settings')

async def application(scope, receive, send):
    if scope["type"] == "http":
        logger.info(f"HTTP request: {scope['method']} {scope['path']}")
    elif scope["type"] == "websocket":
        logger.info(f"WebSocket connection: {scope['path']}")
    
    return await get_asgi_application()(scope, receive, send)
```

## Частые ошибки и как их избежать

### 1. "ModuleNotFoundError: No module named 'todo_api'"
**Причина:** Неправильный путь к модулю
**Решение:**
- Убедитесь, что вы находитесь в правильной директории
- Проверьте, что файл `todo_api/asgi.py` существует
- Используйте абсолютный путь: `uvicorn /full/path/to/todo_api.asgi:application`

### 2. "ASGI application must be callable"
**Причина:** Неправильный синтаксис вызова ASGI
**Решение:**
- Используйте правильный синтаксис: `uvicorn todo_api.asgi:application`
- Убедитесь, что `application` определен в файле

### 3. "WebSocket connection failed"
**Причина:** Неправильная конфигурация WebSocket
**Решение:**
- Убедитесь, что установлен `channels`: `pip install channels`
- Проверьте конфигурацию в `settings.py`
- Убедитесь, что ASGI сервер поддерживает WebSocket

## Почему выбрано именно так

### 1. Современный стандарт
- ASGI - будущее Python веб-разработки
- Поддержка асинхронных операций
- Совместимость с современными протоколами

### 2. Производительность
- Лучшая производительность для I/O операций
- Параллельная обработка запросов
- Эффективное использование ресурсов

### 3. Гибкость
- Поддержка различных типов соединений
- Легко добавить WebSocket функциональность
- Совместимость с облачными платформами

## Развертывание в продакшне

### 1. С Uvicorn
```bash
# Установка
pip install uvicorn

# Запуск
uvicorn todo_api.asgi:application --host 0.0.0.0 --port 8000 --workers 4

# С SSL
uvicorn todo_api.asgi:application --host 0.0.0.0 --port 8000 --ssl-keyfile key.pem --ssl-certfile cert.pem
```

### 2. С Gunicorn + Uvicorn
```bash
# Установка
pip install gunicorn uvicorn

# Запуск
gunicorn todo_api.asgi:application -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

# С конфигурационным файлом
gunicorn -c gunicorn.conf.py todo_api.asgi:application
```

### 3. С Nginx
```nginx
# nginx.conf
upstream django {
    server 127.0.0.1:8000;
}

server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://django;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    location /ws/ {
        proxy_pass http://django;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## WebSocket интеграция

### 1. Установка Channels
```bash
pip install channels
```

### 2. Настройка в settings.py
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'channels',  # Добавляем Channels
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'accounts',
    'tasks',
]

ASGI_APPLICATION = 'todo_api.asgi.application'
```

### 3. WebSocket маршруты
```python
# tasks/routing.py
from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/tasks/', consumers.TaskConsumer.as_asgi()),
]
```

## Мониторинг и отладка

### 1. Логирование запросов
```python
import os
import logging
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_api.settings')

async def application(scope, receive, send):
    if scope["type"] == "http":
        logging.info(f"HTTP: {scope['method']} {scope['path']}")
    elif scope["type"] == "websocket":
        logging.info(f"WebSocket: {scope['path']}")
    
    return await get_asgi_application()(scope, receive, send)
```

### 2. Профилирование производительности
```python
import time
import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_api.settings')

async def application(scope, receive, send):
    start_time = time.time()
    response = await get_asgi_application()(scope, receive, send)
    end_time = time.time()
    print(f"Request took {end_time - start_time:.2f} seconds")
    return response
```

## Связанные файлы
- `todo_api/settings.py` - настройки Django
- `todo_api/wsgi.py` - WSGI конфигурация (для совместимости)
- `manage.py` - скрипт управления проектом
- `requirements.txt` - зависимости проекта

## Когда использовать ASGI vs WSGI

### Используйте ASGI когда:
- Нужна поддержка WebSocket
- Высокая нагрузка на I/O операции
- Требуется реальное время (чат, уведомления)
- Современные протоколы (HTTP/2, HTTP/3)

### Используйте WSGI когда:
- Простое веб-приложение
- Низкая нагрузка
- Совместимость со старыми серверами
- Простота развертывания

