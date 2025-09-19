#!/usr/bin/env python3
"""Скрипт для тестирования всех эндпоинтов API."""

import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:5000"

def test_endpoint(method, url, data=None, expected_status=None):
    """Тестирование эндпоинта."""
    try:
        if method == "GET":
            response = requests.get(url)
        elif method == "POST":
            response = requests.post(url, json=data)
        elif method == "PUT":
            response = requests.put(url, json=data)
        elif method == "PATCH":
            response = requests.patch(url, json=data)
        elif method == "DELETE":
            response = requests.delete(url)
        
        status = response.status_code
        result = response.json() if response.content else {}
        
        print(f"{method} {url}")
        print(f"Status: {status}")
        print(f"Response: {json.dumps(result, ensure_ascii=False, indent=2)}")
        
        if expected_status and status != expected_status:
            print(f"❌ Expected {expected_status}, got {status}")
        else:
            print("✅ OK")
        print("-" * 50)
        
        return response
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("-" * 50)
        return None

def main():
    """Основная функция тестирования."""
    print("🚀 Тестирование API ресторана")
    print("=" * 50)
    
    # 1. Health Check
    print("\n1. Health Check")
    test_endpoint("GET", f"{BASE_URL}/health", expected_status=200)
    
    # 2. Создание блюд
    print("\n2. Создание блюд")
    menu_items = [
        {
            "name": "Цезарь с курицей",
            "description": "Классический салат с курицей",
            "category": "starter",
            "price": 8.50,
            "is_available": True
        },
        {
            "name": "Стейк Рибай",
            "description": "Сочный стейк из говядины",
            "category": "main",
            "price": 25.90,
            "is_available": True
        },
        {
            "name": "Тирамису",
            "description": "Итальянский десерт",
            "category": "dessert",
            "price": 6.90,
            "is_available": True
        }
    ]
    
    created_menu_items = []
    for item in menu_items:
        response = test_endpoint("POST", f"{BASE_URL}/api/v1/menus/", item, expected_status=201)
        if response and response.status_code == 201:
            created_menu_items.append(response.json()["data"])
    
    # 3. Получение списка блюд
    print("\n3. Получение списка блюд")
    test_endpoint("GET", f"{BASE_URL}/api/v1/menus/", expected_status=200)
    
    # 4. Фильтрация блюд
    print("\n4. Фильтрация блюд")
    test_endpoint("GET", f"{BASE_URL}/api/v1/menus/?category=main", expected_status=200)
    test_endpoint("GET", f"{BASE_URL}/api/v1/menus/?min_price=10&max_price=30", expected_status=200)
    test_endpoint("GET", f"{BASE_URL}/api/v1/menus/?is_available=true", expected_status=200)
    test_endpoint("GET", f"{BASE_URL}/api/v1/menus/?q=стейк", expected_status=200)
    test_endpoint("GET", f"{BASE_URL}/api/v1/menus/?sort=price", expected_status=200)
    test_endpoint("GET", f"{BASE_URL}/api/v1/menus/?page=1&per_page=2", expected_status=200)
    
    # 5. Получение конкретного блюда
    print("\n5. Получение конкретного блюда")
    if created_menu_items:
        menu_id = created_menu_items[0]["id"]
        test_endpoint("GET", f"{BASE_URL}/api/v1/menus/{menu_id}", expected_status=200)
        test_endpoint("GET", f"{BASE_URL}/api/v1/menus/999", expected_status=404)
    
    # 6. Обновление блюда
    print("\n6. Обновление блюда")
    if created_menu_items:
        menu_id = created_menu_items[0]["id"]
        update_data = {
            "name": "Цезарь с курицей (обновленный)",
            "price": 9.50
        }
        test_endpoint("PUT", f"{BASE_URL}/api/v1/menus/{menu_id}", update_data, expected_status=200)
        
        # Частичное обновление
        patch_data = {
            "price": 8.90,
            "is_available": False
        }
        test_endpoint("PATCH", f"{BASE_URL}/api/v1/menus/{menu_id}", patch_data, expected_status=200)
    
    # 7. Создание поваров
    print("\n7. Создание поваров")
    chefs = [
        {
            "full_name": "Иван Петров",
            "specialties": ["Азиатская кухня", "Супы"],
            "is_active": True
        },
        {
            "full_name": "Мария Сидорова",
            "specialties": ["Итальянская кухня", "Десерты"],
            "is_active": True
        },
        {
            "full_name": "Алексей Козлов",
            "specialties": ["Гриль", "Барбекю"],
            "is_active": True
        }
    ]
    
    created_chefs = []
    for chef in chefs:
        response = test_endpoint("POST", f"{BASE_URL}/api/v1/chefs/", chef, expected_status=201)
        if response and response.status_code == 201:
            created_chefs.append(response.json()["data"])
    
    # 8. Получение списка поваров
    print("\n8. Получение списка поваров")
    test_endpoint("GET", f"{BASE_URL}/api/v1/chefs/", expected_status=200)
    
    # 9. Фильтрация поваров
    print("\n9. Фильтрация поваров")
    test_endpoint("GET", f"{BASE_URL}/api/v1/chefs/?specialty=Азиатская", expected_status=200)
    test_endpoint("GET", f"{BASE_URL}/api/v1/chefs/?is_active=true", expected_status=200)
    test_endpoint("GET", f"{BASE_URL}/api/v1/chefs/?q=Иван", expected_status=200)
    test_endpoint("GET", f"{BASE_URL}/api/v1/chefs/?sort=name", expected_status=200)
    
    # 10. Получение конкретного повара
    print("\n10. Получение конкретного повара")
    if created_chefs:
        chef_id = created_chefs[0]["id"]
        test_endpoint("GET", f"{BASE_URL}/api/v1/chefs/{chef_id}", expected_status=200)
        test_endpoint("GET", f"{BASE_URL}/api/v1/chefs/999", expected_status=404)
    
    # 11. Обновление повара
    print("\n11. Обновление повара")
    if created_chefs:
        chef_id = created_chefs[0]["id"]
        update_data = {
            "full_name": "Иван Петров (обновленный)",
            "specialties": ["Азиатская кухня", "Супы", "Жаркое"]
        }
        test_endpoint("PUT", f"{BASE_URL}/api/v1/chefs/{chef_id}", update_data, expected_status=200)
        
        # Частичное обновление
        patch_data = {
            "specialties": ["Азиатская кухня", "Супы"],
            "is_active": False
        }
        test_endpoint("PATCH", f"{BASE_URL}/api/v1/chefs/{chef_id}", patch_data, expected_status=200)
    
    # 12. Тестирование ошибок валидации
    print("\n12. Тестирование ошибок валидации")
    invalid_menu = {
        "name": "",
        "price": -10,
        "category": "invalid_category"
    }
    test_endpoint("POST", f"{BASE_URL}/api/v1/menus/", invalid_menu, expected_status=422)
    
    invalid_chef = {
        "full_name": "",
        "specialties": "not_a_list"
    }
    test_endpoint("POST", f"{BASE_URL}/api/v1/chefs/", invalid_chef, expected_status=422)
    
    print("\n🎉 Тестирование завершено!")

if __name__ == "__main__":
    main()


