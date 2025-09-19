"""API endpoints для работы с меню."""

from flask import Blueprint, request
from pydantic import ValidationError as PydanticValidationError

from app.services.menu_service import MenuService
from app.schemas.menus import MenuItemCreate, MenuItemUpdate, MenuItemOut
from app.utils.responses import success_response, created_response, paginated_response
from app.utils.errors import ValidationError, NotFoundError, ConflictError
from werkzeug.exceptions import BadRequest

menus_bp = Blueprint('menus', __name__)
menu_service = MenuService()


@menus_bp.route('/', methods=['GET'])
def get_menu_items():
    """Получение списка блюд с фильтрацией и пагинацией."""
    try:
        # Параметры запроса
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 20))
        category = request.args.get('category')
        min_price = request.args.get('min_price', type=float)
        max_price = request.args.get('max_price', type=float)
        is_available = request.args.get('is_available', type=lambda x: x.lower() == 'true')
        search = request.args.get('q')
        sort_by = request.args.get('sort')
        
        # Получаем данные
        menu_items, total = menu_service.get_menu_items(
            page=page,
            per_page=per_page,
            category=category,
            min_price=min_price,
            max_price=max_price,
            is_available=is_available,
            search=search,
            sort_by=sort_by
        )
        
        # Преобразуем в схемы
        items_data = [MenuItemOut.model_validate(item).model_dump() for item in menu_items]
        
        return paginated_response(items_data, total, page, per_page)
    
    except ValidationError as e:
        return {'error': {'code': 'VALIDATION_ERROR', 'message': str(e)}}, 422
    except ValueError as e:
        return {'error': {'code': 'VALIDATION_ERROR', 'message': str(e)}}, 422
    except Exception as e:
        import traceback
        print(f"Error in API: {e}")
        print(f"Traceback: {traceback.format_exc()}")
        return {'error': {'code': 'INTERNAL_ERROR', 'message': f'Внутренняя ошибка сервера: {str(e)}'}}, 500


@menus_bp.route('/', methods=['POST'])
def create_menu_item():
    """Создание нового блюда."""
    try:
        # Валидация входных данных
        try:
            menu_data = MenuItemCreate(**request.json)
        except PydanticValidationError as e:
            return {'error': {'code': 'VALIDATION_ERROR', 'message': 'Ошибка валидации', 'details': e.errors()}}, 422
        except ValueError as e:
            return {'error': {'code': 'VALIDATION_ERROR', 'message': str(e)}}, 422
        
        # Создание блюда
        menu_item = menu_service.create_menu_item(menu_data)
        
        # Возврат результата
        result = MenuItemOut.model_validate(menu_item).model_dump()
        return created_response(result, "Блюдо успешно создано")
    
    except ValidationError as e:
        return {'error': {'code': 'VALIDATION_ERROR', 'message': str(e)}}, 422
    except ValueError as e:
        return {'error': {'code': 'VALIDATION_ERROR', 'message': str(e)}}, 422
    except ConflictError as e:
        return {'error': {'code': 'CONFLICT', 'message': e.message or str(e)}}, 409
    except BadRequest as e:
        return {'error': {'code': 'BAD_REQUEST', 'message': str(e)}}, 400
    except Exception as e:
        import traceback
        print(f"Error in API: {e}")
        print(f"Traceback: {traceback.format_exc()}")
        return {'error': {'code': 'INTERNAL_ERROR', 'message': f'Внутренняя ошибка сервера: {str(e)}'}}, 500


@menus_bp.route('/<int:menu_id>', methods=['GET'])
def get_menu_item(menu_id):
    """Получение блюда по ID."""
    try:
        menu_item = menu_service.get_menu_item(menu_id)
        result = MenuItemOut.model_validate(menu_item).model_dump()
        return success_response(result)
    
    except NotFoundError as e:
        return {'error': {'code': 'NOT_FOUND', 'message': str(e)}}, 404
    except ConflictError as e:
        return {'error': {'code': 'CONFLICT', 'message': e.message or str(e)}}, 409
    except BadRequest as e:
        return {'error': {'code': 'BAD_REQUEST', 'message': str(e)}}, 400
    except Exception as e:
        import traceback
        print(f"Error in API: {e}")
        print(f"Traceback: {traceback.format_exc()}")
        return {'error': {'code': 'INTERNAL_ERROR', 'message': f'Внутренняя ошибка сервера: {str(e)}'}}, 500


@menus_bp.route('/<int:menu_id>', methods=['PUT'])
def update_menu_item(menu_id):
    """Полное обновление блюда."""
    try:
        # Валидация входных данных
        try:
            menu_data = MenuItemUpdate(**request.json)
        except PydanticValidationError as e:
            return {'error': {'code': 'VALIDATION_ERROR', 'message': 'Ошибка валидации', 'details': e.errors()}}, 422
        except ValueError as e:
            return {'error': {'code': 'VALIDATION_ERROR', 'message': str(e)}}, 422
        
        # Обновление блюда
        menu_item = menu_service.update_menu_item(menu_id, menu_data)
        
        # Возврат результата
        result = MenuItemOut.model_validate(menu_item).model_dump()
        return success_response(result, "Блюдо успешно обновлено")
    
    except NotFoundError as e:
        return {'error': {'code': 'NOT_FOUND', 'message': str(e)}}, 404
    except ValidationError as e:
        return {'error': {'code': 'VALIDATION_ERROR', 'message': str(e)}}, 422
    except ValueError as e:
        return {'error': {'code': 'VALIDATION_ERROR', 'message': str(e)}}, 422
    except Exception as e:
        import traceback
        print(f"Error in API: {e}")
        print(f"Traceback: {traceback.format_exc()}")
        return {'error': {'code': 'INTERNAL_ERROR', 'message': f'Внутренняя ошибка сервера: {str(e)}'}}, 500


@menus_bp.route('/<int:menu_id>', methods=['PATCH'])
def partial_update_menu_item(menu_id):
    """Частичное обновление блюда."""
    try:
        # Валидация входных данных
        try:
            menu_data = MenuItemUpdate(**request.json)
        except PydanticValidationError as e:
            return {'error': {'code': 'VALIDATION_ERROR', 'message': 'Ошибка валидации', 'details': e.errors()}}, 422
        except ValueError as e:
            return {'error': {'code': 'VALIDATION_ERROR', 'message': str(e)}}, 422
        
        # Обновление блюда
        menu_item = menu_service.update_menu_item(menu_id, menu_data)
        
        # Возврат результата
        result = MenuItemOut.model_validate(menu_item).model_dump()
        return success_response(result, "Блюдо успешно обновлено")
    
    except NotFoundError as e:
        return {'error': {'code': 'NOT_FOUND', 'message': str(e)}}, 404
    except ValidationError as e:
        return {'error': {'code': 'VALIDATION_ERROR', 'message': str(e)}}, 422
    except ValueError as e:
        return {'error': {'code': 'VALIDATION_ERROR', 'message': str(e)}}, 422
    except Exception as e:
        import traceback
        print(f"Error in API: {e}")
        print(f"Traceback: {traceback.format_exc()}")
        return {'error': {'code': 'INTERNAL_ERROR', 'message': f'Внутренняя ошибка сервера: {str(e)}'}}, 500


@menus_bp.route('/<int:menu_id>', methods=['DELETE'])
def delete_menu_item(menu_id):
    """Удаление блюда."""
    try:
        success = menu_service.delete_menu_item(menu_id)
        if success:
            return success_response(None, "Блюдо успешно удалено")
        else:
            return {'error': {'code': 'NOT_FOUND', 'message': 'Блюдо не найдено'}}, 404
    
    except NotFoundError as e:
        return {'error': {'code': 'NOT_FOUND', 'message': str(e)}}, 404
    except ConflictError as e:
        return {'error': {'code': 'CONFLICT', 'message': e.message or str(e)}}, 409
    except BadRequest as e:
        return {'error': {'code': 'BAD_REQUEST', 'message': str(e)}}, 400
    except Exception as e:
        import traceback
        print(f"Error in API: {e}")
        print(f"Traceback: {traceback.format_exc()}")
        return {'error': {'code': 'INTERNAL_ERROR', 'message': f'Внутренняя ошибка сервера: {str(e)}'}}, 500
