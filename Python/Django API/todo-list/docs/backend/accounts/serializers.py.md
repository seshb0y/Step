# accounts/serializers.py

## Назначение
Файл `serializers.py` содержит сериализаторы Django REST Framework для преобразования данных пользователей между форматами Python объектов и JSON. Сериализаторы также выполняют валидацию входящих данных.

## Контекст и зависимости
- **Django REST Framework** - для сериализации данных
- **django.contrib.auth** - для валидации паролей
- **accounts.models** - модель User

## Пошаговое объяснение кода

### 1. UserRegistrationSerializer
```python
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirm')
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Пароли не совпадают")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user
```

**Назначение:** Валидация и создание пользователя при регистрации
**Особенности:**
- `write_only=True` - поле не возвращается в ответе
- `validators=[validate_password]` - проверка сложности пароля
- `validate()` - кастомная валидация (проверка совпадения паролей)
- `create()` - создание пользователя с хешированием пароля

### 2. UserLoginSerializer
```python
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError('Неверные учетные данные')
            if not user.is_active:
                raise serializers.ValidationError('Аккаунт деактивирован')
            attrs['user'] = user
        else:
            raise serializers.ValidationError('Необходимо указать имя пользователя и пароль')
        return attrs
```

**Назначение:** Валидация данных входа и аутентификация пользователя
**Особенности:**
- `Serializer` (не ModelSerializer) - для кастомной логики
- `authenticate()` - проверка учетных данных
- Проверка активности аккаунта
- Возврат объекта пользователя в `validated_data`

### 3. UserSerializer
```python
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'created_at')
        read_only_fields = ('id', 'created_at')
```

**Назначение:** Отображение данных пользователя в API ответах
**Особенности:**
- Только безопасные поля (без пароля)
- `read_only_fields` - поля только для чтения
- Используется для возврата данных пользователя

## Как протестировать
```python
# Тест регистрации
data = {
    'username': 'testuser',
    'email': 'test@example.com',
    'password': 'StrongPass123!',
    'password_confirm': 'StrongPass123!'
}
serializer = UserRegistrationSerializer(data=data)
assert serializer.is_valid()

# Тест входа
data = {'username': 'testuser', 'password': 'StrongPass123!'}
serializer = UserLoginSerializer(data=data)
assert serializer.is_valid()
```

## Частые ошибки и как их избежать
- **"Пароли не совпадают"** - проверьте `password_confirm`
- **"Неверные учетные данные"** - проверьте username/password
- **"Аккаунт деактивирован"** - проверьте `is_active=True`

## Почему выбрано именно так
- **Безопасность** - пароли не возвращаются в API
- **Валидация** - проверка данных на уровне сериализатора
- **Гибкость** - разные сериализаторы для разных операций

