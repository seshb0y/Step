"""Схемы для работы с поварами."""

from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field, field_validator
from enum import Enum

from app.schemas.common import PaginatedResponse


class ChefRank(str, Enum):
    """Ранги поваров."""
    JUNIOR = "junior"
    MIDDLE = "middle"
    SENIOR = "senior"
    CHEF_DE_CUISINE = "chef-de-cuisine"


class ChefCreate(BaseModel):
    """Схема для создания повара."""
    full_name: str = Field(..., min_length=1, max_length=100, description="Полное имя повара")
    rank: ChefRank = Field(..., description="Ранг повара")
    specialties: List[str] = Field(default_factory=list, max_length=10, description="Специализации повара")
    is_active: bool = Field(True, description="Активность повара")


class ChefUpdate(BaseModel):
    """Схема для обновления повара."""
    full_name: Optional[str] = Field(None, min_length=1, max_length=100, description="Полное имя повара")
    rank: Optional[ChefRank] = Field(None, description="Ранг повара")
    specialties: Optional[List[str]] = Field(None, max_length=10, description="Специализации повара")
    is_active: Optional[bool] = Field(None, description="Активность повара")


class ChefOut(BaseModel):
    """Схема для вывода повара."""
    id: int = Field(..., description="ID повара")
    full_name: str = Field(..., description="Полное имя повара")
    rank: str = Field(..., description="Ранг повара")
    specialties: List[str] = Field(..., description="Специализации повара")
    is_active: bool = Field(..., description="Активность повара")
    created_at: datetime = Field(..., description="Дата создания")
    updated_at: datetime = Field(..., description="Дата обновления")
    
    model_config = {"from_attributes": True}


class ChefList(PaginatedResponse[ChefOut]):
    """Список поваров с пагинацией."""
    pass
