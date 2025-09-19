"""Сервис для работы с поварами."""

from typing import Optional, List, Dict, Any

from app.models.chef import Chef
from app.repositories.chef_repo import ChefRepository
from app.utils.errors import ValidationError, NotFoundError, ConflictError


class ChefService:
    """Сервис для работы с поварами."""
    
    def __init__(self):
        self.repository = ChefRepository()
    
    def create_chef(self, data) -> Chef:
        """Создание нового повара с валидацией."""
        # Конвертируем Pydantic объект в словарь для репозитория
        data_dict = data.model_dump() if hasattr(data, 'model_dump') else data
        
        # Проверяем уникальность имени
        if self.repository.exists_by_name(data_dict['full_name']):
            raise ConflictError(f"Повар с именем '{data_dict['full_name']}' уже существует")
        
        # Валидация специализаций
        if 'specialties' in data_dict:
            specialties = data_dict['specialties']
            if not isinstance(specialties, list):
                raise ValidationError("Специализации должны быть списком")
            
            if len(specialties) > 10:
                raise ValidationError("Максимум 10 специализаций")
            
            # Проверяем, что все специализации - строки
            for specialty in specialties:
                if not isinstance(specialty, str):
                    raise ValidationError("Все специализации должны быть строками")
        
        return self.repository.create(data_dict)
    
    def get_chef(self, chef_id: int) -> Chef:
        """Получение повара по ID."""
        chef = self.repository.get_by_id(chef_id)
        if not chef:
            raise NotFoundError(f"Повар с ID {chef_id} не найден")
        return chef
    
    def get_chefs(
        self,
        page: int = 1,
        per_page: int = 20,
        rank: Optional[str] = None,
        is_active: Optional[bool] = None,
        specialty: Optional[str] = None,
        search: Optional[str] = None,
        sort_by: Optional[str] = None
    ) -> tuple[List[Chef], int]:
        """Получение списка поваров с фильтрацией."""
        # Валидация параметров
        if page < 1:
            raise ValidationError("Номер страницы должен быть больше 0")
        
        if per_page < 1 or per_page > 100:
            raise ValidationError("Количество элементов на странице должно быть от 1 до 100")
        
        return self.repository.get_all(
            page=page,
            per_page=per_page,
            rank=rank,
            is_active=is_active,
            specialty=specialty,
            search=search,
            sort_by=sort_by
        )
    
    def update_chef(self, chef_id: int, data) -> Chef:
        """Обновление повара с валидацией."""
        chef = self.get_chef(chef_id)
        
        # Конвертируем Pydantic объект в словарь для репозитория
        data_dict = data.model_dump() if hasattr(data, 'model_dump') else data
        
        # Проверяем уникальность имени при изменении
        if 'full_name' in data_dict:
            if self.repository.exists_by_name(data_dict['full_name'], exclude_id=chef_id):
                raise ConflictError(f"Повар с именем '{data_dict['full_name']}' уже существует")
        
        # Валидация специализаций
        if 'specialties' in data_dict:
            specialties = data_dict['specialties']
            if not isinstance(specialties, list):
                raise ValidationError("Специализации должны быть списком")
            
            if len(specialties) > 10:
                raise ValidationError("Максимум 10 специализаций")
            
            # Проверяем, что все специализации - строки
            for specialty in specialties:
                if not isinstance(specialty, str):
                    raise ValidationError("Все специализации должны быть строками")
        
        updated_chef = self.repository.update(chef_id, data_dict)
        if not updated_chef:
            raise NotFoundError(f"Повар с ID {chef_id} не найден")
        
        return updated_chef
    
    def delete_chef(self, chef_id: int) -> bool:
        """Удаление повара."""
        if not self.repository.get_by_id(chef_id):
            raise NotFoundError(f"Повар с ID {chef_id} не найден")
        
        return self.repository.delete(chef_id)
    
    def assign_menu_item(self, chef_id: int, menu_item_id: int) -> bool:
        """Назначение блюда повару."""
        # Проверяем существование повара и блюда
        self.get_chef(chef_id)
        from app.services.menu_service import MenuService
        menu_service = MenuService()
        menu_service.get_menu_item(menu_item_id)
        
        return self.repository.assign_menu_item(chef_id, menu_item_id)
    
    def unassign_menu_item(self, chef_id: int, menu_item_id: int) -> bool:
        """Снятие назначения блюда повару."""
        # Проверяем существование повара и блюда
        self.get_chef(chef_id)
        from app.services.menu_service import MenuService
        menu_service = MenuService()
        menu_service.get_menu_item(menu_item_id)
        
        return self.repository.unassign_menu_item(chef_id, menu_item_id)
