"""Тесты для API поваров."""

import pytest


class TestChefAPI:
    """Тесты API для работы с поварами."""
    
    def test_create_chef(self, client, sample_chef):
        """Тест создания повара."""
        response = client.post('/api/v1/chefs/', json=sample_chef)
        
        assert response.status_code == 201
        data = response.get_json()
        assert 'data' in data
        assert data['data']['full_name'] == sample_chef['full_name']
        assert data['data']['rank'] == sample_chef['rank']
        assert data['data']['specialties'] == sample_chef['specialties']
        assert data['data']['is_active'] == sample_chef['is_active']
        assert 'id' in data['data']
        assert 'created_at' in data['data']
        assert 'updated_at' in data['data']
    
    def test_create_chef_validation_error(self, client):
        """Тест ошибки валидации при создании повара."""
        invalid_data = {
            'full_name': '',  # Пустое имя
            'rank': 'invalid_rank',  # Неверный ранг
        }

        response = client.post('/api/v1/chefs/', json=invalid_data)
        assert response.status_code == 422
    
    def test_get_chef(self, client, created_chef):
        """Тест получения повара по ID."""
        chef_id = created_chef['id']
        response = client.get(f'/api/v1/chefs/{chef_id}')
        
        assert response.status_code == 200
        data = response.get_json()
        assert data['data']['id'] == chef_id
        assert data['data']['full_name'] == created_chef['full_name']
    
    def test_get_chef_not_found(self, client):
        """Тест получения несуществующего повара."""
        response = client.get('/api/v1/chefs/999')
        assert response.status_code == 404
    
    def test_get_chefs_list(self, client, sample_chef):
        """Тест получения списка поваров."""
        # Создаем нескольких поваров
        for i in range(3):
            chef = sample_chef.copy()
            chef['full_name'] = f"{sample_chef['full_name']} {i+1}"
            client.post('/api/v1/chefs/', json=chef)
        
        response = client.get('/api/v1/chefs/')
        assert response.status_code == 200
        
        data = response.get_json()
        assert 'data' in data
        assert 'meta' in data
        assert len(data['data']) == 3
        assert data['meta']['total'] == 3
    
    def test_get_chefs_with_filters(self, client, sample_chef):
        """Тест фильтрации списка поваров."""
        # Создаем поваров разных рангов
        chefs = [
            {**sample_chef, 'full_name': 'Повар 1', 'rank': 'junior', 'is_active': True},
            {**sample_chef, 'full_name': 'Повар 2', 'rank': 'senior', 'is_active': False},
            {**sample_chef, 'full_name': 'Повар 3', 'rank': 'senior', 'is_active': True}
        ]
        
        for chef in chefs:
            client.post('/api/v1/chefs/', json=chef)
        
        # Фильтр по рангу
        response = client.get('/api/v1/chefs/?rank=senior')
        assert response.status_code == 200
        data = response.get_json()
        assert len(data['data']) == 2
        
        # Фильтр по активности
        response = client.get('/api/v1/chefs/?is_active=true')
        assert response.status_code == 200
        data = response.get_json()
        assert len(data['data']) == 2
        
        # Фильтр по специализации
        response = client.get('/api/v1/chefs/?specialty=asian')
        assert response.status_code == 200
        data = response.get_json()
        assert len(data['data']) == 3  # Все повары имеют эту специализацию
    
    def test_update_chef(self, client, created_chef):
        """Тест обновления повара."""
        chef_id = created_chef['id']
        update_data = {
            'full_name': 'Обновленный повар',
            'rank': 'chef-de-cuisine'
        }
        
        response = client.put(f'/api/v1/chefs/{chef_id}', json=update_data)
        assert response.status_code == 200
        
        data = response.get_json()
        assert data['data']['full_name'] == update_data['full_name']
        assert data['data']['rank'] == update_data['rank']
    
    def test_partial_update_chef(self, client, created_chef):
        """Тест частичного обновления повара."""
        chef_id = created_chef['id']
        update_data = {'rank': 'chef-de-cuisine'}
        
        response = client.patch(f'/api/v1/chefs/{chef_id}', json=update_data)
        assert response.status_code == 200
        
        data = response.get_json()
        assert data['data']['rank'] == update_data['rank']
        assert data['data']['full_name'] == created_chef['full_name']  # Не изменилось
    
    def test_delete_chef(self, client, created_chef):
        """Тест удаления повара."""
        chef_id = created_chef['id']
        
        response = client.delete(f'/api/v1/chefs/{chef_id}')
        assert response.status_code == 200
        
        # Проверяем, что повар удален
        response = client.get(f'/api/v1/chefs/{chef_id}')
        assert response.status_code == 404
    
    def test_delete_chef_not_found(self, client):
        """Тест удаления несуществующего повара."""
        response = client.delete('/api/v1/chefs/999')
        assert response.status_code == 404
    
    def test_assign_menu_item(self, client, created_chef, created_menu_item):
        """Тест назначения блюда повару."""
        chef_id = created_chef['id']
        menu_item_id = created_menu_item['id']
        
        response = client.post(f'/api/v1/chefs/{chef_id}/menu-items/{menu_item_id}')
        assert response.status_code == 200
        
        data = response.get_json()
        assert 'message' in data
    
    def test_unassign_menu_item(self, client, created_chef, created_menu_item):
        """Тест снятия назначения блюда повару."""
        chef_id = created_chef['id']
        menu_item_id = created_menu_item['id']
        
        # Сначала назначаем
        client.post(f'/api/v1/chefs/{chef_id}/menu-items/{menu_item_id}')
        
        # Затем снимаем назначение
        response = client.delete(f'/api/v1/chefs/{chef_id}/menu-items/{menu_item_id}')
        assert response.status_code == 200
        
        data = response.get_json()
        assert 'message' in data
    
    def test_assign_menu_item_not_found(self, client):
        """Тест назначения несуществующего блюда повару."""
        response = client.post('/api/v1/chefs/1/menu-items/999')
        assert response.status_code == 404
    
    def test_pagination(self, client, sample_chef):
        """Тест пагинации."""
        # Создаем 5 поваров
        for i in range(5):
            chef = sample_chef.copy()
            chef['full_name'] = f"Повар {i+1}"
            client.post('/api/v1/chefs/', json=chef)
        
        # Первая страница
        response = client.get('/api/v1/chefs/?page=1&per_page=2')
        assert response.status_code == 200
        data = response.get_json()
        assert len(data['data']) == 2
        assert data['meta']['page'] == 1
        assert data['meta']['total'] == 5
        assert data['meta']['pages'] == 3
