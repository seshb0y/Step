"""Утилиты для пагинации."""

from typing import Optional, Tuple, Any
from sqlalchemy.orm import Query
from sqlalchemy import func


class PaginationParams:
    """Параметры пагинации."""
    
    def __init__(
        self, 
        page: int = 1, 
        per_page: int = 20, 
        max_per_page: int = 100
    ):
        self.page = max(1, page)
        self.per_page = min(max(1, per_page), max_per_page)
        self.offset = (self.page - 1) * self.per_page


def paginate_query(
    query: Query, 
    page: int = 1, 
    per_page: int = 20,
    max_per_page: int = 100
) -> Tuple[Query, int]:
    """
    Применяет пагинацию к запросу.
    
    Args:
        query: SQLAlchemy запрос
        page: Номер страницы (начиная с 1)
        per_page: Количество элементов на странице
        max_per_page: Максимальное количество элементов на странице
    
    Returns:
        Tuple[Query, int]: Запрос с пагинацией и общее количество записей
    """
    # Ограничиваем per_page
    per_page = min(max(1, per_page), max_per_page)
    page = max(1, page)
    
    # Получаем общее количество записей
    total = query.count()
    
    # Применяем пагинацию
    offset = (page - 1) * per_page
    paginated_query = query.offset(offset).limit(per_page)
    
    return paginated_query, total

