# 📊 models.py - Детальное объяснение

## 🎯 Что это за файл?
`models.py` - это файл, который описывает структуру данных в нашей базе данных. Представьте, что это чертёж таблиц в базе данных.

## 📋 Импорты

```python
from django.db import models
from django.urls import reverse
```

### 🔍 Объяснение импортов:

**`from django.db import models`**
- `django.db` - модуль Django для работы с базой данных
- `models` - содержит все классы для создания моделей (таблиц)
- **Зачем**: Чтобы создать классы Note и Tag

**`from django.urls import reverse`**
- `django.urls` - модуль Django для работы с URL
- `reverse` - функция для создания URL по имени
- **Зачем**: Чтобы создать ссылки на страницы заметок и тегов

## 🏗️ Класс Note (Модель заметки)

```python
class Note(models.Model):
```

### 🔍 Объяснение:
- `class` - ключевое слово Python для создания класса
- `Note` - название класса (имя модели)
- `(models.Model)` - наследование от базового класса Model Django
- **Что это значит**: Note - это таблица в базе данных

### 📝 Поля модели:

#### 1. Поле title (заголовок)
```python
title = models.CharField(max_length=200)
```

**🔍 Детальное объяснение:**
- `title` - название поля (столбца в таблице)
- `models.CharField` - тип поля "строка ограниченной длины"
- `max_length=200` - максимальная длина строки (200 символов)
- **В базе данных**: Создаст столбец VARCHAR(200)

#### 2. Поле body (содержимое)
```python
body = models.TextField()
```

**🔍 Детальное объяснение:**
- `body` - название поля
- `models.TextField` - тип поля "текст неограниченной длины"
- **В базе данных**: Создаст столбец TEXT

#### 3. Поле created_at (дата создания)
```python
created_at = models.DateTimeField(auto_now_add=True)
```

**🔍 Детальное объяснение:**
- `created_at` - название поля
- `models.DateTimeField` - тип поля "дата и время"
- `auto_now_add=True` - автоматически устанавливать текущую дату при создании
- **Что происходит**: При создании заметки Django автоматически поставит текущую дату

#### 4. Поле updated_at (дата обновления)
```python
updated_at = models.DateTimeField(auto_now=True)
```

**🔍 Детальное объяснение:**
- `updated_at` - название поля
- `models.DateTimeField` - тип поля "дата и время"
- `auto_now=True` - автоматически обновлять дату при каждом изменении
- **Что происходит**: При каждом сохранении заметки Django обновит дату

#### 5. Поле tags (теги)
```python
tags = models.ManyToManyField('Tag', related_name='notes', blank=True)
```

**🔍 Детальное объяснение:**
- `tags` - название поля
- `models.ManyToManyField` - тип поля "многие ко многим"
- `'Tag'` - ссылка на модель Tag (в кавычках, потому что Tag определена ниже)
- `related_name='notes'` - имя для обратной связи (из Tag можно получить notes)
- `blank=True` - поле может быть пустым
- **Что это значит**: Одна заметка может иметь много тегов, один тег может быть у многих заметок

### 🏷️ Класс Meta
```python
class Meta:
    ordering = ['-created_at']
```

**🔍 Детальное объяснение:**
- `class Meta` - специальный класс для настроек модели
- `ordering = ['-created_at']` - сортировка по полю created_at
- `-` перед `created_at` означает "по убыванию" (новые заметки сначала)
- **Что происходит**: Заметки всегда будут отсортированы от новых к старым

### 🔗 Метод __str__
```python
def __str__(self):
    return self.title
```

**🔍 Детальное объяснение:**
- `def` - ключевое слово для создания функции
- `__str__` - специальный метод Python
- `self` - ссылка на текущий объект
- `return self.title` - возвращает заголовок заметки
- **Зачем**: Когда Django показывает заметку в админке или в коде, он покажет заголовок

### 🔗 Метод get_absolute_url
```python
def get_absolute_url(self):
    return reverse('note_detail', kwargs={'pk': self.pk})
```

**🔍 Детальное объяснение:**
- `def get_absolute_url(self):` - создание метода
- `reverse` - функция Django для создания URL
- `'note_detail'` - имя URL-маршрута (из urls.py)
- `kwargs={'pk': self.pk}` - параметры для URL
- `self.pk` - первичный ключ (ID) заметки
- **Что происходит**: Создаёт ссылку вида `/notes/1/` для заметки с ID=1

## 🏷️ Класс Tag (Модель тега)

```python
class Tag(models.Model):
```

### 📝 Поля модели:

#### 1. Поле name (название тега)
```python
name = models.CharField(max_length=50)
```

**🔍 Детальное объяснение:**
- `name` - название поля
- `models.CharField(max_length=50)` - строка максимум 50 символов
- **Пример**: "Python", "Django", "Веб-разработка"

#### 2. Поле slug (URL-слаг)
```python
slug = models.SlugField(max_length=50, unique=True)
```

**🔍 Детальное объяснение:**
- `slug` - название поля
- `models.SlugField` - специальный тип поля для URL
- `max_length=50` - максимум 50 символов
- `unique=True` - значение должно быть уникальным
- **Что это**: URL-дружественное название тега
- **Пример**: "python", "django", "web-development"

### 🏷️ Класс Meta
```python
class Meta:
    ordering = ['name']
```

**🔍 Детальное объяснение:**
- `ordering = ['name']` - сортировка по названию тега
- **Что происходит**: Теги будут отсортированы по алфавиту

### 🔗 Метод __str__
```python
def __str__(self):
    return self.name
```

**🔍 Детальное объяснение:**
- Возвращает название тега
- **Пример**: Для тега "Python" вернёт "Python"

### 🔗 Метод get_absolute_url
```python
def get_absolute_url(self):
    return reverse('tag_notes', kwargs={'slug': self.slug})
```

**🔍 Детальное объяснение:**
- `reverse('tag_notes', kwargs={'slug': self.slug})` - создаёт URL для страницы тега
- **Пример**: Для тега с slug="python" создаст URL `/tags/python/`

## 🎯 Итог

### Что создаётся в базе данных:

**Таблица Note:**
- `id` - автоматический первичный ключ
- `title` - VARCHAR(200)
- `body` - TEXT
- `created_at` - DATETIME
- `updated_at` - DATETIME

**Таблица Tag:**
- `id` - автоматический первичный ключ
- `name` - VARCHAR(50)
- `slug` - VARCHAR(50) UNIQUE

**Таблица Note_tags (связь многие-ко-многим):**
- `id` - автоматический первичный ключ
- `note_id` - ссылка на заметку
- `tag_id` - ссылка на тег

### 🔑 Ключевые понятия:

1. **Модель** - описание таблицы в базе данных
2. **Поле** - столбец в таблице
3. **Типы полей** - CharField, TextField, DateTimeField, ManyToManyField
4. **Meta класс** - настройки модели
5. **__str__** - как показывать объект в тексте
6. **get_absolute_url** - как создать ссылку на объект
7. **ManyToManyField** - связь многие-ко-многим
8. **auto_now_add** - автоматическая дата при создании
9. **auto_now** - автоматическая дата при обновлении
10. **unique** - уникальное значение
