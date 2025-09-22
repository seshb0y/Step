from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, models
from .models import Task
from .serializers import TaskSerializer, TaskReorderSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """ViewSet для управления задачами"""
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Возвращаем только задачи текущего пользователя"""
        queryset = Task.objects.filter(owner=self.request.user)
        
        # Фильтрация по статусу
        status_filter = self.request.query_params.get('status', 'all')
        if status_filter == 'done':
            queryset = queryset.filter(is_completed=True)
        elif status_filter == 'todo':
            queryset = queryset.filter(is_completed=False)
        
        return queryset.order_by('order', 'created_at')

    def perform_create(self, serializer):
        """При создании задачи устанавливаем владельца"""
        # Получаем максимальный порядок для пользователя
        max_order = Task.objects.filter(owner=self.request.user).aggregate(
            max_order=models.Max('order')
        )['max_order'] or 0
        
        serializer.save(owner=self.request.user, order=max_order + 1)

    @action(detail=False, methods=['patch'])
    def reorder(self, request):
        """Изменение порядка задач"""
        serializer = TaskReorderSerializer(data=request.data, many=True, context={'request': request})
        
        if serializer.is_valid():
            with transaction.atomic():
                for item in serializer.validated_data:
                    task = Task.objects.get(id=item['id'], owner=request.user)
                    task.order = item['order']
                    task.save()
            
            # Возвращаем обновленный список задач
            tasks = self.get_queryset()
            return Response(TaskSerializer(tasks, many=True).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
