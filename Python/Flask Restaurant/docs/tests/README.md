# tests/ - Тестирование приложения

## Описание папки

Папка `tests/` содержит **тесты** для нашего Flask приложения. Тесты - это код, который проверяет правильность работы нашего приложения, автоматически выполняя различные сценарии и проверяя результаты.

## Что такое тестирование?

**Тестирование** - это процесс проверки правильности работы программного обеспечения. Тесты:
- Проверяют, что код работает как ожидается
- Находят ошибки до того, как они попадут в продакшен
- Обеспечивают уверенность при изменении кода
- Служат документацией для понимания кода

### Пример теста
```python
def test_create_menu_item():
    """Тест создания блюда."""
    data = {
        'name': 'Тестовое блюдо',
        'price': 15.50,
        'category': 'main'
    }
    
    response = client.post('/api/v1/menus/', json=data)
    
    assert response.status_code == 201
    assert 'data' in response.json
    assert response.json['data']['name'] == 'Тестовое блюдо'
```

## Структура папки

```
tests/
├── conftest.py          # Конфигурация тестов
├── test_menus.py        # Тесты для блюд
└── test_chefs.py        # Тесты для поваров
```

## Файлы в папке

- [conftest.py](conftest.md) - Конфигурация тестов
- [test_menus.py](test-menus.md) - Тесты для блюд
- [test_chefs.py](test-chefs.md) - Тесты для поваров

## Основные концепции

### pytest
**pytest** - это фреймворк для тестирования Python. Он:
- Автоматически находит и запускает тесты
- Предоставляет удобные функции для проверок
- Поддерживает фикстуры
- Генерирует подробные отчеты

### Фикстуры (Fixtures)
**Фикстуры** - это функции, которые подготавливают данные для тестов:
```python
@pytest.fixture
def client():
    """Тестовый клиент Flask."""
    app = create_app()
    return app.test_client()
```

### Assertions
**Assertions** - это проверки, которые тест выполняет:
```python
assert response.status_code == 200  # Проверка статуса
assert 'data' in response.json      # Проверка наличия поля
assert len(items) > 0               # Проверка количества
```

## Типы тестов

### Unit тесты
**Unit тесты** - тестируют отдельные функции или методы:
```python
def test_menu_service_create():
    """Тест создания блюда в сервисе."""
    service = MenuService()
    data = {'name': 'Тест', 'price': 15.50, 'category': 'main'}
    
    result = service.create_menu_item(data)
    
    assert result.name == 'Тест'
    assert result.price == 15.50
```

### Интеграционные тесты
**Интеграционные тесты** - тестируют взаимодействие компонентов:
```python
def test_create_menu_item_api():
    """Тест создания блюда через API."""
    data = {'name': 'Тест', 'price': 15.50, 'category': 'main'}
    
    response = client.post('/api/v1/menus/', json=data)
    
    assert response.status_code == 201
    assert response.json['data']['name'] == 'Тест'
```

### End-to-End тесты
**E2E тесты** - тестируют полный пользовательский сценарий:
```python
def test_full_menu_workflow():
    """Тест полного рабочего процесса с меню."""
    # 1. Создать блюдо
    data = {'name': 'Тест', 'price': 15.50, 'category': 'main'}
    response = client.post('/api/v1/menus/', json=data)
    assert response.status_code == 201
    menu_id = response.json['data']['id']
    
    # 2. Получить блюдо
    response = client.get(f'/api/v1/menus/{menu_id}')
    assert response.status_code == 200
    
    # 3. Обновить блюдо
    update_data = {'price': 18.00}
    response = client.put(f'/api/v1/menus/{menu_id}', json=update_data)
    assert response.status_code == 200
    
    # 4. Удалить блюдо
    response = client.delete(f'/api/v1/menus/{menu_id}')
    assert response.status_code == 200
```

## Структура теста

### Arrange-Act-Assert (AAA)
```python
def test_example():
    """Пример структуры теста."""
    # Arrange (Подготовка)
    data = {'name': 'Тест', 'price': 15.50}
    expected_result = 'Тест'
    
    # Act (Действие)
    result = some_function(data)
    
    # Assert (Проверка)
    assert result == expected_result
```

### Именование тестов
```python
def test_create_menu_item_success():
    """Тест успешного создания блюда."""
    pass

def test_create_menu_item_validation_error():
    """Тест ошибки валидации при создании блюда."""
    pass

def test_get_menu_item_not_found():
    """Тест получения несуществующего блюда."""
    pass
```

## Фикстуры

### Базовые фикстуры
```python
@pytest.fixture
def app():
    """Создание приложения для тестов."""
    app = create_app()
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def client(app):
    """Тестовый клиент Flask."""
    return app.test_client()
```

### Фикстуры с данными
```python
@pytest.fixture
def sample_menu_item():
    """Создать тестовое блюдо."""
    return MenuItem(
        name='Тестовое блюдо',
        price=15.50,
        category='main'
    )

@pytest.fixture
def sample_chef():
    """Создать тестового повара."""
    return Chef(
        name='Тестовый повар',
        specialty='Азиатская кухня'
    )
```

### Фикстуры с настройкой
```python
@pytest.fixture
def authenticated_client(client):
    """Клиент с аутентификацией."""
    # Настроить аутентификацию
    client.environ_base['HTTP_AUTHORIZATION'] = 'Bearer test-token'
    return client
```

## Тестирование API

### GET запросы
```python
def test_get_menus(client):
    """Тест получения списка блюд."""
    response = client.get('/api/v1/menus/')
    
    assert response.status_code == 200
    assert 'data' in response.json
    assert isinstance(response.json['data'], list)

def test_get_menu_item(client, sample_menu_item):
    """Тест получения конкретного блюда."""
    db.session.add(sample_menu_item)
    db.session.commit()
    
    response = client.get(f'/api/v1/menus/{sample_menu_item.id}')
    
    assert response.status_code == 200
    assert response.json['data']['name'] == 'Тестовое блюдо'
```

### POST запросы
```python
def test_create_menu_item(client):
    """Тест создания блюда."""
    data = {
        'name': 'Новое блюдо',
        'price': 20.00,
        'category': 'main'
    }
    
    response = client.post('/api/v1/menus/', json=data)
    
    assert response.status_code == 201
    assert response.json['data']['name'] == 'Новое блюдо'

def test_create_menu_item_validation_error(client):
    """Тест ошибки валидации при создании."""
    data = {
        'name': '',  # Пустое имя
        'price': -5,  # Отрицательная цена
        'category': 'invalid'  # Неверная категория
    }
    
    response = client.post('/api/v1/menus/', json=data)
    
    assert response.status_code == 422
    assert 'error' in response.json
```

### PUT/PATCH запросы
```python
def test_update_menu_item(client, sample_menu_item):
    """Тест обновления блюда."""
    db.session.add(sample_menu_item)
    db.session.commit()
    
    data = {'price': 25.00}
    response = client.put(f'/api/v1/menus/{sample_menu_item.id}', json=data)
    
    assert response.status_code == 200
    assert response.json['data']['price'] == 25.00

def test_update_menu_item_not_found(client):
    """Тест обновления несуществующего блюда."""
    data = {'price': 25.00}
    response = client.put('/api/v1/menus/999', json=data)
    
    assert response.status_code == 404
```

### DELETE запросы
```python
def test_delete_menu_item(client, sample_menu_item):
    """Тест удаления блюда."""
    db.session.add(sample_menu_item)
    db.session.commit()
    
    response = client.delete(f'/api/v1/menus/{sample_menu_item.id}')
    
    assert response.status_code == 200
    
    # Проверить, что блюдо удалено
    response = client.get(f'/api/v1/menus/{sample_menu_item.id}')
    assert response.status_code == 404
```

## Тестирование ошибок

### Ошибки валидации
```python
def test_validation_errors(client):
    """Тест различных ошибок валидации."""
    test_cases = [
        ({'name': ''}, 'Пустое имя'),
        ({'price': -5}, 'Отрицательная цена'),
        ({'category': 'invalid'}, 'Неверная категория'),
        ({}, 'Отсутствуют обязательные поля')
    ]
    
    for data, description in test_cases:
        response = client.post('/api/v1/menus/', json=data)
        assert response.status_code == 422, f"Не сработало для: {description}"
```

### Ошибки сервера
```python
def test_internal_server_error(client):
    """Тест внутренней ошибки сервера."""
    # Мокаем сервис для вызова исключения
    with patch('app.services.menu_service.MenuService.create_menu_item') as mock_create:
        mock_create.side_effect = Exception("Тестовая ошибка")
        
        data = {'name': 'Тест', 'price': 15.50, 'category': 'main'}
        response = client.post('/api/v1/menus/', json=data)
        
        assert response.status_code == 500
        assert 'error' in response.json
```

## Тестирование с моками

### Мокирование внешних сервисов
```python
from unittest.mock import patch, Mock

def test_with_mocked_service(client):
    """Тест с мокированным сервисом."""
    with patch('app.services.menu_service.MenuService') as mock_service:
        # Настроить мок
        mock_instance = Mock()
        mock_instance.create_menu_item.return_value = Mock(id=1, name='Тест')
        mock_service.return_value = mock_instance
        
        data = {'name': 'Тест', 'price': 15.50, 'category': 'main'}
        response = client.post('/api/v1/menus/', json=data)
        
        assert response.status_code == 201
        mock_instance.create_menu_item.assert_called_once()
```

### Мокирование базы данных
```python
def test_with_mocked_db(client):
    """Тест с мокированной базой данных."""
    with patch('app.extensions.db.session') as mock_session:
        mock_item = Mock()
        mock_item.id = 1
        mock_item.name = 'Тест'
        mock_session.add.return_value = None
        mock_session.commit.return_value = None
        mock_session.query.return_value.get.return_value = mock_item
        
        response = client.get('/api/v1/menus/1')
        
        assert response.status_code == 200
```

## Параметризованные тесты

### Тестирование с разными данными
```python
@pytest.mark.parametrize("data,expected_status", [
    ({'name': 'Тест', 'price': 15.50, 'category': 'main'}, 201),
    ({'name': '', 'price': 15.50, 'category': 'main'}, 422),
    ({'name': 'Тест', 'price': -5, 'category': 'main'}, 422),
    ({'name': 'Тест', 'price': 15.50, 'category': 'invalid'}, 422),
])
def test_create_menu_item_validation(data, expected_status, client):
    """Тест создания блюда с разными данными."""
    response = client.post('/api/v1/menus/', json=data)
    assert response.status_code == expected_status
```

## Покрытие кода

### Измерение покрытия
```bash
# Запуск тестов с измерением покрытия
pytest --cov=app --cov-report=html

# Генерация HTML отчета
pytest --cov=app --cov-report=html --cov-report=term
```

### Целевое покрытие
```python
# В pyproject.toml
[tool.pytest.ini_options]
addopts = "--cov=app --cov-fail-under=80"
```

## Запуск тестов

### Все тесты
```bash
pytest
```

### Конкретный файл
```bash
pytest tests/test_menus.py
```

### Конкретный тест
```bash
pytest tests/test_menus.py::test_create_menu_item
```

### С подробным выводом
```bash
pytest -v
```

### С остановкой на первой ошибке
```bash
pytest -x
```

## Отладка тестов

### Вывод отладочной информации
```python
def test_debug_example(client):
    """Пример отладки теста."""
    response = client.post('/api/v1/menus/', json={'name': 'Тест'})
    
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json}")
    
    assert response.status_code == 201
```

### Использование pdb
```python
import pdb

def test_with_debugger(client):
    """Тест с отладчиком."""
    response = client.post('/api/v1/menus/', json={'name': 'Тест'})
    
    pdb.set_trace()  # Остановка для отладки
    
    assert response.status_code == 201
```

## Лучшие практики

### 1. Независимость тестов
```python
def test_independent_1(client):
    """Тест не должен зависеть от других тестов."""
    # Каждый тест создает свои данные
    pass

def test_independent_2(client):
    """Тест не должен зависеть от других тестов."""
    # Каждый тест создает свои данные
    pass
```

### 2. Читаемость тестов
```python
def test_create_menu_item_with_valid_data_returns_201_status():
    """Тест должен быть понятным по названию."""
    # Тест должен быть понятным по коду
    pass
```

### 3. Один тест - одна проверка
```python
def test_create_menu_item_success():
    """Тест успешного создания."""
    # Проверяем только успешное создание
    pass

def test_create_menu_item_validation():
    """Тест валидации при создании."""
    # Проверяем только валидацию
    pass
```

## Заключение

Папка `tests/` - это **гарантия качества** нашего приложения. Она:
- Проверяет правильность работы кода
- Находит ошибки до продакшена
- Обеспечивает уверенность при изменениях
- Служит документацией
- Улучшает архитектуру кода

Без тестов мы не можем быть уверены в правильности работы приложения!


