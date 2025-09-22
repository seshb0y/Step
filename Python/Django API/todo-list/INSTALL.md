# Инструкция по установке и запуску Todo List

## Системные требования
- Python 3.8+
- Node.js 16+
- npm или yarn

## Пошаговая установка

### 1. Клонирование проекта
```bash
cd "C:\Rep\Step\Python\Django API\todo-list"
```

### 2. Настройка бэкенда (Django API)

#### 2.1. Создание виртуального окружения
```bash
# Windows PowerShell
python -m venv .venv

# Активация окружения
.venv\Scripts\Activate.ps1
```

#### 2.2. Установка зависимостей
```bash
pip install -r requirements.txt
```

#### 2.3. Применение миграций
```bash
python manage.py migrate
```

#### 2.4. Создание суперпользователя (опционально)
```bash
python manage.py createsuperuser
```

#### 2.5. Запуск сервера
```bash
python manage.py runserver
```

Бэкенд будет доступен по адресу: http://localhost:8000

### 3. Настройка фронтенда (React)

#### 3.1. Переход в папку фронтенда
```bash
cd todo-ui
```

#### 3.2. Установка зависимостей
```bash
npm install
```

#### 3.3. Создание файла .env
Создайте файл `.env` в папке `todo-ui` со следующим содержимым:
```
VITE_API_URL=http://localhost:8000
```

#### 3.4. Запуск dev сервера
```bash
npm run dev
```

Фронтенд будет доступен по адресу: http://localhost:5173

## Проверка работы

### 1. Проверка бэкенда
Откройте в браузере: http://localhost:8000/api/
Должна отобразиться страница Django REST Framework.

### 2. Проверка фронтенда
Откройте в браузере: http://localhost:5173
Должна отобразиться главная страница приложения.

### 3. Тестирование функциональности
1. Зарегистрируйтесь или войдите в систему
2. Создайте несколько задач
3. Попробуйте переключить статус выполнения
4. Протестируйте drag & drop для изменения порядка
5. Попробуйте фильтрацию задач
6. Переключите тему

## Возможные проблемы и решения

### Проблема: CORS ошибки
**Решение**: Убедитесь, что бэкенд запущен на порту 8000, а фронтенд на 5173.

### Проблема: Ошибки миграций
**Решение**: 
```bash
python manage.py makemigrations
python manage.py migrate
```

### Проблема: Ошибки установки зависимостей
**Решение**: 
```bash
# Для Python
pip install --upgrade pip
pip install -r requirements.txt

# Для Node.js
npm install --legacy-peer-deps
```

### Проблема: Порт уже занят
**Решение**: 
```bash
# Для Django (изменить порт)
python manage.py runserver 8001

# Для Vite (изменить порт)
npm run dev -- --port 5174
```

## Структура проекта после установки

```
todo-list/
├── .venv/                    # Виртуальное окружение Python
├── todo_api/                 # Django проект
│   ├── accounts/             # Приложение аутентификации
│   ├── tasks/                # Приложение задач
│   ├── db.sqlite3           # База данных SQLite
│   └── manage.py
├── todo-ui/                  # React приложение
│   ├── node_modules/         # Зависимости Node.js
│   ├── src/                  # Исходный код
│   ├── .env                  # Переменные окружения
│   └── package.json
├── docs/                     # Документация
├── requirements.txt          # Python зависимости
└── README.md
```

## Команды для разработки

### Бэкенд
```bash
# Активация окружения
.venv\Scripts\Activate.ps1

# Запуск сервера
python manage.py runserver

# Создание миграций
python manage.py makemigrations

# Применение миграций
python manage.py migrate

# Создание суперпользователя
python manage.py createsuperuser

# Django shell
python manage.py shell
```

### Фронтенд
```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview

# Линтинг
npm run lint
```

## Остановка серверов
- **Django**: Ctrl+C в терминале
- **Vite**: Ctrl+C в терминале

## Дополнительные настройки

### Настройка базы данных для продакшена
В файле `todo_api/settings.py` замените SQLite на PostgreSQL или MySQL:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### Настройка CORS для продакшена
В файле `todo_api/settings.py`:

```python
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
]
```

