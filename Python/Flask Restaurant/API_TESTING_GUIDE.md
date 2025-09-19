# Руководство по тестированию API ресторана

## 🚀 Быстрый старт

### 1. Запуск приложения
```bash
py run.py
```
Приложение будет доступно по адресу: `http://localhost:5000`

### 2. Проверка работоспособности
```bash
py api_checker.py
```

## 📋 Тестирование эндпоинтов

### Health Check
```bash
# PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/health" -Method GET

# curl
curl -X GET http://localhost:5000/health
```

### Меню (Menu Items)

#### Создание блюда
```bash
# PowerShell
$body = '{"name": "Том Ям", "description": "Острый суп с креветками", "category": "main", "price": 14.90, "is_available": true}'
Invoke-WebRequest -Uri "http://localhost:5000/api/v1/menus/" -Method POST -Body $body -ContentType "application/json"

# curl
curl -X POST http://localhost:5000/api/v1/menus/ \
  -H "Content-Type: application/json" \
  -d '{"name": "Том Ям", "description": "Острый суп с креветками", "category": "main", "price": 14.90, "is_available": true}'
```

#### Получение списка блюд
```bash
# PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/api/v1/menus/" -Method GET

# curl
curl -X GET http://localhost:5000/api/v1/menus/
```

#### Фильтрация блюд
```bash
# По категории
curl -X GET "http://localhost:5000/api/v1/menus/?category=main"

# По цене
curl -X GET "http://localhost:5000/api/v1/menus/?min_price=10&max_price=30"

# По доступности
curl -X GET "http://localhost:5000/api/v1/menus/?is_available=true"

# Поиск
curl -X GET "http://localhost:5000/api/v1/menus/?q=стейк"

# Сортировка
curl -X GET "http://localhost:5000/api/v1/menus/?sort=price"

# Пагинация
curl -X GET "http://localhost:5000/api/v1/menus/?page=1&per_page=10"
```

#### Получение конкретного блюда
```bash
curl -X GET http://localhost:5000/api/v1/menus/1
```

#### Обновление блюда
```bash
# Полное обновление (PUT)
curl -X PUT http://localhost:5000/api/v1/menus/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Том Ям Суп", "description": "Острый суп с креветками и грибами", "category": "main", "price": 16.90, "is_available": true}'

# Частичное обновление (PATCH)
curl -X PATCH http://localhost:5000/api/v1/menus/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 15.90, "is_available": false}'
```

#### Удаление блюда
```bash
curl -X DELETE http://localhost:5000/api/v1/menus/1
```

### Повара (Chefs)

#### Создание повара
```bash
# PowerShell
$body = '{"full_name": "Иван Петров", "rank": "senior", "specialties": ["Азиатская кухня", "Супы"], "is_active": true}'
Invoke-WebRequest -Uri "http://localhost:5000/api/v1/chefs/" -Method POST -Body $body -ContentType "application/json"

# curl
curl -X POST http://localhost:5000/api/v1/chefs/ \
  -H "Content-Type: application/json" \
  -d '{"full_name": "Иван Петров", "rank": "senior", "specialties": ["Азиатская кухня", "Супы"], "is_active": true}'
```

#### Получение списка поваров
```bash
curl -X GET http://localhost:5000/api/v1/chefs/
```

#### Фильтрация поваров
```bash
# По специализации
curl -X GET "http://localhost:5000/api/v1/chefs/?specialty=Азиатская"

# По активности
curl -X GET "http://localhost:5000/api/v1/chefs/?is_active=true"

# Поиск по имени
curl -X GET "http://localhost:5000/api/v1/chefs/?q=Иван"

# Сортировка
curl -X GET "http://localhost:5000/api/v1/chefs/?sort=name"
```

#### Получение конкретного повара
```bash
curl -X GET http://localhost:5000/api/v1/chefs/1
```

#### Обновление повара
```bash
# Полное обновление (PUT)
curl -X PUT http://localhost:5000/api/v1/chefs/1 \
  -H "Content-Type: application/json" \
  -d '{"full_name": "Иван Петров", "rank": "chef-de-cuisine", "specialties": ["Азиатская кухня", "Супы", "Жаркое"], "is_active": true}'

# Частичное обновление (PATCH)
curl -X PATCH http://localhost:5000/api/v1/chefs/1 \
  -H "Content-Type: application/json" \
  -d '{"specialties": ["Азиатская кухня", "Супы"], "is_active": false}'
```

#### Удаление повара
```bash
curl -X DELETE http://localhost:5000/api/v1/chefs/1
```

## 📊 Postman

### Импорт коллекции
1. Откройте Postman
2. Нажмите "Import"
3. Выберите файл `Restaurant_API.postman_collection.json`
4. Установите переменную `base_url` = `http://localhost:5000`

### Переменные коллекции
- `base_url`: `http://localhost:5000`
- `menu_id`: ID блюда для тестирования
- `chef_id`: ID повара для тестирования

## 🔧 Автоматическое тестирование

### Скрипт проверки API
```bash
py api_checker.py
```

### Полное тестирование
```bash
py test_api.py
```

## 📝 Коды ответов

- `200` - Успешный запрос
- `201` - Ресурс создан
- `404` - Ресурс не найден
- `409` - Конфликт (дублирование)
- `422` - Ошибка валидации
- `500` - Внутренняя ошибка сервера

## 🎯 Примеры данных

### Блюда
```json
{
  "name": "Том Ям",
  "description": "Острый суп с креветками",
  "category": "main",
  "price": 14.90,
  "is_available": true
}
```

### Повара
```json
{
  "full_name": "Иван Петров",
  "rank": "senior",
  "specialties": ["Азиатская кухня", "Супы"],
  "is_active": true
}
```

## 🚨 Устранение неполадок

### Приложение не запускается
1. Проверьте, что порт 5000 свободен
2. Убедитесь, что установлены все зависимости: `py -m pip install -r requirements.txt`
3. Проверьте, что база данных создана: `py -m alembic upgrade head`

### Ошибки 500
1. Проверьте логи приложения в консоли
2. Убедитесь, что база данных доступна
3. Проверьте, что все таблицы созданы

### Ошибки валидации 422
1. Проверьте формат JSON
2. Убедитесь, что все обязательные поля переданы
3. Проверьте типы данных (например, price должен быть числом)


