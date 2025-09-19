# app/config.py - Конфигурация приложения

## Описание файла

Файл `app/config.py` содержит **конфигурацию** нашего Flask приложения. Конфигурация - это настройки, которые определяют, как работает приложение: где находится база данных, какой секретный ключ использовать, включен ли режим отладки и т.д.

## Что такое конфигурация?

**Конфигурация** - это набор настроек, которые определяют поведение приложения. Вместо того чтобы "зашивать" настройки в код, мы выносим их в отдельные классы. Это позволяет:
- Легко менять настройки для разных сред (разработка, тесты, продакшен)
- Хранить секретные данные отдельно от кода
- Использовать переменные окружения для безопасности

## Подробный разбор кода

```python
"""Конфигурация приложения."""

import os
from dotenv import load_dotenv

# Загружаем переменные окружения
load_dotenv()


class BaseConfig:
    """Базовая конфигурация."""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///app.db'


class DevelopmentConfig(BaseConfig):
    """Конфигурация для разработки."""
    DEBUG = True


class TestingConfig(BaseConfig):
    """Конфигурация для тестирования."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or 'sqlite:///test.db'


class ProductionConfig(BaseConfig):
    """Конфигурация для продакшена."""
    DEBUG = False
    # Дополнительные настройки для продакшена
```

### Строки 1-6: Импорты и загрузка переменных окружения
```python
"""Конфигурация приложения."""

import os
from dotenv import load_dotenv

# Загружаем переменные окружения
load_dotenv()
```

**`import os`**
- **os** - встроенная библиотека Python для работы с операционной системой
- **os.environ** - словарь с переменными окружения
- **Переменные окружения** - настройки, доступные во всей системе

**`from dotenv import load_dotenv`**
- **dotenv** - библиотека для работы с .env файлами
- **load_dotenv()** - загружает переменные из файла .env в os.environ
- **.env файл** - файл с настройками, который не попадает в Git

**Пример .env файла:**
```
SECRET_KEY=my-super-secret-key-123
DATABASE_URL=sqlite:///app.db
DEBUG=True
```

### Строки 9-13: Базовый класс конфигурации
```python
class BaseConfig:
    """Базовая конфигурация."""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///app.db'
```

**`class BaseConfig:`**
- **Базовый класс** - содержит общие настройки для всех сред
- **Наследование** - другие классы будут наследовать эти настройки

**`SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'`**
- **SECRET_KEY** - секретный ключ для подписи сессий и токенов
- **os.environ.get('SECRET_KEY')** - получает значение из переменной окружения
- **or 'dev-secret-key'** - если переменная не найдена, использует значение по умолчанию
- **Зачем нужен**: Безопасность, подпись данных, шифрование

**`SQLALCHEMY_TRACK_MODIFICATIONS = False`**
- **SQLAlchemy** - ORM для работы с базой данных
- **TRACK_MODIFICATIONS** - отслеживание изменений в объектах
- **False** - отключаем отслеживание (экономит память и ускоряет работу)
- **Зачем отключать**: В большинстве случаев не нужно, создает лишнюю нагрузку

**`SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///app.db'`**
- **DATABASE_URI** - строка подключения к базе данных
- **os.environ.get('DATABASE_URL')** - получает URL из переменной окружения
- **or 'sqlite:///app.db'** - если не найдена, использует SQLite файл
- **sqlite:///app.db** - путь к файлу базы данных SQLite

### Строки 16-18: Конфигурация для разработки
```python
class DevelopmentConfig(BaseConfig):
    """Конфигурация для разработки."""
    DEBUG = True
```

**`class DevelopmentConfig(BaseConfig):`**
- **Наследование** от BaseConfig
- **Development** - среда разработки
- **Наследует** все настройки из BaseConfig

**`DEBUG = True`**
- **DEBUG** - режим отладки Flask
- **True** - включает режим отладки
- **Что дает режим отладки**:
  - Автоматическая перезагрузка при изменении кода
  - Подробные сообщения об ошибках
  - Интерактивный отладчик
  - Медленнее работает (но удобнее для разработки)

### Строки 21-24: Конфигурация для тестирования
```python
class TestingConfig(BaseConfig):
    """Конфигурация для тестирования."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or 'sqlite:///test.db'
```

**`TESTING = True`**
- **TESTING** - режим тестирования Flask
- **True** - включает режим тестирования
- **Что дает**: Отключает некоторые проверки, ускоряет тесты

**`SQLALCHEMY_DATABASE_URI = ... or 'sqlite:///test.db'`**
- **Отдельная база данных** для тестов
- **test.db** - файл базы данных для тестов
- **Зачем отдельно**: Тесты не должны влиять на основную базу данных

### Строки 27-30: Конфигурация для продакшена
```python
class ProductionConfig(BaseConfig):
    """Конфигурация для продакшена."""
    DEBUG = False
    # Дополнительные настройки для продакшена
```

**`DEBUG = False`**
- **Отключает режим отладки** в продакшене
- **Безопасность**: Не показывает внутренние детали ошибок
- **Производительность**: Работает быстрее

## Типы баз данных

### SQLite (по умолчанию)
```python
SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'
```
- **SQLite** - файловая база данных
- **Преимущества**: Простая, не требует сервера, хороша для разработки
- **Недостатки**: Медленная при больших нагрузках, ограниченная функциональность

### PostgreSQL (продакшен)
```python
SQLALCHEMY_DATABASE_URI = 'postgresql://user:password@localhost/dbname'
```
- **PostgreSQL** - мощная реляционная база данных
- **Преимущества**: Быстрая, надежная, много функций
- **Недостатки**: Требует отдельный сервер, сложнее в настройке

### MySQL
```python
SQLALCHEMY_DATABASE_URI = 'mysql://user:password@localhost/dbname'
```
- **MySQL** - популярная база данных
- **Преимущества**: Быстрая, много хостингов
- **Недостатки**: Меньше функций чем PostgreSQL

## Переменные окружения

### Что это?
**Переменные окружения** - это настройки, доступные во всей операционной системе. Они позволяют:
- Хранить секретные данные отдельно от кода
- Менять настройки без изменения кода
- Использовать разные настройки на разных серверах

### Как установить переменные окружения

**Windows (PowerShell):**
```powershell
$env:SECRET_KEY = "my-secret-key"
$env:DATABASE_URL = "sqlite:///app.db"
```

**Windows (Command Prompt):**
```cmd
set SECRET_KEY=my-secret-key
set DATABASE_URL=sqlite:///app.db
```

**Linux/Mac:**
```bash
export SECRET_KEY="my-secret-key"
export DATABASE_URL="sqlite:///app.db"
```

### Файл .env
```env
# Секретные ключи
SECRET_KEY=my-super-secret-key-123456789

# База данных
DATABASE_URL=sqlite:///app.db
TEST_DATABASE_URL=sqlite:///test.db

# Режим отладки
DEBUG=True
```

## Безопасность

### Секретный ключ
```python
SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
```

**Зачем нужен SECRET_KEY:**
- Подпись сессий
- Шифрование cookies
- Генерация токенов
- CSRF защита

**Почему не в коде:**
- Код попадает в Git (публичный)
- Секретные данные должны быть скрыты
- Разные ключи для разных сред

### Рекомендации по безопасности
1. **Никогда не коммитьте .env файл**
2. **Используйте сложные пароли**
3. **Разные ключи для разных сред**
4. **Регулярно меняйте ключи**

## Использование конфигурации

### В create_app()
```python
def create_app(config_class=Config):
    app = Flask(__name__)
    
    # Применяем конфигурацию
    config = config_class()
    for key, value in config.__dict__.items():
        if not key.startswith('_'):
            app.config[key] = value
```

### Выбор конфигурации
```python
# Для разработки
app = create_app(DevelopmentConfig)

# Для тестов
app = create_app(TestingConfig)

# Для продакшена
app = create_app(ProductionConfig)
```

### Чтение настроек в коде
```python
from flask import current_app

# Получить настройку
secret_key = current_app.config['SECRET_KEY']
debug_mode = current_app.config['DEBUG']
```

## Дополнительные настройки

### Настройки для продакшена
```python
class ProductionConfig(BaseConfig):
    DEBUG = False
    
    # Безопасность
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    
    # Производительность
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True,
        'pool_recycle': 300,
    }
    
    # Логирование
    LOG_LEVEL = 'WARNING'
```

### Настройки для разработки
```python
class DevelopmentConfig(BaseConfig):
    DEBUG = True
    
    # Автоперезагрузка
    TEMPLATES_AUTO_RELOAD = True
    
    # Подробные ошибки
    EXPLAIN_TEMPLATE_LOADING = True
```

## Заключение

Файл `app/config.py` - это **мозг** нашего приложения. Он:
- Определяет все настройки приложения
- Использует переменные окружения для безопасности
- Поддерживает разные среды (разработка, тесты, продакшен)
- Наследует общие настройки через базовый класс
- Обеспечивает гибкость и безопасность

Без правильной конфигурации приложение не сможет работать!


