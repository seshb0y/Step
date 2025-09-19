"""Репозиторий для работы с меню."""

from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Query
from sqlalchemy import and_, or_

from app.extensions import db
from app.models.menu_item import MenuItem
from app.utils.pagination import paginate_query


class MenuRepository:
    """Репозиторий для работы с блюдами меню."""
    
    @staticmethod
    def create(data: Dict[str, Any]) -> MenuItem:
        """Создание нового блюда."""
        menu_item = MenuItem(**data)
        db.session.add(menu_item)
        db.session.commit()
        db.session.refresh(menu_item)
        return menu_item
    
    @staticmethod
    def get_by_id(menu_id: int) -> Optional[MenuItem]:
        """Получение блюда по ID."""
        return MenuItem.query.get(menu_id)
    
    @staticmethod
    def get_all(
        page: int = 1,
        per_page: int = 20,
        category: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        is_available: Optional[bool] = None,
        search: Optional[str] = None,
        sort_by: Optional[str] = None
    ) -> tuple[List[MenuItem], int]:
        """
        Получение списка блюд с фильтрацией и пагинацией.
        
        Args:
            page: Номер страницы
            per_page: Количество элементов на странице
            category: Фильтр по категории
            min_price: Минимальная цена
            max_price: Максимальная цена
            is_available: Фильтр по доступности
            search: Поиск по названию и описанию
            sort_by: Поле для сортировки (price, -price, name, -name)
        
        Returns:
            Tuple[List[MenuItem], int]: Список блюд и общее количество
        """
        query = MenuItem.query
        
        # Применяем фильтры
        filters = []
        
        if category:
            filters.append(MenuItem.category == category)
        
        if min_price is not None:
            filters.append(MenuItem.price >= min_price)
        
        if max_price is not None:
            filters.append(MenuItem.price <= max_price)
        
        if is_available is not None:
            filters.append(MenuItem.is_available == is_available)
        
        if search:
            search_filter = or_(
                MenuItem.name.ilike(f'%{search}%'),
                MenuItem.description.ilike(f'%{search}%')
            )
            filters.append(search_filter)
        
        if filters:
            query = query.filter(and_(*filters))
        
        # Применяем сортировку
        if sort_by:
            if sort_by == 'price':
                query = query.order_by(MenuItem.price.asc())
            elif sort_by == '-price':
                query = query.order_by(MenuItem.price.desc())
            elif sort_by == 'name':
                query = query.order_by(MenuItem.name.asc())
            elif sort_by == '-name':
                query = query.order_by(MenuItem.name.desc())
        else:
            query = query.order_by(MenuItem.created_at.desc())
        
        # Применяем пагинацию
        return paginate_query(query, page, per_page)
    
    @staticmethod
    def update(menu_id: int, data: Dict[str, Any]) -> Optional[MenuItem]:
        """Обновление блюда."""
        menu_item = MenuItem.query.get(menu_id)
        if not menu_item:
            return None
        
        for key, value in data.items():
            if hasattr(menu_item, key) and value is not None:
                setattr(menu_item, key, value)
        
        db.session.commit()
        db.session.refresh(menu_item)
        return menu_item
    
    @staticmethod
    def delete(menu_id: int) -> bool:
        """Удаление блюда."""
        menu_item = MenuItem.query.get(menu_id)
        if not menu_item:
            return False
        
        db.session.delete(menu_item)
        db.session.commit()
        return True
    
    @staticmethod
    def exists_by_name_and_category(name: str, category: str, exclude_id: Optional[int] = None) -> bool:
        """Проверка существования блюда с таким же названием в категории."""
        query = MenuItem.query.filter(
            MenuItem.name == name,
            MenuItem.category == category
        )
        
        if exclude_id:
            query = query.filter(MenuItem.id != exclude_id)
        
        return query.first() is not None

