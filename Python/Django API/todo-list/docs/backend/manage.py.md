# manage.py

## Назначение
`manage.py` - это главный файл для управления Django проектом. Это скрипт командной строки, который позволяет выполнять различные операции с проектом: запуск сервера, создание миграций, создание суперпользователя и многое другое.

## Контекст и зависимости
- **Django** - основной фреймворк
- **os** - модуль для работы с операционной системой
- **sys** - модуль для работы с системными параметрами
- **django.core.management** - модуль Django для выполнения команд

## Пошаговое объяснение кода

### 1. Shebang и docstring
```python
#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
```
- `#!/usr/bin/env python` - указывает системе, какой интерпретатор Python использовать
- `"""..."""` - многострочный комментарий, описывающий назначение файла

### 2. Импорт модулей
```python
import os
import sys
```
- `os` - для работы с переменными окружения
- `sys` - для работы с аргументами командной строки

### 3. Функция main()
```python
def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_api.settings')
```
- `os.environ.setdefault()` - устанавливает переменную окружения, если она не была установлена ранее
- `'DJANGO_SETTINGS_MODULE'` - переменная, которая указывает Django, где находятся настройки проекта
- `'todo_api.settings'` - путь к файлу настроек (todo_api/settings.py)

### 4. Обработка импорта Django
```python
try:
    from django.core.management import execute_from_command_line
except ImportError as exc:
    raise ImportError(
        "Couldn't import Django. Are you sure it's installed and "
        "available on your PYTHONPATH environment variable? Did you "
        "forget to activate a virtual environment?"
    ) from exc
```
- `try/except` - обработка ошибок
- Если Django не установлен, выводится понятное сообщение об ошибке
- `from exc` - сохраняет оригинальную ошибку для отладки

### 5. Выполнение команд
```python
execute_from_command_line(sys.argv)
```
- `sys.argv` - список аргументов командной строки
- `execute_from_command_line()` - выполняет команду Django

### 6. Точка входа
```python
if __name__ == '__main__':
    main()
```
- `if __name__ == '__main__'` - код выполняется только при прямом запуске файла
- `main()` - вызывает основную функцию

## Как использовать

### Основные команды:
```bash
# Запуск сервера разработки
python manage.py runserver

# Создание миграций
python manage.py makemigrations

# Применение миграций
python manage.py migrate

# Создание суперпользователя
python manage.py createsuperuser

# Запуск Django shell
python manage.py shell

# Сборка статических файлов
python manage.py collectstatic
```

### Примеры использования:
```bash
# Запуск на другом порту
python manage.py runserver 8080

# Создание миграций для конкретного приложения
python manage.py makemigrations accounts

# Применение миграций с выводом SQL
python manage.py migrate --verbosity=2
```

## Частые ошибки и как их избежать

### 1. "No module named 'django'"
**Причина:** Django не установлен или виртуальное окружение не активировано
**Решение:** 
```bash
pip install django
# или активируйте виртуальное окружение
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

### 2. "Settings module not found"
**Причина:** Неправильный путь к настройкам
**Решение:** Проверьте, что файл `todo_api/settings.py` существует

### 3. "Command not found"
**Причина:** Неправильный синтаксис команды
**Решение:** Используйте `python manage.py help` для списка команд

## Почему выбрано именно так

### 1. Стандартная структура Django
- `manage.py` - обязательный файл в каждом Django проекте
- Следует официальным рекомендациям Django

### 2. Обработка ошибок
- Понятные сообщения об ошибках для новичков
- Помогает диагностировать проблемы с установкой

### 3. Гибкость
- Позволяет передавать аргументы командной строки
- Поддерживает все стандартные команды Django

## Дополнительные возможности

### Кастомные команды
Можно создавать собственные команды управления:
```python
# В приложении создайте папку management/commands/
# todo_api/accounts/management/commands/mycommand.py
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Моя кастомная команда'
    
    def handle(self, *args, **options):
        self.stdout.write('Привет из кастомной команды!')
```

### Переменные окружения
Можно использовать переменные окружения для настроек:
```bash
export DJANGO_SETTINGS_MODULE=todo_api.settings
python manage.py runserver
```

## Связанные файлы
- `todo_api/settings.py` - настройки проекта
- `todo_api/urls.py` - маршруты проекта
- `todo_api/wsgi.py` - WSGI конфигурация
- `todo_api/asgi.py` - ASGI конфигурация

