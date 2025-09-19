"""Стандартные ответы API."""

from flask import jsonify
from typing import Any, Dict, List, Optional
from app.schemas.common import PaginationMeta


def success_response(data: Any, message: str = "Успешно") -> tuple:
    """Успешный ответ с данными."""
    response = {
        'data': data,
        'message': message
    }
    return jsonify(response), 200


def created_response(data: Any, message: str = "Создано") -> tuple:
    """Ответ о создании ресурса."""
    response = {
        'data': data,
        'message': message
    }
    return jsonify(response), 201


def paginated_response(
    data: List[Any], 
    total: int, 
    page: int, 
    per_page: int,
    message: str = "Успешно"
) -> tuple:
    """Пагинированный ответ."""
    pages = (total + per_page - 1) // per_page  # Округление вверх
    
    meta = PaginationMeta(
        total=total,
        page=page,
        per_page=per_page,
        pages=pages
    )
    
    response = {
        'data': data,
        'meta': meta.model_dump(),
        'message': message
    }
    return jsonify(response), 200


def error_response(
    message: str, 
    code: str = "ERROR", 
    details: Optional[Dict] = None,
    status_code: int = 400
) -> tuple:
    """Ответ с ошибкой."""
    response = {
        'error': {
            'code': code,
            'message': message,
            'details': details
        }
    }
    return jsonify(response), status_code
