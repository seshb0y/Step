# tasks/serializers.py

## Назначение
Файл `serializers.py` содержит сериализаторы Django REST Framework для преобразования данных задач между форматами Python объектов и JSON. Сериализаторы также выполняют валидацию входящих данных.

## Контекст и зависимости
- **Django REST Framework** - для сериализации данных
- **tasks.models** - модель Task
- **django.contrib.auth** - для работы с пользователями

## Пошаговое объяснение кода

### 1. TaskSerializer
```python
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'is_completed', 'order', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
```

#### Разбор TaskSerializer:

##### `class Meta:`
- **model = Task** - указывает модель для сериализации
- **fields** - поля, которые включаются в сериализацию
- **read_only_fields** - поля только для чтения

##### Поля сериализатора:
- **id** - уникальный идентификатор (только чтение)
- **title** - название задачи (можно изменять)
- **is_completed** - статус выполнения (можно изменять)
- **order** - порядок сортировки (можно изменять)
- **created_at** - дата создания (только чтение)
- **updated_at** - дата обновления (только чтение)

### 2. CreateTaskSerializer
```python
class CreateTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title']
```

#### Назначение:
- **Упрощенный сериализатор** - только для создания задач
- **Только title** - остальные поля устанавливаются автоматически
- **Безопасность** - пользователь не может изменить системные поля

### 3. UpdateTaskSerializer
```python
class UpdateTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'is_completed', 'order']
```

#### Назначение:
- **Для обновления** - позволяет изменять основные поля
- **Гибкость** - можно обновить любое поле или несколько
- **Безопасность** - нельзя изменить id, created_at, updated_at

## Как использовать сериализаторы

### 1. Создание задачи
```python
# Данные для создания
data = {'title': 'Купить молоко'}

# Создание сериализатора
serializer = CreateTaskSerializer(data=data)

# Валидация и сохранение
if serializer.is_valid():
    task = serializer.save(owner=request.user)
    # task.id, task.created_at, task.order устанавливаются автоматически
```

### 2. Обновление задачи
```python
# Данные для обновления
data = {
    'title': 'Купить хлеб',
    'is_completed': True,
    'order': 5
}

# Создание сериализатора
serializer = UpdateTaskSerializer(instance=task, data=data)

# Валидация и сохранение
if serializer.is_valid():
    serializer.save()
```

### 3. Отображение задачи
```python
# Сериализация для API ответа
serializer = TaskSerializer(task)
json_data = serializer.data
# Результат: {'id': 1, 'title': 'Купить молоко', 'is_completed': False, ...}
```

## Валидация данных

### 1. Автоматическая валидация
```python
# Django автоматически проверяет:
# - Обязательные поля (title не может быть пустым)
# - Типы данных (is_completed должен быть boolean)
# - Ограничения модели (max_length для title)
```

### 2. Кастомная валидация
```python
class TaskSerializer(serializers.ModelSerializer):
    def validate_title(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError("Название должно содержать минимум 3 символа")
        return value.strip()
    
    def validate_order(self, value):
        if value < 0:
            raise serializers.ValidationError("Порядок не может быть отрицательным")
        return value
```

### 3. Валидация на уровне объекта
```python
def validate(self, attrs):
    # Проверка, что задача не дублируется
    if Task.objects.filter(
        owner=self.context['request'].user,
        title=attrs['title']
    ).exists():
        raise serializers.ValidationError("Задача с таким названием уже существует")
    
    return attrs
```

## Частые ошибки и как их избежать

### 1. "This field is required"
**Причина:** Не указано обязательное поле
**Решение:** Убедитесь, что все обязательные поля присутствуют

### 2. "Invalid data type"
**Причина:** Неверный тип данных
**Решение:** Проверьте типы данных (boolean для is_completed, integer для order)

### 3. "Field is read-only"
**Причина:** Попытка изменить read-only поле
**Решение:** Не включайте read-only поля в данные для обновления

## Почему выбрано именно так

### 1. Разделение ответственности
- **TaskSerializer** - для отображения данных
- **CreateTaskSerializer** - для создания (только title)
- **UpdateTaskSerializer** - для обновления (основные поля)

### 2. Безопасность
- **read_only_fields** - защищают системные поля
- **Ограниченные поля** - пользователь не может изменить все поля
- **Валидация** - проверка данных перед сохранением

### 3. Гибкость
- **Разные сериализаторы** - для разных операций
- **Кастомная валидация** - можно добавить свою логику
- **Контекст** - доступ к request для дополнительной логики

## Тестирование сериализаторов

### 1. Тест создания задачи
```python
def test_create_task_serializer(self):
    data = {'title': 'Test task'}
    serializer = CreateTaskSerializer(data=data)
    
    self.assertTrue(serializer.is_valid())
    task = serializer.save(owner=self.user)
    
    self.assertEqual(task.title, 'Test task')
    self.assertFalse(task.is_completed)
    self.assertEqual(task.order, 0)
```

### 2. Тест обновления задачи
```python
def test_update_task_serializer(self):
    task = Task.objects.create(
        owner=self.user,
        title='Original title',
        is_completed=False,
        order=0
    )
    
    data = {
        'title': 'Updated title',
        'is_completed': True,
        'order': 5
    }
    
    serializer = UpdateTaskSerializer(instance=task, data=data)
    self.assertTrue(serializer.is_valid())
    serializer.save()
    
    task.refresh_from_db()
    self.assertEqual(task.title, 'Updated title')
    self.assertTrue(task.is_completed)
    self.assertEqual(task.order, 5)
```

### 3. Тест валидации
```python
def test_title_validation(self):
    data = {'title': 'ab'}  # Слишком короткое название
    serializer = CreateTaskSerializer(data=data)
    
    self.assertFalse(serializer.is_valid())
    self.assertIn('title', serializer.errors)
```

## Связанные файлы
- `tasks/models.py` - модель Task
- `tasks/views.py` - представления, использующие сериализаторы
- `tasks/urls.py` - URL маршруты

## Расширение функциональности

### 1. Добавление вычисляемых полей
```python
class TaskSerializer(serializers.ModelSerializer):
    days_since_created = serializers.SerializerMethodField()
    
    def get_days_since_created(self, obj):
        return (timezone.now() - obj.created_at).days
    
    class Meta:
        model = Task
        fields = ['id', 'title', 'is_completed', 'order', 'created_at', 'updated_at', 'days_since_created']
```

### 2. Добавление вложенных объектов
```python
class TaskSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    
    class Meta:
        model = Task
        fields = ['id', 'title', 'is_completed', 'order', 'created_at', 'updated_at', 'owner']
```

### 3. Добавление условных полей
```python
class TaskSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        
        # Добавляем поле только для детального просмотра
        if self.context.get('view') and self.context['view'].action == 'retrieve':
            data['full_info'] = f"Задача '{instance.title}' создана {instance.created_at}"
        
        return data
```

## Лучшие практики

### 1. Именование
- Используйте понятные имена сериализаторов
- `CreateTaskSerializer` лучше чем `TaskCreateSerializer`
- Следуйте конвенции `ActionModelSerializer`

### 2. Валидация
- Добавляйте валидацию на уровне поля и объекта
- Возвращайте понятные сообщения об ошибках
- Используйте `clean()` метод для сложной валидации

### 3. Производительность
- Используйте `select_related()` для связанных объектов
- Избегайте N+1 запросов
- Кэшируйте результаты вычислений

