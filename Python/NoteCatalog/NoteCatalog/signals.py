from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Note, Tag


@receiver(post_save, sender=Note)
def add_untagged_tag(sender, instance, created, **kwargs):
    """
    Автоматически добавляет тег 'untagged' к заметкам без тегов.
    """
    if created and not instance.tags.exists():
        untagged_tag, created = Tag.objects.get_or_create(
            name='untagged',
            defaults={'slug': 'untagged'}
        )
        instance.tags.add(untagged_tag)
