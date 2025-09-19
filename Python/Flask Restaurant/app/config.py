"""Конфигурация приложения."""

import os
from dotenv import load_dotenv

# Загружаем переменные окружения
load_dotenv()


class BaseConfig:
    """Базовая конфигурация."""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_RECORD_QUERIES = True


class DevelopmentConfig(BaseConfig):
    """Конфигурация для разработки."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///app.db'


class TestingConfig(BaseConfig):
    """Конфигурация для тестирования."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or 'sqlite:///test.db'


class ProductionConfig(BaseConfig):
    """Конфигурация для продакшена."""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///app.db'


# Словарь конфигураций
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}


class Config:
    """Активная конфигурация."""
    def __init__(self):
        env = os.environ.get('FLASK_ENV', 'development')
        config_class = config.get(env, DevelopmentConfig)
        
        # Копируем атрибуты из выбранной конфигурации
        for attr in dir(config_class):
            if not attr.startswith('_'):
                setattr(self, attr, getattr(config_class, attr))
