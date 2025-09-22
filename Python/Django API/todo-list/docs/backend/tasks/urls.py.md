# tasks/urls.py

## Назначение
Файл `urls.py` содержит URL маршруты для приложения `tasks`. Определяет, какие URL-адреса ведут к каким представлениям для управления задачами.

## Контекст и зависимости
- **Django REST Framework** - для работы с ViewSet
- **rest_framework.routers** - для автоматической генерации URL
- **tasks.views** - представления для обработки запросов

## Пошаговое объяснение кода

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'tasks', views.TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

### Разбор кода:

#### `from rest_framework.routers import DefaultRouter`
- **DefaultRouter** - автоматически создает URL-маршруты для ViewSet
- **Преимущества** - не нужно вручную писать каждый URL
- **Функциональность** - создает стандартные CRUD маршруты

#### `router = DefaultRouter()`
- **Создание роутера** - экземпляр для регистрации ViewSet
- **Настройка** - можно добавить дополнительные параметры

#### `router.register(r'tasks', views.TaskViewSet)`
- **Регистрация ViewSet** - связывает URL с представлениями
- **r'tasks'** - префикс для всех URL (tasks/)
- **views.TaskViewSet** - класс представлений

#### `path('', include(router.urls))`
- **Включение URL** - добавляет все URL из роутера
- **Пустая строка** - URL будут относительно текущего пути

## Автоматически созданные URL

### 1. CRUD операции
```
GET    /api/tasks/           # Список всех задач
POST   /api/tasks/           # Создание новой задачи
GET    /api/tasks/{id}/      # Получение конкретной задачи
PUT    /api/tasks/{id}/      # Полное обновление задачи
PATCH  /api/tasks/{id}/      # Частичное обновление задачи
DELETE /api/tasks/{id}/      # Удаление задачи
```

### 2. Кастомные действия
```
PATCH  /api/tasks/reorder/   # Изменение порядка задач
```

## Полные URL-адреса

### 1. Список задач
```
GET http://localhost:8000/api/tasks/
GET http://localhost:8000/api/tasks/?status=done
GET http://localhost:8000/api/tasks/?status=todo
```

### 2. Конкретная задача
```
GET    http://localhost:8000/api/tasks/1/
PUT    http://localhost:8000/api/tasks/1/
PATCH  http://localhost:8000/api/tasks/1/
DELETE http://localhost:8000/api/tasks/1/
```

### 3. Создание задачи
```
POST http://localhost:8000/api/tasks/
Content-Type: application/json

{
    "title": "Новая задача"
}
```

### 4. Изменение порядка
```
PATCH http://localhost:8000/api/tasks/reorder/
Content-Type: application/json

[
    {"id": 1, "order": 0},
    {"id": 2, "order": 1}
]
```

## Как протестировать

### 1. Список задач
```bash
curl -H "Authorization: Bearer <token>" \
     http://localhost:8000/api/tasks/
```

### 2. Создание задачи
```bash
curl -X POST \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"title":"Купить молоко"}' \
     http://localhost:8000/api/tasks/
```

### 3. Обновление задачи
```bash
curl -X PATCH \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"is_completed":true}' \
     http://localhost:8000/api/tasks/1/
```

### 4. Изменение порядка
```bash
curl -X PATCH \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '[{"id":1,"order":0},{"id":2,"order":1}]' \
     http://localhost:8000/api/tasks/reorder/
```

## Преимущества DefaultRouter

### 1. Автоматическая генерация URL
- **Не нужно писать каждый URL** - роутер создает их автоматически
- **Стандартные маршруты** - следует RESTful конвенциям
- **Консистентность** - все ViewSet используют одинаковый подход

### 2. Поддержка кастомных действий
- **@action декоратор** - автоматически создает URL для кастомных методов
- **Гибкость** - можно добавить любые дополнительные действия
- **Документация** - автоматически включается в API документацию

### 3. Встроенная документация
- **API Root** - автоматически создает корневой endpoint
- **Форматирование** - поддерживает JSON, XML, HTML
- **Браузерный интерфейс** - можно тестировать в браузере

## Альтернативные подходы

### 1. Ручное создание URL
```python
urlpatterns = [
    path('tasks/', views.TaskListCreateView.as_view(), name='task-list'),
    path('tasks/<int:pk>/', views.TaskDetailView.as_view(), name='task-detail'),
    path('tasks/reorder/', views.TaskReorderView.as_view(), name='task-reorder'),
]
```

### 2. Использование SimpleRouter
```python
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r'tasks', views.TaskViewSet)
```

### 3. Кастомный роутер
```python
from rest_framework.routers import DefaultRouter

class CustomRouter(DefaultRouter):
    def get_urls(self):
        urls = super().get_urls()
        # Добавляем кастомные URL
        return urls
```

## Частые ошибки и как их избежать

### 1. "No URL pattern matches"
**Причина:** Неправильный URL или метод
**Решение:** Проверьте правильность URL и HTTP метода

### 2. "ViewSet not registered"
**Причина:** ViewSet не зарегистрирован в роутере
**Решение:** Убедитесь, что `router.register()` вызывается

### 3. "Circular import"
**Причина:** Циклический импорт между модулями
**Решение:** Используйте строковые имена для views

## Почему выбрано именно так

### 1. Простота
- **Минимальный код** - всего несколько строк
- **Автоматизация** - не нужно писать каждый URL
- **Стандартность** - следует лучшим практикам DRF

### 2. Гибкость
- **Легко добавить новые действия** - просто добавить @action метод
- **Поддержка всех HTTP методов** - GET, POST, PUT, PATCH, DELETE
- **Кастомизация** - можно настроить роутер под свои нужды

### 3. Совместимость
- **Стандартные маршруты** - работают с любым REST клиентом
- **Документация** - автоматически генерируется
- **Тестирование** - легко тестировать стандартные endpoints

## Расширение функциональности

### 1. Добавление дополнительных URL
```python
urlpatterns = [
    path('', include(router.urls)),
    path('tasks/export/', views.export_tasks, name='export-tasks'),
    path('tasks/import/', views.import_tasks, name='import-tasks'),
]
```

### 2. Настройка роутера
```python
router = DefaultRouter(trailing_slash=False)
router.register(r'tasks', views.TaskViewSet, basename='task')
```

### 3. Добавление API Root
```python
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def api_root(request):
    return Response({
        'tasks': reverse('task-list', request=request),
        'users': reverse('user-list', request=request),
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('', include(router.urls)),
]
```

## Связанные файлы
- `tasks/views.py` - представления для обработки запросов
- `todo_api/urls.py` - главный файл URL-маршрутов
- `tasks/models.py` - модель Task

## Тестирование URL

### 1. Тест доступности URL
```python
def test_task_list_url(self):
    response = self.client.get('/api/tasks/')
    self.assertEqual(response.status_code, 200)
```

### 2. Тест создания задачи
```python
def test_create_task_url(self):
    data = {'title': 'Test task'}
    response = self.client.post('/api/tasks/', data)
    self.assertEqual(response.status_code, 201)
```

### 3. Тест reorder URL
```python
def test_reorder_url(self):
    data = [{'id': 1, 'order': 0}]
    response = self.client.patch('/api/tasks/reorder/', data, format='json')
    self.assertEqual(response.status_code, 200)
```

## Лучшие практики

### 1. Именование
- Используйте понятные имена для URL
- `tasks/` лучше чем `t/`
- Следуйте RESTful конвенциям

### 2. Структура
- Группируйте связанные URL
- Используйте вложенные маршруты для иерархии
- Избегайте слишком глубокой вложенности

### 3. Документация
- Добавляйте комментарии к URL
- Используйте `name` параметр для обратных ссылок
- Документируйте кастомные действия

