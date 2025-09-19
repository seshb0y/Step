"""Общие схемы для пагинации и ответов."""

from typing import List, TypeVar, Generic
from pydantic import BaseModel, Field

T = TypeVar('T')


class PaginationMeta(BaseModel):
    """Метаданные пагинации."""
    total: int = Field(..., description="Общее количество элементов")
    page: int = Field(..., description="Текущая страница")
    per_page: int = Field(..., description="Элементов на странице")
    pages: int = Field(..., description="Общее количество страниц")


class PaginatedResponse(BaseModel, Generic[T]):
    """Пагинированный ответ."""
    data: List[T] = Field(..., description="Данные")
    meta: PaginationMeta = Field(..., description="Метаданные пагинации")


class ErrorDetail(BaseModel):
    """Детали ошибки."""
    field: str = Field(..., description="Поле с ошибкой")
    message: str = Field(..., description="Сообщение об ошибке")


class ErrorResponse(BaseModel):
    """Стандартный ответ с ошибкой."""
    error: dict = Field(..., description="Информация об ошибке")

