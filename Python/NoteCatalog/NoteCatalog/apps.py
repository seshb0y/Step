from django.apps import AppConfig


class NotecatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'NoteCatalog'

    def ready(self):
        import NoteCatalog.signals