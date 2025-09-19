"""Репозиторий для работы с поварами."""

from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Query
from sqlalchemy import and_, or_

from app.extensions import db
from app.models.chef import Chef
from app.models.menu_item import MenuItem
from app.utils.pagination import paginate_query


class ChefRepository:
    """Репозиторий для работы с поварами."""
    
    @staticmethod
    def create(data: Dict[str, Any]) -> Chef:
        """Создание нового повара."""
        chef = Chef(**data)
        db.session.add(chef)
        db.session.commit()
        db.session.refresh(chef)
        return chef
    
    @staticmethod
    def get_by_id(chef_id: int) -> Optional[Chef]:
        """Получение повара по ID."""
        return Chef.query.get(chef_id)
    
    @staticmethod
    def get_all(
        page: int = 1,
        per_page: int = 20,
        rank: Optional[str] = None,
        is_active: Optional[bool] = None,
        specialty: Optional[str] = None,
        search: Optional[str] = None,
        sort_by: Optional[str] = None
    ) -> tuple[List[Chef], int]:
        """
        Получение списка поваров с фильтрацией и пагинацией.
        
        Args:
            page: Номер страницы
            per_page: Количество элементов на странице
            rank: Фильтр по рангу
            is_active: Фильтр по активности
            specialty: Фильтр по специализации (содержит)
            search: Поиск по имени
            sort_by: Поле для сортировки (name, -name, rank, -rank)
        
        Returns:
            Tuple[List[Chef], int]: Список поваров и общее количество
        """
        query = Chef.query
        
        # Применяем фильтры
        filters = []
        
        if rank:
            filters.append(Chef.rank == rank)
        
        if is_active is not None:
            filters.append(Chef.is_active == is_active)
        
        if specialty:
            filters.append(Chef.specialties.contains(specialty))
        
        if search:
            filters.append(Chef.full_name.ilike(f'%{search}%'))
        
        if filters:
            query = query.filter(and_(*filters))
        
        # Применяем сортировку
        if sort_by:
            if sort_by == 'name':
                query = query.order_by(Chef.full_name.asc())
            elif sort_by == '-name':
                query = query.order_by(Chef.full_name.desc())
            elif sort_by == 'rank':
                query = query.order_by(Chef.rank.asc())
            elif sort_by == '-rank':
                query = query.order_by(Chef.rank.desc())
        else:
            query = query.order_by(Chef.created_at.desc())
        
        # Применяем пагинацию
        return paginate_query(query, page, per_page)
    
    @staticmethod
    def update(chef_id: int, data: Dict[str, Any]) -> Optional[Chef]:
        """Обновление повара."""
        chef = Chef.query.get(chef_id)
        if not chef:
            return None
        
        for key, value in data.items():
            if hasattr(chef, key) and value is not None:
                setattr(chef, key, value)
        
        db.session.commit()
        db.session.refresh(chef)
        return chef
    
    @staticmethod
    def delete(chef_id: int) -> bool:
        """Удаление повара."""
        chef = Chef.query.get(chef_id)
        if not chef:
            return False
        
        db.session.delete(chef)
        db.session.commit()
        return True
    
    @staticmethod
    def exists_by_name(full_name: str, exclude_id: Optional[int] = None) -> bool:
        """Проверка существования повара с таким же именем."""
        query = Chef.query.filter(Chef.full_name == full_name)
        
        if exclude_id:
            query = query.filter(Chef.id != exclude_id)
        
        return query.first() is not None
    
    @staticmethod
    def assign_menu_item(chef_id: int, menu_item_id: int) -> bool:
        """Назначение блюда повару."""
        chef = Chef.query.get(chef_id)
        menu_item = MenuItem.query.get(menu_item_id)
        
        if not chef or not menu_item:
            return False
        
        if menu_item not in chef.menu_items:
            chef.menu_items.append(menu_item)
            db.session.commit()
        
        return True
    
    @staticmethod
    def unassign_menu_item(chef_id: int, menu_item_id: int) -> bool:
        """Снятие назначения блюда повару."""
        chef = Chef.query.get(chef_id)
        menu_item = MenuItem.query.get(menu_item_id)
        
        if not chef or not menu_item:
            return False
        
        if menu_item in chef.menu_items:
            chef.menu_items.remove(menu_item)
            db.session.commit()
        
        return True
