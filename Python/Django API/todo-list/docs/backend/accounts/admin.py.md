# accounts/admin.py

## Назначение
Файл `admin.py` содержит настройки для админ-панели Django. Он определяет, как модели отображаются в административном интерфейсе, какие поля можно редактировать, как фильтровать и искать данные.

## Контекст и зависимости
- **Django Admin** - встроенная админ-панель Django
- **django.contrib.admin** - модуль для настройки админки
- **accounts.models** - модель User

## Пошаговое объяснение кода

### 1. Импорты
```python
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
```

#### Разбор импортов:
- **`admin`** - модуль Django для настройки админки
- **`UserAdmin`** - базовый класс для админки пользователей
- **`User`** - наша кастомная модель пользователя

### 2. Регистрация модели User
```python
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff', 'is_active', 'created_at')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'created_at')
    search_fields = ('email', 'username', 'first_name', 'last_name')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined', 'created_at', 'updated_at')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )
```

#### Разбор настроек админки:

##### `@admin.register(User)`
- **Декоратор:** Регистрирует модель User в админке
- **Альтернатива:** `admin.site.register(User, CustomUserAdmin)`

##### `list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff', 'is_active', 'created_at')`
- **Назначение:** Поля, отображаемые в списке пользователей
- **Порядок:** Важен для отображения
- **Функции:** Можно кликать для сортировки

##### `list_filter = ('is_staff', 'is_superuser', 'is_active', 'created_at')`
- **Назначение:** Фильтры в правой панели
- **Типы:** Boolean поля, даты, выборы
- **Функции:** Быстрая фильтрация списка

##### `search_fields = ('email', 'username', 'first_name', 'last_name')`
- **Назначение:** Поля для поиска
- **Функции:** Поиск по частичному совпадению
- **Оптимизация:** Django создает индексы для этих полей

##### `ordering = ('-created_at',)`
- **Назначение:** Сортировка по умолчанию
- **Знак минус:** Сортировка по убыванию (новые сверху)
- **Кортеж:** Можно указать несколько полей

##### `readonly_fields = ('created_at', 'updated_at')`
- **Назначение:** Поля только для чтения
- **Функции:** Нельзя редактировать в админке
- **Использование:** Системные поля, вычисляемые значения

### 3. Настройка fieldsets
```python
fieldsets = (
    (None, {'fields': ('username', 'password')}),
    ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
    ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    ('Important dates', {'fields': ('last_login', 'date_joined', 'created_at', 'updated_at')}),
)
```

#### Разбор fieldsets:

##### `(None, {'fields': ('username', 'password')})`
- **Заголовок:** Без заголовка (None)
- **Поля:** Основные поля для входа
- **Группировка:** Логически связанные поля

##### `('Personal info', {'fields': ('first_name', 'last_name', 'email')})`
- **Заголовок:** "Personal info"
- **Поля:** Личная информация пользователя
- **Отображение:** Группа с заголовком

##### `('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')})`
- **Заголовок:** "Permissions"
- **Поля:** Права доступа и разрешения
- **Безопасность:** Важные настройки безопасности

##### `('Important dates', {'fields': ('last_login', 'date_joined', 'created_at', 'updated_at')})`
- **Заголовок:** "Important dates"
- **Поля:** Временные метки
- **Только чтение:** Обычно readonly

### 4. Настройка add_fieldsets
```python
add_fieldsets = (
    (None, {
        'classes': ('wide',),
        'fields': ('username', 'email', 'password1', 'password2'),
    }),
)
```

#### Разбор add_fieldsets:

##### `'classes': ('wide',)`
- **Назначение:** CSS классы для стилизации
- **'wide':** Широкая форма (больше места для полей)
- **Функции:** Улучшает внешний вид формы

##### `'fields': ('username', 'email', 'password1', 'password2')`
- **Назначение:** Поля для создания нового пользователя
- **password1, password2:** Поля для ввода и подтверждения пароля
- **Упрощение:** Только необходимые поля для создания

## Что такое Django Admin?

### 1. Определение
Django Admin - это встроенная админ-панель для управления данными:
- **Автоматическая генерация** - создается на основе моделей
- **CRUD операции** - создание, чтение, обновление, удаление
- **Фильтрация и поиск** - быстрый поиск данных
- **Безопасность** - контроль доступа и разрешений

### 2. Преимущества
- **Быстрая разработка** - не нужно создавать интерфейс
- **Готовые функции** - поиск, фильтрация, пагинация
- **Безопасность** - встроенная аутентификация и авторизация
- **Кастомизация** - можно настроить под свои нужды

### 3. Когда использовать
- **Администрирование** - управление данными администраторами
- **Разработка** - тестирование и отладка
- **Мониторинг** - просмотр состояния системы
- **Быстрые изменения** - редактирование данных без кода

## Как использовать админку

### 1. Создание суперпользователя
```bash
python manage.py createsuperuser
```

### 2. Запуск сервера
```bash
python manage.py runserver
```

### 3. Доступ к админке
```
http://localhost:8000/admin/
```

### 4. Вход в систему
- **Username:** admin (или ваш username)
- **Password:** пароль, который вы указали при создании

## Дополнительные возможности

### 1. Кастомные действия
```python
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # ... существующие настройки
    
    actions = ['activate_users', 'deactivate_users']
    
    def activate_users(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f'{queryset.count()} пользователей активировано')
    activate_users.short_description = 'Активировать выбранных пользователей'
    
    def deactivate_users(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f'{queryset.count()} пользователей деактивировано')
    deactivate_users.short_description = 'Деактивировать выбранных пользователей'
```

### 2. Кастомные поля
```python
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # ... существующие настройки
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()
    get_full_name.short_description = 'Полное имя'
    
    def get_tasks_count(self, obj):
        return obj.tasks.count()
    get_tasks_count.short_description = 'Количество задач'
    
    list_display = ('email', 'username', 'get_full_name', 'get_tasks_count', 'is_staff', 'is_active')
```

### 3. Кастомные фильтры
```python
from django.contrib.admin import SimpleListFilter

class TasksCountFilter(SimpleListFilter):
    title = 'Количество задач'
    parameter_name = 'tasks_count'
    
    def lookups(self, request, model_admin):
        return (
            ('0', 'Без задач'),
            ('1-5', '1-5 задач'),
            ('6-10', '6-10 задач'),
            ('10+', 'Более 10 задач'),
        )
    
    def queryset(self, request, queryset):
        if self.value() == '0':
            return queryset.filter(tasks__isnull=True)
        elif self.value() == '1-5':
            return queryset.filter(tasks__count__gte=1, tasks__count__lte=5)
        # ... остальные условия

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_filter = ('is_staff', 'is_superuser', 'is_active', TasksCountFilter)
```

## Частые ошибки и как их избежать

### 1. "Model not registered"
**Причина:** Модель не зарегистрирована в админке
**Решение:** Добавьте `@admin.register(Model)` или `admin.site.register(Model)`

### 2. "Field not found"
**Причина:** Поле указано в list_display, но не существует в модели
**Решение:** Проверьте названия полей в модели

### 3. "Permission denied"
**Причина:** У пользователя нет прав для доступа к админке
**Решение:** Убедитесь, что пользователь имеет `is_staff=True`

## Почему выбрано именно так

### 1. Наследование от UserAdmin
- **Готовые настройки** - получаем стандартную функциональность
- **Совместимость** - работает с Django auth
- **Расширяемость** - можем добавить свои настройки

### 2. Группировка полей
- **Логическая структура** - связанные поля вместе
- **Удобство** - легче найти нужные поля
- **Читаемость** - понятная структура формы

### 3. Поиск и фильтрация
- **Быстрый поиск** - по email, username, имени
- **Гибкая фильтрация** - по статусу, датам
- **Производительность** - индексы для поисковых полей

## Тестирование админки

### 1. Тест доступа к админке
```python
def test_admin_access(self):
    response = self.client.get('/admin/')
    self.assertEqual(response.status_code, 302)  # Редирект на логин
```

### 2. Тест создания пользователя
```python
def test_create_user_in_admin(self):
    self.client.login(username='admin', password='admin123')
    
    data = {
        'username': 'testuser',
        'email': 'test@example.com',
        'password1': 'testpass123',
        'password2': 'testpass123',
    }
    
    response = self.client.post('/admin/accounts/user/add/', data)
    self.assertEqual(response.status_code, 302)  # Редирект после создания
    self.assertTrue(User.objects.filter(username='testuser').exists())
```

### 3. Тест фильтрации
```python
def test_admin_filtering(self):
    # Создаем пользователей с разными статусами
    User.objects.create_user(username='active', email='active@example.com', is_active=True)
    User.objects.create_user(username='inactive', email='inactive@example.com', is_active=False)
    
    self.client.login(username='admin', password='admin123')
    
    # Тест фильтрации активных пользователей
    response = self.client.get('/admin/accounts/user/?is_active__exact=1')
    self.assertContains(response, 'active@example.com')
    self.assertNotContains(response, 'inactive@example.com')
```

## Связанные файлы
- `accounts/models.py` - модель User
- `todo_api/settings.py` - настройки INSTALLED_APPS
- `todo_api/urls.py` - URL маршруты админки

## Расширение функциональности

### 1. Добавление экспорта данных
```python
from django.http import HttpResponse
import csv

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    actions = ['export_users']
    
    def export_users(self, request, queryset):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="users.csv"'
        
        writer = csv.writer(response)
        writer.writerow(['Username', 'Email', 'First Name', 'Last Name', 'Is Active'])
        
        for user in queryset:
            writer.writerow([user.username, user.email, user.first_name, user.last_name, user.is_active])
        
        return response
    
    export_users.short_description = 'Экспортировать выбранных пользователей'
```

### 2. Добавление массовых операций
```python
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    actions = ['send_welcome_email']
    
    def send_welcome_email(self, request, queryset):
        for user in queryset:
            # Отправка приветственного email
            send_mail(
                'Добро пожаловать!',
                'Добро пожаловать в нашу систему!',
                'admin@example.com',
                [user.email],
                fail_silently=False,
            )
        
        self.message_user(request, f'Приветственные письма отправлены {queryset.count()} пользователям')
    
    send_welcome_email.short_description = 'Отправить приветственное письмо'
```

## Лучшие практики

### 1. Безопасность
- Ограничивайте доступ к админке
- Используйте сильные пароли
- Регулярно обновляйте Django

### 2. Производительность
- Используйте `select_related()` для связанных объектов
- Добавляйте индексы для поисковых полей
- Ограничивайте количество записей на странице

### 3. Удобство использования
- Группируйте связанные поля
- Добавляйте понятные описания
- Используйте фильтры и поиск

