# app/schemas/ - Схемы валидации данных

## Описание папки

Папка `app/schemas/` содержит **схемы валидации данных** для нашего API. Схемы - это Python классы, которые описывают структуру данных, которые мы принимаем и возвращаем через API. Они обеспечивают валидацию, сериализацию и документацию данных.

## Что такое схемы валидации?

**Схемы валидации** - это описание структуры данных с правилами проверки. Они определяют:
- Какие поля должны быть в данных
- Какие типы данных ожидаются
- Какие ограничения применяются
- Как данные преобразуются

### Пример схемы
```python
class MenuItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    price: Decimal = Field(..., gt=0)
    category: str = Field(..., regex="^(starter|main|dessert|drink)$")
```

**Что происходит:**
- Поле `name` - строка от 1 до 100 символов
- Поле `price` - число больше 0
- Поле `category` - строка, соответствующая регулярному выражению

## Структура папки

```
app/schemas/
├── __init__.py          # Инициализация схем
├── common.py            # Общие схемы (пагинация)
├── menus.py             # Схемы для блюд
└── chefs.py             # Схемы для поваров
```

## Файлы в папке

- [__init__.py](schemas-init.md) - Инициализация схем
- [common.py](common.md) - Общие схемы
- [menus.py](menus.md) - Схемы для блюд
- [chefs.py](chefs.md) - Схемы для поваров

## Основные концепции

### Pydantic
**Pydantic** - это библиотека для валидации данных в Python. Она:
- Проверяет типы данных
- Применяет ограничения
- Преобразует данные
- Генерирует JSON схемы
- Обеспечивает безопасность

### BaseModel
**BaseModel** - базовый класс Pydantic для всех схем. Он предоставляет:
- Автоматическую валидацию
- Сериализацию в JSON
- Документацию полей
- Обработку ошибок

### Field
**Field** - функция для описания полей схемы. Она позволяет:
- Устанавливать ограничения
- Добавлять описания
- Задавать значения по умолчанию
- Создавать валидаторы

## Типы схем

### Входные схемы (Input)
Схемы для данных, которые мы получаем от клиента:

```python
class MenuItemCreate(BaseModel):
    """Схема для создания блюда."""
    name: str = Field(..., min_length=1, max_length=100)
    price: Decimal = Field(..., gt=0)
    category: str = Field(...)
```

**Особенности:**
- Строгие ограничения
- Обязательные поля
- Валидация типов

### Выходные схемы (Output)
Схемы для данных, которые мы возвращаем клиенту:

```python
class MenuItemOut(BaseModel):
    """Схема для вывода блюда."""
    id: int
    name: str
    price: Decimal
    category: str
    created_at: datetime
```

**Особенности:**
- Все поля включены
- Автоматическая сериализация
- Безопасность данных

### Схемы обновления (Update)
Схемы для частичного обновления данных:

```python
class MenuItemUpdate(BaseModel):
    """Схема для обновления блюда."""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    price: Optional[Decimal] = Field(None, gt=0)
    category: Optional[str] = Field(None)
```

**Особенности:**
- Все поля необязательные
- Валидация только переданных полей
- Гибкость обновления

## Валидация данных

### Автоматическая валидация
```python
class UserCreate(BaseModel):
    name: str = Field(..., min_length=1)
    age: int = Field(..., ge=0, le=120)
    email: str = Field(..., regex=r'^[\w\.-]+@[\w\.-]+\.\w+$')

# Автоматически проверяется:
# - name не пустое
# - age от 0 до 120
# - email соответствует регулярному выражению
```

### Кастомные валидаторы
```python
class UserCreate(BaseModel):
    name: str
    age: int
    
    @field_validator('age')
    @classmethod
    def validate_age(cls, v):
        if v < 18:
            raise ValueError('Возраст должен быть не менее 18 лет')
        return v
```

### Валидация зависимых полей
```python
class UserCreate(BaseModel):
    password: str
    confirm_password: str
    
    @model_validator(mode='after')
    def passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError('Пароли не совпадают')
        return self
```

## Сериализация данных

### В JSON
```python
# Создать объект
user = UserCreate(name="Иван", age=25, email="ivan@example.com")

# Сериализовать в JSON
json_data = user.model_dump()
# Результат: {"name": "Иван", "age": 25, "email": "ivan@example.com"}
```

### Из JSON
```python
# Создать объект из JSON
json_data = {"name": "Иван", "age": 25, "email": "ivan@example.com"}
user = UserCreate(**json_data)
```

### Исключение полей
```python
# Исключить поля при сериализации
json_data = user.model_dump(exclude={'password'})
```

## Обработка ошибок

### Ошибки валидации
```python
try:
    user = UserCreate(name="", age=-5, email="invalid")
except ValidationError as e:
    print(e.errors())
    # Результат: список ошибок валидации
```

### Формат ошибок
```python
[
    {
        "type": "value_error",
        "loc": ("age",),
        "msg": "ensure this value is greater than or equal to 0",
        "input": -5
    },
    {
        "type": "value_error",
        "loc": ("email",),
        "msg": "string does not match regex",
        "input": "invalid"
    }
]
```

## Документация API

### Автоматическая генерация
Pydantic автоматически генерирует JSON схемы для документации API:

```python
# Получить JSON схему
schema = UserCreate.model_json_schema()
print(schema)
```

### Swagger/OpenAPI
Схемы Pydantic интегрируются с Swagger для автоматической генерации документации API.

## Производительность

### Ленивая валидация
```python
# Валидация происходит только при создании объекта
user = UserCreate(**data)  # Валидация здесь
```

### Кэширование
```python
# Pydantic кэширует валидаторы для повышения производительности
```

## Тестирование схем

### Тестирование валидации
```python
def test_user_validation():
    # Валидные данные
    user = UserCreate(name="Иван", age=25, email="ivan@example.com")
    assert user.name == "Иван"
    
    # Невалидные данные
    with pytest.raises(ValidationError):
        UserCreate(name="", age=-5, email="invalid")
```

### Тестирование сериализации
```python
def test_user_serialization():
    user = UserCreate(name="Иван", age=25, email="ivan@example.com")
    json_data = user.model_dump()
    
    assert json_data["name"] == "Иван"
    assert json_data["age"] == 25
```

## Лучшие практики

### 1. Разделение схем
- Отдельные схемы для создания, обновления и вывода
- Общие схемы для переиспользования
- Специфичные схемы для конкретных случаев

### 2. Валидация
- Используйте встроенные валидаторы когда возможно
- Создавайте кастомные валидаторы для сложной логики
- Проверяйте зависимости между полями

### 3. Документация
- Добавляйте описания к полям
- Используйте docstring для схем
- Документируйте валидаторы

### 4. Производительность
- Избегайте сложных валидаторов в циклах
- Используйте кэширование когда возможно
- Оптимизируйте сериализацию

## Заключение

Папка `app/schemas/` - это **защита** нашего API. Она:
- Валидирует входящие данные
- Обеспечивает типизацию
- Предоставляет сериализацию
- Генерирует документацию
- Обеспечивает безопасность

Без схем мы не смогли бы безопасно обрабатывать данные!


