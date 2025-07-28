import prisma from '@/lib/prisma';
import { Priority } from '@prisma/client';

export interface TaskFilters {
  showCompleted?: boolean;
  priority?: Priority | 'ALL';
}

export async function getTasks(filters: TaskFilters = {}) {
  try {
    const { showCompleted, priority } = filters;
    
    const where: any = {};

    if (showCompleted === false) {
      where.isCompleted = false;
    }

    if (priority && priority !== 'ALL') {
      where.priority = priority;
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: {
        time: 'desc'
      }
    });

    return tasks;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return [];
  }
} 