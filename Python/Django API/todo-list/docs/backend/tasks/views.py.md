# tasks/views.py

## Назначение
Файл `views.py` содержит API представления для управления задачами пользователей. Включает CRUD операции (создание, чтение, обновление, удаление) и специальные функции для изменения порядка задач.

## Контекст и зависимости
- **Django REST Framework** - для создания REST API
- **rest_framework.viewsets** - ViewSet для CRUD операций
- **rest_framework.decorators** - декораторы для API
- **rest_framework.permissions** - система разрешений
- **tasks.models** - модель Task
- **tasks.serializers** - сериализаторы

## Пошаговое объяснение кода

### 1. Импорты
```python
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import transaction
from .models import Task
from .serializers import TaskSerializer
```

### 2. TaskViewSet
```python
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user).order_by('order', 'created_at')
```

#### Разбор TaskViewSet:

##### `serializer_class = TaskSerializer`
- **Назначение:** Указывает, какой сериализатор использовать
- **Функция:** Преобразует данные между Python объектами и JSON

##### `permission_classes = [IsAuthenticated]`
- **Назначение:** Требует аутентификации для доступа
- **Безопасность:** Только авторизованные пользователи могут работать с задачами

##### `get_queryset()`
- **Фильтрация:** Показывает только задачи текущего пользователя
- **Сортировка:** По порядку, затем по дате создания
- **Безопасность:** Пользователь видит только свои задачи

### 3. Фильтрация по статусу
```python
def get_queryset(self):
    queryset = Task.objects.filter(owner=self.request.user)
    status = self.request.query_params.get('status', 'all')
    
    if status == 'done':
        queryset = queryset.filter(is_completed=True)
    elif status == 'todo':
        queryset = queryset.filter(is_completed=False)
    
    return queryset.order_by('order', 'created_at')
```

#### Параметры фильтрации:
- **`status=all`** - все задачи (по умолчанию)
- **`status=done`** - только выполненные задачи
- **`status=todo`** - только невыполненные задачи

### 4. Переопределение create
```python
def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    # Устанавливаем владельца
    serializer.save(owner=request.user)
    
    return Response(serializer.data, status=status.HTTP_201_CREATED)
```

#### Логика создания:
1. **Валидация** - проверка входящих данных
2. **Установка владельца** - автоматически назначаем текущего пользователя
3. **Сохранение** - создание задачи в базе данных
4. **Ответ** - возврат данных созданной задачи

### 5. Переопределение update
```python
def update(self, request, *args, **kwargs):
    partial = kwargs.pop('partial', False)
    instance = self.get_object()
    serializer = self.get_serializer(instance, data=request.data, partial=partial)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
```

#### Логика обновления:
1. **Получение объекта** - находит задачу по ID
2. **Валидация** - проверка новых данных
3. **Сохранение** - обновление задачи
4. **Ответ** - возврат обновленных данных

### 6. Переопределение destroy
```python
def destroy(self, request, *args, **kwargs):
    instance = self.get_object()
    instance.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
```

#### Логика удаления:
1. **Получение объекта** - находит задачу по ID
2. **Удаление** - удаляет задачу из базы данных
3. **Ответ** - возвращает статус 204 (No Content)

### 7. Кастомное действие reorder
```python
@action(detail=False, methods=['patch'])
def reorder(self, request):
    """Изменение порядка задач"""
    task_orders = request.data
    
    if not isinstance(task_orders, list):
        return Response(
            {'error': 'Ожидается список задач'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        with transaction.atomic():
            for item in task_orders:
                task_id = item.get('id')
                new_order = item.get('order')
                
                if task_id and new_order is not None:
                    Task.objects.filter(
                        id=task_id, 
                        owner=request.user
                    ).update(order=new_order)
        
        return Response({'message': 'Порядок задач обновлен'})
    
    except Exception as e:
        return Response(
            {'error': 'Ошибка при обновлении порядка'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
```

#### Разбор reorder:

##### `@action(detail=False, methods=['patch'])`
- **detail=False** - действие на коллекции, не на конкретном объекте
- **methods=['patch']** - разрешает только PATCH запросы

##### Логика reorder:
1. **Валидация** - проверка, что данные - это список
2. **Транзакция** - атомарное обновление всех задач
3. **Обновление** - изменение порядка для каждой задачи
4. **Безопасность** - обновляем только задачи текущего пользователя

## API Endpoints

### 1. Список задач
```
GET /api/tasks/
GET /api/tasks/?status=done
GET /api/tasks/?status=todo
```

### 2. Конкретная задача
```
GET /api/tasks/{id}/
PUT /api/tasks/{id}/
PATCH /api/tasks/{id}/
DELETE /api/tasks/{id}/
```

### 3. Создание задачи
```
POST /api/tasks/
Content-Type: application/json

{
    "title": "Новая задача"
}
```

### 4. Изменение порядка
```
PATCH /api/tasks/reorder/
Content-Type: application/json

[
    {"id": 1, "order": 0},
    {"id": 2, "order": 1},
    {"id": 3, "order": 2}
]
```

## Частые ошибки и как их избежать

### 1. "Authentication credentials were not provided"
**Причина:** Отсутствует JWT токен
**Решение:** Добавьте заголовок `Authorization: Bearer <token>`

### 2. "Not found"
**Причина:** Задача не существует или принадлежит другому пользователю
**Решение:** Проверьте ID задачи и права доступа

### 3. "Invalid data"
**Причина:** Неверный формат данных
**Решение:** Проверьте JSON формат и обязательные поля

## Почему выбрано именно так

### 1. ViewSet вместо отдельных views
- **Автоматические CRUD операции** - не нужно писать каждый метод
- **Единообразие** - стандартный подход Django REST Framework
- **Расширяемость** - легко добавить кастомные действия

### 2. Фильтрация по владельцу
- **Безопасность** - пользователи видят только свои задачи
- **Производительность** - индексы на поле owner
- **Логичность** - каждая задача принадлежит конкретному пользователю

### 3. Транзакции для reorder
- **Атомарность** - либо все задачи обновляются, либо ни одна
- **Консистентность** - данные остаются в согласованном состоянии
- **Откат** - при ошибке все изменения отменяются

## Тестирование представлений

### 1. Тест создания задачи
```python
def test_create_task(self):
    user = User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpass123'
    )
    
    self.client.force_authenticate(user=user)
    
    data = {'title': 'Test task'}
    response = self.client.post('/api/tasks/', data)
    
    self.assertEqual(response.status_code, 201)
    self.assertEqual(Task.objects.count(), 1)
    self.assertEqual(Task.objects.first().owner, user)
```

### 2. Тест фильтрации
```python
def test_filter_tasks(self):
    user = User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpass123'
    )
    
    # Создаем задачи
    Task.objects.create(owner=user, title='Task 1', is_completed=True)
    Task.objects.create(owner=user, title='Task 2', is_completed=False)
    
    self.client.force_authenticate(user=user)
    
    # Тест фильтрации выполненных задач
    response = self.client.get('/api/tasks/?status=done')
    self.assertEqual(len(response.data), 1)
    
    # Тест фильтрации невыполненных задач
    response = self.client.get('/api/tasks/?status=todo')
    self.assertEqual(len(response.data), 1)
```

### 3. Тест reorder
```python
def test_reorder_tasks(self):
    user = User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpass123'
    )
    
    task1 = Task.objects.create(owner=user, title='Task 1', order=0)
    task2 = Task.objects.create(owner=user, title='Task 2', order=1)
    
    self.client.force_authenticate(user=user)
    
    data = [
        {'id': task2.id, 'order': 0},
        {'id': task1.id, 'order': 1}
    ]
    
    response = self.client.patch('/api/tasks/reorder/', data, format='json')
    self.assertEqual(response.status_code, 200)
    
    # Проверяем, что порядок изменился
    task1.refresh_from_db()
    task2.refresh_from_db()
    self.assertEqual(task1.order, 1)
    self.assertEqual(task2.order, 0)
```

## Связанные файлы
- `tasks/models.py` - модель Task
- `tasks/serializers.py` - сериализаторы
- `tasks/urls.py` - URL маршруты
- `accounts/models.py` - модель пользователя

## Расширение функциональности

### 1. Добавление поиска
```python
def get_queryset(self):
    queryset = Task.objects.filter(owner=self.request.user)
    search = self.request.query_params.get('search')
    
    if search:
        queryset = queryset.filter(title__icontains=search)
    
    return queryset.order_by('order', 'created_at')
```

### 2. Добавление пагинации
```python
from rest_framework.pagination import PageNumberPagination

class TaskPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class TaskViewSet(viewsets.ModelViewSet):
    pagination_class = TaskPagination
    # ... остальной код
```

### 3. Добавление статистики
```python
@action(detail=False, methods=['get'])
def stats(self, request):
    """Статистика задач пользователя"""
    queryset = self.get_queryset()
    
    stats = {
        'total': queryset.count(),
        'completed': queryset.filter(is_completed=True).count(),
        'pending': queryset.filter(is_completed=False).count(),
    }
    
    return Response(stats)
```

## Лучшие практики

### 1. Безопасность
- Всегда фильтруйте по владельцу
- Валидируйте входящие данные
- Используйте транзакции для критических операций

### 2. Производительность
- Используйте `select_related()` для связанных объектов
- Добавляйте индексы для часто используемых полей
- Ограничивайте количество записей пагинацией

### 3. Обработка ошибок
- Возвращайте понятные сообщения об ошибках
- Используйте стандартные HTTP коды
- Логируйте ошибки для отладки

