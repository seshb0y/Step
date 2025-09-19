"""API endpoints для работы с поварами."""

from flask import Blueprint, request
from pydantic import ValidationError as PydanticValidationError

from app.services.chef_service import ChefService
from app.schemas.chefs import ChefCreate, ChefUpdate, ChefOut
from app.utils.responses import success_response, created_response, paginated_response
from app.utils.errors import ValidationError, NotFoundError, ConflictError
from werkzeug.exceptions import BadRequest

chefs_bp = Blueprint('chefs', __name__)
chef_service = ChefService()


@chefs_bp.route('/', methods=['GET'])
def get_chefs():
    """Получение списка поваров с фильтрацией и пагинацией."""
    try:
        # Параметры запроса
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 20))
        rank = request.args.get('rank')
        is_active = request.args.get('is_active', type=lambda x: x.lower() == 'true')
        specialty = request.args.get('specialty')
        search = request.args.get('q')
        sort_by = request.args.get('sort')
        
        # Получаем данные
        chefs, total = chef_service.get_chefs(
            page=page,
            per_page=per_page,
            rank=rank,
            is_active=is_active,
            specialty=specialty,
            search=search,
            sort_by=sort_by
        )
        
        # Преобразуем в схемы
        chefs_data = [ChefOut.model_validate(chef).model_dump() for chef in chefs]
        
        return paginated_response(chefs_data, total, page, per_page)
    
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


@chefs_bp.route('/', methods=['POST'])
def create_chef():
    """Создание нового повара."""
    try:
        # Валидация входных данных
        try:
            chef_data = ChefCreate(**request.json)
        except PydanticValidationError as e:
            return {'error': {'code': 'VALIDATION_ERROR', 'message': 'Ошибка валидации', 'details': e.errors()}}, 422
        except ValueError as e:
            return {'error': {'code': 'VALIDATION_ERROR', 'message': str(e)}}, 422
        
        # Создание повара
        chef = chef_service.create_chef(chef_data)
        
        # Возврат результата
        result = ChefOut.model_validate(chef).model_dump()
        return created_response(result, "Повар успешно создан")
    
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


@chefs_bp.route('/<int:chef_id>', methods=['GET'])
def get_chef(chef_id):
    """Получение повара по ID."""
    try:
        chef = chef_service.get_chef(chef_id)
        result = ChefOut.model_validate(chef).model_dump()
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


@chefs_bp.route('/<int:chef_id>', methods=['PUT'])
def update_chef(chef_id):
    """Полное обновление повара."""
    try:
        # Валидация входных данных
        try:
            chef_data = ChefUpdate(**request.json)
        except PydanticValidationError as e:
            return {'error': {'code': 'VALIDATION_ERROR', 'message': 'Ошибка валидации', 'details': e.errors()}}, 422
        except ValueError as e:
            return {'error': {'code': 'VALIDATION_ERROR', 'message': str(e)}}, 422
        
        # Обновление повара
        chef = chef_service.update_chef(chef_id, chef_data)
        
        # Возврат результата
        result = ChefOut.model_validate(chef).model_dump()
        return success_response(result, "Повар успешно обновлен")
    
    except NotFoundError as e:
        return {'error': {'code': 'NOT_FOUND', 'message': str(e)}}, 404
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


@chefs_bp.route('/<int:chef_id>', methods=['PATCH'])
def partial_update_chef(chef_id):
    """Частичное обновление повара."""
    try:
        # Валидация входных данных
        try:
            chef_data = ChefUpdate(**request.json)
        except PydanticValidationError as e:
            return {'error': {'code': 'VALIDATION_ERROR', 'message': 'Ошибка валидации', 'details': e.errors()}}, 422
        except ValueError as e:
            return {'error': {'code': 'VALIDATION_ERROR', 'message': str(e)}}, 422
        
        # Обновление повара
        chef = chef_service.update_chef(chef_id, chef_data)
        
        # Возврат результата
        result = ChefOut.model_validate(chef).model_dump()
        return success_response(result, "Повар успешно обновлен")
    
    except NotFoundError as e:
        return {'error': {'code': 'NOT_FOUND', 'message': str(e)}}, 404
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


@chefs_bp.route('/<int:chef_id>', methods=['DELETE'])
def delete_chef(chef_id):
    """Удаление повара."""
    try:
        success = chef_service.delete_chef(chef_id)
        if success:
            return success_response(None, "Повар успешно удален")
        else:
            return {'error': {'code': 'NOT_FOUND', 'message': 'Повар не найден'}}, 404
    
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


@chefs_bp.route('/<int:chef_id>/menu-items/<int:menu_item_id>', methods=['POST'])
def assign_menu_item(chef_id, menu_item_id):
    """Назначение блюда повару."""
    try:
        success = chef_service.assign_menu_item(chef_id, menu_item_id)
        if success:
            return success_response(None, "Блюдо успешно назначено повару")
        else:
            return {'error': {'code': 'NOT_FOUND', 'message': 'Повар или блюдо не найдено'}}, 404
    
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


@chefs_bp.route('/<int:chef_id>/menu-items/<int:menu_item_id>', methods=['DELETE'])
def unassign_menu_item(chef_id, menu_item_id):
    """Снятие назначения блюда повару."""
    try:
        success = chef_service.unassign_menu_item(chef_id, menu_item_id)
        if success:
            return success_response(None, "Назначение блюда повару снято")
        else:
            return {'error': {'code': 'NOT_FOUND', 'message': 'Повар или блюдо не найдено'}}, 404
    
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
