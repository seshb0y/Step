"""Регистрация маршрутов приложения."""

from flask import Blueprint
from app.api.menus import menus_bp
from app.api.chefs import chefs_bp


def register_blueprints(app):
    """Регистрация всех Blueprint'ов."""
    # API v1
    api_v1 = Blueprint('api_v1', __name__, url_prefix='/api/v1')
    
    # Регистрация Blueprint'ов
    api_v1.register_blueprint(menus_bp, url_prefix='/menus')
    api_v1.register_blueprint(chefs_bp, url_prefix='/chefs')
    
    # Регистрация API
    app.register_blueprint(api_v1)
    
    # Health check
    @app.route('/health')
    def health():
        return {'status': 'ok'}

