"""Конфигурация тестов."""

import pytest
from app import create_app
from app.extensions import db
from app.models import MenuItem, Chef


@pytest.fixture
def app():
    """Создание приложения для тестов."""
    import os
    os.environ['TESTING'] = 'True'
    os.environ['DATABASE_URL'] = 'sqlite:///:memory:'
    
    app = create_app()
    
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()


@pytest.fixture
def client(app):
    """Тестовый клиент."""
    return app.test_client()


@pytest.fixture
def sample_menu_item():
    """Образец блюда для тестов."""
    return {
        'name': 'Том Ям',
        'description': 'Острый суп с креветками',
        'category': 'main',
        'price': 14.90,
        'is_available': True
    }


@pytest.fixture
def sample_chef():
    """Образец повара для тестов."""
    return {
        'full_name': 'Иван Петров',
        'rank': 'senior',
        'specialties': ['asian', 'soup'],
        'is_active': True
    }


@pytest.fixture
def created_menu_item(client, sample_menu_item):
    """Созданное блюдо для тестов."""
    response = client.post('/api/v1/menus/', json=sample_menu_item)
    return response.get_json()['data']


@pytest.fixture
def created_chef(client, sample_chef):
    """Созданный повар для тестов."""
    response = client.post('/api/v1/chefs/', json=sample_chef)
    return response.get_json()['data']
