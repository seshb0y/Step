#!/usr/bin/env python3
"""Скрипт для проверки работоспособности API ресторана."""

import requests
import json
import sys
from datetime import datetime

BASE_URL = "http://localhost:5000"

def check_endpoint(method, url, data=None, expected_status=None, description=""):
    """Проверка эндпоинта."""
    try:
        if method == "GET":
            response = requests.get(url, timeout=5)
        elif method == "POST":
            response = requests.post(url, json=data, timeout=5)
        elif method == "PUT":
            response = requests.put(url, json=data, timeout=5)
        elif method == "PATCH":
            response = requests.patch(url, json=data, timeout=5)
        elif method == "DELETE":
            response = requests.delete(url, timeout=5)
        
        status = response.status_code
        success = expected_status is None or status == expected_status
        
        if success:
            print(f"✅ {description or f'{method} {url}'} - {status}")
        else:
            print(f"❌ {description or f'{method} {url}'} - {status} (ожидался {expected_status})")
            return False
            
        return True
        
    except requests.exceptions.ConnectionError:
        print(f"❌ {description or f'{method} {url}'} - Ошибка подключения")
        return False
    except requests.exceptions.Timeout:
        print(f"❌ {description or f'{method} {url}'} - Таймаут")
        return False
    except Exception as e:
        print(f"❌ {description or f'{method} {url}'} - Ошибка: {e}")
        return False

def main():
    """Основная функция проверки."""
    print("🔍 Проверка API ресторана")
    print("=" * 50)
    print(f"Время: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"URL: {BASE_URL}")
    print()
    
    # Счетчик успешных проверок
    passed = 0
    total = 0
    
    # 1. Health Check
    print("1. Health Check")
    total += 1
    if check_endpoint("GET", f"{BASE_URL}/health", expected_status=200, description="Health Check"):
        passed += 1
    print()
    
    # 2. Меню
    print("2. Меню")
    total += 1
    if check_endpoint("GET", f"{BASE_URL}/api/v1/menus/", expected_status=200, description="Получение списка блюд"):
        passed += 1
    
    total += 1
    if check_endpoint("GET", f"{BASE_URL}/api/v1/menus/?category=main", expected_status=200, description="Фильтр по категории"):
        passed += 1
    
    total += 1
    if check_endpoint("GET", f"{BASE_URL}/api/v1/menus/?min_price=10&max_price=30", expected_status=200, description="Фильтр по цене"):
        passed += 1
    
    total += 1
    if check_endpoint("GET", f"{BASE_URL}/api/v1/menus/?is_available=true", expected_status=200, description="Фильтр по доступности"):
        passed += 1
    
    total += 1
    if check_endpoint("GET", f"{BASE_URL}/api/v1/menus/?q=стейк", expected_status=200, description="Поиск по названию"):
        passed += 1
    
    total += 1
    if check_endpoint("GET", f"{BASE_URL}/api/v1/menus/?sort=price", expected_status=200, description="Сортировка по цене"):
        passed += 1
    
    total += 1
    if check_endpoint("GET", f"{BASE_URL}/api/v1/menus/?page=1&per_page=10", expected_status=200, description="Пагинация"):
        passed += 1
    
    # Создание блюда
    menu_data = {
        "name": f"Тестовое блюдо {datetime.now().strftime('%H%M%S')}",
        "description": "Описание тестового блюда",
        "category": "main",
        "price": 12.50,
        "is_available": True
    }
    
    total += 1
    if check_endpoint("POST", f"{BASE_URL}/api/v1/menus/", menu_data, expected_status=201, description="Создание блюда"):
        passed += 1
    
    # Получение конкретного блюда (сначала получим список, чтобы найти существующий ID)
    try:
        response = requests.get(f"{BASE_URL}/api/v1/menus/", timeout=5)
        if response.status_code == 200:
            data = response.json()
            if data.get('data') and len(data['data']) > 0:
                menu_id = data['data'][0]['id']
                total += 1
                if check_endpoint("GET", f"{BASE_URL}/api/v1/menus/{menu_id}", expected_status=200, description="Получение блюда по ID"):
                    passed += 1
            else:
                print("⚠️  Нет блюд для тестирования получения по ID")
        else:
            print("⚠️  Не удалось получить список блюд для тестирования")
    except:
        print("⚠️  Ошибка при получении списка блюд")
    
    # Несуществующее блюдо
    total += 1
    if check_endpoint("GET", f"{BASE_URL}/api/v1/menus/999", expected_status=404, description="Несуществующее блюдо"):
        passed += 1
    
    # Валидация ошибок
    invalid_menu = {
        "name": "",
        "price": -10,
        "category": "invalid_category"
    }
    
    total += 1
    if check_endpoint("POST", f"{BASE_URL}/api/v1/menus/", invalid_menu, expected_status=422, description="Валидация ошибок"):
        passed += 1
    
    print()
    
    # 3. Повара
    print("3. Повара")
    total += 1
    if check_endpoint("GET", f"{BASE_URL}/api/v1/chefs/", expected_status=200, description="Получение списка поваров"):
        passed += 1
    
    total += 1
    if check_endpoint("GET", f"{BASE_URL}/api/v1/chefs/?specialty=Азиатская", expected_status=200, description="Фильтр по специализации"):
        passed += 1
    
    total += 1
    if check_endpoint("GET", f"{BASE_URL}/api/v1/chefs/?is_active=true", expected_status=200, description="Фильтр по активности"):
        passed += 1
    
    total += 1
    if check_endpoint("GET", f"{BASE_URL}/api/v1/chefs/?q=Иван", expected_status=200, description="Поиск по имени"):
        passed += 1
    
    total += 1
    if check_endpoint("GET", f"{BASE_URL}/api/v1/chefs/?sort=name", expected_status=200, description="Сортировка по имени"):
        passed += 1
    
    # Создание повара
    chef_data = {
        "full_name": f"Тестовый повар {datetime.now().strftime('%H%M%S')}",
        "rank": "junior",
        "specialties": ["Тестовая кухня"],
        "is_active": True
    }
    
    total += 1
    if check_endpoint("POST", f"{BASE_URL}/api/v1/chefs/", chef_data, expected_status=201, description="Создание повара"):
        passed += 1
    
    # Получение конкретного повара (сначала получим список, чтобы найти существующий ID)
    try:
        response = requests.get(f"{BASE_URL}/api/v1/chefs/", timeout=5)
        if response.status_code == 200:
            data = response.json()
            if data.get('data') and len(data['data']) > 0:
                chef_id = data['data'][0]['id']
                total += 1
                if check_endpoint("GET", f"{BASE_URL}/api/v1/chefs/{chef_id}", expected_status=200, description="Получение повара по ID"):
                    passed += 1
            else:
                print("⚠️  Нет поваров для тестирования получения по ID")
        else:
            print("⚠️  Не удалось получить список поваров для тестирования")
    except:
        print("⚠️  Ошибка при получении списка поваров")
    
    # Несуществующий повар
    total += 1
    if check_endpoint("GET", f"{BASE_URL}/api/v1/chefs/999", expected_status=404, description="Несуществующий повар"):
        passed += 1
    
    print()
    
    # Итоги
    print("=" * 50)
    print(f"Результат: {passed}/{total} проверок прошли успешно")
    
    if passed == total:
        print("🎉 Все проверки прошли успешно! API работает корректно.")
        return 0
    else:
        print(f"⚠️  {total - passed} проверок не прошли. Проверьте API.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
