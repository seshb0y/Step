"""Тесты для API меню."""

import pytest
from decimal import Decimal


class TestMenuAPI:
    """Тесты API для работы с меню."""
    
    def test_health_check(self, client):
        """Тест health check."""
        response = client.get('/health')
        assert response.status_code == 200
        assert response.get_json() == {'status': 'ok'}
    
    def test_create_menu_item(self, client, sample_menu_item):
        """Тест создания блюда."""
        response = client.post('/api/v1/menus/', json=sample_menu_item)
        
        assert response.status_code == 201
        data = response.get_json()
        assert 'data' in data
        assert data['data']['name'] == sample_menu_item['name']
        assert data['data']['category'] == sample_menu_item['category']
        assert data['data']['price'] == sample_menu_item['price']
        assert data['data']['is_available'] == sample_menu_item['is_available']
        assert 'id' in data['data']
        assert 'created_at' in data['data']
        assert 'updated_at' in data['data']
    
    def test_create_menu_item_validation_error(self, client):
        """Тест ошибки валидации при создании блюда."""
        invalid_data = {
            'name': '',  # Пустое название
            'category': 'main',
            'price': -10  # Отрицательная цена
        }
        
        response = client.post('/api/v1/menus/', json=invalid_data)
        assert response.status_code == 422
    
    def test_get_menu_item(self, client, created_menu_item):
        """Тест получения блюда по ID."""
        menu_id = created_menu_item['id']
        response = client.get(f'/api/v1/menus/{menu_id}')
        
        assert response.status_code == 200
        data = response.get_json()
        assert data['data']['id'] == menu_id
        assert data['data']['name'] == created_menu_item['name']
    
    def test_get_menu_item_not_found(self, client):
        """Тест получения несуществующего блюда."""
        response = client.get('/api/v1/menus/999')
        assert response.status_code == 404
    
    def test_get_menu_items_list(self, client, sample_menu_item):
        """Тест получения списка блюд."""
        # Создаем несколько блюд
        for i in range(3):
            menu_item = sample_menu_item.copy()
            menu_item['name'] = f"{sample_menu_item['name']} {i+1}"
            client.post('/api/v1/menus/', json=menu_item)
        
        response = client.get('/api/v1/menus/')
        assert response.status_code == 200
        
        data = response.get_json()
        assert 'data' in data
        assert 'meta' in data
        assert len(data['data']) == 3
        assert data['meta']['total'] == 3
    
    def test_get_menu_items_with_filters(self, client, sample_menu_item):
        """Тест фильтрации списка блюд."""
        # Создаем блюда разных категорий
        menu_items = [
            {**sample_menu_item, 'name': 'Суп', 'category': 'starter', 'price': 8.50},
            {**sample_menu_item, 'name': 'Стейк', 'category': 'main', 'price': 25.00},
            {**sample_menu_item, 'name': 'Торт', 'category': 'dessert', 'price': 12.00}
        ]
        
        for item in menu_items:
            client.post('/api/v1/menus/', json=item)
        
        # Фильтр по категории
        response = client.get('/api/v1/menus/?category=main')
        assert response.status_code == 200
        data = response.get_json()
        assert len(data['data']) == 1
        assert data['data'][0]['category'] == 'main'
        
        # Фильтр по цене
        response = client.get('/api/v1/menus/?min_price=10&max_price=20')
        assert response.status_code == 200
        data = response.get_json()
        assert len(data['data']) == 1
        assert data['data'][0]['name'] == 'Торт'
    
    def test_update_menu_item(self, client, created_menu_item):
        """Тест обновления блюда."""
        menu_id = created_menu_item['id']
        update_data = {
            'name': 'Обновленное блюдо',
            'price': 20.00
        }
        
        response = client.put(f'/api/v1/menus/{menu_id}', json=update_data)
        assert response.status_code == 200
        
        data = response.get_json()
        assert data['data']['name'] == update_data['name']
        assert data['data']['price'] == update_data['price']
    
    def test_partial_update_menu_item(self, client, created_menu_item):
        """Тест частичного обновления блюда."""
        menu_id = created_menu_item['id']
        update_data = {'price': 15.00}
        
        response = client.patch(f'/api/v1/menus/{menu_id}', json=update_data)
        assert response.status_code == 200
        
        data = response.get_json()
        assert data['data']['price'] == update_data['price']
        assert data['data']['name'] == created_menu_item['name']  # Не изменилось
    
    def test_delete_menu_item(self, client, created_menu_item):
        """Тест удаления блюда."""
        menu_id = created_menu_item['id']
        
        response = client.delete(f'/api/v1/menus/{menu_id}')
        assert response.status_code == 200
        
        # Проверяем, что блюдо удалено
        response = client.get(f'/api/v1/menus/{menu_id}')
        assert response.status_code == 404
    
    def test_delete_menu_item_not_found(self, client):
        """Тест удаления несуществующего блюда."""
        response = client.delete('/api/v1/menus/999')
        assert response.status_code == 404
    
    def test_pagination(self, client, sample_menu_item):
        """Тест пагинации."""
        # Создаем 5 блюд
        for i in range(5):
            menu_item = sample_menu_item.copy()
            menu_item['name'] = f"Блюдо {i+1}"
            client.post('/api/v1/menus/', json=menu_item)
        
        # Первая страница
        response = client.get('/api/v1/menus/?page=1&per_page=2')
        assert response.status_code == 200
        data = response.get_json()
        assert len(data['data']) == 2
        assert data['meta']['page'] == 1
        assert data['meta']['total'] == 5
        assert data['meta']['pages'] == 3
        
        # Вторая страница
        response = client.get('/api/v1/menus/?page=2&per_page=2')
        assert response.status_code == 200
        data = response.get_json()
        assert len(data['data']) == 2
        assert data['meta']['page'] == 2
