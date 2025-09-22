# tasks/models.py

## Назначение
Файл `models.py` содержит модель данных `Task` для управления задачами пользователей. Модель определяет структуру таблицы задач в базе данных, включая поля, связи и поведение.

## Контекст и зависимости
- **Django** - основной фреймворк
- **django.db.models** - модуль для создания моделей
- **django.contrib.auth** - для связи с пользователями

## Пошаговое объяснение кода

```python
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Task(models.Model):
    """Модель задачи"""
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=255, verbose_name='Название')
    is_completed = models.BooleanField(default=False, verbose_name='Выполнено')
    order = models.IntegerField(default=0, verbose_name='Порядок')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создано')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлено')

    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'

    def __str__(self):
        return self.title
```

### Разбор полей модели:

#### `owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')`
- **Связь** - каждая задача принадлежит одному пользователю
- **CASCADE** - при удалении пользователя удаляются все его задачи
- **related_name='tasks'** - позволяет получить задачи через `user.tasks.all()`

#### `title = models.CharField(max_length=255, verbose_name='Название')`
- **Тип** - строка до 255 символов
- **Обязательное** - не может быть пустым
- **verbose_name** - человекочитаемое название для админки

#### `is_completed = models.BooleanField(default=False, verbose_name='Выполнено')`
- **Тип** - булево значение (True/False)
- **По умолчанию** - False (не выполнено)
- **Использование** - переключение статуса задачи

#### `order = models.IntegerField(default=0, verbose_name='Порядок')`
- **Тип** - целое число
- **Назначение** - для сортировки и drag & drop
- **По умолчанию** - 0

#### `created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создано')`
- **Тип** - дата и время
- **auto_now_add=True** - устанавливается при создании
- **Неизменяемое** - не обновляется при изменении

#### `updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлено')`
- **Тип** - дата и время
- **auto_now=True** - обновляется при каждом изменении
- **Отслеживание** - когда задача была изменена последний раз

### Мета-класс:
```python
class Meta:
    ordering = ['order', 'created_at']
    verbose_name = 'Задача'
    verbose_name_plural = 'Задачи'
```
- **ordering** - сортировка по умолчанию (сначала по порядку, потом по дате)
- **verbose_name** - название в единственном числе
- **verbose_name_plural** - название во множественном числе

## Как использовать модель

### 1. Создание задачи
```python
from tasks.models import Task
from django.contrib.auth import get_user_model

User = get_user_model()
user = User.objects.get(email='user@example.com')

# Создание задачи
task = Task.objects.create(
    owner=user,
    title='Купить молоко',
    order=1
)
```

### 2. Получение задач пользователя
```python
# Все задачи пользователя
user_tasks = Task.objects.filter(owner=user)

# Невыполненные задачи
incomplete_tasks = Task.objects.filter(owner=user, is_completed=False)

# Выполненные задачи
completed_tasks = Task.objects.filter(owner=user, is_completed=True)
```

### 3. Обновление задачи
```python
# Отметить как выполненную
task.is_completed = True
task.save()

# Изменить название
task.title = 'Купить хлеб'
task.save()

# Изменить порядок
task.order = 5
task.save()
```

### 4. Удаление задачи
```python
# Удалить конкретную задачу
task.delete()

# Удалить все задачи пользователя
Task.objects.filter(owner=user).delete()
```

## Частые ошибки и как их избежать

### 1. "Cannot assign to 'id'"
**Причина:** Попытка изменить автоматически создаваемое поле
**Решение:** Не изменяйте поле `id` - оно создается автоматически

### 2. "UNIQUE constraint failed"
**Причина:** Нарушение уникальности (если есть ограничения)
**Решение:** Проверьте, что данные уникальны

### 3. "Foreign key constraint failed"
**Причина:** Попытка создать задачу для несуществующего пользователя
**Решение:** Убедитесь, что пользователь существует

## Почему выбрано именно так

### 1. Связь с пользователем
- **ForeignKey** - каждая задача принадлежит одному пользователю
- **CASCADE** - логично, что при удалении пользователя удаляются его задачи
- **related_name** - удобный доступ к задачам через `user.tasks`

### 2. Поля задачи
- **title** - основное содержимое задачи
- **is_completed** - простой способ отслеживания статуса
- **order** - необходимо для drag & drop функциональности
- **timestamps** - полезны для отладки и аналитики

### 3. Сортировка
- **order** - пользователь может изменить порядок
- **created_at** - резервная сортировка по времени создания

## Миграции модели

### 1. Создание миграций
```bash
python manage.py makemigrations tasks
```

### 2. SQL миграции
```sql
CREATE TABLE tasks_task (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER NOT NULL REFERENCES accounts_user(id),
    title VARCHAR(255) NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT 0,
    order INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);
```

## Тестирование модели

### 1. Тест создания задачи
```python
from django.test import TestCase
from tasks.models import Task
from django.contrib.auth import get_user_model

User = get_user_model()

class TaskModelTest(TestCase):
    def test_task_creation(self):
        user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        
        task = Task.objects.create(
            owner=user,
            title='Test task',
            order=1
        )
        
        self.assertEqual(task.title, 'Test task')
        self.assertFalse(task.is_completed)
        self.assertEqual(task.owner, user)
```

### 2. Тест связи с пользователем
```python
def test_task_owner_relationship(self):
    user = User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpass123'
    )
    
    task = Task.objects.create(
        owner=user,
        title='Test task'
    )
    
    # Проверяем, что задача доступна через related_name
    self.assertIn(task, user.tasks.all())
```

## Связанные файлы
- `tasks/views.py` - API представления для работы с задачами
- `tasks/serializers.py` - сериализаторы для API
- `accounts/models.py` - модель пользователя
- `todo_api/settings.py` - настройки проекта

## Расширение функциональности

### 1. Добавление категорий
```python
class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7)  # HEX цвет

class Task(models.Model):
    # ... существующие поля
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
```

### 2. Добавление приоритетов
```python
PRIORITY_CHOICES = [
    ('low', 'Низкий'),
    ('medium', 'Средний'),
    ('high', 'Высокий'),
]

class Task(models.Model):
    # ... существующие поля
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
```

### 3. Добавление дедлайнов
```python
class Task(models.Model):
    # ... существующие поля
    due_date = models.DateTimeField(null=True, blank=True)
    is_overdue = models.BooleanField(default=False)
```

## Лучшие практики

### 1. Именование
- Используйте понятные имена полей
- `is_completed` лучше чем `done`
- `created_at` лучше чем `created`

### 2. Производительность
- Используйте `select_related()` для связанных объектов
- Добавляйте индексы для часто используемых полей
- Избегайте N+1 запросов

### 3. Безопасность
- Всегда проверяйте права доступа
- Фильтруйте задачи по владельцу
- Валидируйте входящие данные