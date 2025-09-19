"""Обработка ошибок."""

from flask import jsonify
from werkzeug.exceptions import HTTPException


class APIError(Exception):
    """Базовый класс для ошибок API."""
    
    def __init__(self, message, status_code=400, payload=None):
        super().__init__()
        self.message = message
        self.status_code = status_code
        self.payload = payload


class ValidationError(APIError):
    """Ошибка валидации данных."""
    
    def __init__(self, message="Ошибка валидации", payload=None):
        super().__init__(message, 422, payload)


class NotFoundError(APIError):
    """Ошибка - ресурс не найден."""
    
    def __init__(self, message="Ресурс не найден"):
        super().__init__(message, 404)


class ConflictError(APIError):
    """Ошибка конфликта."""
    
    def __init__(self, message="Конфликт ресурсов"):
        super().__init__(message, 409)


class BadRequestError(APIError):
    """Ошибка некорректного запроса."""
    
    def __init__(self, message="Некорректный запрос"):
        super().__init__(message, 400)


def register_error_handlers(app):
    """Регистрация обработчиков ошибок."""
    
    @app.errorhandler(APIError)
    def handle_api_error(error):
        """Обработка ошибок API."""
        response = {
            'error': {
                'code': error.__class__.__name__.upper(),
                'message': error.message or 'Неизвестная ошибка',
                'details': error.payload
            }
        }
        return jsonify(response), error.status_code
    
    @app.errorhandler(ValidationError)
    def handle_validation_error(error):
        """Обработка ошибок валидации."""
        response = {
            'error': {
                'code': 'VALIDATION_ERROR',
                'message': error.message or 'Ошибка валидации',
                'details': error.payload
            }
        }
        return jsonify(response), 422
    
    @app.errorhandler(NotFoundError)
    def handle_not_found_error(error):
        """Обработка ошибок 'не найдено'."""
        response = {
            'error': {
                'code': 'NOT_FOUND',
                'message': error.message or 'Ресурс не найден'
            }
        }
        return jsonify(response), 404
    
    @app.errorhandler(ConflictError)
    def handle_conflict_error(error):
        """Обработка ошибок конфликта."""
        response = {
            'error': {
                'code': 'CONFLICT',
                'message': error.message or 'Конфликт ресурсов'
            }
        }
        return jsonify(response), 409
    
    @app.errorhandler(400)
    def handle_bad_request(error):
        """Обработка ошибок 400."""
        response = {
            'error': {
                'code': 'BAD_REQUEST',
                'message': 'Некорректный запрос'
            }
        }
        return jsonify(response), 400
    
    @app.errorhandler(404)
    def handle_not_found(error):
        """Обработка ошибок 404."""
        response = {
            'error': {
                'code': 'NOT_FOUND',
                'message': 'Ресурс не найден'
            }
        }
        return jsonify(response), 404
    
    @app.errorhandler(500)
    def handle_internal_error(error):
        """Обработка внутренних ошибок."""
        response = {
            'error': {
                'code': 'INTERNAL_ERROR',
                'message': 'Внутренняя ошибка сервера'
            }
        }
        return jsonify(response), 500
