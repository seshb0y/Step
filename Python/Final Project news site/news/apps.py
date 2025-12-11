from django.apps import AppConfig


class NewsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "news"
    verbose_name = "Новости"

    def ready(self) -> None:  # pragma: no cover
        from . import signals  # noqa: F401
