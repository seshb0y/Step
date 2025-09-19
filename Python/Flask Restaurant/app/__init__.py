"""Flask Restaurant API - Главный модуль приложения."""

from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.extensions import db, migrate
from app.routes import register_blueprints
from app.utils.errors import register_error_handlers


def create_app(config_class=Config):
    """Создание и настройка Flask приложения."""
    app = Flask(__name__)
    
    # Создаем экземпляр конфигурации
    config = config_class()
    
    # Применяем конфигурацию
    for key, value in config.__dict__.items():
        if not key.startswith('_'):
            app.config[key] = value
    
    # Инициализация расширений
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    # Регистрация обработчиков ошибок
    register_error_handlers(app)
    
    # Регистрация маршрутов
    register_blueprints(app)
    
    return app
