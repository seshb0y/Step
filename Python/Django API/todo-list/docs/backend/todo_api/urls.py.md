# todo_api/urls.py

## Назначение
Файл `urls.py` - это главный маршрутизатор Django проекта. Он определяет, какие URL-адреса ведут к каким представлениям (views) и приложениям. Это центральная точка для всех маршрутов в проекте.

## Контекст и зависимости
- **Django** - основной фреймворк
- **django.contrib.admin** - админ-панель Django
- **django.urls** - модуль для работы с URL-маршрутами
- **include()** - функция для включения URL-паттернов из приложений

## Пошаговое объяснение кода

### 1. Импорты
```python
from django.contrib import admin
from django.urls import path, include
```
- `admin` - импорт админ-панели Django
- `path` - функция для создания URL-маршрутов
- `include` - функция для включения URL-паттернов из других модулей

### 2. Список URL-паттернов
```python
urlpatterns = [
    path('admin/', include('django.contrib.admin.urls')),
    path('api/auth/', include('accounts.urls')),
    path('api/tasks/', include('tasks.urls')),
]
```

#### Разбор каждого маршрута:

##### `path('admin/', include('django.contrib.admin.urls'))`
- **URL:** `http://localhost:8000/admin/`
- **Назначение:** Админ-панель Django
- **Функция:** `include()` включает все URL-паттерны из админки
- **Доступ:** Только для суперпользователей

##### `path('api/auth/', include('accounts.urls'))`
- **URL:** `http://localhost:8000/api/auth/`
- **Назначение:** Аутентификация пользователей
- **Функция:** Включает URL-паттерны из приложения `accounts`
- **Примеры:** `/api/auth/login/`, `/api/auth/register/`

##### `path('api/tasks/', include('tasks.urls'))`
- **URL:** `http://localhost:8000/api/tasks/`
- **Назначение:** Управление задачами
- **Функция:** Включает URL-паттерны из приложения `tasks`
- **Примеры:** `/api/tasks/`, `/api/tasks/1/`

## Как это работает

### 1. Процесс обработки запроса
```
1. Пользователь отправляет запрос: GET /api/tasks/
2. Django проверяет urlpatterns сверху вниз
3. Находит совпадение: path('api/tasks/', include('tasks.urls'))
4. Передает управление в tasks.urls
5. tasks.urls находит подходящий маршрут
6. Вызывает соответствующее представление (view)
```

### 2. Структура URL-адресов
```
http://localhost:8000/
├── admin/                    # Админ-панель
│   ├── users/               # Управление пользователями
│   └── tasks/               # Управление задачами
├── api/
│   ├── auth/                # Аутентификация
│   │   ├── login/           # Вход в систему
│   │   ├── register/        # Регистрация
│   │   └── refresh/         # Обновление токена
│   └── tasks/               # Задачи
│       ├── /                # Список задач
│       ├── 1/               # Конкретная задача
│       └── reorder/         # Изменение порядка
```

## Дополнительные возможности

### 1. Именованные маршруты
```python
urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('api/auth/', include('accounts.urls'), name='auth'),
    path('api/tasks/', include('tasks.urls'), name='tasks'),
]
```

### 2. Переменные в URL
```python
urlpatterns = [
    path('api/tasks/<int:task_id>/', include('tasks.urls')),
    path('api/users/<str:username>/', include('accounts.urls')),
]
```

### 3. Условные маршруты
```python
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/tasks/', include('tasks.urls')),
]

# Добавляем маршруты только в режиме отладки
if settings.DEBUG:
    urlpatterns += [
        path('debug/', include('debug.urls')),
    ]
```

## Частые ошибки и как их избежать

### 1. "Page not found (404)"
**Причина:** URL не найден в urlpatterns
**Решение:** 
- Проверьте правильность написания URL
- Убедитесь, что маршрут добавлен в urlpatterns
- Проверьте порядок маршрутов (более специфичные должны быть выше)

### 2. "ModuleNotFoundError: No module named 'accounts.urls'"
**Причина:** Приложение не найдено или неправильный путь
**Решение:**
- Убедитесь, что приложение `accounts` существует
- Проверьте, что файл `accounts/urls.py` существует
- Убедитесь, что приложение добавлено в `INSTALLED_APPS`

### 3. "Circular import"
**Причина:** Циклический импорт между модулями
**Решение:**
- Избегайте импорта views в urls.py
- Используйте строковые имена для views

## Почему выбрано именно так

### 1. RESTful API структура
- `/api/` - префикс для всех API endpoints
- `/auth/` - отдельный раздел для аутентификации
- `/tasks/` - отдельный раздел для задач

### 2. Модульность
- Каждое приложение имеет свои URL-паттерны
- Легко добавлять новые приложения
- Простота поддержки и тестирования

### 3. Безопасность
- Админ-панель отделена от API
- API endpoints имеют префикс `/api/`
- Легко настроить CORS и аутентификацию

## Расширение функциональности

### 1. Добавление нового приложения
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/tasks/', include('tasks.urls')),
    path('api/notifications/', include('notifications.urls')),  # Новое приложение
]
```

### 2. API версионирование
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('accounts.urls')),
    path('api/v1/tasks/', include('tasks.urls')),
    path('api/v2/tasks/', include('tasks.v2.urls')),  # Новая версия API
]
```

### 3. Документация API
```python
from django.urls import path, include
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/tasks/', include('tasks.urls')),
    path('api/docs/', include_docs_urls(title='Todo API')),  # Документация API
]
```

## Связанные файлы
- `accounts/urls.py` - URL-паттерны для аутентификации
- `tasks/urls.py` - URL-паттерны для задач
- `todo_api/settings.py` - настройки проекта
- `manage.py` - скрипт управления проектом

## Тестирование URL-маршрутов

### 1. Проверка доступности
```bash
# Проверка админки
curl http://localhost:8000/admin/

# Проверка API
curl http://localhost:8000/api/tasks/
```

### 2. Тестирование в Django shell
```python
python manage.py shell
>>> from django.urls import reverse
>>> reverse('admin:index')
'/admin/'
>>> reverse('tasks:task-list')
'/api/tasks/'
```

### 3. Автоматическое тестирование
```python
# tests/test_urls.py
from django.test import TestCase
from django.urls import reverse, resolve

class URLTests(TestCase):
    def test_admin_url(self):
        url = reverse('admin:index')
        self.assertEqual(url, '/admin/')
    
    def test_tasks_api_url(self):
        url = reverse('tasks:task-list')
        self.assertEqual(url, '/api/tasks/')
```

