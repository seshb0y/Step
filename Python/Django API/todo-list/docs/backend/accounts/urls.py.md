# accounts/urls.py

## Назначение
Файл `urls.py` содержит URL маршруты для приложения `accounts`. Определяет, какие URL-адреса ведут к каким представлениям аутентификации.

## Контекст и зависимости
- **Django** - для работы с URL-маршрутами
- **accounts.views** - представления для обработки запросов

## Пошаговое объяснение кода

```python
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('refresh/', views.refresh_token, name='refresh'),
    path('profile/', views.user_profile, name='profile'),
]
```

### URL маршруты:
- **`register/`** - POST запрос для регистрации пользователя
- **`login/`** - POST запрос для входа в систему
- **`refresh/`** - POST запрос для обновления JWT токена
- **`profile/`** - GET запрос для получения профиля пользователя

## Полные URL-адреса:
- `http://localhost:8000/api/auth/register/`
- `http://localhost:8000/api/auth/login/`
- `http://localhost:8000/api/auth/refresh/`
- `http://localhost:8000/api/auth/profile/`

## Как протестировать
```bash
# Регистрация
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"pass123","password_confirm":"pass123"}'

# Вход
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"pass123"}'
```

## Связанные файлы
- `accounts/views.py` - представления для обработки запросов
- `todo_api/urls.py` - главный файл URL-маршрутов

