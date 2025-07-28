
import prisma from '@/lib/prisma';
import { Prisma, Priority } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const showCompleted = searchParams.get('showCompleted');
    const priority = searchParams.get('priority');


    const where: Prisma.TaskWhereInput = {};

    if (showCompleted === 'false') {
      where.isCompleted = false;
    }

    if (priority && priority !== 'ALL') {
      where.priority = priority as Priority;
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: {
        time: 'desc'
      }
    });

    return Response.json(tasks);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
} 