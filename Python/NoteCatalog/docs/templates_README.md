# 🎨 templates/ - Детальное объяснение

## 🎯 Что это за папка?
`templates/` - это папка, которая содержит HTML-шаблоны Django. Шаблоны - это файлы с HTML-кодом, которые Django использует для создания веб-страниц.

## 📁 Структура папки:

```
templates/
├── base.html                    # Базовый шаблон
└── notes/                       # Папка для шаблонов заметок
    ├── note_list.html          # Список заметок
    ├── note_detail.html        # Детальная страница заметки
    ├── note_form.html          # Форма создания/редактирования
    ├── note_confirm_delete.html # Подтверждение удаления
    └── note_card.html          # Компонент карточки заметки
```

## 🏗️ Базовый шаблон (base.html)

### 📋 Структура HTML:
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}Каталог заметок{% endblock %}</title>
    {% load static %}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{% static 'css/style.css' %}">
</head>
<body>
    <!-- Навигация -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <!-- Содержимое навигации -->
    </nav>

    <!-- Основной контент -->
    <div class="container mt-4">
        <!-- Flash сообщения -->
        {% if messages %}
            {% for message in messages %}
                <div class="alert alert-{{ message.tags }} alert-dismissible fade show" role="alert">
                    {{ message }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            {% endfor %}
        {% endif %}

        <!-- Поиск -->
        <div class="row mb-4">
            <div class="col-md-6">
                <form method="get" action="{% url 'note_search' %}" class="d-flex">
                    <input class="form-control me-2" type="search" name="q" placeholder="Поиск заметок..." 
                           value="{{ search_query|default:'' }}">
                    <button class="btn btn-outline-primary" type="submit">🔍</button>
                </form>
            </div>
        </div>

        <!-- Блок для контента -->
        {% block content %}
        {% endblock %}
    </div>

    <!-- Футер -->
    <footer class="bg-light text-center text-muted py-3 mt-5">
        <div class="container">
            <p>&copy; 2024 Каталог заметок. Все права защищены.</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### 🔍 Детальное объяснение тегов Django:

**`{% load static %}`**
- `{% load %}` - тег для загрузки библиотек
- `static` - библиотека для работы со статическими файлами
- **Что происходит**: Загружает функции для работы с CSS, JS, изображениями

**`{% block title %}Каталог заметок{% endblock %}`**
- `{% block %}` - тег для создания блока
- `title` - название блока
- `{% endblock %}` - закрытие блока
- **Что происходит**: Создаёт блок, который можно переопределить в дочерних шаблонах

**`{% static 'css/style.css' %}`**
- `{% static %}` - тег для генерации URL статических файлов
- `'css/style.css'` - путь к файлу
- **Что происходит**: Генерирует URL для CSS файла

**`{% url 'note_search' %}`**
- `{% url %}` - тег для генерации URL
- `'note_search'` - имя URL-маршрута
- **Что происходит**: Генерирует URL для поиска

**`{% if messages %}`**
- `{% if %}` - тег для условного выполнения
- `messages` - переменная с сообщениями
- **Что происходит**: Проверяет, есть ли сообщения для показа

**`{% for message in messages %}`**
- `{% for %}` - тег для цикла
- `message` - переменная для текущего элемента
- `in messages` - итерируемый объект
- **Что происходит**: Проходит по всем сообщениям

**`{{ message.tags }}`**
- `{{ }}` - синтаксис для вывода переменных
- `message.tags` - атрибут объекта message
- **Что происходит**: Выводит тип сообщения (success, error, info)

**`{{ message }}`**
- Выводит текст сообщения

**`{{ search_query|default:'' }}`**
- `search_query` - переменная
- `|default:''` - фильтр с значением по умолчанию
- **Что происходит**: Выводит поисковый запрос или пустую строку

**`{% block content %}{% endblock %}`**
- Блок для основного контента страницы
- **Что происходит**: Дочерние шаблоны могут переопределить этот блок

## 📝 Шаблон списка заметок (note_list.html)

```html
{% extends 'base.html' %}
{% load static %}
{% load note_extras %}

{% block title %}
    {% if tag %}
        Заметки с тегом "{{ tag.name }}" - Каталог заметок
    {% elif search_query %}
        Поиск: "{{ search_query }}" - Каталог заметок
    {% else %}
        Каталог заметок
    {% endif %}
{% endblock %}

{% block content %}
<div class="row">
    <div class="col-12">
        {% if tag %}
            <h2>Заметки с тегом "{{ tag.name }}"</h2>
            <p class="text-muted">Найдено заметок: {{ notes|length }}</p>
        {% elif search_query %}
            <h2>Результаты поиска: "{{ search_query }}"</h2>
            <p class="text-muted">Найдено заметок: {{ notes|length }}</p>
        {% else %}
            <h2>Все заметки</h2>
            <p class="text-muted">Всего заметок: {{ notes|length }}</p>
        {% endif %}

        {% if notes %}
            {% for note in notes %}
                {% include 'notes/note_card.html' with search_query=search_query %}
            {% endfor %}

            <!-- Пагинация -->
            {% if is_paginated %}
                <nav aria-label="Навигация по страницам">
                    <ul class="pagination justify-content-center">
                        {% if page_obj.has_previous %}
                            <li class="page-item">
                                <a class="page-link" href="?page=1{% if search_query %}&q={{ search_query }}{% endif %}">Первая</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="?page={{ page_obj.previous_page_number }}{% if search_query %}&q={{ search_query }}{% endif %}">Предыдущая</a>
                            </li>
                        {% endif %}

                        {% for num in page_obj.paginator.page_range %}
                            {% if page_obj.number == num %}
                                <li class="page-item active">
                                    <span class="page-link">{{ num }}</span>
                                </li>
                            {% elif num > page_obj.number|add:'-3' and num < page_obj.number|add:'3' %}
                                <li class="page-item">
                                    <a class="page-link" href="?page={{ num }}{% if search_query %}&q={{ search_query }}{% endif %}">{{ num }}</a>
                                </li>
                            {% endif %}
                        {% endfor %}

                        {% if page_obj.has_next %}
                            <li class="page-item">
                                <a class="page-link" href="?page={{ page_obj.next_page_number }}{% if search_query %}&q={{ search_query }}{% endif %}">Следующая</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="?page={{ page_obj.paginator.num_pages }}{% if search_query %}&q={{ search_query }}{% endif %}">Последняя</a>
                            </li>
                        {% endif %}
                    </ul>
                </nav>
            {% endif %}
        {% else %}
            <div class="alert alert-info" role="alert">
                {% if search_query %}
                    По запросу "{{ search_query }}" ничего не найдено.
                {% elif tag %}
                    Заметок с тегом "{{ tag.name }}" пока нет.
                {% else %}
                    Заметок пока нет. <a href="{% url 'note_create' %}">Создайте первую заметку!</a>
                {% endif %}
            </div>
        {% endif %}
    </div>
</div>
{% endblock %}
```

### 🔍 Детальное объяснение:

**`{% extends 'base.html' %}`**
- `{% extends %}` - тег для наследования шаблона
- `'base.html'` - родительский шаблон
- **Что происходит**: Этот шаблон наследует от base.html

**`{% load note_extras %}`**
- Загружает кастомные фильтры и теги
- **Что происходит**: Делает доступными фильтры readtime и highlight_search

**`{% if tag %}`**
- Проверяет, есть ли переменная tag
- **Что происходит**: Если показываем заметки по тегу

**`{% include 'notes/note_card.html' with search_query=search_query %}`**
- `{% include %}` - тег для включения другого шаблона
- `'notes/note_card.html'` - путь к включаемому шаблону
- `with search_query=search_query` - передача переменной
- **Что происходит**: Включает шаблон карточки заметки

**`{% if is_paginated %}`**
- Проверяет, есть ли пагинация
- **Что происходит**: Если заметок больше, чем помещается на странице

**`{{ page_obj.has_previous }}`**
- Проверяет, есть ли предыдущая страница
- **Что происходит**: Показывает кнопку "Предыдущая", если есть

**`{{ page_obj.number|add:'-3' }}`**
- `|add:'-3'` - фильтр для сложения
- **Что происходит**: Вычитает 3 из номера текущей страницы

## 🎴 Компонент карточки заметки (note_card.html)

```html
{% load note_extras %}
<div class="card mb-3">
    <div class="card-body">
        <h5 class="card-title">
            <a href="{% url 'note_detail' note.pk %}" class="text-decoration-none">
                {% if search_query %}
                    {{ note.title|highlight_search:search_query|safe }}
                {% else %}
                    {{ note.title }}
                {% endif %}
            </a>
        </h5>
        <p class="card-text">
            {% if search_query %}
                {{ note.body|truncatewords:30|highlight_search:search_query|safe }}
            {% else %}
                {{ note.body|truncatewords:30 }}
            {% endif %}
        </p>
        <div class="d-flex justify-content-between align-items-center">
            <div>
                {% if note.tags.all %}
                    <div class="mb-2">
                        {% for tag in note.tags.all %}
                            <a href="{% url 'tag_notes' tag.slug %}" class="badge bg-secondary text-decoration-none me-1">
                                {{ tag.name }}
                            </a>
                        {% endfor %}
                    </div>
                {% endif %}
                <small class="text-muted">
                    📅 {{ note.created_at|date:"d.m.Y H:i" }}
                    {% if note.updated_at != note.created_at %}
                        (обновлено: {{ note.updated_at|date:"d.m.Y H:i" }})
                    {% endif %}
                    | ⏱️ {{ note.body|readtime }}
                </small>
            </div>
            {% if user.is_authenticated %}
            <div class="btn-group" role="group">
                <a href="{% url 'note_update' note.pk %}" class="btn btn-sm btn-outline-primary">✏️</a>
                <a href="{% url 'note_delete' note.pk %}" class="btn btn-sm btn-outline-danger">🗑️</a>
            </div>
            {% endif %}
        </div>
    </div>
</div>
```

### 🔍 Детальное объяснение:

**`{{ note.title|highlight_search:search_query|safe }}`**
- `note.title` - заголовок заметки
- `|highlight_search:search_query` - фильтр подсветки поиска
- `|safe` - фильтр для вывода HTML
- **Что происходит**: Подсвечивает найденные слова в заголовке

**`{{ note.body|truncatewords:30 }}`**
- `|truncatewords:30` - фильтр обрезки до 30 слов
- **Что происходит**: Показывает только первые 30 слов

**`{% if note.tags.all %}`**
- Проверяет, есть ли теги у заметки
- **Что происходит**: Показывает теги, если они есть

**`{% for tag in note.tags.all %}`**
- Цикл по всем тегам заметки
- **Что происходит**: Показывает каждый тег

**`{{ note.created_at|date:"d.m.Y H:i" }}`**
- `|date:"d.m.Y H:i"` - фильтр форматирования даты
- **Что происходит**: Показывает дату в формате "08.09.2025 20:30"

**`{% if user.is_authenticated %}`**
- Проверяет, авторизован ли пользователь
- **Что происходит**: Показывает кнопки редактирования только авторизованным

## 🔑 Ключевые понятия:

1. **{% extends %}** - наследование шаблона
2. **{% block %}** - создание блока
3. **{% include %}** - включение шаблона
4. **{% load %}** - загрузка библиотек
5. **{% if %}** - условное выполнение
6. **{% for %}** - цикл
7. **{% url %}** - генерация URL
8. **{{ }}** - вывод переменных
9. **{% static %}** - статические файлы
10. **|filter** - применение фильтра
11. **|safe** - вывод HTML
12. **|default** - значение по умолчанию
13. **|date** - форматирование даты
14. **|truncatewords** - обрезка слов
15. **|length** - длина списка

## 🎯 Итог:

Шаблоны Django - это мощная система для создания веб-страниц:
- **Наследование** - базовый шаблон + дочерние
- **Блоки** - переопределение частей шаблона
- **Включения** - переиспользование компонентов
- **Фильтры** - обработка данных в шаблонах
- **Теги** - логика в шаблонах
- **Переменные** - данные из views

Это делает создание веб-страниц гибким и удобным! 🚀
