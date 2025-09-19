"""Схемы для работы с меню."""

from typing import Optional, List
from decimal import Decimal
from datetime import datetime
from pydantic import BaseModel, Field, field_validator
from enum import Enum

from app.schemas.common import PaginatedResponse


class MenuCategory(str, Enum):
    """Категории блюд."""
    STARTER = "starter"
    MAIN = "main"
    DESSERT = "dessert"
    DRINK = "drink"


class MenuItemCreate(BaseModel):
    """Схема для создания блюда."""
    name: str = Field(..., min_length=1, max_length=100, description="Название блюда")
    description: Optional[str] = Field(None, max_length=500, description="Описание блюда")
    category: MenuCategory = Field(..., description="Категория блюда")
    price: Decimal = Field(..., gt=0, decimal_places=2, description="Цена блюда")
    is_available: bool = Field(True, description="Доступность блюда")
    
    @field_validator('price')
    @classmethod
    def validate_price(cls, v):
        """Валидация цены."""
        if v <= 0:
            raise ValueError('Цена должна быть больше 0')
        return v
    
    @field_validator('category')
    @classmethod
    def validate_category(cls, v):
        """Преобразование категории в строку."""
        if isinstance(v, MenuCategory):
            return v.value
        return v


class MenuItemUpdate(BaseModel):
    """Схема для обновления блюда."""
    name: Optional[str] = Field(None, min_length=1, max_length=100, description="Название блюда")
    description: Optional[str] = Field(None, max_length=500, description="Описание блюда")
    category: Optional[MenuCategory] = Field(None, description="Категория блюда")
    price: Optional[Decimal] = Field(None, gt=0, decimal_places=2, description="Цена блюда")
    is_available: Optional[bool] = Field(None, description="Доступность блюда")
    
    @field_validator('price')
    @classmethod
    def validate_price(cls, v):
        """Валидация цены."""
        if v is not None and v <= 0:
            raise ValueError('Цена должна быть больше 0')
        return v
    
    @field_validator('category')
    @classmethod
    def validate_category(cls, v):
        """Преобразование категории в строку."""
        if v is not None and isinstance(v, MenuCategory):
            return v.value
        return v


class MenuItemOut(BaseModel):
    """Схема для вывода блюда."""
    id: int = Field(..., description="ID блюда")
    name: str = Field(..., description="Название блюда")
    description: Optional[str] = Field(None, description="Описание блюда")
    category: str = Field(..., description="Категория блюда")
    price: float = Field(..., description="Цена блюда")
    is_available: bool = Field(..., description="Доступность блюда")
    created_at: datetime = Field(..., description="Дата создания")
    updated_at: datetime = Field(..., description="Дата обновления")
    
    model_config = {"from_attributes": True}


class MenuItemList(PaginatedResponse[MenuItemOut]):
    """Список блюд с пагинацией."""
    pass
