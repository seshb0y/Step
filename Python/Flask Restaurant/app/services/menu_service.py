"""Сервис для работы с меню."""

from typing import Optional, List, Dict, Any
from decimal import Decimal

from app.models.menu_item import MenuItem
from app.repositories.menu_repo import MenuRepository
from app.utils.errors import ValidationError, NotFoundError, ConflictError


class MenuService:
    """Сервис для работы с блюдами меню."""
    
    def __init__(self):
        self.repository = MenuRepository()
    
    def create_menu_item(self, data) -> MenuItem:
        """Создание нового блюда с валидацией."""
        # Проверяем уникальность названия в категории
        if self.repository.exists_by_name_and_category(data.name, data.category):
            raise ConflictError(f"Блюдо с названием '{data.name}' уже существует в категории '{data.category}'")
        
        # Валидация цены
        if hasattr(data, 'price') and data.price <= 0:
            raise ValidationError("Цена должна быть больше 0")
        
        # Конвертируем Pydantic объект в словарь для репозитория
        data_dict = data.model_dump() if hasattr(data, 'model_dump') else data
        return self.repository.create(data_dict)
    
    def get_menu_item(self, menu_id: int) -> MenuItem:
        """Получение блюда по ID."""
        menu_item = self.repository.get_by_id(menu_id)
        if not menu_item:
            raise NotFoundError(f"Блюдо с ID {menu_id} не найдено")
        return menu_item
    
    def get_menu_items(
        self,
        page: int = 1,
        per_page: int = 20,
        category: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        is_available: Optional[bool] = None,
        search: Optional[str] = None,
        sort_by: Optional[str] = None
    ) -> tuple[List[MenuItem], int]:
        """Получение списка блюд с фильтрацией."""
        # Валидация параметров
        if page < 1:
            raise ValidationError("Номер страницы должен быть больше 0")
        
        if per_page < 1 or per_page > 100:
            raise ValidationError("Количество элементов на странице должно быть от 1 до 100")
        
        if min_price is not None and min_price < 0:
            raise ValidationError("Минимальная цена не может быть отрицательной")
        
        if max_price is not None and max_price < 0:
            raise ValidationError("Максимальная цена не может быть отрицательной")
        
        if min_price is not None and max_price is not None and min_price > max_price:
            raise ValidationError("Минимальная цена не может быть больше максимальной")
        
        return self.repository.get_all(
            page=page,
            per_page=per_page,
            category=category,
            min_price=min_price,
            max_price=max_price,
            is_available=is_available,
            search=search,
            sort_by=sort_by
        )
    
    def update_menu_item(self, menu_id: int, data) -> MenuItem:
        """Обновление блюда с валидацией."""
        menu_item = self.get_menu_item(menu_id)
        
        # Конвертируем Pydantic объект в словарь для репозитория
        data_dict = data.model_dump() if hasattr(data, 'model_dump') else data
        
        # Проверяем уникальность названия в категории при изменении
        if 'name' in data_dict or 'category' in data_dict:
            name = data_dict.get('name', menu_item.name)
            category = data_dict.get('category', menu_item.category)
            
            if self.repository.exists_by_name_and_category(name, category, exclude_id=menu_id):
                raise ConflictError(f"Блюдо с названием '{name}' уже существует в категории '{category}'")
        
        # Валидация цены
        if 'price' in data_dict and data_dict['price'] <= 0:
            raise ValidationError("Цена должна быть больше 0")
        
        updated_item = self.repository.update(menu_id, data_dict)
        if not updated_item:
            raise NotFoundError(f"Блюдо с ID {menu_id} не найдено")
        
        return updated_item
    
    def delete_menu_item(self, menu_id: int) -> bool:
        """Удаление блюда."""
        if not self.repository.get_by_id(menu_id):
            raise NotFoundError(f"Блюдо с ID {menu_id} не найдено")
        
        return self.repository.delete(menu_id)
