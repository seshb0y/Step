# app/utils/ - Вспомогательные функции

## Описание папки

Папка `app/utils/` содержит **вспомогательные функции и утилиты** для нашего приложения. Это общие функции, которые используются в разных частях приложения и не относятся к конкретной предметной области.

## Что такое утилиты?

**Утилиты** - это вспомогательные функции и классы, которые:
- Выполняют общие задачи
- Используются в разных частях приложения
- Не содержат бизнес-логику
- Упрощают код и повышают переиспользование

### Примеры утилит
- Форматирование ответов API
- Обработка ошибок
- Пагинация данных
- Валидация данных
- Логирование

## Структура папки

```
app/utils/
├── __init__.py          # Инициализация утилит
├── responses.py         # Форматирование ответов
├── errors.py            # Обработка ошибок
└── pagination.py        # Пагинация данных
```

## Файлы в папке

- [__init__.py](utils-init.md) - Инициализация утилит
- [responses.py](responses.md) - Форматирование ответов
- [errors.py](errors.md) - Обработка ошибок
- [pagination.py](pagination.md) - Пагинация данных

## Основные концепции

### Переиспользование кода
Утилиты позволяют избежать дублирования кода:
```python
# Вместо повторения в каждом endpoint
return {'data': result, 'message': 'Успешно'}

# Используем утилиту
return success_response(result, 'Успешно')
```

### Единообразие
Утилиты обеспечивают единообразный стиль:
```python
# Все ответы API имеют одинаковый формат
{
    "data": {...},
    "message": "Операция выполнена успешно"
}
```

### Централизация
Общая логика сосредоточена в одном месте:
```python
# Вся обработка ошибок в одном файле
def handle_validation_error(error):
    return {'error': {'code': 'VALIDATION_ERROR', 'message': str(error)}}, 422
```

## Типы утилит

### Форматирование ответов
```python
def success_response(data, message="Успешно"):
    """Стандартный успешный ответ."""
    return {
        'data': data,
        'message': message
    }

def error_response(message, code="ERROR", status_code=400):
    """Стандартный ответ с ошибкой."""
    return {
        'error': {
            'code': code,
            'message': message
        }
    }, status_code
```

### Обработка ошибок
```python
class APIError(Exception):
    """Базовый класс для ошибок API."""
    def __init__(self, message, status_code=400):
        self.message = message
        self.status_code = status_code
        super().__init__(message)

class ValidationError(APIError):
    """Ошибка валидации данных."""
    def __init__(self, message="Ошибка валидации"):
        super().__init__(message, 422)
```

### Пагинация
```python
def paginate_query(query, page=1, per_page=20):
    """Применить пагинацию к запросу."""
    offset = (page - 1) * per_page
    return query.offset(offset).limit(per_page)

def create_pagination_meta(total, page, per_page):
    """Создать метаданные пагинации."""
    return {
        'total': total,
        'page': page,
        'per_page': per_page,
        'pages': (total + per_page - 1) // per_page
    }
```

## Форматирование данных

### Сериализация
```python
def serialize_model(model):
    """Сериализовать модель в словарь."""
    if hasattr(model, 'to_dict'):
        return model.to_dict()
    
    result = {}
    for column in model.__table__.columns:
        value = getattr(model, column.name)
        if isinstance(value, datetime):
            result[column.name] = value.isoformat()
        else:
            result[column.name] = value
    
    return result
```

### Форматирование дат
```python
from datetime import datetime

def format_datetime(dt, format='%Y-%m-%d %H:%M:%S'):
    """Форматировать дату и время."""
    if isinstance(dt, str):
        dt = datetime.fromisoformat(dt)
    return dt.strftime(format)

def format_date(dt, format='%Y-%m-%d'):
    """Форматировать дату."""
    if isinstance(dt, str):
        dt = datetime.fromisoformat(dt)
    return dt.strftime(format)
```

### Форматирование чисел
```python
def format_currency(amount, currency='RUB'):
    """Форматировать валюту."""
    return f"{amount:.2f} {currency}"

def format_percentage(value, decimals=2):
    """Форматировать процент."""
    return f"{value:.{decimals}f}%"
```

## Валидация данных

### Валидация email
```python
import re

def is_valid_email(email):
    """Проверить валидность email."""
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None
```

### Валидация телефона
```python
def is_valid_phone(phone):
    """Проверить валидность телефона."""
    # Удалить все нецифровые символы
    digits = re.sub(r'\D', '', phone)
    # Проверить длину (7-15 цифр)
    return 7 <= len(digits) <= 15
```

### Валидация URL
```python
from urllib.parse import urlparse

def is_valid_url(url):
    """Проверить валидность URL."""
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except:
        return False
```

## Работа с файлами

### Загрузка файлов
```python
import os
from werkzeug.utils import secure_filename

def save_uploaded_file(file, upload_folder):
    """Сохранить загруженный файл."""
    if file and file.filename:
        filename = secure_filename(file.filename)
        file_path = os.path.join(upload_folder, filename)
        file.save(file_path)
        return file_path
    return None
```

### Проверка типа файла
```python
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    """Проверить разрешенный тип файла."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
```

## Работа с JSON

### Безопасная загрузка JSON
```python
import json

def safe_json_loads(data, default=None):
    """Безопасно загрузить JSON."""
    try:
        return json.loads(data)
    except (json.JSONDecodeError, TypeError):
        return default
```

### Форматирование JSON
```python
def format_json(data, indent=2):
    """Форматировать JSON с отступами."""
    return json.dumps(data, indent=indent, ensure_ascii=False)
```

## Работа со строками

### Очистка строк
```python
def clean_string(s):
    """Очистить строку от лишних пробелов."""
    if isinstance(s, str):
        return s.strip()
    return s
```

### Обрезка строк
```python
def truncate_string(s, max_length=100, suffix='...'):
    """Обрезать строку до максимальной длины."""
    if len(s) <= max_length:
        return s
    return s[:max_length - len(suffix)] + suffix
```

### Генерация случайных строк
```python
import string
import random

def generate_random_string(length=10):
    """Сгенерировать случайную строку."""
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))
```

## Работа с датами

### Вычисление разности дат
```python
from datetime import datetime, timedelta

def days_between(date1, date2):
    """Вычислить количество дней между датами."""
    if isinstance(date1, str):
        date1 = datetime.fromisoformat(date1)
    if isinstance(date2, str):
        date2 = datetime.fromisoformat(date2)
    
    return (date2 - date1).days
```

### Форматирование относительного времени
```python
def time_ago(dt):
    """Форматировать время как 'X времени назад'."""
    now = datetime.utcnow()
    diff = now - dt
    
    if diff.days > 0:
        return f"{diff.days} дней назад"
    elif diff.seconds > 3600:
        hours = diff.seconds // 3600
        return f"{hours} часов назад"
    elif diff.seconds > 60:
        minutes = diff.seconds // 60
        return f"{minutes} минут назад"
    else:
        return "только что"
```

## Кэширование

### Простое кэширование
```python
from functools import lru_cache

@lru_cache(maxsize=128)
def expensive_calculation(param):
    """Дорогая операция с кэшированием."""
    # Сложные вычисления
    return result
```

### Кэширование с TTL
```python
import time

class TTLCache:
    """Кэш с временем жизни."""
    
    def __init__(self, ttl=300):
        self.cache = {}
        self.ttl = ttl
    
    def get(self, key):
        """Получить значение из кэша."""
        if key in self.cache:
            value, timestamp = self.cache[key]
            if time.time() - timestamp < self.ttl:
                return value
            else:
                del self.cache[key]
        return None
    
    def set(self, key, value):
        """Установить значение в кэш."""
        self.cache[key] = (value, time.time())
```

## Логирование

### Настройка логирования
```python
import logging

def setup_logging(level=logging.INFO):
    """Настроить логирование."""
    logging.basicConfig(
        level=level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler('app.log'),
            logging.StreamHandler()
        ]
    )
```

### Структурированное логирование
```python
import json

def log_structured(level, message, **kwargs):
    """Структурированное логирование."""
    log_data = {
        'timestamp': datetime.utcnow().isoformat(),
        'level': level,
        'message': message,
        **kwargs
    }
    
    logger = logging.getLogger(__name__)
    logger.log(level, json.dumps(log_data))
```

## Тестирование утилит

### Unit тесты
```python
import pytest

class TestUtils:
    def test_is_valid_email(self):
        """Тест валидации email."""
        assert is_valid_email('test@example.com')
        assert not is_valid_email('invalid-email')
        assert not is_valid_email('')
    
    def test_truncate_string(self):
        """Тест обрезки строки."""
        assert truncate_string('Hello', 3) == 'Hel...'
        assert truncate_string('Hi', 10) == 'Hi'
    
    def test_format_currency(self):
        """Тест форматирования валюты."""
        assert format_currency(15.50) == '15.50 RUB'
        assert format_currency(100) == '100.00 RUB'
```

## Производительность

### Профилирование
```python
import time
from functools import wraps

def profile_time(func):
    """Декоратор для измерения времени выполнения."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} выполнилась за {end - start:.4f} секунд")
        return result
    return wrapper
```

### Мемоизация
```python
from functools import lru_cache

@lru_cache(maxsize=1000)
def fibonacci(n):
    """Вычисление чисел Фибоначчи с мемоизацией."""
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

## Заключение

Папка `app/utils/` - это **инструментарий** нашего приложения. Она:
- Предоставляет переиспользуемые функции
- Обеспечивает единообразие кода
- Упрощает разработку
- Повышает производительность
- Улучшает читаемость

Без утилит наш код был бы менее организованным и более сложным!


