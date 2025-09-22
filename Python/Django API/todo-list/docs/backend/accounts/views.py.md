# accounts/views.py

## Назначение
Файл `views.py` содержит представления (views) для API аутентификации пользователей. Представления обрабатывают HTTP запросы, выполняют бизнес-логику и возвращают HTTP ответы. В нашем случае это REST API endpoints для регистрации, входа и управления пользователями.

## Контекст и зависимости
- **Django REST Framework** - для создания REST API
- **rest_framework** - модули DRF для API
- **rest_framework_simplejwt** - для JWT аутентификации
- **django.contrib.auth** - для работы с пользователями
- **accounts.serializers** - сериализаторы для валидации данных

## Пошаговое объяснение кода

### 1. Импорты
```python
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer
```

#### Разбор импортов:

##### `rest_framework` модули
- **`status`** - HTTP статус коды (200, 201, 400, 401, 404, 500)
- **`api_view`** - декоратор для создания API представлений
- **`permission_classes`** - декоратор для настройки разрешений
- **`AllowAny`** - разрешение для всех пользователей
- **`Response`** - класс для создания HTTP ответов

##### `rest_framework_simplejwt`
- **`RefreshToken`** - класс для создания JWT токенов

##### `django.contrib.auth`
- **`get_user_model`** - функция для получения модели пользователя

##### `accounts.serializers`
- **`UserRegistrationSerializer`** - сериализатор для регистрации
- **`UserLoginSerializer`** - сериализатор для входа
- **`UserSerializer`** - сериализатор для отображения пользователя

### 2. Получение модели пользователя
```python
User = get_user_model()
```
- **`get_user_model()`** - получает модель пользователя из настроек
- **Гибкость** - работает с любой моделью пользователя
- **Безопасность** - не привязан к конкретной модели

### 3. Представление регистрации
```python
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """Регистрация нового пользователя"""
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

#### Разбор функции register:

##### Декораторы
- **`@api_view(['POST'])`** - разрешает только POST запросы
- **`@permission_classes([AllowAny])`** - доступ для всех (не требует аутентификации)

##### Логика функции
1. **Создание сериализатора** - `UserRegistrationSerializer(data=request.data)`
2. **Валидация данных** - `serializer.is_valid()`
3. **Создание пользователя** - `serializer.save()`
4. **Создание JWT токенов** - `RefreshToken.for_user(user)`
5. **Возврат ответа** - данные пользователя и токены

##### Ответы
- **201 Created** - пользователь успешно создан
- **400 Bad Request** - ошибки валидации

### 4. Представление входа
```python
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """Вход пользователя"""
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

#### Разбор функции login:

##### Логика функции
1. **Создание сериализатора** - `UserLoginSerializer(data=request.data)`
2. **Валидация данных** - `serializer.is_valid()`
3. **Получение пользователя** - `serializer.validated_data['user']`
4. **Создание JWT токенов** - `RefreshToken.for_user(user)`
5. **Возврат ответа** - данные пользователя и токены

##### Ответы
- **200 OK** - успешный вход
- **400 Bad Request** - неверные данные

### 5. Представление обновления токена
```python
@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token(request):
    """Обновление токена доступа"""
    refresh_token = request.data.get('refresh')
    if refresh_token:
        try:
            refresh = RefreshToken(refresh_token)
            return Response({
                'access': str(refresh.access_token)
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Неверный токен обновления'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Токен обновления не предоставлен'}, status=status.HTTP_400_BAD_REQUEST)
```

#### Разбор функции refresh_token:

##### Логика функции
1. **Получение токена** - `request.data.get('refresh')`
2. **Проверка наличия** - `if refresh_token:`
3. **Создание RefreshToken** - `RefreshToken(refresh_token)`
4. **Создание нового access токена** - `refresh.access_token`
5. **Возврат ответа** - новый access токен

##### Ответы
- **200 OK** - токен успешно обновлен
- **400 Bad Request** - неверный токен или отсутствует

### 6. Представление профиля пользователя
```python
@api_view(['GET'])
def user_profile(request):
    """Получение профиля текущего пользователя"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
```

#### Разбор функции user_profile:

##### Декораторы
- **`@api_view(['GET'])`** - разрешает только GET запросы
- **Нет `@permission_classes`** - использует настройки по умолчанию (требует аутентификации)

##### Логика функции
1. **Получение пользователя** - `request.user` (из JWT токена)
2. **Сериализация данных** - `UserSerializer(request.user)`
3. **Возврат ответа** - данные пользователя

## Что такое Django REST Framework?

### 1. Определение
DRF - это мощный инструмент для создания REST API в Django:
- **Сериализация** - преобразование данных в JSON/XML
- **Валидация** - проверка входящих данных
- **Аутентификация** - различные способы аутентификации
- **Разрешения** - контроль доступа к API
- **Версионирование** - поддержка версий API

### 2. Преимущества DRF
- **Автоматическая документация** - Swagger/OpenAPI
- **Браузерный API** - тестирование в браузере
- **Пагинация** - автоматическая пагинация больших списков
- **Фильтрация** - поиск и фильтрация данных
- **Кэширование** - встроенное кэширование

### 3. Архитектура DRF
```
HTTP Request → View → Serializer → Model → Database
     ↓           ↓        ↓         ↓
HTTP Response ← View ← Serializer ← Model
```

## Типы представлений в DRF

### 1. Function-based views (наш случай)
```python
@api_view(['GET', 'POST'])
def my_view(request):
    if request.method == 'GET':
        # Обработка GET запроса
        pass
    elif request.method == 'POST':
        # Обработка POST запроса
        pass
```

### 2. Class-based views
```python
from rest_framework.views import APIView

class MyView(APIView):
    def get(self, request):
        # Обработка GET запроса
        pass
    
    def post(self, request):
        # Обработка POST запроса
        pass
```

### 3. ViewSets
```python
from rest_framework.viewsets import ModelViewSet

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
```

## JWT (JSON Web Token) аутентификация

### 1. Что такое JWT?
JWT - это стандарт для безопасной передачи информации между сторонами:
- **Header** - тип токена и алгоритм шифрования
- **Payload** - данные (claims)
- **Signature** - подпись для проверки подлинности

### 2. Структура JWT
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxfQ.abc123
  ↑ Header ↑                    ↑ Payload ↑              ↑ Signature ↑
```

### 3. Типы токенов
- **Access Token** - для доступа к API (короткий срок жизни)
- **Refresh Token** - для обновления access токена (длинный срок жизни)

## Частые ошибки и как их избежать

### 1. "Authentication credentials were not provided"
**Причина:** Отсутствует токен в заголовке Authorization
**Решение:**
```python
# Добавьте токен в заголовок
headers = {
    'Authorization': 'Bearer your_access_token_here'
}
```

### 2. "Invalid token"
**Причина:** Неверный или истекший токен
**Решение:**
```python
# Обновите токен
response = requests.post('/api/auth/refresh/', {
    'refresh': 'your_refresh_token_here'
})
new_access_token = response.json()['access']
```

### 3. "Permission denied"
**Причина:** Недостаточно прав для доступа
**Решение:**
```python
# Проверьте разрешения в представлении
@permission_classes([IsAuthenticated])
def my_view(request):
    pass
```

## Почему выбрано именно так

### 1. RESTful API
- **POST /api/auth/register/** - создание ресурса
- **POST /api/auth/login/** - аутентификация
- **POST /api/auth/refresh/** - обновление ресурса
- **GET /api/auth/profile/** - получение ресурса

### 2. JWT аутентификация
- **Stateless** - не требует хранения сессий на сервере
- **Масштабируемость** - легко масштабировать
- **Безопасность** - токены подписаны и проверяются

### 3. Простота использования
- **Понятные endpoints** - легко запомнить
- **Стандартные HTTP коды** - понятные ответы
- **JSON формат** - легко обрабатывать

## Тестирование представлений

### 1. Тест регистрации
```python
# accounts/tests.py
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class AuthAPITest(APITestCase):
    def test_user_registration(self):
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpass123',
            'password_confirm': 'testpass123'
        }
        response = self.client.post('/api/auth/register/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email='test@example.com').exists())
```

### 2. Тест входа
```python
def test_user_login(self):
    # Создаем пользователя
    user = User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpass123'
    )
    
    data = {
        'username': 'testuser',
        'password': 'testpass123'
    }
    response = self.client.post('/api/auth/login/', data)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertIn('access', response.data)
```

### 3. Тест профиля
```python
def test_user_profile(self):
    user = User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpass123'
    )
    
    # Аутентификация
    self.client.force_authenticate(user=user)
    
    response = self.client.get('/api/auth/profile/')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['email'], 'test@example.com')
```

## Связанные файлы
- `accounts/serializers.py` - сериализаторы для валидации
- `accounts/urls.py` - URL маршруты
- `accounts/models.py` - модель пользователя
- `todo_api/settings.py` - настройки JWT

## Расширение функциональности

### 1. Добавление logout
```python
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """Выход пользователя"""
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)
```

### 2. Добавление смены пароля
```python
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    """Смена пароля"""
    user = request.user
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')
    
    if user.check_password(old_password):
        user.set_password(new_password)
        user.save()
        return Response({'message': 'Пароль изменен'})
    return Response({'error': 'Неверный старый пароль'}, status=400)
```

### 3. Добавление восстановления пароля
```python
@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    """Восстановление пароля"""
    email = request.data.get('email')
    try:
        user = User.objects.get(email=email)
        # Отправка email с ссылкой для сброса
        # ... логика отправки email
        return Response({'message': 'Письмо отправлено'})
    except User.DoesNotExist:
        return Response({'error': 'Пользователь не найден'}, status=404)
```

## Лучшие практики

### 1. Безопасность
- Всегда валидируйте входящие данные
- Используйте HTTPS в продакшне
- Ограничивайте количество попыток входа
- Логируйте подозрительную активность

### 2. Производительность
- Используйте кэширование для часто запрашиваемых данных
- Оптимизируйте запросы к базе данных
- Используйте пагинацию для больших списков

### 3. Обработка ошибок
- Возвращайте понятные сообщения об ошибках
- Используйте стандартные HTTP коды
- Логируйте ошибки для отладки

