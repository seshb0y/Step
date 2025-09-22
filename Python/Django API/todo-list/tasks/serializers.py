from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    """Сериализатор для задач"""
    
    class Meta:
        model = Task
        fields = ['id', 'title', 'is_completed', 'order', 'created_at', 'updated_at']
        read_only_fields = ['id', 'owner', 'created_at', 'updated_at']

    def validate_title(self, value):
        """Валидация названия задачи"""
        if not value.strip():
            raise serializers.ValidationError("Название задачи не может быть пустым")
        return value.strip()


class TaskReorderSerializer(serializers.Serializer):
    """Сериализатор для изменения порядка задач"""
    id = serializers.IntegerField()
    order = serializers.IntegerField()

    def validate_id(self, value):
        """Проверяем, что задача принадлежит текущему пользователю"""
        if not Task.objects.filter(id=value, owner=self.context['request'].user).exists():
            raise serializers.ValidationError("Задача не найдена")
        return value

