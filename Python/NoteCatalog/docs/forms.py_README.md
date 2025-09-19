# 📝 forms.py - Детальное объяснение

## 🎯 Что это за файл?
`forms.py` - это файл, который содержит классы форм Django. Формы - это HTML-элементы для ввода данных пользователем (поля ввода, кнопки, чекбоксы).

## 📋 Импорты

```python
from django import forms
from django.core.exceptions import ValidationError
from .models import Note, Tag
```

### 🔍 Объяснение импортов:

**`from django import forms`**
- `forms` - модуль Django для создания форм
- **Зачем**: Чтобы создать классы форм

**`from django.core.exceptions import ValidationError`**
- `ValidationError` - исключение для ошибок валидации
- **Зачем**: Чтобы показать пользователю ошибки при неправильном вводе

**`from .models import Note, Tag`**
- `.models` - импорт из файла models.py в той же папке
- `Note, Tag` - модели, с которыми работают формы
- **Зачем**: Чтобы связать форму с моделями

## 🏗️ Класс NoteForm (Форма для заметки)

```python
class NoteForm(forms.ModelForm):
```

### 🔍 Детальное объяснение:

**`class NoteForm(forms.ModelForm):`**
- `class` - ключевое слово для создания класса
- `NoteForm` - название класса формы
- `forms.ModelForm` - базовый класс Django для форм, связанных с моделями
- **Что это**: Форма, которая автоматически создаётся на основе модели Note

### 🏷️ Класс Meta (Настройки формы)

```python
class Meta:
    model = Note
    fields = ['title', 'body', 'tags']
    widgets = {
        'title': forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Введите заголовок заметки'
        }),
        'body': forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 10,
            'placeholder': 'Введите содержимое заметки'
        }),
        'tags': forms.CheckboxSelectMultiple(attrs={
            'class': 'form-check-input'
        })
    }
```

### 🔍 Детальное объяснение:

**`class Meta:`**
- `Meta` - специальный класс для настроек формы
- **Зачем**: Чтобы настроить, как форма будет работать

**`model = Note`**
- `model` - атрибут класса
- `Note` - модель, с которой связана форма
- **Что происходит**: Django знает, что форма работает с моделью Note

**`fields = ['title', 'body', 'tags']`**
- `fields` - атрибут класса
- `['title', 'body', 'tags']` - список полей, которые будут в форме
- **Что происходит**: В форме будут только эти поля

**`widgets = {...}`**
- `widgets` - атрибут класса
- **Зачем**: Чтобы настроить, как будут выглядеть поля в HTML

### 🎨 Настройка виджетов (HTML-элементов):

#### 1. Поле title (заголовок)
```python
'title': forms.TextInput(attrs={
    'class': 'form-control',
    'placeholder': 'Введите заголовок заметки'
})
```

**🔍 Детальное объяснение:**
- `'title'` - название поля
- `forms.TextInput` - виджет "однострочное поле ввода"
- `attrs={...}` - HTML-атрибуты
- `'class': 'form-control'` - CSS-класс Bootstrap
- `'placeholder': '...'` - подсказка в поле
- **В HTML**: `<input type="text" class="form-control" placeholder="Введите заголовок заметки">`

#### 2. Поле body (содержимое)
```python
'body': forms.Textarea(attrs={
    'class': 'form-control',
    'rows': 10,
    'placeholder': 'Введите содержимое заметки'
})
```

**🔍 Детальное объяснение:**
- `forms.Textarea` - виджет "многострочное поле ввода"
- `'rows': 10` - количество строк в поле
- **В HTML**: `<textarea class="form-control" rows="10" placeholder="..."></textarea>`

#### 3. Поле tags (теги)
```python
'tags': forms.CheckboxSelectMultiple(attrs={
    'class': 'form-check-input'
})
```

**🔍 Детальное объяснение:**
- `forms.CheckboxSelectMultiple` - виджет "множественный выбор чекбоксами"
- **В HTML**: Список чекбоксов для каждого тега

### 🔧 Метод __init__ (Инициализация формы)

```python
def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.fields['tags'].queryset = Tag.objects.all()
    self.fields['tags'].required = False
```

### 🔍 Детальное объяснение:

**`def __init__(self, *args, **kwargs):`**
- `__init__` - специальный метод Python для инициализации объекта
- `*args` - произвольные позиционные аргументы
- `**kwargs` - произвольные именованные аргументы
- **Зачем**: Чтобы настроить форму при создании

**`super().__init__(*args, **kwargs)`**
- `super()` - вызов метода родительского класса
- **Что происходит**: Вызывается инициализация родительского класса

**`self.fields['tags'].queryset = Tag.objects.all()`**
- `self.fields['tags']` - доступ к полю tags
- `queryset` - набор объектов для выбора
- `Tag.objects.all()` - все теги из базы данных
- **Что происходит**: В поле tags будут показаны все доступные теги

**`self.fields['tags'].required = False`**
- `required = False` - поле необязательное
- **Что происходит**: Пользователь может не выбирать теги

### 🔍 Метод clean_title (Валидация заголовка)

```python
def clean_title(self):
    title = self.cleaned_data.get('title')
    if title:
        # Проверка на уникальность заголовка
        queryset = Note.objects.filter(title__iexact=title)
        if self.instance.pk:
            queryset = queryset.exclude(pk=self.instance.pk)
        if queryset.exists():
            raise ValidationError('Заметка с таким заголовком уже существует.')
    return title
```

### 🔍 Детальное объяснение:

**`def clean_title(self):`**
- `clean_title` - специальный метод Django для валидации поля title
- **Зачем**: Чтобы проверить, что заголовок уникален

**`title = self.cleaned_data.get('title')`**
- `self.cleaned_data` - словарь с очищенными данными формы
- `get('title')` - получить значение поля title
- **Что происходит**: Получаем заголовок, введённый пользователем

**`if title:`**
- Проверяем, что заголовок не пустой
- **Зачем**: Чтобы не проверять пустые заголовки

**`queryset = Note.objects.filter(title__iexact=title)`**
- `Note.objects.filter()` - фильтрация заметок
- `title__iexact=title` - поиск по точному совпадению заголовка (без учёта регистра)
- `__iexact` - оператор "точное совпадение без учёта регистра"
- **Что происходит**: Ищем заметки с таким же заголовком

**`if self.instance.pk:`**
- `self.instance` - объект модели (заметка)
- `pk` - первичный ключ (ID)
- **Что происходит**: Проверяем, редактируем ли мы существующую заметку

**`queryset = queryset.exclude(pk=self.instance.pk)`**
- `exclude()` - исключить из результата
- **Что происходит**: Исключаем текущую заметку из поиска (чтобы не конфликтовать с самой собой)

**`if queryset.exists():`**
- `exists()` - проверить, есть ли результаты
- **Что происходит**: Проверяем, найдены ли заметки с таким заголовком

**`raise ValidationError('Заметка с таким заголовком уже существует.')`**
- `raise` - выбросить исключение
- `ValidationError` - исключение для ошибок валидации
- **Что происходит**: Показываем пользователю ошибку

**`return title`**
- Возвращаем заголовок
- **Зачем**: Если валидация прошла успешно, возвращаем значение

## 🔑 Ключевые понятия:

1. **ModelForm** - форма, связанная с моделью
2. **Meta класс** - настройки формы
3. **fields** - поля формы
4. **widgets** - HTML-элементы полей
5. **attrs** - HTML-атрибуты
6. **TextInput** - однострочное поле ввода
7. **Textarea** - многострочное поле ввода
8. **CheckboxSelectMultiple** - множественный выбор чекбоксами
9. **__init__** - инициализация формы
10. **queryset** - набор объектов для выбора
11. **required** - обязательность поля
12. **clean_<field>** - валидация поля
13. **cleaned_data** - очищенные данные формы
14. **ValidationError** - ошибка валидации
15. **__iexact** - точное совпадение без учёта регистра
16. **exclude** - исключить из результата
17. **exists** - проверить существование

## 🎯 Как это работает:

1. **Пользователь** открывает форму создания/редактирования заметки
2. **Django** создаёт объект NoteForm
3. **NoteForm** автоматически создаёт поля на основе модели Note
4. **Пользователь** заполняет форму
5. **Django** проверяет данные через метод clean_title
6. **Если данные валидны** - сохраняет в базу данных
7. **Если данные невалидны** - показывает ошибки

## 📝 Пример HTML, который генерируется:

```html
<form method="post">
    <input type="text" name="title" class="form-control" placeholder="Введите заголовок заметки">
    <textarea name="body" class="form-control" rows="10" placeholder="Введите содержимое заметки"></textarea>
    <div class="form-check">
        <input type="checkbox" name="tags" value="1" class="form-check-input">
        <label>Python</label>
    </div>
    <div class="form-check">
        <input type="checkbox" name="tags" value="2" class="form-check-input">
        <label>Django</label>
    </div>
    <button type="submit">Сохранить</button>
</form>
```
